// src/pages/sentenceSplitter.tsx
import { useState, useMemo, useRef } from "react";
import { jsPDF } from "jspdf";
import { FileText } from "lucide-react";
import CoupangWidget from "@/components/CoupangWidget";
import AdblockSoftModal from "@/components/AdblockSoftModal";
import { Textarea } from "@/components/ui/textarea";

const PAGE_MARGIN = 15;      // mm
const HEADER      = 20;
const LINE        = 8;
const GAP         = LINE * 3;

const splitSentences = (text: string) => {
  // 1) 줄바꿈 → 공백, 연속 공백 정리
  const cleaned = text
    .replace(/\r?\n+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  // 2) 가능한 경우 Intl.Segmenter(문장 모듈식) 사용
  if (typeof Intl !== "undefined" && (Intl as any).Segmenter) {
    const seg   = new (Intl as any).Segmenter("und", { granularity: "sentence" });
    const raw   = Array.from(seg.segment(cleaned), (s: any) => s.segment.trim());

    // 2-a) 끝맺음 기호 없는 세그먼트는 앞 문장에 붙이기
    const out: string[] = [];
    raw.forEach((part) => {
      if (/[.!?。？！…]+["')\]]*$/.test(part)) {
        out.push(part);
      } else if (out.length) {
        out[out.length - 1] += " " + part;
      } else {
        out.push(part);
      }
    });
    return out;
  }

  // 3) 구형 브라우저 fallback: 정규식
  const regex = /[^.!?。？！…]+[.!?。？！…]+(?=\s|$)/g;
  return cleaned.match(regex)?.map((s) => s.trim()) ?? [];
};

export default function SentenceSplitterApp() {
  const [input, setInput] = useState("");
  const sentences = useMemo(() => splitSentences(input), [input]);

  // ---------------- PDF ----------------
  const downloadPdf = () => {
    if (!sentences.length) return;
    const doc  = new jsPDF({ unit: "mm" });
    const w    = doc.internal.pageSize.getWidth()  - PAGE_MARGIN * 2;
    const hMax = doc.internal.pageSize.getHeight() - PAGE_MARGIN;

    const newPage = () => {
      const y = PAGE_MARGIN + HEADER;
      doc.setLineWidth(0.3);
      doc.line(PAGE_MARGIN, y, PAGE_MARGIN + w, y);
      return y + LINE; // 1줄 여백
    };

    let y = newPage();
    sentences.forEach((s, i) => {
      const wrapped = doc.splitTextToSize(`${i + 1}. ${s}`, w);
      if (y + wrapped.length * LINE > hMax) {
        doc.addPage();
        y = newPage();
      }
      doc.text(wrapped, PAGE_MARGIN, y);
      y += wrapped.length * LINE + GAP;
    });

    doc.save("sentences.pdf");
  };

  // ---------------- JSX ----------------
  return (
    <div className="relative bg-gray-50">
      {/* 광고 차단 Soft-Block */}
      <AdblockSoftModal />

      {/* ── 사이드 광고 (데스크톱) ── */}
      <aside className="hidden xl:block absolute top-32 left-16 w-[160px] z-10">
        <CoupangWidget bannerId={880307} trackingCode="AF1730588" />
      </aside>
      <aside className="hidden xl:block absolute top-32 right-16 w-[160px] z-10">
        <CoupangWidget bannerId={880286} trackingCode="AF1730588" />
      </aside>

      {/* ── 헤더 ── */}
      <header className="bg-white shadow-sm border-b">
        <title>문장 나누기 &amp; PDF 변환기</title>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            문장 나누기 &amp; PDF 변환기
          </h1>
          <p className="text-lg text-gray-600">
            영어 지문을 문장 단위로 분리하고&nbsp;
            PDF로 저장해 보세요
          </p>
        </div>
      </header>

      {/* ── 본문 ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-lg border bg-white shadow p-6 space-y-6">
          <Textarea
            className="w-full h-40 p-3 border rounded resize-y focus:outline-none focus:ring"
            placeholder="Paste English passage here…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="flex justify-center gap-4">
            <button
              onClick={downloadPdf}
              disabled={!sentences.length}
              className="inline-flex items-center justify-center gap-2 h-11 rounded-md bg-primary text-white px-6 font-semibold
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              PDF 다운로드
            </button>
          </div>

          <ol className="list-decimal space-y-1 pl-5 text-gray-800 min-h-[8rem]">
            {sentences.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      </main>

      {/* ── 푸터 ── */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-1">
          <p className="text-gray-400">
            © 2025 Sentence Splitter. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            이 사이트는 광고 수익으로 운영됩니다.
          </p>
        </div>
      </footer>

      {/* 하단 가로형 배너 */}
      <div className="flex justify-center items-center gap-4 mt-8 overflow-x-auto">
        <CoupangWidget bannerId={880311} trackingCode="AF1730588" />
        <CoupangWidget className="hidden xl:block" bannerId={880310} trackingCode="AF1730588" />
      </div>
    </div>
  );
}
