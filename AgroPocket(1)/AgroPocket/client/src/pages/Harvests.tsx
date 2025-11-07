import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertHarvestSchema } from "@shared/schema";
import type { Harvest, InsertHarvest } from "@shared/schema";
import { getHarvests, saveHarvest, deleteHarvest, getCrops } from "@/lib/storage";
import { addHistoryEntry } from "@/lib/storage";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, Plus, Pencil, Trash2, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Harvests() {
  const [harvests, setHarvests] = useState<Harvest[]>(getHarvests());
  const [editingHarvest, setEditingHarvest] = useState<Harvest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const user = getCurrentUser();
  const crops = getCrops();

  const form = useForm<InsertHarvest>({
    resolver: zodResolver(insertHarvestSchema),
    defaultValues: {
      cropId: "",
      cropName: "",
      quantity: 0,
      unit: "",
      harvestDate: new Date().toISOString().split("T")[0],
      quality: "good",
      notes: "",
    },
  });

  const handleSubmit = (data: InsertHarvest) => {
    if (!user) return;

    const harvest: Harvest = editingHarvest
      ? { ...editingHarvest, ...data }
      : {
          id: crypto.randomUUID(),
          userId: user.id,
          createdAt: new Date().toISOString(),
          ...data,
        };

    saveHarvest(harvest);
    addHistoryEntry({
      type: "harvest",
      action: editingHarvest ? "updated" : "created",
      description: `${editingHarvest ? "Updated" : "Recorded"} harvest: ${data.cropName}`,
      relatedId: harvest.id,
    });

    setHarvests(getHarvests());
    toast({
      title: editingHarvest ? "Harvest updated" : "Harvest recorded",
      description: `${data.cropName} harvest has been ${editingHarvest ? "updated" : "recorded"} successfully`,
    });

    setDialogOpen(false);
    setEditingHarvest(null);
    form.reset();
  };

  const handleDelete = (harvest: Harvest) => {
    deleteHarvest(harvest.id);
    addHistoryEntry({
      type: "harvest",
      action: "deleted",
      description: `Deleted harvest: ${harvest.cropName}`,
      relatedId: harvest.id,
    });
    setHarvests(getHarvests());
    toast({
      title: "Harvest deleted",
      description: `${harvest.cropName} harvest has been removed`,
    });
  };

  const handleEdit = (harvest: Harvest) => {
    setEditingHarvest(harvest);
    form.reset({
      cropId: harvest.cropId,
      cropName: harvest.cropName,
      quantity: harvest.quantity,
      unit: harvest.unit,
      harvestDate: harvest.harvestDate,
      quality: harvest.quality,
      notes: harvest.notes || "",
    });
    setDialogOpen(true);
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "excellent":
        return "bg-primary/20 text-primary border-primary/30";
      case "good":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "fair":
        return "bg-secondary/20 text-secondary border-secondary/30";
      case "poor":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const totalQuantity = harvests.reduce((sum, h) => sum + h.quantity, 0);

  return (
    <div className="space-y-6" data-testid="page-harvests">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Harvests</h1>
          <p className="mt-2 text-muted-foreground">
            Record and track your crop harvests
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingHarvest(null);
            form.reset();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2" data-testid="button-add-harvest">
              <Plus className="h-4 w-4" />
              Record Harvest
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingHarvest ? "Edit Harvest" : "Record New Harvest"}</DialogTitle>
              <DialogDescription>
                {editingHarvest ? "Update harvest information" : "Enter details for the new harvest"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="cropId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Crop</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          const selectedCrop = crops.find(c => c.id === value);
                          if (selectedCrop) {
                            form.setValue("cropName", selectedCrop.name);
                          }
                        }} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-crop">
                            <SelectValue placeholder="Choose a crop" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {crops.length > 0 ? (
                            crops.map(crop => (
                              <SelectItem key={crop.id} value={crop.id}>
                                {crop.name}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-2 text-sm text-muted-foreground">No crops available</div>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="500"
                            data-testid="input-quantity"
                            {...field}
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <FormControl>
                          <Input placeholder="kg, tons, bushels" data-testid="input-unit" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="harvestDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Harvest Date</FormLabel>
                      <FormControl>
                        <Input type="date" data-testid="input-harvest-date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quality</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-quality">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Additional information about this harvest..."
                          data-testid="input-notes"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1" data-testid="button-submit-harvest">
                    {editingHarvest ? "Update" : "Record"} Harvest
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setDialogOpen(false);
                      setEditingHarvest(null);
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Card */}
      {harvests.length > 0 && (
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Harvested</p>
                  <p className="text-2xl font-bold text-foreground">{totalQuantity.toFixed(1)} units</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold text-foreground">{harvests.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Harvests Grid */}
      {harvests.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {harvests.map((harvest) => (
            <Card key={harvest.id} className="hover-elevate transition-all duration-200" data-testid={`card-harvest-${harvest.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{harvest.cropName}</CardTitle>
                      <CardDescription className="text-xs">
                        {harvest.quantity} {harvest.unit}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getQualityColor(harvest.quality)} variant="outline">
                    <Award className="mr-1 h-3 w-3" />
                    {harvest.quality}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Harvested:</span>{" "}
                    <span className="text-foreground">
                      {new Date(harvest.harvestDate).toLocaleDateString()}
                    </span>
                  </div>
                  {harvest.notes && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{harvest.notes}</p>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={() => handleEdit(harvest)}
                      data-testid={`button-edit-harvest-${harvest.id}`}
                    >
                      <Pencil className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(harvest)}
                      data-testid={`button-delete-harvest-${harvest.id}`}
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
          <CardContent className="py-16">
            <div className="text-center">
              <TrendingUp className="mx-auto mb-4 h-16 w-16 text-primary/50" />
              <h3 className="mb-2 text-xl font-bold text-foreground">No Harvests Yet</h3>
              <p className="mb-6 text-muted-foreground">
                Start recording your crop harvests to track productivity
              </p>
              {crops.length > 0 ? (
                <Button onClick={() => setDialogOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Record Your First Harvest
                </Button>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Add crops first before recording harvests
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
