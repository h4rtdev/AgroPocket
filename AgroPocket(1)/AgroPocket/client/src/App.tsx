import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Crops from "@/pages/Crops";
import Inputs from "@/pages/Inputs";
import Harvests from "@/pages/Harvests";
import History from "@/pages/History";
import Documentation from "@/pages/Documentation";
import NotFound from "@/pages/not-found";
import { isAuthenticated } from "@/lib/auth";

function Router() {
  return (
    <Switch>
      {/* Redirect root to dashboard if authenticated, otherwise to auth */}
      <Route path="/">
        {() => isAuthenticated() ? <Redirect to="/dashboard" /> : <Redirect to="/auth" />}
      </Route>

      {/* Public route */}
      <Route path="/auth" component={Auth} />

      {/* Protected routes */}
      <Route path="/dashboard">
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      </Route>

      <Route path="/crops">
        <ProtectedRoute>
          <Layout>
            <Crops />
          </Layout>
        </ProtectedRoute>
      </Route>

      <Route path="/inputs">
        <ProtectedRoute>
          <Layout>
            <Inputs />
          </Layout>
        </ProtectedRoute>
      </Route>

      <Route path="/harvests">
        <ProtectedRoute>
          <Layout>
            <Harvests />
          </Layout>
        </ProtectedRoute>
      </Route>

      <Route path="/history">
        <ProtectedRoute>
          <Layout>
            <History />
          </Layout>
        </ProtectedRoute>
      </Route>

      <Route path="/documentation">
        <ProtectedRoute>
          <Layout>
            <Documentation />
          </Layout>
        </ProtectedRoute>
      </Route>

      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
