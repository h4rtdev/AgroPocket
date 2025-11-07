import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, loginSchema } from "@shared/schema";
import type { InsertUser, LoginCredentials } from "@shared/schema";
import { registerUser, loginUser } from "@/lib/auth";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Leaf, Sprout } from "lucide-react";
import { z } from "zod";

const registerFormSchema = insertUserSchema.extend({
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const loginForm = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLogin = async (data: LoginCredentials) => {
    const result = await loginUser(data);
    
    if (result.success) {
      toast({
        title: "Welcome back!",
        description: `Logged in as ${result.user?.name}`,
      });
      setLocation("/dashboard");
    } else {
      toast({
        title: "Login failed",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const handleRegister = async (data: z.infer<typeof registerFormSchema>) => {
    const { confirmPassword, ...userData } = data;
    const result = await registerUser(userData);
    
    if (result.success) {
      toast({
        title: "Account created!",
        description: "Welcome to AgroPocket",
      });
      setLocation("/dashboard");
    } else {
      toast({
        title: "Registration failed",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-4 ring-primary/20">
            <Leaf className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">AgroPocket</h1>
          <p className="text-sm text-muted-foreground">
            Agricultural Data Management System
          </p>
        </div>

        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? "Sign in to manage your agricultural data"
                : "Start managing your crops, inputs, and harvests"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLogin ? (
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            data-testid="input-email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            data-testid="input-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    data-testid="button-login"
                  >
                    Sign In
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            data-testid="input-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            data-testid="input-email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Min. 6 characters"
                            data-testid="input-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Repeat your password"
                            data-testid="input-confirm-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    data-testid="button-register"
                  >
                    Create Account
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              variant="link"
              onClick={() => {
                setIsLogin(!isLogin);
                loginForm.reset();
                registerForm.reset();
              }}
              className="text-muted-foreground hover:text-primary"
              data-testid="button-toggle-auth-mode"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </Button>
          </CardFooter>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="rounded-lg bg-card/50 p-3">
            <Sprout className="mx-auto mb-2 h-5 w-5 text-primary" />
            <p className="text-xs text-muted-foreground">Crop Tracking</p>
          </div>
          <div className="rounded-lg bg-card/50 p-3">
            <div className="mx-auto mb-2 flex h-5 w-5 items-center justify-center rounded bg-secondary/20">
              <span className="text-xs font-bold text-secondary">$</span>
            </div>
            <p className="text-xs text-muted-foreground">Input Control</p>
          </div>
          <div className="rounded-lg bg-card/50 p-3">
            <div className="mx-auto mb-2 flex h-5 w-5 items-center justify-center rounded bg-primary/20">
              <span className="text-xs font-bold text-primary">📊</span>
            </div>
            <p className="text-xs text-muted-foreground">Analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
}
