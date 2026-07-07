import { Suspense } from "react";
import LoginPage from "./LoginPageClient";

export default function LoginRoute() {
  return (
    <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center text-ink-muted-80">Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
}
