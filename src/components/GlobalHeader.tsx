import { BadgeDollarSign } from "lucide-react";

export default function GlobalHeader() {
  return (
    <header className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-2">
        <BadgeDollarSign className="h-5 w-5" />
        <span className="font-semibold">
          각종 유용한 기능 모음
        </span>
      </div>
    </header>
  );
}
