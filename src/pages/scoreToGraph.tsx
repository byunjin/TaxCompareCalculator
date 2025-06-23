import { useState, useMemo } from "react";
import { jsPDF } from "jspdf";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import CoupangWidget from "@/components/CoupangWidget";
import AdblockSoftModal from "@/components/AdblockSoftModal";
import base64Font from "@assets/fonts/malgun.txt?raw";
import { Helmet } from "react-helmet-async";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function normalizeRange(minStr: string, maxStr: string) {
  const toNum = (s: string, def: number) =>
    s.trim() === "" || isNaN(Number(s)) ? def : Number(s);

  let min = toNum(minStr, 0);
  let max = toNum(maxStr, 100);

  if (max <= min) {
    min = 0;
    max = 100;
  }
  return { min, max };
}

/* ── 표 문자열 → 행 객체 배열 ─────────────────────────── */
function parseTable(raw: string) {
  const rows = raw
    .trim()
    .split(/\r?\n/)
    .map((r) => r.split(/\s+|\t|,/).filter(Boolean));
  if (rows.length < 2) return [];
  const header = rows[0];

  return rows.slice(1).map((cells) =>
    header.reduce<Record<string, number>>((o, key, i) => {
      o[key] = Number(cells[i] || 0);
      return o;
    }, {})
  );
}

/* ── jsPDF 막대그래프 ─────────────────────────────────── */
function drawBar(
  doc: jsPDF,
  row: Record<string, number>,
  x: number,
  baseline: number,
  w: number,
  h: number,
  yMin: number,
  yMax: number
) {
  const labels = Object.keys(row);
  const vals = labels.map((k) => row[k]);
  const span = Math.max(yMax - yMin, 1);
  const gap = 8;
  const barW = (w - gap * (labels.length - 1)) / labels.length;

  doc.setFillColor(59, 130, 246);
  doc.setFontSize(10);

  labels.forEach((lab, i) => {
    let v = row[lab];
    v = Math.min(Math.max(v, yMin), yMax); // 범위 클램프
    const ratio = (v - yMin) / span;
    const barH = ratio * h;
    const bx = x + i * (barW + gap);
    const by = baseline - barH;

    doc.rect(bx, by, barW, barH, "F");
    doc.text(String(row[lab]), bx + barW / 2, by - 2, { align: "center" });
    doc.text(lab, bx + barW / 2, baseline + 5, { align: "center" });
  });
}

function rowsToPdf(
  rows: Record<string, number>[],
  yMin: number,
  yMax: number
) {
  if (!rows.length) return;

  const pdf = new jsPDF({ unit: "mm" });
  pdf.addFileToVFS("malgun.ttf", base64Font.trim());
  pdf.addFont("malgun.ttf", "malgun", "normal", "Identity-H");
  pdf.setFont("malgun");

  const usableW = pdf.internal.pageSize.getWidth() - 30;
  const chartH = pdf.internal.pageSize.getHeight() - 60;

  rows.forEach((row, i) => {
    if (i) {
      pdf.addPage();
      pdf.setFont("malgun");
    }
    pdf.setFontSize(14);
    pdf.text(`Row ${i + 1}`, 15, 25);
    pdf.line(15, 28, 15 + usableW, 28);

    drawBar(pdf, row, 15, 35 + chartH, usableW, chartH, yMin, yMax);
  });

  pdf.save("table-charts.pdf");
}

/* ── 3. React 컴포넌트 ─────────────────────────────────────── */
export default function ScoreToGraphApp() {
  const [input, setInput] = useState("");
  const [minStr, setMinStr] = useState("");
  const [maxStr, setMaxStr] = useState("");

  const { min: yMin, max: yMax } = normalizeRange(minStr, maxStr);

  const rows = useMemo(() => parseTable(input), [input]);

  /* 페이지네이션 */
  const [page, setPage] = useState(0);
  const perPage = 1;
  const pageCount = Math.max(1, Math.ceil(rows.length / perPage));
  const curRows = rows.slice(page * perPage, page * perPage + perPage);

  const resetPage = () => rows.length && setPage(0);

  return (
    <>
      <Helmet>
        <title>표 → 그래프 변환기</title>
        <meta
          name="description"
          content="점수표를 붙여 넣으면 행마다 막대그래프를 생성하고 PDF로 저장합니다."
        />
        <link rel="canonical" href="https://tool.surpass-lab.com/graph" />
        <meta property="og:title" content="표 → 그래프 변환기" />
        <meta property="og:description" content="점수표를 붙여 넣으면 행마다 막대그래프를 생성하고 PDF로 저장합니다." />
      </Helmet>

      <div className="relative bg-gray-50">
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              표&nbsp;→&nbsp;그래프&nbsp;PDF&nbsp;변환기
            </h1>
            <p className="text-lg text-gray-600">
              표를 붙여 넣고 그래프로 변환하세요.
            </p>
          </div>
        </header>

        {/* ── 본문 ── */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="rounded-lg border bg-white shadow p-6 space-y-6">
            <Textarea
              className="w-full h-40 p-3 border rounded resize-y focus:outline-none focus:ring"
              placeholder={`수학\t영어\t국어\t과학\t평균\n80\t90\t50\t40\t65\n70\t90\t80\t50\t72.5`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            {/* 최대·최소 값 입력 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">최소값</label>
                <input
                  type="number"
                  value={minStr}
                  onChange={(e) => setMinStr(e.target.value)}
                  className="w-28 border rounded px-2 py-1"
                  placeholder="0"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">최대값</label>
                <input
                  type="number"
                  value={maxStr}
                  onChange={(e) => setMaxStr(e.target.value)}
                  className="w-28 border rounded px-2 py-1"
                  placeholder="100"
                />
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => rowsToPdf(rows, yMin, yMax)}
                disabled={!rows.length}
                className="px-6 h-11 rounded-md bg-emerald-600 text-white font-semibold disabled:opacity-50"
              >
                PDF 다운로드
              </button>
            </div>

            {/* 안내 문구 */}
            <p className="text-sm text-gray-600 text-center">
              엑셀 또는 스프레드시트 에서 표 영역을 복사한 뒤
              <br />
              그대로 붙여넣으면 자동으로 인식합니다.
            </p>

            <div className="space-y-4 min-h-[8rem]">
                {curRows.map((row, idx) => (
                  <Bar
                    key={idx}
                    data={{
                      labels: Object.keys(row),
                      datasets: [
                        {
                          data: Object.values(row),
                          backgroundColor: "#3B82F6",
                          borderRadius: 4,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: { legend: { display: false } },
                      scales: {
                        y: { min: yMin, max: yMax, ticks: { precision: 0 } },
                      },
                    }}
                  />
                ))}

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 0))}
                    disabled={page === 0}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    ◀
                  </button>
                  <span className="self-center">
                    {page + 1} / {pageCount}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, pageCount - 1))}
                    disabled={page === pageCount - 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    ▶
                  </button>
                </div>
              </div>
          </div>
        </main>

        {/* ── 푸터 ── */}
        <footer className="bg-gray-900 text-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-1">
            <p className="text-gray-400">© 2025 byunjin. All rights reserved.</p>
            <p className="text-gray-500 text-sm">
              이 사이트는 광고 수익으로 운영됩니다.
            </p>
          </div>
        </footer>

        {/* 하단 가로 배너 */}
        <div className="flex justify-center items-center gap-4 m-2 overflow-x-auto">
          <CoupangWidget
            className="hidden sm:block lg:block"
            bannerId={880311}
            trackingCode="AF1730588"
          />
          <CoupangWidget
            className="hidden xl:block"
            bannerId={880310}
            trackingCode="AF1730588"
          />
          <CoupangWidget
            className="block sm:hidden"
            bannerId={880782}
            trackingCode="AF1730588"
          />
        </div>
      </div>
    </>
  );
}
