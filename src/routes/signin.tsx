import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Hand, Mail, Lock, ArrowLeft } from "lucide-react";
import { useState } from "react";
import animeMascot from "@/assets/anime-mascot.png";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in — SignaBridgeAI" },
      { name: "description", content: "Sign in to SignaBridgeAI and start translating sign language in real time." },
      { property: "og:title", content: "Sign in — SignaBridgeAI" },
      { property: "og:description", content: "Sign in to SignaBridgeAI and start translating sign language in real time." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Left: mascot panel */}
      <div className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent lg:flex">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
        <div className="relative z-10 flex flex-col items-center px-10 text-center">
          <img
            src={animeMascot}
            alt="Cute anime mascot waving hello"
            width={1024}
            height={1024}
            className="animate-float-slow w-72 drop-shadow-2xl xl:w-96"
          />
          <h2 className="mt-6 font-display text-3xl font-extrabold text-primary-foreground">
            Hii! Welcome back 👋
          </h2>
          <p className="mt-3 max-w-sm text-primary-foreground/85">
            Your hands have a voice here. Sign in and let's keep the conversation going — in every language of the hands.
          </p>
          <div className="animate-float-chip mt-6 rounded-2xl bg-white/15 px-5 py-2.5 text-sm font-semibold text-primary-foreground backdrop-blur">
            🤟 Real-time sign translation
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex w-full items-center justify-center px-4 py-12 lg:w-1/2">
        <div className="animate-pop-in w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <div className="mt-6 flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Hand className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight">SignaBridgeAI</span>
          </div>

          <h1 className="mt-8 font-display text-3xl font-extrabold tracking-tight">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Welcome back — the bridge missed you.
          </p>

          <img
            src={animeMascot}
            alt="Cute anime mascot waving hello"
            width={1024}
            height={1024}
            className="animate-float-slow mx-auto mt-6 w-40 lg:hidden"
          />

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/" });
            }}
          >
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">Email</span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-input bg-card py-3 pl-10 pr-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">Password</span>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-input bg-card py-3 pl-10 pr-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
              </div>
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="h-4 w-4 rounded border-input accent-[oklch(0.52_0.24_290)]" />
                Remember me
              </label>
              <button type="button" className="font-semibold text-primary hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02] active:scale-[0.99]"
            >
              Sign in 🤟
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here?{" "}
            <button className="font-semibold text-primary hover:underline">
              Create a free account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
