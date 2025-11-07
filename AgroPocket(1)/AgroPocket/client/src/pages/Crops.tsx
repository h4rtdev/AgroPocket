import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCropSchema } from "@shared/schema";
import type { Crop, InsertCrop } from "@shared/schema";
import { getCrops, saveCrop, deleteCrop } from "@/lib/storage";
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
import { Sprout, Plus, Pencil, Trash2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Crops() {
  const [crops, setCrops] = useState<Crop[]>(getCrops());
  const [editingCrop, setEditingCrop] = useState<Crop | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const user = getCurrentUser();

  const form = useForm<InsertCrop>({
    resolver: zodResolver(insertCropSchema),
    defaultValues: {
      name: "",
      area: 0,
      areaUnit: "hectare",
      plantingDate: new Date().toISOString().split("T")[0],
      status: "planted",
      notes: "",
    },
  });

  const handleSubmit = (data: InsertCrop) => {
    if (!user) return;

    const crop: Crop = editingCrop
      ? { ...editingCrop, ...data }
      : {
          id: crypto.randomUUID(),
          userId: user.id,
          createdAt: new Date().toISOString(),
          ...data,
        };

    saveCrop(crop);
    addHistoryEntry({
      type: "crop",
      action: editingCrop ? "updated" : "created",
      description: `${editingCrop ? "Updated" : "Created"} crop: ${data.name}`,
      relatedId: crop.id,
    });

    setCrops(getCrops());
    toast({
      title: editingCrop ? "Crop updated" : "Crop created",
      description: `${data.name} has been ${editingCrop ? "updated" : "added"} successfully`,
    });

    setDialogOpen(false);
    setEditingCrop(null);
    form.reset();
  };

  const handleDelete = (crop: Crop) => {
    deleteCrop(crop.id);
    addHistoryEntry({
      type: "crop",
      action: "deleted",
      description: `Deleted crop: ${crop.name}`,
      relatedId: crop.id,
    });
    setCrops(getCrops());
    toast({
      title: "Crop deleted",
      description: `${crop.name} has been removed`,
    });
  };

  const handleEdit = (crop: Crop) => {
    setEditingCrop(crop);
    form.reset({
      name: crop.name,
      area: crop.area,
      areaUnit: crop.areaUnit,
      plantingDate: crop.plantingDate,
      status: crop.status,
      notes: crop.notes || "",
    });
    setDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planted":
        return "bg-secondary/20 text-secondary border-secondary/30";
      case "growing":
        return "bg-primary/20 text-primary border-primary/30";
      case "harvested":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "failed":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <div className="space-y-6" data-testid="page-crops">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Crops Management</h1>
          <p className="mt-2 text-muted-foreground">
            Track and manage your agricultural crops
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingCrop(null);
            form.reset();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2" data-testid="button-add-crop">
              <Plus className="h-4 w-4" />
              Add Crop
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingCrop ? "Edit Crop" : "Add New Crop"}</DialogTitle>
              <DialogDescription>
                {editingCrop ? "Update crop information" : "Enter details for the new crop"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crop Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Corn, Wheat, Soybeans" data-testid="input-crop-name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="10.5"
                            data-testid="input-crop-area"
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
                    name="areaUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-area-unit">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hectare">Hectare</SelectItem>
                            <SelectItem value="acre">Acre</SelectItem>
                            <SelectItem value="m2">m²</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="plantingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Planting Date</FormLabel>
                      <FormControl>
                        <Input type="date" data-testid="input-planting-date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-crop-status">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="planted">Planted</SelectItem>
                          <SelectItem value="growing">Growing</SelectItem>
                          <SelectItem value="harvested">Harvested</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
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
                          placeholder="Additional information about this crop..."
                          data-testid="input-crop-notes"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1" data-testid="button-submit-crop">
                    {editingCrop ? "Update" : "Create"} Crop
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setDialogOpen(false);
                      setEditingCrop(null);
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

      {/* Crops Grid */}
      {crops.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {crops.map((crop) => (
            <Card key={crop.id} className="hover-elevate transition-all duration-200" data-testid={`card-crop-${crop.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Sprout className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{crop.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 text-xs">
                        <MapPin className="h-3 w-3" />
                        {crop.area} {crop.areaUnit}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(crop.status)} variant="outline">
                    {crop.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Planted:</span>{" "}
                    <span className="text-foreground">
                      {new Date(crop.plantingDate).toLocaleDateString()}
                    </span>
                  </div>
                  {crop.notes && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{crop.notes}</p>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={() => handleEdit(crop)}
                      data-testid={`button-edit-crop-${crop.id}`}
                    >
                      <Pencil className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(crop)}
                      data-testid={`button-delete-crop-${crop.id}`}
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
              <Sprout className="mx-auto mb-4 h-16 w-16 text-primary/50" />
              <h3 className="mb-2 text-xl font-bold text-foreground">No Crops Yet</h3>
              <p className="mb-6 text-muted-foreground">
                Start tracking your agricultural operations by adding your first crop
              </p>
              <Button onClick={() => setDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Crop
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
