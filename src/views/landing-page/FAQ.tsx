"use client";

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionWrapper,
} from "@/components/landing-page/multi-accordion";
import FolderFloat from "@/components/landing-page/folder-float";

const questions: {
  question: string;
  answer: string;
}[] = [
  {
    question: "Do I need prior experience to join?",
    answer:
      "No. Several programs start from the fundamentals and guide you through each project step by step.",
  },
  {
    question: "How are the programs delivered?",
    answer:
      "Programs combine guided sessions, practical assignments, feedback, and projects that you can add to your portfolio.",
  },
  {
    question: "How long does a program take?",
    answer:
      "Most programs run between six and twelve weeks, depending on the subject and level.",
  },
  {
    question: "Will I build real projects?",
    answer:
      "Yes. Every path is project-based, so you finish with work that demonstrates your new skills.",
  },
  {
    question: "Can I speak with someone before enrolling?",
    answer:
      "Absolutely. Use the Contact link and tell us what you want to learn. We will help you choose the right path.",
  },
];

const testimonials = [
  "Got my first dev job",
  "Best investment I made",
  "Built a real portfolio",
];

export default function FAQ() {
  const rightCol = "min-w-130 max-w-200 w-full";
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative z-10 w-full px-6 py-10 md:px-10 lg:px-16 lg:py-14"
    >
      <div className="flex flex-row gap-8 justify-between items-start w-full">
        {/* left */}
        <div className="w-full min-w-75 max-w-140">
          <p className="font-gilroy text-4xl font-extrabold uppercase tracking-[0.16em] text-greenx md:text-6xl">
            FAQ
          </p>
          <h2
            id="faq-title"
            className="mt-4 max-w-xl font-rubik text-4xl font-extrabold leading-tight text-black md:text-5xl"
          >
            Questions before you start?
          </h2>
          <div className="mt-10 min-w-75 max-w-140">
            {/* pt-16 reserves room for the pills so they never touch the label above */}
            <div className="relative px-2 z-50 flex w-full justify-between mt-16">
              <FolderFloat
                items={testimonials}
                label="Testimonials"
                trigger="hover"
                physics
                drift={0.25}
                folderColor="#004d41"
                frontColor="#003d33"
                paperColor="#ffffff"
                itemColor="#D1D5D3"
                itemTextColor="#000000"
                labelColor="#ffffff"
                width={240}
                height={170}
                spread={180}
                lift={8}
                bounce={0.1}
                closeOnSelect={false}
              />
              <FolderFloat
                items={testimonials}
                label="Testimonials"
                trigger="hover"
                physics
                drift={0.25}
                folderColor="#004d41"
                frontColor="#003d33"
                paperColor="#ffffff"
                itemColor="#D1D5D3"
                itemTextColor="#1a0a02"
                labelColor="#ffffff"
                width={260}
                height={170}
                spread={180}
                lift={8}
                bounce={0.1}
                closeOnSelect={false}
              />
            </div>
          </div>
        </div>

        {/* right */}
        <div className={rightCol}>
          <p
            aria-live="polite"
            className="mb-3 mt-2 font-gilroy min-w-full text-xs font-extrabold uppercase tracking-[0.2em] text-black"
          >
            {questions.length}{" "}
            {questions.length === 1 ? "question" : "questions"}
          </p>

          <AccordionWrapper>
            <Accordion>
              {questions.map(({ question, answer }, i) => (
                <AccordionItem key={question} value={question}>
                  <AccordionHeader index={i}>{question}</AccordionHeader>
                  <AccordionPanel>{answer}</AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionWrapper>
        </div>
      </div>
    </section>
  );
}
