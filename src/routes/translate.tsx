import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Hand,
  Mic,
  MicOff,
  Volume2,
  ArrowLeft,
  Languages,
  Sparkles,
  Trash2,
  Play,
} from "lucide-react";

export const Route = createFileRoute("/translate")({
  head: () => ({
    meta: [
      { title: "Live Translator — SignaBridgeAI" },
      {
        name: "description",
        content:
          "Two-way live translator: turn sign language into speech, and spoken words into sign language, in 8+ languages.",
      },
      { property: "og:title", content: "Live Translator — SignaBridgeAI" },
      {
        property: "og:description",
        content: "Sign to speech and speech to sign, in real time, in many languages.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Translate,
});

type Lang = { code: string; label: string; flag: string };

const LANGUAGES: Lang[] = [
  { code: "en-IN", label: "English", flag: "🇬🇧" },
  { code: "hi-IN", label: "हिन्दी", flag: "🇮🇳" },
  { code: "mr-IN", label: "मराठी", flag: "🇮🇳" },
  { code: "bn-IN", label: "বাংলা", flag: "🇧🇩" },
  { code: "ta-IN", label: "தமிழ்", flag: "🇮🇳" },
  { code: "te-IN", label: "తెలుగు", flag: "🇮🇳" },
  { code: "es-ES", label: "Español", flag: "🇪🇸" },
  { code: "fr-FR", label: "Français", flag: "🇫🇷" },
];

// Small phrase book: sign phrase -> spoken sentence per language
type Phrase = { id: string; emoji: string; label: string; say: Record<string, string> };

const PHRASES: Phrase[] = [
  {
    id: "hello",
    emoji: "👋",
    label: "Hello",
    say: { en: "Hello!", hi: "नमस्ते!", mr: "नमस्कार!", bn: "নমস্কার!", ta: "வணக்கம்!", te: "నమస్కారం!", es: "¡Hola!", fr: "Bonjour !" },
  },
  {
    id: "help",
    emoji: "🆘",
    label: "I need help",
    say: {
      en: "I need help, please.",
      hi: "मुझे मदद चाहिए, कृपया।",
      mr: "मला मदत हवी आहे.",
      bn: "আমার সাহায্য দরকার।",
      ta: "எனக்கு உதவி தேவை.",
      te: "నాకు సహాయం కావాలి.",
      es: "Necesito ayuda, por favor.",
      fr: "J'ai besoin d'aide, s'il vous plaît.",
    },
  },
  {
    id: "doctor",
    emoji: "🩺",
    label: "I need a doctor",
    say: {
      en: "I need to see a doctor.",
      hi: "मुझे डॉक्टर से मिलना है।",
      mr: "मला डॉक्टरांना भेटायचे आहे.",
      bn: "আমার ডাক্তার দরকার।",
      ta: "எனக்கு மருத்துவர் தேவை.",
      te: "నాకు వైద్యుడు కావాలి.",
      es: "Necesito ver a un médico.",
      fr: "J'ai besoin d'un médecin.",
    },
  },
  {
    id: "name",
    emoji: "🙋",
    label: "My name is…",
    say: {
      en: "My name is Dev.",
      hi: "मेरा नाम देव है।",
      mr: "माझे नाव देव आहे.",
      bn: "আমার নাম দেব।",
      ta: "என் பெயர் தேவ்.",
      te: "నా పేరు దేవ్.",
      es: "Me llamo Dev.",
      fr: "Je m'appelle Dev.",
    },
  },
  {
    id: "thanks",
    emoji: "🙏",
    label: "Thank you",
    say: { en: "Thank you so much.", hi: "बहुत धन्यवाद।", mr: "खूप धन्यवाद.", bn: "অনেক ধন্যবাদ।", ta: "மிக்க நன்றி.", te: "చాలా ధన్యవాదాలు.", es: "Muchas gracias.", fr: "Merci beaucoup." },
  },
  {
    id: "water",
    emoji: "💧",
    label: "Water, please",
    say: { en: "Water, please.", hi: "पानी चाहिए, कृपया।", mr: "पाणी हवे आहे.", bn: "একটু জল দিন।", ta: "தண்ணீர் வேண்டும்.", te: "నీళ్లు కావాలి.", es: "Agua, por favor.", fr: "De l'eau, s'il vous plaît." },
  },
  {
    id: "understand",
    emoji: "🤔",
    label: "I don't understand",
    say: {
      en: "Sorry, I don't understand.",
      hi: "माफ़ कीजिए, मुझे समझ नहीं आया।",
      mr: "माफ करा, मला समजले नाही.",
      bn: "দুঃখিত, আমি বুঝিনি।",
      ta: "மன்னிக்கவும், புரியவில்லை.",
      te: "క్షమించండి, అర్థం కాలేదు.",
      es: "Lo siento, no entiendo.",
      fr: "Désolé, je ne comprends pas.",
    },
  },
  {
    id: "love",
    emoji: "🤟",
    label: "I love you",
    say: { en: "I love you.", hi: "मैं तुमसे प्यार करता हूँ।", mr: "माझं तुझ्यावर प्रेम आहे.", bn: "আমি তোমাকে ভালোবাসি।", ta: "நான் உன்னை காதலிக்கிறேன்.", te: "నేను నిన్ను ప్రేమిస్తున్నాను.", es: "Te quiero.", fr: "Je t'aime." },
  },
];

// Word -> sign gesture used when speech is converted back into signs
const SIGN_MAP: Record<string, string> = {
  hello: "👋", hi: "👋", namaste: "🙏", नमस्ते: "🙏", hola: "👋", bonjour: "👋",
  yes: "👍", हाँ: "👍", ha: "👍", si: "👍", oui: "👍",
  no: "👎", नहीं: "👎", non: "👎",
  thanks: "🙏", thank: "🙏", धन्यवाद: "🙏", gracias: "🙏", merci: "🙏",
  please: "🤲", कृपया: "🤲",
  you: "👉", me: "👤", i: "👤", मैं: "👤", आप: "👉",
  help: "🆘", मदद: "🆘",
  water: "💧", पानी: "💧",
  doctor: "🩺", डॉक्टर: "🩺",
  food: "🍽️", eat: "🍽️", खाना: "🍽️",
  home: "🏠", घर: "🏠",
  good: "👌", अच्छा: "👌",
  love: "🤟", प्यार: "🤟",
  name: "🏷️", नाम: "🏷️",
  where: "🧭", कहाँ: "🧭",
  how: "❓", कैसे: "❓", what: "❓", क्या: "❓",
  today: "📅", आज: "📅",
  sorry: "😔", माफ़: "😔",
  stop: "✋", wait: "✋", रुको: "✋",
};

function signFor(word: string) {
  const w = word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
  return SIGN_MAP[w] ?? "🤲";
}

function baseLang(code: string) {
  return code.split("-")[0]!;
}

function Translate() {
  const [lang, setLang] = useState<string>("en-IN");
  const [mode, setMode] = useState<"sign2speech" | "speech2sign">("sign2speech");

  // sign -> speech
  const [composed, setComposed] = useState<Phrase[]>([]);
  const sentence = useMemo(
    () => composed.map((p) => p.say[baseLang(lang)] ?? p.say['en']!).join(" "),
    [composed, lang],
  );

  // speech -> sign
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState("");
  const [supported, setSupported] = useState(true);
  const [activeIdx, setActiveIdx] = useState(-1);
  const recogRef = useRef<any>(null);

  const tokens = useMemo(
    () => heard.split(/\s+/).filter(Boolean).slice(-14),
    [heard],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    setSupported(Boolean(SR));
  }, []);

  useEffect(() => {
    if (!tokens.length) return;
    setActiveIdx(0);
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      if (i >= tokens.length) {
        clearInterval(t);
        return;
      }
      setActiveIdx(i);
    }, 700);
    return () => clearInterval(t);
  }, [tokens.length, heard]);

  function speak(text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !text) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  }

  function toggleListen() {
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    if (!SR) return;
    if (listening) {
      recogRef.current?.stop();
      setListening(false);
      return;
    }
    const r = new SR();
    r.lang = lang;
    r.continuous = true;
    r.interimResults = true;
    r.onresult = (e: any) => {
      let text = "";
      for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript + " ";
      setHeard(text.trim());
    };
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    recogRef.current = r;
    r.start();
    setListening(true);
  }

  const demoLines: Record<string, string> = {
    en: "hello how are you today",
    hi: "नमस्ते आप कैसे हैं आज",
    es: "hola gracias",
    fr: "bonjour merci",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Hand className="h-4 w-4" />
            </span>
            <span className="font-display text-base font-bold">Live Translator</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
            <Languages className="h-4 w-4 text-primary" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-sm font-semibold outline-none"
              aria-label="Translation language"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Mode switch */}
        <div className="mx-auto flex max-w-xl rounded-full border border-border bg-card p-1 shadow-sm">
          {([
            { id: "sign2speech", label: "🤟 I sign → they hear" },
            { id: "speech2sign", label: "🎤 They speak → I see signs" },
          ] as const).map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                mode === m.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {mode === "sign2speech" ? (
          <section className="animate-pop-in mt-8">
            <h1 className="text-center font-display text-2xl font-extrabold md:text-3xl">
              Say it with your hands
            </h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Pick the signs you want. We turn them into a real sentence and speak it out loud
              in {LANGUAGES.find((l) => l.code === lang)?.label}.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PHRASES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setComposed((c) => [...c, p])}
                  className="group rounded-3xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/10"
                >
                  <span className="block text-4xl transition-transform group-hover:scale-110">{p.emoji}</span>
                  <span className="mt-3 block font-display text-sm font-bold">{p.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-[2rem] border border-border bg-card p-6 shadow-xl shadow-primary/10">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-primary" /> AI translation
                </span>
                <button
                  onClick={() => setComposed([])}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Clear
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {composed.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Tap a sign above to start a sentence…</p>
                ) : (
                  composed.map((p, i) => (
                    <span key={p.id + i} className="animate-pop-in rounded-full bg-secondary px-3 py-1.5 text-lg">
                      {p.emoji}
                    </span>
                  ))
                )}
              </div>

              <p className="mt-5 min-h-14 font-display text-xl font-bold leading-snug md:text-2xl">
                {sentence || "…"}
              </p>

              <button
                disabled={!sentence}
                onClick={() => speak(sentence)}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
              >
                <Volume2 className="h-4 w-4" /> Speak it out loud
              </button>
            </div>
          </section>
        ) : (
          <section className="animate-pop-in mt-8">
            <h1 className="text-center font-display text-2xl font-extrabold md:text-3xl">
              They talk, you read the signs
            </h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              The mic listens in {LANGUAGES.find((l) => l.code === lang)?.label} and the avatar
              plays each word back as a sign.
            </p>

            <div className="mt-7 flex flex-col items-center">
              <button
                onClick={toggleListen}
                disabled={!supported}
                className={`flex h-24 w-24 items-center justify-center rounded-full text-primary-foreground shadow-2xl transition-transform hover:scale-105 disabled:opacity-40 ${
                  listening ? "animate-float-chip bg-destructive" : "bg-gradient-to-br from-primary to-accent"
                }`}
                aria-label={listening ? "Stop listening" : "Start listening"}
              >
                {listening ? <MicOff className="h-9 w-9" /> : <Mic className="h-9 w-9" />}
              </button>
              <p className="mt-3 text-sm font-semibold text-muted-foreground">
                {!supported
                  ? "Mic isn't supported in this browser — use the demo button below."
                  : listening
                    ? "Listening… speak now"
                    : "Tap the mic and start speaking"}
              </p>
              <button
                onClick={() => setHeard(demoLines[baseLang(lang)] ?? demoLines['en']!)}
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold transition-colors hover:bg-secondary"
              >
                <Play className="h-3.5 w-3.5" /> Play a demo sentence
              </button>
            </div>

            <div className="mt-8 rounded-[2rem] border border-border bg-card p-6 shadow-xl shadow-primary/10">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Heard
              </span>
              <p className="mt-2 font-display text-lg font-bold">{heard || "…"}</p>

              <div className="mt-6 rounded-3xl bg-gradient-to-b from-secondary/70 to-background p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Avatar signing
                </span>
                <div className="mt-4 flex min-h-32 flex-wrap items-center justify-center gap-3">
                  {tokens.length === 0 ? (
                    <span className="text-6xl opacity-30">🤲</span>
                  ) : (
                    tokens.map((t, i) => (
                      <div
                        key={t + i}
                        className={`flex flex-col items-center rounded-2xl border px-4 py-3 transition-all ${
                          i === activeIdx
                            ? "scale-110 border-primary bg-card shadow-lg shadow-primary/25"
                            : "border-border/60 bg-card/60 opacity-70"
                        }`}
                      >
                        <span className={i === activeIdx ? "animate-wave-hand text-4xl" : "text-4xl"}>
                          {signFor(t)}
                        </span>
                        <span className="mt-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                          {t}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  setHeard("");
                  setActiveIdx(-1);
                }}
                className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary"
              >
                <Trash2 className="h-3.5 w-3.5" /> Clear
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
