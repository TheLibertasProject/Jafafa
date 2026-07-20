import Link from "next/link";

const ENTRIES: { date: string; title: string; body: string[] }[] = [
  {
    date: "March 2026",
    title: "The iris that waited",
    body: [
      "Three winters ago we said Glory was finished, and in a way it was: two thousand bottles, sold in twelve weeks, and then nothing, because there was no more iris ready to bottle. Iris rhizomes are dug, dried, and left. Not distilled early no matter how the calendar looks. Ours have been resting in a cellar above Florence since a harvest three years back, and this month they finally came down.",
      "We wrote to the growers in January to ask, again, if it was time. The answer, as it usually is, was ‘nearly.’ Then in February a short letter: the wax content was right, the smell had turned from green to something closer to violet and old paper, and they were sending a first small batch. It arrived on a Tuesday, in a wooden crate that still smelled faintly of the cellar.",
      "Glory returns this spring in the same edition of two thousand, no more. We are not making a bigger batch because the iris grew, or because demand grew. The rhizomes decide the number, not us. If you were waiting: thank you for waiting with us. We think it was worth it, though we are, admittedly, not impartial.",
    ],
  },
  {
    date: "November 2025",
    title: "On smoke",
    body: [
      "Midnight Sun and Oud Opulence both carry smoke: birch tar in one, aged oud in the other. Neither is loud about it. We have always thought smoke works best close to the skin, not thrown across a room, which is why both compositions are built to sit quietly rather than announce themselves from the doorway.",
      "Birch tar is a strange material to love. It is sharp, a little medicinal, closer to a campfire jacket than a flower. Mikael first used it in a batch that nearly went in the bin: too much of it, worn alone, reads as tar and nothing else. Cut back and paired with cold neroli, it becomes something else entirely, warmth with a shadow in it, which is what Midnight Sun was always meant to be.",
      "Oud behaves differently. Ours is aged ten winters before it reaches the bench, and by then the smoke in it has softened into something closer to leather and old wood than fire. We add saffron and rose to keep it from turning heavy.",
      "Worn close, both fade into the collar rather than the room. That is deliberate. Smoke that follows you home is more interesting than smoke that fills a hallway before you arrive.",
    ],
  },
  {
    date: "June 2025",
    title: "A garden you can wear",
    body: [
      "Fairy Garden began as an actual garden: Mikael's grandmother's, in a village outside Sortavala. Violet leaf grew wild along one fence; lily of the valley came up every May in a shaded corner nobody planted on purpose; a fig tree, entirely too far north to survive by rights, somehow did. He spent summers there as a boy and has never quite stopped describing it to Laure, who has never seen it and, by his account, never needs to.",
      "Composing it took longer than anything else we have made. There is no fig absolute worth using and no true lily of the valley absolute at all, so both had to be built from other materials, patiently, by nose, checked against memory rather than a formula. Early versions were too sweet, too much like a candle. It took eighteen months to find a version that smelled like standing in the garden rather than reading about it, moss included, the damp kind that never quite dries in a Karelian June.",
      "Fairy Garden is a series of one, which was Mikael's decision. He did not want a Nocturnes-style pair or a Solaires-style set; he wanted one composition that stood alone, the way the garden does in his memory. It is the only fragrance we make with no companion, and probably the one we are most protective of.",
    ],
  },
];

function Crumbs() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
      <div className="flex gap-[10px] items-center font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted py-7 pb-[14px]">
        <Link href="/" className="hover:text-ink transition-colors">Maison</Link>
        <span className="opacity-50">/</span>
        <span className="text-ink">Journal</span>
      </div>
    </div>
  );
}

export function Journal() {
  return (
    <main className="page-enter">
      <Crumbs />

      {/* Hero */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pt-[40px] pb-16">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">Kept slowly</div>
        <h1
          className="font-serif font-light leading-[0.94] mt-[14px] mb-6"
          style={{ fontSize: "clamp(56px, 8vw, 120px)" }}
        >
          A notebook,<br />
          <em className="italic">kept slowly.</em>
        </h1>
        <p className="font-serif font-light text-[22px] text-ink-2 leading-[1.4] max-w-[520px]">
          Notes from the bench, written when there is something worth saying.
        </p>
      </section>

      {/* Entries */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pb-24 border-t border-line">
        {ENTRIES.map((entry) => (
          <article key={entry.date} className="py-16 border-b border-line-soft max-[880px]:py-10">
            <div className="grid grid-cols-[220px_1fr] gap-10 max-[880px]:grid-cols-1 max-[880px]:gap-4">
              <div>
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted sticky top-[100px]">
                  {entry.date}
                </div>
              </div>
              <div className="max-w-[64ch]">
                <h2 className="font-serif italic font-light text-[32px] leading-[1.1] mb-6">
                  {entry.title}
                </h2>
                <div className="grid gap-[18px]">
                  {entry.body.map((p, i) => (
                    <p key={i} className="text-ink-2 text-[17px] leading-[1.75]">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
