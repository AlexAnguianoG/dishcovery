"use client";

import Link from "next/link";
import { useActionState } from "react";

import { actions } from "@/actions";
import { FormError } from "@/components/form-error";
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
import { type FormState } from "@/validations/auth";

const INITIAL_STATE: FormState = {
  success: false,
  message: undefined,
  strapiErrors: null,
  zodErrors: null,
  data: {
    email: "",
    identifier: "",
    password: "",
  },
};

export default function StampInForm() {
  const [formState, formAction] = useActionState(
    actions.auth.loginUserAction,
    INITIAL_STATE
  );

  return (
    <div className="w-[360px] mx-auto">
      <form action={formAction}>
        <Card>
          <CardHeader>
            <CardTitle>Stamp In</CardTitle>
            <CardDescription>Enter your details to login</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4.5">
            <div className="grid gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                required
                autoComplete="email"
                defaultValue={formState.data?.identifier || ""}
                id="email"
                name="email"
                placeholder="you@example.com"
                type="email"
              />
              <FormError error={formState.zodErrors?.password} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                required
                autoComplete="current-password"
                defaultValue={formState.data?.password || ""}
                id="password"
                name="password"
                placeholder="•••••••••"
                type="password"
              />
              <FormError error={formState.zodErrors?.password} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit">
              Stamp In
            </Button>
            {formState.strapiErrors && (
              <FormError error={[formState.strapiErrors.message]} size="xs" />
            )}
            <div className="justify-between">
              <span className="text-sm text-muted-foreground">
                Don&apos;t have an account?
              </span>
              <Link href="/stamp-up">
                <Button size="sm" variant="link">
                  Stamp Up
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
