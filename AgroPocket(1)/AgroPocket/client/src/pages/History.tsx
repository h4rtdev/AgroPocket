import { useState } from "react";
import { getHistory } from "@/lib/storage";
import type { HistoryEntry } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History as HistoryIcon, Sprout, Package, TrendingUp, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function History() {
  const allHistory = getHistory();
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [actionFilter, setActionFilter] = useState<string>("all");

  const filteredHistory = allHistory.filter((entry) => {
    if (typeFilter !== "all" && entry.type !== typeFilter) return false;
    if (actionFilter !== "all" && entry.action !== actionFilter) return false;
    return true;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "crop":
        return Sprout;
      case "input":
        return Package;
      case "harvest":
        return TrendingUp;
      default:
        return HistoryIcon;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "crop":
        return "bg-primary/20 text-primary border-primary/30";
      case "input":
        return "bg-secondary/20 text-secondary border-secondary/30";
      case "harvest":
        return "bg-primary/20 text-primary border-primary/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "created":
        return "bg-primary/10 text-primary";
      case "updated":
        return "bg-secondary/10 text-secondary";
      case "deleted":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  const stats = {
    total: allHistory.length,
    crops: allHistory.filter(e => e.type === "crop").length,
    inputs: allHistory.filter(e => e.type === "input").length,
    harvests: allHistory.filter(e => e.type === "harvest").length,
  };

  return (
    <div className="space-y-6" data-testid="page-history">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Operation History</h1>
        <p className="mt-2 text-muted-foreground">
          View all your agricultural management activities
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Operations</p>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Crop Operations</p>
              <p className="text-2xl font-bold text-primary">{stats.crops}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Input Operations</p>
              <p className="text-2xl font-bold text-secondary">{stats.inputs}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Harvest Operations</p>
              <p className="text-2xl font-bold text-primary">{stats.harvests}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Filters</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger data-testid="select-type-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="crop">Crops</SelectItem>
                  <SelectItem value="input">Inputs</SelectItem>
                  <SelectItem value="harvest">Harvests</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Action</label>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger data-testid="select-action-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="created">Created</SelectItem>
                  <SelectItem value="updated">Updated</SelectItem>
                  <SelectItem value="deleted">Deleted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History Timeline */}
      {filteredHistory.length > 0 ? (
        <div className="space-y-4">
          {filteredHistory.map((entry) => {
            const Icon = getTypeIcon(entry.type);
            return (
              <Card key={entry.id} className="hover-elevate transition-all duration-200" data-testid={`history-entry-${entry.id}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                      entry.type === "crop" ? "bg-primary/10" :
                      entry.type === "input" ? "bg-secondary/10" : "bg-primary/10"
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        entry.type === "crop" ? "text-primary" :
                        entry.type === "input" ? "text-secondary" : "text-primary"
                      }`} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={getTypeColor(entry.type)} variant="outline">
                          {entry.type}
                        </Badge>
                        <Badge className={getActionColor(entry.action)} variant="secondary">
                          {entry.action}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(entry.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{entry.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-dashed border-2 border-muted/30">
          <CardContent className="py-16">
            <div className="text-center">
              <HistoryIcon className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
              <h3 className="mb-2 text-xl font-bold text-foreground">
                {allHistory.length === 0 ? "No History Yet" : "No Results"}
              </h3>
              <p className="text-muted-foreground">
                {allHistory.length === 0
                  ? "Your activity history will appear here as you manage crops, inputs, and harvests"
                  : "Try adjusting your filters to see more results"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
