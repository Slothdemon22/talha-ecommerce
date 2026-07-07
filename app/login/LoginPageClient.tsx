"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { loginAction, signUpAction } from "@/app/actions/auth";
import { getSafeRedirectPath } from "@/lib/redirect";

export default function LoginPageClient() {
  const searchParams = useSearchParams();
  const redirectTo = getSafeRedirectPath(searchParams.get("redirect"));

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("redirect", redirectTo);
    if (isSignUp) {
      formData.append("name", fullName);
    }

    try {
      const res = isSignUp
        ? await signUpAction(null, formData)
        : await loginAction(null, formData);

      if (res?.error) {
        setError(res.error);
        setLoading(false);
      }
    } catch (err) {
      if (isRedirectError(err)) return;
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-center bg-canvas-parchment py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-[420px]">
        <div className="rounded-2xl border border-hairline bg-canvas p-8 shadow-[0_8px_40px_rgba(61,26,102,0.08)]">
          <div className="text-center">
            <h1 className="font-display text-[28px] font-semibold tracking-tight text-ink">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mt-2 text-[14px] text-ink-muted-80">
              {isSignUp
                ? "Sign up to track orders and manage your WebAiry VPS."
                : "Log in to view orders and continue checkout."}
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-[13px] font-medium text-red-800">{error}</p>
              </div>
            )}

            {isSignUp && (
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-[12px] font-medium text-ink-muted-80">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="block w-full rounded-lg border border-hairline bg-canvas px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-[12px] font-medium text-ink-muted-80">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border border-hairline bg-canvas px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-[12px] font-medium text-ink-muted-80">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                required
                minLength={isSignUp ? 8 : undefined}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-hairline bg-canvas px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="••••••••"
              />
              {isSignUp && (
                <p className="text-[11px] text-ink-muted-48">Minimum 8 characters</p>
              )}
            </div>

            <Button type="submit" disabled={loading} className="mt-2 w-full justify-center">
              {loading ? "Please wait..." : isSignUp ? "Create Account" : "Log In"}
            </Button>
          </form>

          <div className="mt-6 border-t border-divider-soft pt-5 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
              className="cursor-pointer border-none bg-transparent text-[14px] text-primary transition-colors hover:text-primary-focus"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Create one"}
            </button>
          </div>

          <p className="mt-4 text-center text-[12px] text-ink-muted-48">
            <Link href="/" className="text-primary hover:text-primary-focus">
              ← Back to store
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
