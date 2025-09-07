import { Check, Minus } from "lucide-react";
import type { ComparisonContent, GlobalTheme } from "@shared/schema";

interface ComparisonProps {
  content: ComparisonContent;
  theme: Record<string, string>;
  globalTheme: GlobalTheme;
}

export default function Comparison({ content, theme, globalTheme }: ComparisonProps) {
  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-primary mx-auto" />
      ) : (
        <Minus className="w-5 h-5 text-muted-foreground mx-auto" />
      );
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-foreground font-heading">
            {content.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {content.subtitle}
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-card rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="border-b-2 border-border">
                {content.headers.map((header, index) => (
                  <th key={index} className="p-4 font-semibold text-foreground">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.rows.map((row, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="p-4 font-medium text-foreground">
                    {row.feature}
                  </td>
                  {row.values.map((value, valueIndex) => (
                    <td key={valueIndex} className="p-4 text-center">
                      {renderValue(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
