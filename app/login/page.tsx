"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { loginAction, signUpAction } from "@/app/actions/auth";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    if (isSignUp) {
      formData.append("name", fullName);
    }

    try {
      const res = isSignUp 
        ? await signUpAction(null, formData)
        : await loginAction(null, formData);

      if (res && res.error) {
        setError(res.error);
        setLoading(false);
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center py-12 px-6 lg:px-8 bg-canvas">
      <div className="sm:mx-auto sm:w-full sm:max-w-[400px]">
        <div className="text-center">
          <h2 className="font-display text-[32px] font-semibold tracking-tight text-ink">
            {isSignUp ? "Create your Aura ID" : "Sign in with Aura ID"}
          </h2>
          <p className="mt-3 text-[14px] text-ink-muted-80 text-pretty">
            {isSignUp
              ? "You only need one Aura ID to access all Aura services."
              : "Use your Aura ID to access your orders, account, and more."}
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[400px]">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <p className="text-[14px] font-medium text-red-800 text-pretty">{error}</p>
              </div>
            )}

            {isSignUp && (
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="block text-[12px] font-medium text-ink-muted-80"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="block w-full rounded-md border border-hairline bg-canvas px-4 py-3 text-[15px] text-ink placeholder-ink-muted-48 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-[12px] font-medium text-ink-muted-80"
              >
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
                className="block w-full rounded-md border border-hairline bg-canvas px-4 py-3 text-[15px] text-ink placeholder-ink-muted-48 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-[12px] font-medium text-ink-muted-80"
                >
                  Password
                </label>
                {!isSignUp && (
                  <Link
                    href="#"
                    className="text-[12px] text-primary hover:text-primary-focus transition-colors"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border border-hairline bg-canvas px-4 py-3 text-[15px] text-ink placeholder-ink-muted-48 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full justify-center active:scale-[0.96] transition-transform duration-200"
              >
                {loading
                  ? "Signing in..."
                  : isSignUp
                  ? "Create Aura ID"
                  : "Sign In"}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-divider-soft" />
              </div>
              <div className="relative flex justify-center text-[12px]">
                <span className="bg-canvas px-2 text-ink-muted-48">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-ink px-4 py-3 text-[14px] font-medium text-on-dark hover:bg-ink-muted-80 active:scale-[0.96] transition-all duration-200"
              >
                <svg width="13" height="16" viewBox="0 0 13 16" fill="currentColor">
                  <path d="M11.6 8.4c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.5-.1-2.9.9-3.7.9-.7 0-1.9-.8-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.5.8 1.2 1.7 2.5 3 2.4 1.2-.1 1.7-.8 3.1-.8 1.4 0 1.8.8 3.1.8 1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-0.1-.1-2.4-1-2.4-4.5zM9.5 2.6c.7-.8 1.1-2 1-3.2-1 .1-2.2.7-2.9 1.5-.6.7-1.1 1.9-1 3.1 1.1.1 2.2-.6 2.9-1.4z" />
                </svg>
                <span>Apple</span>
              </button>
            </div>
          </div>

          <div className="mt-8 text-center border-t border-divider-soft pt-6">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
              className="text-[14px] text-primary hover:text-primary-focus transition-colors cursor-pointer"
            >
              {isSignUp
                ? "Already have an Aura ID? Sign in"
                : "Don't have an Aura ID? Create one now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
