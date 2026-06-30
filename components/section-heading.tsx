type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-300">{description}</p>
    </div>
  );
}
