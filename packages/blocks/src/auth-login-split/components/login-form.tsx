"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function LoginFormSplit() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 lg:p-10">
        <Card className="w-full max-w-md border-0 shadow-none lg:border lg:shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button className="w-full">Login</Button>
            <div className="text-center text-sm">
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <Separator />
            <div className="flex justify-center gap-3">
              <Button variant="outline" size="icon" aria-label="Sign in with Google">
                G
              </Button>
              <Button variant="outline" size="icon" aria-label="Sign in with Apple">
                A
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <a href="#" className="text-primary hover:underline">
                Sign up
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="hidden items-center justify-center bg-muted/30 p-10 lg:flex">
        <div className="max-w-md space-y-4 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
            L
          </div>
          <h2 className="text-3xl font-bold tracking-tight">LootVM UI</h2>
          <p className="text-muted-foreground">
            Build beautiful applications with our premium design system. Fast, accessible, and
            fully customizable.
          </p>
        </div>
      </div>
    </div>
  );
}
