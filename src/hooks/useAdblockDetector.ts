import { useEffect, useState } from "react";

/**
 * true  => Ad-block 사용 중
 * false => 정상
 */
export function useAdblockDetector(): boolean {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    // '광고' URL의 스크립트를 미끼로 요청
    const bait = document.createElement("script");
    bait.src = "/adsbygoogle.js";        // adblock이 거의 100 % 막는 경로
    bait.async = true;

    // 로드 실패 == 차단
    bait.onerror = () => setBlocked(true);
    // 로드 성공 == 미차단
    bait.onload = () => setBlocked(false);

    document.body.appendChild(bait);

    return () => {
      document.body.removeChild(bait);
    };
  }, []);

  return blocked;
}
