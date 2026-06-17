"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Radio,
  RadioGroup,
  Surface,
  TextField,
} from "@heroui/react";

import { Link2, Loader2, Lock, Mail, User, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ DEFAULT ROLE = tenant
  const [role, setRole] = useState("tenant");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { name, email, image, password } = Object.fromEntries(
      formData.entries()
    );

    // ✅ FIXED ROLE LOGIC
    const selectedRole = role;

    try {
      await authClient.signUp.email({
        name,
        email,
        image,
        password,
        role: selectedRole,
        plan: "free",
      });

      router.push("/");
    } catch (err) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      setError(err?.message || "Google sign-up failed.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-16 bg-background select-none">
      <div className="w-full max-w-[460px] mx-auto transition-all duration-300">

        {/* Branding */}
        <div className="mb-8 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-[1.5px] bg-[hsl(var(--gold))]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--gold))] font-medium font-mono">
              Aether Estates
            </span>
          </div>
          <h1 className="text-[40px] leading-tight font-heading text-foreground tracking-tight">
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign up to get started exploring properties
          </p>
        </div>

        {/* Card */}
        <div className="flex items-center justify-center w-full rounded-[var(--radius)] bg-surface p-0.5 border border-border/80 shadow-sm">
          <Surface className="w-full bg-card p-8 rounded-[var(--radius)]">

            {error && (
              <div className="mb-6 p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20">
                {error}
              </div>
            )}

            <Form onSubmit={onSubmit}>
              <Fieldset className="w-full space-y-5">
                <Fieldset.Group className="space-y-4">

                  {/* Name */}
                  <TextField isRequired name="name">
                    <Label className="text-sm font-medium text-foreground mb-1.5 block">
                      Name
                    </Label>
                    <div className="relative flex items-center w-full">
                      <User className="absolute left-3.5 w-4 h-4 text-muted-foreground/70 z-10" />
                      <Input
                        placeholder="John Doe"
                        variant="secondary"
                        className="pl-10 h-12 w-full rounded-xl"
                      />
                    </div>
                    <FieldError className="text-xs text-destructive mt-1" />
                  </TextField>

                  {/* Email */}
                  <TextField isRequired name="email" type="email">
                    <Label className="text-sm font-medium text-foreground mb-1.5 block">
                      Email
                    </Label>
                    <div className="relative flex items-center w-full">
                      <Mail className="absolute left-3.5 w-4 h-4 text-muted-foreground/70 z-10" />
                      <Input
                        placeholder="you@example.com"
                        variant="secondary"
                        className="pl-10 h-12 w-full rounded-xl"
                      />
                    </div>
                    <FieldError className="text-xs text-destructive mt-1" />
                  </TextField>

                  {/* Image */}
                  <TextField name="image" type="url">
                    <Label className="text-sm font-medium text-foreground mb-1.5 block">
                      Photo URL
                    </Label>
                    <div className="relative flex items-center w-full">
                      <Link2 className="absolute left-3.5 w-4 h-4 text-muted-foreground/70 z-10" />
                      <Input
                        placeholder="https://imgbb.com/your-image-link"
                        variant="secondary"
                        className="pl-10 h-12 w-full rounded-xl"
                      />
                    </div>
                  </TextField>

                  {/* ROLE (FIXED) */}
                  <div className="flex flex-col gap-4">
                    <Label className="text-sm font-medium text-foreground">
                      Sign up as
                    </Label>

                    <RadioGroup
                      name="role"
                      value={role}
                      onValueChange={setRole}
                      defaultValue="tenant"
                      orientation="horizontal"
                      className="gap-6"
                    >
                      <Radio value="tenant">
                        <Radio.Control>
                          <Radio.Indicator className="data-[selected=true]:bg-[hsl(var(--gold))] data-[selected=true]:border-[hsl(var(--gold))]" />
                        </Radio.Control>
                        <Radio.Content>
                          <Label className="text-sm text-foreground cursor-pointer">
                            Tenant / Renter
                          </Label>
                        </Radio.Content>
                      </Radio>

                      <Radio value="owner">
                        <Radio.Control>
                          <Radio.Indicator className="data-[selected=true]:bg-[hsl(var(--gold))] data-[selected=true]:border-[hsl(var(--gold))]" />
                        </Radio.Control>
                        <Radio.Content>
                          <Label className="text-sm text-foreground cursor-pointer">
                            Property Owner / Host
                          </Label>
                        </Radio.Content>
                      </Radio>
                    </RadioGroup>
                  </div>

                  {/* Password */}
                  <TextField isRequired name="password" type="password">
                    <Label className="text-sm font-medium text-foreground mb-1.5 block">
                      Password
                    </Label>
                    <div className="relative flex items-center w-full">
                      <Lock className="absolute left-3.5 w-4 h-4 text-muted-foreground/70 z-10" />
                      <Input
                        placeholder="••••••••"
                        variant="secondary"
                        className="pl-10 h-12 w-full rounded-xl"
                      />
                    </div>
                    <FieldError className="text-xs text-destructive mt-1" />
                  </TextField>

                </Fieldset.Group>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full h-12 mt-2 bg-[hsl(var(--gold))] text-[hsl(var(--accent-foreground))] font-medium"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} />
                      Create account
                    </>
                  )}
                </Button>
              </Fieldset>
            </Form>

            {/* OR */}
            <div className="my-6 text-center text-xs text-muted-foreground">
              — OR —
            </div>

            {/* Google */}
            <Button
              className="w-full h-12 border border-border bg-transparent"
              onClick={handleGoogleSignUp}
              disabled={googleLoading}
            >
              {googleLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Continue with Google"
              )}
            </Button>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-[hsl(var(--gold))]">
                Log in
              </Link>
            </div>

          </Surface>
        </div>
      </div>
    </div>
  );
}