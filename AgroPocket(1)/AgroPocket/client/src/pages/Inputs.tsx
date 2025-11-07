import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInputSchema } from "@shared/schema";
import type { Input, InsertInput } from "@shared/schema";
import { getInputs, saveInput, deleteInput } from "@/lib/storage";
import { addHistoryEntry } from "@/lib/storage";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input as InputField } from "@/components/ui/input";
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
import { Package, Plus, Pencil, Trash2, DollarSign, Boxes } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Inputs() {
  const [inputs, setInputs] = useState<Input[]>(getInputs());
  const [editingInput, setEditingInput] = useState<Input | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const user = getCurrentUser();

  const form = useForm<InsertInput>({
    resolver: zodResolver(insertInputSchema),
    defaultValues: {
      name: "",
      type: "fertilizer",
      quantity: 0,
      unit: "",
      cost: 0,
      purchaseDate: new Date().toISOString().split("T")[0],
      supplier: "",
      notes: "",
    },
  });

  const handleSubmit = (data: InsertInput) => {
    if (!user) return;

    const input: Input = editingInput
      ? { ...editingInput, ...data }
      : {
          id: crypto.randomUUID(),
          userId: user.id,
          createdAt: new Date().toISOString(),
          ...data,
        };

    saveInput(input);
    addHistoryEntry({
      type: "input",
      action: editingInput ? "updated" : "created",
      description: `${editingInput ? "Updated" : "Created"} input: ${data.name}`,
      relatedId: input.id,
    });

    setInputs(getInputs());
    toast({
      title: editingInput ? "Input updated" : "Input created",
      description: `${data.name} has been ${editingInput ? "updated" : "added"} successfully`,
    });

    setDialogOpen(false);
    setEditingInput(null);
    form.reset();
  };

  const handleDelete = (input: Input) => {
    deleteInput(input.id);
    addHistoryEntry({
      type: "input",
      action: "deleted",
      description: `Deleted input: ${input.name}`,
      relatedId: input.id,
    });
    setInputs(getInputs());
    toast({
      title: "Input deleted",
      description: `${input.name} has been removed`,
    });
  };

  const handleEdit = (input: Input) => {
    setEditingInput(input);
    form.reset({
      name: input.name,
      type: input.type,
      quantity: input.quantity,
      unit: input.unit,
      cost: input.cost,
      purchaseDate: input.purchaseDate,
      supplier: input.supplier || "",
      notes: input.notes || "",
    });
    setDialogOpen(true);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "fertilizer":
        return "bg-primary/20 text-primary border-primary/30";
      case "pesticide":
        return "bg-secondary/20 text-secondary border-secondary/30";
      case "seed":
        return "bg-primary/20 text-primary border-primary/30";
      case "equipment":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const totalCost = inputs.reduce((sum, input) => sum + input.cost, 0);

  return (
    <div className="space-y-6" data-testid="page-inputs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inputs Management</h1>
          <p className="mt-2 text-muted-foreground">
            Track fertilizers, pesticides, seeds, and equipment
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingInput(null);
            form.reset();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2" data-testid="button-add-input">
              <Plus className="h-4 w-4" />
              Add Input
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingInput ? "Edit Input" : "Add New Input"}</DialogTitle>
              <DialogDescription>
                {editingInput ? "Update input information" : "Enter details for the new input"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Input Name</FormLabel>
                      <FormControl>
                        <InputField placeholder="e.g., NPK Fertilizer, Corn Seeds" data-testid="input-name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-input-type">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="fertilizer">Fertilizer</SelectItem>
                          <SelectItem value="pesticide">Pesticide</SelectItem>
                          <SelectItem value="seed">Seed</SelectItem>
                          <SelectItem value="equipment">Equipment</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
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
                          <InputField
                            type="number"
                            step="0.1"
                            placeholder="100"
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
                          <InputField placeholder="kg, L, units" data-testid="input-unit" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost ($)</FormLabel>
                      <FormControl>
                        <InputField
                          type="number"
                          step="0.01"
                          placeholder="150.00"
                          data-testid="input-cost"
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
                  name="purchaseDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purchase Date</FormLabel>
                      <FormControl>
                        <InputField type="date" data-testid="input-purchase-date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="supplier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier (Optional)</FormLabel>
                      <FormControl>
                        <InputField placeholder="Supplier name" data-testid="input-supplier" {...field} />
                      </FormControl>
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
                          placeholder="Additional information..."
                          data-testid="input-notes"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1" data-testid="button-submit-input">
                    {editingInput ? "Update" : "Create"} Input
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setDialogOpen(false);
                      setEditingInput(null);
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
      {inputs.length > 0 && (
        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/20">
                  <DollarSign className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Investment</p>
                  <p className="text-2xl font-bold text-foreground">${totalCost.toFixed(2)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold text-foreground">{inputs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inputs Grid */}
      {inputs.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {inputs.map((input) => (
            <Card key={input.id} className="hover-elevate transition-all duration-200" data-testid={`card-input-${input.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                      <Package className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{input.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 text-xs">
                        <Boxes className="h-3 w-3" />
                        {input.quantity} {input.unit}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getTypeColor(input.type)} variant="outline">
                    {input.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Cost:</span>
                    <span className="font-bold text-secondary">${input.cost.toFixed(2)}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Purchased:</span>{" "}
                    <span className="text-foreground">
                      {new Date(input.purchaseDate).toLocaleDateString()}
                    </span>
                  </div>
                  {input.supplier && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Supplier:</span>{" "}
                      <span className="text-foreground">{input.supplier}</span>
                    </div>
                  )}
                  {input.notes && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{input.notes}</p>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={() => handleEdit(input)}
                      data-testid={`button-edit-input-${input.id}`}
                    >
                      <Pencil className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(input)}
                      data-testid={`button-delete-input-${input.id}`}
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
        <Card className="border-dashed border-2 border-secondary/30 bg-secondary/5">
          <CardContent className="py-16">
            <div className="text-center">
              <Package className="mx-auto mb-4 h-16 w-16 text-secondary/50" />
              <h3 className="mb-2 text-xl font-bold text-foreground">No Inputs Yet</h3>
              <p className="mb-6 text-muted-foreground">
                Start tracking your agricultural inputs like fertilizers, seeds, and equipment
              </p>
              <Button onClick={() => setDialogOpen(true)} className="gap-2" variant="secondary">
                <Plus className="h-4 w-4" />
                Add Your First Input
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
