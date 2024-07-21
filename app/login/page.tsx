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
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import login from "./login";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      Login
    </Button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useFormState(login, {
    message: "",
    error: false,
  });

  return (
    <div className="w-full mt-10 sm:mt-20 flex flex-col gap-4 justify-center items-center">
      <h1 className="text-5xl text-primary font-semibold">Fast Buy</h1>
      <Card className="w-full max-w-sm">
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input name="password" id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col gap-2 w-full">
              <p>{state?.message}</p>
              <SubmitButton />
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="register"
                  className="underline text-primary hover:no-underline"
                >
                  Register
                </Link>
              </div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}