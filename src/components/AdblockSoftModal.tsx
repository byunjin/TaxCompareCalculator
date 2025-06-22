import { useAdblockDetector } from "@/hooks/useAdblockDetector";
import { useState } from "react";

export default function AdblockSoftModal() {
  const blocked = useAdblockDetector();
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem("adblock-dismiss") === "yes",
  );

  if (!blocked || dismissed) return null;

  const close = () => {
    localStorage.setItem("adblock-dismiss", "yes"); // 1회 확인 후 안 보이게
    setDismissed(true);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-[90%] max-w-md rounded-xl bg-white p-8 text-center space-y-6 shadow-xl">
        <h2 className="text-2xl font-bold text-red-600">
          광고 차단이 감지되었습니다
        </h2>
        <p className="text-gray-800 leading-relaxed">
          이 사이트는 광고 수익으로 운영됩니다.<br />
          광고 차단을 해제해 주시면 큰 도움이 됩니다.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
          >
            광고 허용하고 새로고침
          </button>

          <button
            onClick={close}
            className="w-full rounded-md border border-gray-300 hover:bg-gray-100 py-3 font-medium text-gray-700"
          >
            그냥 계속 보기
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Chrome &nbsp; 주소창 자물쇠 → 사이트 설정 → “광고” 허용<br />
          Brave  &nbsp;&nbsp; 방패 아이콘 → Shields ⟶ Off
        </p>
      </div>
    </div>
  );
}
