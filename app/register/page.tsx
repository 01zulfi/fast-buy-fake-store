"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import register from "./register";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      Register
    </Button>
  );
}

export default function Regsiter() {
  const [state, formAction] = useFormState(register, {
    error: false,
    message: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    if (state.message === "") return;

    if (!state.error) {
      toast({
        title: "Successfully registered.",
        description: "Redirecting to login page...",
      });
      redirect("/login");
    }
    if (state.error) {
      toast({
        title: state.message,
        description: "Please try again",
        variant: "destructive",
      });
      return;
    }
  }, [state.message, state.error]);

  return (
    <div className="w-full mt-4 sm:mt-4 flex flex-col gap-4 justify-center items-center">
      <h1 className="text-5xl text-primary font-semibold">Fast Buy</h1>
      <Card className="w-full max-w-lg">
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              Enter following details to register with us.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input name="username" id="username" placeholder="Max" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col gap-2 w-full">
              <SubmitButton />
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="login"
                  className="underline text-primary hover:no-underline"
                >
                  Login
                </Link>
              </div>{" "}
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}