import { useState, useRef } from "react";
import { Calculator } from "lucide-react";
import TaxCalculatorForm from "@/components/tax-calculator-form";
import TaxRateTables from "@/components/tax-rate-tables";
import CalculationResults from "@/components/calculation-results";
import AdditionalConsiderations from "@/components/additional-considerations";
import EducationalSection from "@/components/educational-section";
import { calculateIndividualTax, calculateCorporateTax, compareTaxResults } from "@/lib/tax-calculations";
import type { TaxComparison } from "@/lib/tax-calculations";
import CoupangWidget from "@/components/CoupangWidget";
import AdblockSoftModal from "@/components/AdblockSoftModal";
import { Helmet } from "react-helmet-async";

export default function TaxCalculator() {
  const [calculationResult, setCalculationResult] = useState<{
    taxStandard: number;
    comparison: TaxComparison;
  } | null>(null);
  
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleCalculate = (data: {
    revenue: number;
    expenses: number;
    deductions: number;
    employeeCount: number;
  }) => {
    const { revenue, expenses, deductions } = data;
    const taxStandard = Math.max(0, revenue - expenses - deductions);
    
    if (taxStandard === 0) {
      alert('과세표준이 0원입니다. 입력값을 확인해주세요.');
      return;
    }
    
    const individualResult = calculateIndividualTax(taxStandard);
    const corporateResult = calculateCorporateTax(taxStandard);
    const comparison = compareTaxResults(individualResult, corporateResult);
    
    setCalculationResult({
      taxStandard,
      comparison
    });
    
    // Scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <>
      <Helmet>
        <title>개인사업자 vs 법인사업자 세금 계산기 - 2025년 기준</title>
        <meta name="description" content="2025년 세법 기준으로 개인사업자와 법인사업자의 세금을 비교하여 어떤 사업 형태가 더 유리한지 계산해보세요. 종합소득세, 법인세 계산기." />
        <meta property="og:title" content="개인사업자 vs 법인사업자 세금 계산기 - 2025년 기준" />
        <meta property="og:description" content="2025년 세법 기준으로 개인사업자와 법인사업자의 세금을 비교하여 어떤 사업 형태가 더 유리한지 계산해보세요. 종합소득세, 법인세 계산기" />
        <link rel="canonical" href="https://tool.surpass-lab.com/" />
      </Helmet>
      <div className="relative bg-gray-50 min-h-screen">
        {/* 광고 차단 Soft Block */}
        <AdblockSoftModal />
        {/* 사이드 광고 (데스크톱 전용) */}
        <div className="hidden lg:hidden xl:block absolute top-32 left-16 xl:left-16 w-[160px] z-10">
          <CoupangWidget 
            bannerId={880307} 
            trackingCode="AF1730588" />
        </div>
        <div className="hidden lg:hidden xl:block absolute top-32 right-16 xl:right-16 w-[160px] z-10">
          <CoupangWidget 
            bannerId={880286} 
            trackingCode="AF1730588" />
        </div>
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
                <Calculator className="h-8 w-8 text-primary" />
                개인사업자 vs 법인사업자 세금 계산기
              </h1>
              <p className="text-lg text-gray-600">2025년 세법 기준으로 어떤 사업 형태가 더 유리한지 확인해보세요</p>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tax Calculator Form */}
          <div className="mb-8">
            <TaxCalculatorForm onCalculate={handleCalculate} />
          </div>

          {/* Tax Rate Tables */}
          <div className="mb-8">
            <TaxRateTables />
          </div>

          {/* Calculation Results */}
          {calculationResult && (
            <div ref={resultsRef} className="mb-8">
              <CalculationResults 
                taxStandard={calculationResult.taxStandard}
                comparison={calculationResult.comparison}
              />
            </div>
          )}

          {/* Additional Considerations */}
          <div className="mb-8">
            <AdditionalConsiderations />
          </div>

          {/* Educational Section */}
          <div className="mb-8">
            <EducationalSection />
          </div>
        </main>

        <footer className="bg-gray-900 text-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400">© 2025 byunjin. All rights reserved. </p>
            <p className="text-gray-500 text-sm mt-2">이 사이트는 광고 수익으로 운영되는 사이트 입니다.</p>
          </div>
        </footer>
        <div className="flex justify-center items-center gap-4 m-2 overflow-x-auto">
          <CoupangWidget className="hidden sm:block lg:block" bannerId={880311} trackingCode="AF1730588" />
          <CoupangWidget className="hidden xl:block" bannerId={880310} trackingCode="AF1730588" />
          <CoupangWidget className="block sm:hidden" bannerId={880782} trackingCode="AF1730588" />
        </div>
      </div>
    </>
  );
}
