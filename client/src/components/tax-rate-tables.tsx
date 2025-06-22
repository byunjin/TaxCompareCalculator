import { Card, CardContent } from "@/components/ui/card";
import { User, Building, Info } from "lucide-react";

export default function TaxRateTables() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Individual Business Tax Rates */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center bg-blue-50 py-3 px-4 rounded-lg flex items-center justify-center gap-2">
              <User className="h-5 w-5 text-primary" />
              개인사업자 (종합소득세)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 text-left font-medium text-gray-700">과세표준</th>
                    <th className="px-3 py-2 text-center font-medium text-gray-700">세율</th>
                    <th className="px-3 py-2 text-center font-medium text-gray-700">누진공제</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-3 py-2">1,400만원 이하</td><td className="px-3 py-2 text-center">6%</td><td className="px-3 py-2 text-center">-</td></tr>
                  <tr><td className="px-3 py-2">1,400만원~5,000만원</td><td className="px-3 py-2 text-center">15%</td><td className="px-3 py-2 text-center">84만원</td></tr>
                  <tr><td className="px-3 py-2">5,000만원~8,800만원</td><td className="px-3 py-2 text-center">24%</td><td className="px-3 py-2 text-center">624만원</td></tr>
                  <tr><td className="px-3 py-2">8,800만원~1.5억원</td><td className="px-3 py-2 text-center">35%</td><td className="px-3 py-2 text-center">1,536만원</td></tr>
                  <tr><td className="px-3 py-2">1.5억원~3억원</td><td className="px-3 py-2 text-center">38%</td><td className="px-3 py-2 text-center">3,706만원</td></tr>
                  <tr><td className="px-3 py-2">3억원~5억원</td><td className="px-3 py-2 text-center">40%</td><td className="px-3 py-2 text-center">9,406만원</td></tr>
                  <tr><td className="px-3 py-2">5억원~10억원</td><td className="px-3 py-2 text-center">42%</td><td className="px-3 py-2 text-center">1.74억원</td></tr>
                  <tr><td className="px-3 py-2">10억원 초과</td><td className="px-3 py-2 text-center">45%</td><td className="px-3 py-2 text-center">3.84억원</td></tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Corporate Business Tax Rates */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center bg-green-50 py-3 px-4 rounded-lg flex items-center justify-center gap-2">
              <Building className="h-5 w-5" style={{ color: 'hsl(var(--success))' }} />
              법인사업자 (법인세)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 text-left font-medium text-gray-700">과세표준</th>
                    <th className="px-3 py-2 text-center font-medium text-gray-700">세율</th>
                    <th className="px-3 py-2 text-center font-medium text-gray-700">누진공제</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-3 py-2">2억원 이하</td><td className="px-3 py-2 text-center">9%</td><td className="px-3 py-2 text-center">-</td></tr>
                  <tr><td className="px-3 py-2">2억원~200억원</td><td className="px-3 py-2 text-center">19%</td><td className="px-3 py-2 text-center">2,000만원</td></tr>
                  <tr><td className="px-3 py-2">200억원~3,000억원</td><td className="px-3 py-2 text-center">21%</td><td className="px-3 py-2 text-center">4.2억원</td></tr>
                  <tr><td className="px-3 py-2">3,000억원 초과</td><td className="px-3 py-2 text-center">24%</td><td className="px-3 py-2 text-center">94.2억원</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700 flex items-center gap-1">
                  <Info className="h-4 w-4" />
                  지방소득세는 국세의 10% 추가로 자동 계산됩니다.
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700 font-medium mb-1">계산 공식:</p>
                <p className="text-sm text-gray-600">산출세액 = 과세표준 × 세율 - 누진공제액</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tax Terms Explanation */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center bg-yellow-50 py-3 px-4 rounded-lg flex items-center justify-center gap-2">
            <Info className="h-5 w-5 text-yellow-600" />
            세금 용어 설명
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">과세표준</h4>
              <p className="text-sm text-gray-600">매출액에서 필요경비와 각종 공제를 뺀 실제 세금 계산 기준금액입니다.</p>
              <p className="text-xs text-blue-600 mt-2 font-medium">과세표준 = 매출액 - 필요경비 - 각종공제</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">누진공제액</h4>
              <p className="text-sm text-gray-600">누진세율 적용 시 이전 구간의 세금 부담을 조정하기 위한 공제 금액입니다.</p>
              <p className="text-xs text-green-600 mt-2 font-medium">첫 번째 구간에는 누진공제액이 없습니다.</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">산출세액</h4>
              <p className="text-sm text-gray-600">과세표준에 세율을 곱하고 누진공제액을 뺀 최종 세금입니다.</p>
              <p className="text-xs text-purple-600 mt-2 font-medium">산출세액 = 과세표준 × 세율 - 누진공제액</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}