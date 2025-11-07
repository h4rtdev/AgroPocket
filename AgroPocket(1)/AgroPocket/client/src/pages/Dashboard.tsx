import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCrops, getInputs, getHarvests, getHistory } from "@/lib/storage";
import { Sprout, Package, TrendingUp, Activity, Calendar, DollarSign } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

export default function Dashboard() {
  const user = getCurrentUser();
  const crops = getCrops();
  const inputs = getInputs();
  const harvests = getHarvests();
  const history = getHistory();

  const activeCrops = crops.filter(c => c.status === "growing" || c.status === "planted").length;
  const totalArea = crops.reduce((sum, c) => sum + c.area, 0);
  const totalInputCost = inputs.reduce((sum, i) => sum + i.cost, 0);
  const recentHarvests = harvests.filter(h => {
    const harvestDate = new Date(h.harvestDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return harvestDate >= thirtyDaysAgo;
  }).length;

  const stats = [
    {
      title: "Total Crops",
      value: crops.length.toString(),
      subtitle: `${activeCrops} active`,
      icon: Sprout,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total Inputs",
      value: inputs.length.toString(),
      subtitle: `$${totalInputCost.toFixed(2)} spent`,
      icon: Package,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Total Harvests",
      value: harvests.length.toString(),
      subtitle: `${recentHarvests} this month`,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total Area",
      value: totalArea.toFixed(1),
      subtitle: "hectares managed",
      icon: Calendar,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  const recentActivity = history
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8" data-testid="page-dashboard">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
        <p className="mt-2 text-muted-foreground">
          Here's an overview of your agricultural operations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover-elevate transition-all duration-200" data-testid={`card-stat-${index}`}>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <CardTitle>Recent Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-start gap-3 rounded-lg border border-border/50 p-3 hover-elevate transition-colors"
                    data-testid={`activity-${entry.id}`}
                  >
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      entry.action === "created" ? "bg-primary/10" : 
                      entry.action === "updated" ? "bg-secondary/10" : "bg-destructive/10"
                    }`}>
                      <span className="text-xs font-bold">
                        {entry.action === "created" ? "+" : entry.action === "updated" ? "↻" : "×"}
                      </span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm text-foreground">{entry.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(entry.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <Activity className="mx-auto mb-3 h-12 w-12 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">No recent activity</p>
                <p className="text-xs text-muted-foreground">
                  Start by adding crops, inputs, or harvests
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-secondary" />
              <CardTitle>Financial Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border border-border/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Investment</span>
                  <span className="text-lg font-bold text-foreground">
                    ${totalInputCost.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="rounded-lg border border-border/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Crops</span>
                  <span className="text-lg font-bold text-primary">{activeCrops}</span>
                </div>
              </div>
              <div className="rounded-lg border border-border/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Harvests</span>
                  <span className="text-lg font-bold text-secondary">{harvests.length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empty State Message */}
      {crops.length === 0 && inputs.length === 0 && harvests.length === 0 && (
        <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
          <CardContent className="py-12">
            <div className="text-center">
              <Sprout className="mx-auto mb-4 h-16 w-16 text-primary/50" />
              <h3 className="mb-2 text-xl font-bold text-foreground">Get Started with AgroPocket</h3>
              <p className="mb-6 text-muted-foreground">
                Start managing your agricultural operations by adding your first crop, input, or harvest
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  → Add Crops
                </span>
                <span className="rounded-lg bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary">
                  → Track Inputs
                </span>
                <span className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  → Record Harvests
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
