import React, { useState } from "react";
import { jsPDF } from "jspdf";

// --- helpers --------------------------------------------------------------
/**
 * Splits an English passage into sentences.
 * Very lightweight: looks for . ! ? followed by a capital letter.
 */
function splitSentences(text: string): string[] {
  return text
    .replace(/([.!?])\s+(?=[A-Z])/g, "$1|") // mark sentence boundaries
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

// --- component -----------------------------------------------------------
export default function SentenceSplitterApp() {
  const [input, setInput] = useState("");
  const [sentences, setSentences] = useState<string[]>([]);

  const handleSplit = () => {
    setSentences(splitSentences(input));
  };

  const handleDownload = () => {
    if (sentences.length === 0) return;

    const doc = new jsPDF();
    const margin = 10;
    const lineHeight = 8;
    let y = margin;

    sentences.forEach((sentence, idx) => {
      const numbered = `${idx + 1}. ${sentence}`;
      const wrapped = doc.splitTextToSize(numbered, 180); // 180 ≈ A4 width − margins

      if (y + wrapped.length * lineHeight > 285) {
        doc.addPage();
        y = margin;
      }

      doc.text(wrapped, margin, y);
      y += wrapped.length * lineHeight;
    });

    doc.save("sentences.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Sentence Splitter & PDF Export</h1>

      <textarea
        className="w-full max-w-3xl h-40 p-3 border rounded resize-y focus:outline-none focus:ring"
        placeholder="Paste English passage here…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex gap-3">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          onClick={handleSplit}
          disabled={!input.trim()}
        >
          Split Sentences
        </button>

        <button
          className="px-4 py-2 bg-emerald-600 text-white rounded disabled:opacity-50"
          onClick={handleDownload}
          disabled={sentences.length === 0}
        >
          Download PDF
        </button>
      </div>

      {sentences.length > 0 && (
        <ol className="list-decimal max-w-3xl space-y-1 pt-4">
          {sentences.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      )}
    </div>
  );
}