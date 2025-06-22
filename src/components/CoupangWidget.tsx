import { useEffect, useRef } from "react";

interface Props {
  bannerId: number;          // 파트너스에서 받은 배너 ID
  trackingCode: string;      // AF~~~~
  template?: string;         // carousel / card / mini 등
  className?: string;        // tailwind 위치·크기
}

export default function CoupangWidget({
  bannerId,
  trackingCode,
  template = "carousel",
  className = "",
}: Props) {
  const containerId = useRef(`cp-${bannerId}-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    const loadScript = () =>
      new (window as any).PartnersCoupang.G({
        id: bannerId,
        trackingCode,
        template,
        containerId: containerId.current,
      });

    const timer = setInterval(() => {
      const ins = document
        .querySelector(`iframe[id^="${bannerId}"]`)
        ?.parentElement as HTMLElement | null;
      const container = document.getElementById(containerId.current);
      if (ins && container && !container.contains(ins)) {
        container.appendChild(ins);   // ← aside 안으로 이동
        clearInterval(timer);
      }
    }, 100);

    // g.js가 이미 로드돼 있으면 바로 위젯 생성
    if ((window as any).PartnersCoupang?.G) {
      loadScript();
      return;
    }

    // 한 번도 로드 안 됐으면 <head>에 삽입
    const existed = document.querySelector<HTMLScriptElement>('script[data-coupang]');
    if (existed) {
      // 다른 컴포넌트가 스크립트 넣는 중 → 로드 완료 대기
      existed.addEventListener('load', loadScript, { once: true });
    } else {
      const s = document.createElement('script');
      s.src = 'https://ads-partners.coupang.com/g.js';
      s.async = true;
      s.dataset.coupang = 'true';
      s.addEventListener('load', loadScript, { once: true });
      document.head.appendChild(s);
    }

    // 언마운트 시 컨테이너 비우기(선택)
    return () => {
      const el = document.getElementById(containerId.current);
      if (el) el.innerHTML = '';
    };
  }, [bannerId, trackingCode, template]);

  return (
    <aside
      id={containerId.current}
      className={className}
    />
  );
}
