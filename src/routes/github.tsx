import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/github")({
  head: () => ({
    meta: [
      { title: "GitHub Sync Status — SignaBridgeAI" },
      {
        name: "description",
        content: "Track SignaBridgeAI's GitHub sync: push/pull status, last commit time, and sync history.",
      },
    ],
  }),
  component: GithubSyncPage,
});

type SyncEvent = {
  id: number;
  type: "push" | "pull";
  status: "success" | "failed";
  branch: string;
  commit: string;
  message: string;
  at: string;
  author: string;
};

const DEMO_EVENTS: SyncEvent[] = [
  { id: 6, type: "push", status: "success", branch: "main", commit: "a3f9c21", message: "Add /translate two-way sign page with multi-language support", at: "2026-09-04T16:58:00Z", author: "Lovable" },
  { id: 5, type: "pull", status: "success", branch: "main", commit: "7b2e4d8", message: "Sync: sign-in page anime mascot polish", at: "2026-09-04T15:40:00Z", author: "Lovable" },
  { id: 4, type: "push", status: "success", branch: "main", commit: "9c1f0b3", message: "Landing page: ISL-first copy + floating sign chips", at: "2026-09-04T14:12:00Z", author: "Lovable" },
  { id: 3, type: "pull", status: "failed", branch: "main", commit: "—", message: "Merge conflict in src/styles.css (auto-retried)", at: "2026-09-03T19:05:00Z", author: "github.com" },
  { id: 2, type: "push", status: "success", branch: "main", commit: "e5d8a72", message: "Hero avatar + brand theme tokens", at: "2026-09-03T18:30:00Z", author: "Lovable" },
  { id: 1, type: "push", status: "success", branch: "main", commit: "0f4b9e1", message: "Initial commit — SignaBridgeAI starter", at: "2026-09-02T10:00:00Z", author: "Lovable" },
];

function timeAgo(iso: string, now: number) {
  const s = Math.max(0, Math.floor((now - new Date(iso).getTime()) / 1000));
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function GithubSyncPage() {
  const [now, setNow] = useState(() => Date.now());
  const [refreshing, setRefreshing] = useState(false);

  const lastPush = DEMO_EVENTS.find((e) => e.type === "push" && e.status === "success");
  const lastPull = DEMO_EVENTS.find((e) => e.type === "pull" && e.status === "success");
  const lastCommit = DEMO_EVENTS.find((e) => e.status === "success");

  const stats = useMemo(
    () => ({
      total: DEMO_EVENTS.length,
      success: DEMO_EVENTS.filter((e) => e.status === "success").length,
      failed: DEMO_EVENTS.filter((e) => e.status === "failed").length,
    }),
    []
  );

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setNow(Date.now());
      setRefreshing(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
          <span className="animate-wave-hand text-2xl">🤟</span> SignaBridgeAI
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link to="/translate" className="text-muted-foreground transition-colors hover:text-foreground">
            Translator
          </Link>
          <Link to="/github" className="text-foreground underline underline-offset-4">
            GitHub Sync
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20">
        <div className="animate-pop-in">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Repository health</p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            GitHub sync status
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Two-way sync between this Lovable project and your GitHub repository. Push, pull,
            and commit activity at a glance.
          </p>
        </div>

        {/* Status cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="animate-pop-in rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">Connection</p>
            <p className="mt-2 flex items-center gap-2 text-lg font-bold text-foreground">
              <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
              Connected
            </p>
            <p className="mt-1 text-xs text-muted-foreground">github.com / signabridge-ai</p>
          </div>

          <div className="animate-pop-in rounded-2xl border border-border bg-card p-5 shadow-sm [animation-delay:80ms]">
            <p className="text-sm text-muted-foreground">Last push</p>
            <p className="mt-2 text-lg font-bold text-emerald-600 dark:text-emerald-400">
              ✓ {lastPush ? timeAgo(lastPush.at, now) : "—"}
            </p>
            <p className="mt-1 truncate font-mono text-xs text-muted-foreground">
              {lastPush?.commit} · {lastPush?.message}
            </p>
          </div>

          <div className="animate-pop-in rounded-2xl border border-border bg-card p-5 shadow-sm [animation-delay:160ms]">
            <p className="text-sm text-muted-foreground">Last pull</p>
            <p className="mt-2 text-lg font-bold text-emerald-600 dark:text-emerald-400">
              ✓ {lastPull ? timeAgo(lastPull.at, now) : "—"}
            </p>
            <p className="mt-1 truncate font-mono text-xs text-muted-foreground">
              {lastPull?.commit} · {lastPull?.message}
            </p>
          </div>

          <div className="animate-pop-in rounded-2xl border border-border bg-card p-5 shadow-sm [animation-delay:240ms]">
            <p className="text-sm text-muted-foreground">Last commit</p>
            <p className="mt-2 font-mono text-lg font-bold text-foreground">{lastCommit?.commit}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {lastCommit ? `${timeAgo(lastCommit.at, now)} on ${lastCommit.branch}` : "—"}
            </p>
          </div>
        </div>

        {/* Summary + refresh */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-secondary/50 p-4">
          <p className="text-sm text-secondary-foreground">
            <strong className="font-semibold">{stats.success}/{stats.total}</strong> syncs successful
            {stats.failed > 0 && (
              <span className="ml-2 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                {stats.failed} failed
              </span>
            )}
          </p>
          <button
            onClick={refresh}
            disabled={refreshing}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            <span className={refreshing ? "inline-block animate-spin" : ""}>↻</span>
            {refreshing ? "Checking…" : "Refresh status"}
          </button>
        </div>

        {/* Sync history */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-foreground">Sync history</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <ul className="divide-y divide-border">
              {DEMO_EVENTS.map((e) => (
                <li key={e.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4 transition-colors hover:bg-muted/50">
                  <span
                    className={
                      e.status === "success"
                        ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                        : "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-destructive/15 text-destructive"
                    }
                  >
                    {e.status === "success" ? "✓" : "✗"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{e.message}</p>
                    <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                      {e.commit} · {e.branch} · {e.author}
                    </p>
                  </div>
                  <span
                    className={
                      e.type === "push"
                        ? "rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
                        : "rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent"
                    }
                  >
                    {e.type === "push" ? "↑ push" : "↓ pull"}
                  </span>
                  <span className="w-20 text-right text-xs text-muted-foreground">{timeAgo(e.at, now)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-10 rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-accent/10 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">Ready to connect your repo?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Use the Plus (+) menu in the Lovable chat → GitHub → Connect project, authorize, and
            create the repository. Every change here will then sync automatically both ways.
          </p>
          <Link
            to="/"
            className="mt-5 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
