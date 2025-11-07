import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Leaf,
  Shield,
  Smartphone,
  Database,
  Code,
  Layout,
  Palette,
  Download,
  Users,
  ChevronRight,
  Sprout,
  Package,
  TrendingUp,
  History,
  LayoutDashboard,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Documentation() {
  const sections = [
    { id: "overview", title: "Overview", icon: Leaf },
    { id: "features", title: "Features", icon: LayoutDashboard },
    { id: "tech-stack", title: "Technology Stack", icon: Code },
    { id: "structure", title: "Project Structure", icon: Layout },
    { id: "user-guide", title: "User Guide", icon: Users },
    { id: "design", title: "Design Principles", icon: Palette },
    { id: "installation", title: "Installation", icon: Download },
  ];

  const features = [
    {
      title: "Authentication System",
      icon: Shield,
      description: "Secure user registration and login with session persistence",
      details: ["Email and password authentication", "Session management with LocalStorage", "Protected routes", "Secure logout functionality"]
    },
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      description: "Comprehensive overview of all agricultural operations",
      details: ["Real-time statistics and metrics", "Recent activity feed", "Financial overview", "Quick access to all modules"]
    },
    {
      title: "Crops Management",
      icon: Sprout,
      description: "Track and manage all your agricultural crops",
      details: ["Add, edit, and delete crops", "Track planting dates and area", "Monitor crop status (planted, growing, harvested, failed)", "Add detailed notes for each crop"]
    },
    {
      title: "Inputs Control",
      icon: Package,
      description: "Manage fertilizers, pesticides, seeds, and equipment",
      details: ["Track input types and quantities", "Monitor costs and suppliers", "Manage purchase dates", "Calculate total investments"]
    },
    {
      title: "Harvest Registration",
      icon: TrendingUp,
      description: "Record and analyze harvest data",
      details: ["Link harvests to specific crops", "Track quantity and quality", "Monitor harvest dates", "Analyze productivity trends"]
    },
    {
      title: "Operation History",
      icon: History,
      description: "Complete timeline of all agricultural activities",
      details: ["Filter by type and action", "View detailed operation logs", "Track all system changes", "Audit trail for compliance"]
    },
  ];

  const techStack = [
    {
      category: "Frontend",
      technologies: [
        "React 18 - Modern UI library",
        "TypeScript - Type-safe development",
        "Vite - Fast build tool",
        "Wouter - Lightweight routing",
        "TanStack Query - Data fetching and caching"
      ]
    },
    {
      category: "UI/UX",
      technologies: [
        "Tailwind CSS - Utility-first styling",
        "shadcn/ui - Beautiful component library",
        "Radix UI - Accessible primitives",
        "Lucide React - Icon system",
        "React Hook Form - Form management",
        "Zod - Schema validation"
      ]
    },
    {
      category: "Data Management",
      technologies: [
        "LocalStorage - Client-side persistence",
        "Zod - Runtime validation",
        "TypeScript - Type safety"
      ]
    }
  ];

  return (
    <div className="space-y-8" data-testid="page-documentation">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-4 ring-primary/20">
          <BookOpen className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-foreground">Documentation</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Complete guide to AgroPocket Agricultural Management System
          </p>
        </div>
      </div>

      {/* Quick Navigation */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChevronRight className="h-5 w-5 text-primary" />
            Quick Navigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/50 p-3 hover-elevate transition-colors"
                  data-testid={`nav-${section.id}`}
                >
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{section.title}</span>
                </a>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Overview Section */}
      <section id="overview">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Leaf className="h-6 w-6 text-primary" />
              System Overview
            </CardTitle>
            <CardDescription>About AgroPocket</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground leading-relaxed">
              AgroPocket is a comprehensive web-based agricultural data management system designed to help farmers and agricultural professionals efficiently manage their operations. The platform provides full control over crops, inputs, harvests, and maintains a complete history of all agricultural activities.
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <Shield className="mb-2 h-8 w-8 text-primary" />
                <h4 className="font-semibold text-foreground">Secure</h4>
                <p className="text-sm text-muted-foreground">User authentication and data protection</p>
              </div>
              <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-4">
                <Smartphone className="mb-2 h-8 w-8 text-secondary" />
                <h4 className="font-semibold text-foreground">Responsive</h4>
                <p className="text-sm text-muted-foreground">Works on mobile, tablet, and desktop</p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <Database className="mb-2 h-8 w-8 text-primary" />
                <h4 className="font-semibold text-foreground">Persistent</h4>
                <p className="text-sm text-muted-foreground">LocalStorage data persistence</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section id="features">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <LayoutDashboard className="h-6 w-6 text-primary" />
              Key Features & Modules
            </CardTitle>
            <CardDescription>Comprehensive agricultural management tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index}>
                    {index > 0 && <Separator className="my-6" />}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-foreground">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                      <ul className="ml-13 space-y-1">
                        {feature.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Technology Stack */}
      <section id="tech-stack">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Code className="h-6 w-6 text-primary" />
              Technology Stack
            </CardTitle>
            <CardDescription>Modern technologies powering AgroPocket</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {techStack.map((stack, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary/20 text-primary border-primary/30" variant="outline">
                      {stack.category}
                    </Badge>
                  </div>
                  <ul className="grid gap-2 md:grid-cols-2">
                    {stack.technologies.map((tech, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                        <span className="text-foreground">{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Project Structure */}
      <section id="structure">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Layout className="h-6 w-6 text-primary" />
              Project Structure
            </CardTitle>
            <CardDescription>Understanding the codebase organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="rounded-lg bg-muted/30 p-4 font-mono text-sm">
                <div className="space-y-1 text-foreground">
                  <div>agropocket/</div>
                  <div className="ml-4">├── client/</div>
                  <div className="ml-8">├── src/</div>
                  <div className="ml-12">├── components/ <span className="text-muted-foreground"># UI components</span></div>
                  <div className="ml-12">├── lib/ <span className="text-muted-foreground"># Utilities and helpers</span></div>
                  <div className="ml-12">├── pages/ <span className="text-muted-foreground"># Application pages</span></div>
                  <div className="ml-12">├── App.tsx <span className="text-muted-foreground"># Main app component</span></div>
                  <div className="ml-12">└── index.css <span className="text-muted-foreground"># Global styles</span></div>
                  <div className="ml-4">├── server/ <span className="text-muted-foreground"># Backend code</span></div>
                  <div className="ml-4">├── shared/ <span className="text-muted-foreground"># Shared schemas</span></div>
                  <div className="ml-4">└── package.json <span className="text-muted-foreground"># Dependencies</span></div>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-border/50 p-3">
                  <h5 className="mb-1 font-semibold text-foreground">client/src/components/</h5>
                  <p className="text-sm text-muted-foreground">Reusable UI components including shadcn/ui components, Layout, and ProtectedRoute</p>
                </div>
                <div className="rounded-lg border border-border/50 p-3">
                  <h5 className="mb-1 font-semibold text-foreground">client/src/lib/</h5>
                  <p className="text-sm text-muted-foreground">Authentication utilities, storage management, and helper functions</p>
                </div>
                <div className="rounded-lg border border-border/50 p-3">
                  <h5 className="mb-1 font-semibold text-foreground">client/src/pages/</h5>
                  <p className="text-sm text-muted-foreground">Main application pages: Auth, Dashboard, Crops, Inputs, Harvests, History, Documentation</p>
                </div>
                <div className="rounded-lg border border-border/50 p-3">
                  <h5 className="mb-1 font-semibold text-foreground">shared/schema.ts</h5>
                  <p className="text-sm text-muted-foreground">TypeScript types and Zod validation schemas shared between client and server</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* User Guide */}
      <section id="user-guide">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Users className="h-6 w-6 text-primary" />
              User Guide
            </CardTitle>
            <CardDescription>Step-by-step instructions for using AgroPocket</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">1</span>
                  Getting Started
                </h4>
                <ul className="ml-8 space-y-2">
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Access the AgroPocket application
                  </li>
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Click "Don't have an account? Sign Up" to register
                  </li>
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Enter your full name, email, and password (minimum 6 characters)
                  </li>
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Confirm your password and click "Create Account"
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">2</span>
                  Managing Crops
                </h4>
                <ul className="ml-8 space-y-2">
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Navigate to "Crops" from the top menu or sidebar
                  </li>
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Click "Add Crop" button
                  </li>
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Fill in crop details: name, area, planting date, status, and optional notes
                  </li>
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Edit or delete crops using the action buttons on each card
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/20 text-xs font-bold text-secondary">3</span>
                  Tracking Inputs
                </h4>
                <ul className="ml-8 space-y-2">
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    Go to "Inputs" section
                  </li>
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    Click "Add Input" to record fertilizers, pesticides, seeds, or equipment
                  </li>
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    Enter input name, type, quantity, unit, cost, and purchase date
                  </li>
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    View total investment summary at the top
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">4</span>
                  Recording Harvests
                </h4>
                <ul className="ml-8 space-y-2">
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Navigate to "Harvests" page
                  </li>
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Click "Record Harvest" button
                  </li>
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Select a crop from your existing crops list
                  </li>
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Enter quantity, unit, harvest date, quality rating, and notes
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/20 text-xs font-bold text-secondary">5</span>
                  Viewing History
                </h4>
                <ul className="ml-8 space-y-2">
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    Access the "History" page to view all operations
                  </li>
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    Filter by type (crops, inputs, harvests) or action (created, updated, deleted)
                  </li>
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    Review timeline of all agricultural activities with timestamps
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Design Principles */}
      <section id="design">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Palette className="h-6 w-6 text-primary" />
              Design Principles
            </CardTitle>
            <CardDescription>Visual design philosophy and implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border border-border/50 bg-gradient-to-br from-background to-primary/5 p-4">
                <h4 className="mb-2 font-semibold text-foreground">Dark Theme</h4>
                <p className="text-sm text-muted-foreground">
                  Professional black and dark gray backgrounds throughout the application, providing a modern and elegant aesthetic that reduces eye strain during extended use.
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <h5 className="mb-1 flex items-center gap-2 font-semibold text-primary">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                    Green Accents
                  </h5>
                  <p className="text-sm text-muted-foreground">#22c55e - Primary actions, success states, crop-related features</p>
                </div>
                <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-3">
                  <h5 className="mb-1 flex items-center gap-2 font-semibold text-secondary">
                    <div className="h-3 w-3 rounded-full bg-secondary"></div>
                    Yellow Accents
                  </h5>
                  <p className="text-sm text-muted-foreground">#fbbf24 - Secondary actions, warnings, financial data</p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Key Design Features:</h4>
                <ul className="space-y-1">
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Smooth transitions and hover effects on interactive elements
                  </li>
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Rounded corners and soft shadows for modern aesthetics
                  </li>
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Consistent spacing and typography hierarchy
                  </li>
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Responsive design: mobile sidebar, tablet grid, desktop multi-column
                  </li>
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    High contrast white/light gray text for excellent readability
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Installation */}
      <section id="installation">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Download className="h-6 w-6 text-primary" />
              Installation & Setup
            </CardTitle>
            <CardDescription>Running AgroPocket locally</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Prerequisites:</h4>
                <ul className="ml-4 space-y-1">
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Node.js 18+ installed on your system
                  </li>
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    npm or yarn package manager
                  </li>
                  <li className="flex gap-2 text-sm text-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Modern web browser (Chrome, Firefox, Safari, Edge)
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Installation Steps:</h4>
                <div className="space-y-2">
                  <div className="rounded-lg bg-muted/30 p-3 font-mono text-sm">
                    <div className="text-muted-foreground"># Clone the repository</div>
                    <div className="text-foreground">git clone [repository-url]</div>
                  </div>
                  <div className="rounded-lg bg-muted/30 p-3 font-mono text-sm">
                    <div className="text-muted-foreground"># Navigate to project directory</div>
                    <div className="text-foreground">cd agropocket</div>
                  </div>
                  <div className="rounded-lg bg-muted/30 p-3 font-mono text-sm">
                    <div className="text-muted-foreground"># Install dependencies</div>
                    <div className="text-foreground">npm install</div>
                  </div>
                  <div className="rounded-lg bg-muted/30 p-3 font-mono text-sm">
                    <div className="text-muted-foreground"># Start development server</div>
                    <div className="text-foreground">npm run dev</div>
                  </div>
                  <div className="rounded-lg bg-muted/30 p-3 font-mono text-sm">
                    <div className="text-muted-foreground"># Open in browser</div>
                    <div className="text-foreground">http://localhost:5000</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Credits */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-background">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-primary/20">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">AgroPocket</h3>
            <p className="text-sm text-muted-foreground">
              Agricultural Data Management System
            </p>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                Version 1.0.0
              </Badge>
              <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
                2025
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground pt-4">
              Built with React, TypeScript, Tailwind CSS, and shadcn/ui
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
