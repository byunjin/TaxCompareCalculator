import { renderToString } from 'react-dom/server';
import App from './src/App';

/* ─────────── Node 환경 localStorage 폴리필 ─────────── */
if (typeof globalThis.localStorage === 'undefined') {
  const m = new Map<string, string>();
  (globalThis as any).localStorage = {
    get length() { return m.size },
    key:        i => [...m.keys()][i] ?? null,
    getItem:    k => m.get(k) ?? null,
    setItem:    (k, v) => m.set(k, v),
    removeItem: k => m.delete(k),
    clear:      () => m.clear(),
  } as unknown as Storage;
}
/* ───────────────────────────────────────────────────── */

export async function prerender() {
  const helmetCtx: any = {};

  const html = renderToString(<App helmetCtx={helmetCtx} />);
  
  /* Helmet이 만든 태그들 추출 */
  const rawTitle  = helmetCtx.helmet.title?.toString() ?? '';     // <title …>텍스트</title>
  const titleText = rawTitle.replace(/<\/?title[^>]*>/g, '');     // → 텍스트만
  const metaTags  = helmetCtx.helmet.meta?.toString()  ?? '';     // 그대로 사용

  /* 플러그인에 결과 전달 */
  return {
    html,                       // <div id="root">…</div> 안쪽
    head: {
      title: titleText,         // ➜ 플러그인이 <title>텍스트</title> 자동 생성
      elements: new Set([metaTags]),
    },
  };
}
