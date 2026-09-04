import { createFileRoute, Link } from "@tanstack/react-router";
import { Hand, Mic, MessageSquareText, Sparkles, ArrowRight, Camera, Volume2, Globe } from "lucide-react";
import { useState } from "react";
import heroAvatar from "@/assets/hero-avatar.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SignaBridgeAI — Sign Language, Understood" },
      {
        name: "description",
        content:
          "SignaBridgeAI translates sign language into speech and text in real time with a friendly AI avatar. Breaking the silence between deaf and hearing worlds.",
      },
      { property: "og:title", content: "SignaBridgeAI — Sign Language, Understood" },
      {
        property: "og:description",
        content: "Real-time sign language translation with a friendly AI avatar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const signs = [
  { word: "Hello", emoji: "👋" },
  { word: "Thank you", emoji: "🙏" },
  { word: "I love you", emoji: "🤟" },
  { word: "Yes", emoji: "👍" },
  { word: "Peace", emoji: "✌️" },
  { word: "Friend", emoji: "🤝" },
];

function Index() {
  const [activeSign, setActiveSign] = useState(signs[2]!);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Hand className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">SignaBridgeAI</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#try" className="transition-colors hover:text-foreground">Try signs</a>
          </nav>
          <Link
            to="/signin"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="animate-pop-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold text-secondary-foreground">
            <Sparkles className="h-3.5 w-3.5" /> AI-powered sign language bridge
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Your hands speak.
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              We make the world listen.
            </span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            SignaBridgeAI turns Indian Sign Language into spoken words in real time — and
            turns whatever the hearing person says back into signs on screen. Two-way,
            instant, and it works in 8+ languages.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/translate"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:scale-105"
            >
              Start translating <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/signin"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              <Hand className="h-4 w-4" /> Sign in
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-muted-foreground">
            {["English", "हिन्दी", "मराठी", "বাংলা", "தமிழ்", "Español", "Français"].map((l) => (
              <span key={l} className="rounded-full border border-border bg-card px-3 py-1">
                {l}
              </span>
            ))}
          </div>

        </div>

        <div className="relative animate-pop-in [animation-delay:150ms]">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-primary/25 to-accent/25 blur-2xl" />
          <img
            src={heroAvatar}
            alt="Friendly 3D avatar making the I-love-you hand sign"
            width={1024}
            height={1024}
            className="animate-float-slow w-full rounded-[2rem] border border-border shadow-2xl shadow-primary/20"
          />
          <div className="animate-float-chip absolute -left-4 top-8 rounded-2xl border border-border bg-card px-4 py-2 text-sm font-semibold shadow-lg">
            🤟 “I love you”
          </div>
          <div className="animate-float-chip absolute -right-3 bottom-10 rounded-2xl border border-border bg-card px-4 py-2 text-sm font-semibold shadow-lg [animation-delay:1.2s]">
            🔊 Translating…
          </div>
        </div>
      </section>

      {/* What is it */}
      <section id="features" className="border-y border-border/60 bg-secondary/50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-3xl font-bold tracking-tight md:text-4xl">
            What is SignaBridgeAI?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            A real-time translator for sign language — built so conversations never
            stop at silence.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Camera, title: "Sees your signs", desc: "Your camera reads hand shapes and movement, live." },
              { icon: Volume2, title: "Speaks them aloud", desc: "Signs become clear speech and on-screen text instantly." },
              { icon: Mic, title: "Listens back", desc: "Spoken words turn into avatar signs for deaf users." },
              { icon: Globe, title: "For everyone", desc: "Schools, hospitals, shops — anywhere people meet." },
            ].map((f) => (
              <div
                key={f.title}
                className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h2 className="text-center font-display text-3xl font-bold tracking-tight md:text-4xl">
          How it works
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { step: "1", title: "Open your camera", desc: "No gloves, no hardware — just your webcam or phone." },
            { step: "2", title: "Sign naturally", desc: "Our AI avatar follows your hands and expressions." },
            { step: "3", title: "Everyone understands", desc: "Speech and text appear in real time, both ways." },
          ].map((s) => (
            <div key={s.step} className="relative rounded-3xl border border-border bg-card p-7 text-center shadow-sm">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-display text-xl font-extrabold text-primary-foreground">
                {s.step}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive sign try */}
      <section id="try" className="border-t border-border/60 bg-gradient-to-b from-secondary/60 to-background py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Tap a word, see the sign <span className="animate-wave-hand">👋</span>
          </h2>
          <p className="mt-3 text-muted-foreground">A tiny taste of the bridge — pick a word below.</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {signs.map((s) => (
              <button
                key={s.word}
                onClick={() => setActiveSign(s)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                  activeSign.word === s.word
                    ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                    : "border-border bg-card hover:bg-secondary"
                }`}
              >
                {s.word}
              </button>
            ))}
          </div>

          <div
            key={activeSign.word}
            className="animate-pop-in mx-auto mt-10 flex max-w-sm flex-col items-center rounded-[2rem] border border-border bg-card p-10 shadow-xl shadow-primary/10"
          >
            <span className="animate-float-chip text-8xl">{activeSign.emoji}</span>
            <p className="mt-6 font-display text-2xl font-bold">“{activeSign.word}”</p>
            <p className="mt-1 text-sm text-muted-foreground">
              <MessageSquareText className="mr-1 inline h-4 w-4" />
              Signed, spoken, understood.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-[2.5rem] bg-gradient-to-r from-primary to-accent px-8 py-14 text-center text-primary-foreground shadow-2xl shadow-primary/30">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">Ready to be understood?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
            Join SignaBridgeAI and start your first conversation in sign language today.
          </p>
          <Link
            to="/translate"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-8 py-3.5 text-sm font-bold text-foreground shadow-lg transition-transform hover:scale-105"
          >
            Open the live translator <ArrowRight className="h-4 w-4" />
          </Link>

        </div>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        SignaBridgeAI — breaking the silence, one sign at a time. 🤟
      </footer>
    </div>
  );
}
