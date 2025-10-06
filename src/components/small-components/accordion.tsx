import { Accordion, AccordionItem } from "@heroui/accordion";

export default function Accardion({
  data,
  className = "",
}: {
  data: any[];
  className?: string;
}) {
  return (
    <div className={className}>
      <Accordion>
        {data.map((item, index) => (
          <AccordionItem
            key={index}
            aria-label={`Accordion ${index + 1}`}
            classNames={{
              title: "text-left font-bold md:text-xl p-2",
              content: "text-left font-base md:text-lg p-2",
            }}
            title={item.question}
          >
            {Array.isArray(item.answer) ? (
              <ul className="list-disc pl-6 space-y-2">
                {item.answer.map((point: string, i: number) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            ) : (
              item.answer
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
