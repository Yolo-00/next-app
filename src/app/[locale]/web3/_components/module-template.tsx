import { ReactNode } from "react";

type ModuleTemplateProps = {
  sectionTitles: {
    demo: string;
    explanation: string;
    pseudocode: string;
  };
  title: string;
  summary: string;
  explanation: string[];
  pseudocode: string[];
  demo: ReactNode;
};

export function ModuleTemplate({
  sectionTitles,
  title,
  summary,
  explanation,
  pseudocode,
  demo,
}: ModuleTemplateProps) {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-2">{summary}</p>
      </div>

      <section className="rounded-lg border border-border p-4 space-y-3">
        <h2 className="text-lg font-semibold">{sectionTitles.demo}</h2>
        {demo}
      </section>

      <section className="rounded-lg border border-border p-4 space-y-2">
        <h2 className="text-lg font-semibold">{sectionTitles.explanation}</h2>
        {explanation.map((item) => (
          <p key={item} className="text-sm text-muted-foreground">
            {item}
          </p>
        ))}
      </section>

      <section className="rounded-lg border border-border p-4 space-y-2">
        <h2 className="text-lg font-semibold">{sectionTitles.pseudocode}</h2>
        <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto">
          <code>{pseudocode.join("\n")}</code>
        </pre>
      </section>
    </div>
  );
}

