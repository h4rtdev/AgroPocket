import { useState } from "react";
import { Link, useLocation } from "wouter";
import { getCurrentUser, logoutUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Sprout,
  Package,
  TrendingUp,
  History,
  BookOpen,
  Menu,
  User,
  LogOut,
  Leaf,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/crops", label: "Crops", icon: Sprout },
  { path: "/inputs", label: "Inputs", icon: Package },
  { path: "/harvests", label: "Harvests", icon: TrendingUp },
  { path: "/history", label: "History", icon: History },
  { path: "/documentation", label: "Documentation", icon: BookOpen },
];

export default function Layout({ children }: LayoutProps) {
  const [location, setLocation] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    setLocation("/auth");
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location === item.path;
        
        return (
          <Link
            key={item.path}
            href={item.path}
            onClick={() => mobile && setMobileOpen(false)}
          >
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 ${
                isActive ? "bg-primary/10 text-primary hover:bg-primary/20" : ""
              }`}
              data-testid={`link-${item.label.toLowerCase()}`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Button>
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-foreground">AgroPocket</h1>
              <p className="text-xs text-muted-foreground">Agricultural Management</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={`gap-2 ${
                      isActive ? "bg-primary/10 text-primary hover:bg-primary/20" : ""
                    }`}
                    data-testid={`link-${item.label.toLowerCase()}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  data-testid="button-user-menu"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="hidden md:inline-block">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user?.name}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="gap-2 text-destructive focus:text-destructive"
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Trigger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex h-full flex-col gap-6 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Leaf className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-bold text-foreground">AgroPocket</h2>
                      <p className="text-xs text-muted-foreground">Agricultural Mgmt</p>
                    </div>
                  </div>
                  <nav className="flex flex-col gap-2">
                    <NavLinks mobile />
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
