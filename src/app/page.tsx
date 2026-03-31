import Link from "next/link";

const ideas = [
  {
    href: "/calculator",
    title: "PolicyEngine Calculator",
    desc: "Microsimulation. In your pocket. From $1,299.",
    ready: true,
  },
  {
    href: "/vibes",
    title: "Pundit Mode",
    desc: "All the confidence, none of the math. Why simulate when you can speculate?",
    ready: false,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-3xl font-bold">PolicyEngine April Fools 2026</h1>
        <p className="text-muted-foreground mt-2">
          Definitely real announcements.
        </p>

        <div className="grid gap-6 mt-12">
          {ideas.map((idea) =>
            idea.ready ? (
              <Link
                key={idea.href}
                href={idea.href}
                className="block p-8 rounded-lg bg-black text-white hover:opacity-90 transition group"
              >
                <h2 className="text-2xl font-bold group-hover:text-teal-400 transition-colors">
                  {idea.title}
                </h2>
                <p className="text-white/60 mt-2">{idea.desc}</p>
                <span className="text-teal-500 text-sm mt-4 inline-block">
                  View &rarr;
                </span>
              </Link>
            ) : (
              <div
                key={idea.href}
                className="p-8 rounded-lg border border-border opacity-60"
              >
                <h2 className="text-2xl font-bold">{idea.title}</h2>
                <p className="text-muted-foreground mt-2">{idea.desc}</p>
                <span className="text-muted-foreground text-sm mt-4 inline-block">
                  Coming soon
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
