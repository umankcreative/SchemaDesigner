import type { ProblemSolutionContent, GlobalTheme } from "@shared/schema";

interface ProblemSolutionProps {
  content: ProblemSolutionContent;
  theme: Record<string, string>;
  globalTheme: GlobalTheme;
}

export default function ProblemSolution({ content, theme, globalTheme }: ProblemSolutionProps) {
  return (
    <section className="bg-accent/50 py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl font-bold text-foreground text-center mb-16 font-heading">
          {content.title}
        </h2>
        
        <div className="space-y-12">
          {content.items.map((item, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-red-50 border border-red-200 p-8 rounded-lg">
                <div className="text-2xl font-semibold text-red-800 mb-2">Problem</div>
                <h3 className="text-lg font-bold text-red-900 mb-2">
                  {item.problem.title}
                </h3>
                <p className="text-red-700">
                  {item.problem.description}
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 p-8 rounded-lg">
                <div className="text-2xl font-semibold text-green-800 mb-2">Solution</div>
                <h3 className="text-lg font-bold text-green-900 mb-2">
                  {item.solution.title}
                </h3>
                <p className="text-green-700">
                  {item.solution.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
