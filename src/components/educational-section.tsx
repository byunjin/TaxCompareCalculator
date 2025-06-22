import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Calculator, Percent, FileText, CheckCircle, Info, AlertTriangle } from "lucide-react";

export default function EducationalSection() {
  return (
    <div className="space-y-8">
      {/* Tax Terms Section */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            세금 용어 이해하기
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">과세표준</h4>
              <p className="text-sm text-gray-600">매출액에서 필요경비와 각종 공제를 뺀 실제 세금 계산 기준금액</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Percent className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">누진공제액</h4>
              <p className="text-sm text-gray-600">누진세율 적용 시 이전 구간의 세금 부담을 조정하기 위한 공제 금액</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <FileText className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">산출세액</h4>
              <p className="text-sm text-gray-600">과세표준에 세율을 곱하고 누진공제액을 뺀 최종 세금</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
              <Info className="h-4 w-4" />
              계산 공식
            </h4>
            <p className="text-yellow-700 text-center text-lg">
              <strong>산출세액 = 과세표준 × 세율 - 누진공제액</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Practical Tips Section */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
            <CheckCircle className="h-6 w-6" style={{ color: 'hsl(var(--warning))' }} />
            실무 팁
          </h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">초기 소득이 낮은 1~2년 차에는 개인사업자로 시작 → 매출·이익이 급증하거나 외부 투자, 고용 확대가 필요해질 때 법인 전환을 고려</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">법인 전환 시기를 결정할 때는 '대표가 실제로 가져갈 금액'과 '재투자 예정 금액'을 시뮬레이션</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">세무서 홈택스 '모의계산' 메뉴나 세무사 무료 상담(국번 없이 126)을 활용해 직접 계산</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 text-sm flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>
                <strong>중요:</strong> 이 계산기는 기본적인 세금 비교를 위한 도구입니다. 정확한 세무 계획을 위해서는 세무 전문가와 상담하시기 바랍니다.
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
