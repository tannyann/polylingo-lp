'use client';

import { useId, useState } from 'react';

type AccordionItemProps = {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

function AccordionItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  return (
    <div className="border-b border-border last:border-b-0">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full min-h-[48px] items-center justify-between gap-4 py-5 text-left font-semibold text-navy transition hover:text-blue focus-visible:ring-navy"
        >
          <span>{question}</span>
          <span
            aria-hidden="true"
            className={`shrink-0 text-xl text-blue transition-transform duration-200 ${
              isOpen ? 'rotate-45' : ''
            }`}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className="pb-5"
      >
        <p className="text-text-muted leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

type AccordionProps = {
  items: { question: string; answer: string }[];
  onItemOpen?: (question: string) => void;
};

export function Accordion({ items, onItemOpen }: AccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="card !p-0 divide-y divide-border overflow-hidden !px-6 md:!px-8">
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          id={`${baseId}-${index}`}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => {
            const willOpen = openIndex !== index;
            setOpenIndex((current) => (current === index ? null : index));
            if (willOpen) onItemOpen?.(item.question);
          }}
        />
      ))}
    </div>
  );
}
