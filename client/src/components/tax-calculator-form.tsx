import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";

interface TaxCalculatorFormProps {
  onCalculate: (data: {
    revenue: number;
    expenses: number;
    deductions: number;
    employeeCount: number;
  }) => void;
}

export default function TaxCalculatorForm({ onCalculate }: TaxCalculatorFormProps) {
  const [formData, setFormData] = useState({
    revenue: '',
    expenses: '',
    deductions: '',
    employeeCount: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const revenue = parseInt(formData.revenue) || 0;
    const expenses = parseInt(formData.expenses) || 0;
    const deductions = parseInt(formData.deductions) || 0;
    const employeeCount = parseInt(formData.employeeCount) || 0;
    
    if (revenue === 0) {
      alert('매출액을 입력해주세요.');
      return;
    }
    
    onCalculate({ revenue, expenses, deductions, employeeCount });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
          <Calculator className="h-6 w-6 text-primary" />
          세금 계산 정보 입력
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="revenue" className="text-sm font-medium text-gray-700">
                연간 매출액 (원)
              </Label>
              <Input
                type="number"
                id="revenue"
                value={formData.revenue}
                onChange={(e) => handleInputChange('revenue', e.target.value)}
                placeholder="예: 500000000"
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expenses" className="text-sm font-medium text-gray-700">
                연간 필요경비 (원)
              </Label>
              <Input
                type="number"
                id="expenses"
                value={formData.expenses}
                onChange={(e) => handleInputChange('expenses', e.target.value)}
                placeholder="예: 200000000"
                className="h-12"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="deductions" className="text-sm font-medium text-gray-700">
                각종 공제액 (원)
              </Label>
              <Input
                type="number"
                id="deductions"
                value={formData.deductions}
                onChange={(e) => handleInputChange('deductions', e.target.value)}
                placeholder="예: 50000000"
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="employeeCount" className="text-sm font-medium text-gray-700">
                직원 수 (명)
              </Label>
              <Input
                type="number"
                id="employeeCount"
                value={formData.employeeCount}
                onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                placeholder="예: 5"
                className="h-12"
              />
            </div>
          </div>

          <div className="text-center">
            <Button 
              type="submit" 
              className="bg-primary hover:bg-blue-700 text-white font-bold py-4 px-8 text-lg shadow-lg hover:shadow-xl"
              size="lg"
            >
              <Calculator className="mr-2 h-5 w-5" />
              세금 계산하기
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
