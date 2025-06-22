import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, User, Building, Trophy } from "lucide-react";
import type { TaxComparison } from "@/lib/tax-calculations";

interface CalculationResultsProps {
  taxStandard: number;
  comparison: TaxComparison;
}

export default function CalculationResults({ taxStandard, comparison }: CalculationResultsProps) {
  const { individual, corporate, recommendation, savings } = comparison;

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          세금 계산 결과
        </h2>

        {/* Tax Standard Display */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">과세표준 계산</h3>
          <p className="text-gray-700">
            과세표준 = 매출액 - 필요경비 - 각종공제 = 
            <span className="font-bold text-primary ml-2">{taxStandard.toLocaleString()}원</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Individual Business Results */}
          <div className="border-2 border-blue-200 rounded-xl p-6 bg-blue-50">
            <h3 className="text-xl font-bold text-blue-800 mb-4 text-center flex items-center justify-center gap-2">
              <User className="h-5 w-5" />
              개인사업자 세금
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">종합소득세 (국세):</span>
                <span className="font-bold text-blue-800">{Math.round(individual.nationalTax).toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">지방소득세 (10%):</span>
                <span className="font-bold text-blue-800">{Math.round(individual.localTax).toLocaleString()}원</span>
              </div>
              <hr className="border-blue-300" />
              <div className="flex justify-between text-lg">
                <span className="font-bold text-blue-800">총 세금:</span>
                <span className="font-bold text-blue-800 text-xl">{Math.round(individual.totalTax).toLocaleString()}원</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>계산식:</strong> {individual.formula}
              </p>
            </div>
          </div>

          {/* Corporate Business Results */}
          <div className="border-2 border-green-200 rounded-xl p-6 bg-green-50">
            <h3 className="text-xl font-bold text-green-800 mb-4 text-center flex items-center justify-center gap-2">
              <Building className="h-5 w-5" />
              법인사업자 세금
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">법인세 (국세):</span>
                <span className="font-bold text-green-800">{Math.round(corporate.nationalTax).toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">지방소득세 (10%):</span>
                <span className="font-bold text-green-800">{Math.round(corporate.localTax).toLocaleString()}원</span>
              </div>
              <hr className="border-green-300" />
              <div className="flex justify-between text-lg">
                <span className="font-bold text-green-800">총 세금:</span>
                <span className="font-bold text-green-800 text-xl">{Math.round(corporate.totalTax).toLocaleString()}원</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>계산식:</strong> {corporate.formula}
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Result */}
        <div className={`mt-8 p-6 rounded-xl text-center ${
          recommendation === 'individual' ? 'bg-blue-100 border-2 border-blue-300' :
          recommendation === 'corporate' ? 'bg-green-100 border-2 border-green-300' :
          'bg-gray-100 border-2 border-gray-300'
        }`}>
          <h3 className={`text-2xl font-bold mb-4 flex items-center justify-center gap-2 ${
            recommendation === 'individual' ? 'text-blue-800' :
            recommendation === 'corporate' ? 'text-green-800' :
            'text-gray-800'
          }`}>
            <Trophy className="h-6 w-6" />
            {recommendation === 'individual' ? '개인사업자가 유리합니다!' :
             recommendation === 'corporate' ? '법인사업자가 유리합니다!' :
             '세금 부담이 동일합니다'}
          </h3>
          <p className="text-xl mb-4">
            {recommendation === 'individual' ? '개인사업자로 사업하는 것이 세금 부담이 적습니다.' :
             recommendation === 'corporate' ? '법인사업자로 사업하는 것이 세금 부담이 적습니다.' :
             '두 사업 형태의 세금 부담이 같습니다.'}
          </p>
          <p className="text-lg font-semibold">
            절약 가능한 세금: <span className={`text-2xl font-bold ${
              recommendation === 'individual' ? 'text-blue-600' :
              recommendation === 'corporate' ? 'text-green-600' :
              'text-gray-600'
            }`}>{Math.round(savings).toLocaleString()}원</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
