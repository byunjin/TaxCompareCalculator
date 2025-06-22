import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Shield, Receipt, Coins, AlertTriangle } from "lucide-react";

export default function AdditionalConsiderations() {
  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
          <Lightbulb className="h-6 w-6" style={{ color: 'hsl(var(--warning))' }} />
          추가 고려사항
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                4대 보험
              </h4>
              <p className="text-sm text-gray-600 mb-1"><strong>개인사업자:</strong> 대표 본인은 임의가입 가능, 직원 고용 시 사업주 부담분 발생</p>
              <p className="text-sm text-gray-600"><strong>법인사업자:</strong> 대표이사 급여 지급 시 4대보험 의무, 임원 & 직원 급여에 사업주 부담분 발생</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Receipt className="h-4 w-4 text-green-500" />
                손금(경비) 처리범위
              </h4>
              <p className="text-sm text-gray-600 mb-1"><strong>개인사업자:</strong> 비교적 제한적 (가업·가계 혼재 시 불인정 위험)</p>
              <p className="text-sm text-gray-600"><strong>법인사업자:</strong> 업무 관련 지출 대부분 손금 가능</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Coins className="h-4 w-4 text-purple-500" />
                이익 분배 시 과세
              </h4>
              <p className="text-sm text-gray-600 mb-1"><strong>개인사업자:</strong> 사업소득 한 번만 과세</p>
              <p className="text-sm text-gray-600"><strong>법인사업자:</strong> ① 법인세 납부 후 ② 급여·배당 지급 시 근로·배당소득세 추가 과세 (이중과세 구조)</p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                기타 고려사항
              </h4>
              <p className="text-sm text-gray-600 mb-1"><strong>개인사업자:</strong> 대표 소득이 높을수록 최고세율 적용 위험, 사업 소득을 가정생활로 인출하기 쉬움</p>
              <p className="text-sm text-gray-600"><strong>법인사업자:</strong> 회계·세무 유지비(기장, 감사 등) 증가, 자본금·등기 유지 의무</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
