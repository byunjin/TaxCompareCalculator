import { useEffect } from "react";

interface Props {
  slot: string;                            // data-ad-slot
  style?: React.CSSProperties;             // 크기
  className?: string;                      // Tailwind 등
  data?: Record<string, string>;           // data-ad-*
}

export default function AdSenseSlot({
  slot,
  style,
  className = "",
  data = {},
}: Props) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (_) {}
  }, [slot]);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: "block", ...style }}
      data-ad-client="ca-pub-1015756202115922"
      data-ad-slot={slot}
      {...Object.fromEntries(Object.entries(data).map(([k, v]) => [`data-${k}`, v]))}
    />
  );
}
