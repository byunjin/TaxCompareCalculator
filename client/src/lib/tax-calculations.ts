export interface TaxResult {
  nationalTax: number;
  localTax: number;
  totalTax: number;
  formula: string;
}

export interface TaxComparison {
  individual: TaxResult;
  corporate: TaxResult;
  recommendation: 'individual' | 'corporate' | 'equal';
  savings: number;
}

export function calculateIndividualTax(taxStandard: number): TaxResult {
  let nationalTax = 0;
  let formula = '';
  
  if (taxStandard <= 14000000) {
    nationalTax = taxStandard * 0.06;
    formula = `${taxStandard.toLocaleString()}원 × 6%`;
  } else if (taxStandard <= 50000000) {
    nationalTax = taxStandard * 0.15 - 840000;
    formula = `${taxStandard.toLocaleString()}원 × 15% - 84만원`;
  } else if (taxStandard <= 88000000) {
    nationalTax = taxStandard * 0.24 - 6240000;
    formula = `${taxStandard.toLocaleString()}원 × 24% - 624만원`;
  } else if (taxStandard <= 150000000) {
    nationalTax = taxStandard * 0.35 - 15360000;
    formula = `${taxStandard.toLocaleString()}원 × 35% - 1,536만원`;
  } else if (taxStandard <= 300000000) {
    nationalTax = taxStandard * 0.38 - 37060000;
    formula = `${taxStandard.toLocaleString()}원 × 38% - 3,706만원`;
  } else if (taxStandard <= 500000000) {
    nationalTax = taxStandard * 0.40 - 94060000;
    formula = `${taxStandard.toLocaleString()}원 × 40% - 9,406만원`;
  } else if (taxStandard <= 1000000000) {
    nationalTax = taxStandard * 0.42 - 174060000;
    formula = `${taxStandard.toLocaleString()}원 × 42% - 1.74억원`;
  } else {
    nationalTax = taxStandard * 0.45 - 384060000;
    formula = `${taxStandard.toLocaleString()}원 × 45% - 3.84억원`;
  }
  
  const localTax = nationalTax * 0.1;
  const totalTax = nationalTax + localTax;
  
  return {
    nationalTax: Math.max(0, nationalTax),
    localTax: Math.max(0, localTax),
    totalTax: Math.max(0, totalTax),
    formula: formula
  };
}

export function calculateCorporateTax(taxStandard: number): TaxResult {
  let nationalTax = 0;
  let formula = '';
  
  if (taxStandard <= 200000000) {
    nationalTax = taxStandard * 0.09;
    formula = `${taxStandard.toLocaleString()}원 × 9%`;
  } else if (taxStandard <= 20000000000) {
    nationalTax = taxStandard * 0.19 - 20000000;
    formula = `${taxStandard.toLocaleString()}원 × 19% - 2,000만원`;
  } else if (taxStandard <= 300000000000) {
    nationalTax = taxStandard * 0.21 - 420000000;
    formula = `${taxStandard.toLocaleString()}원 × 21% - 4.2억원`;
  } else {
    nationalTax = taxStandard * 0.24 - 9420000000;
    formula = `${taxStandard.toLocaleString()}원 × 24% - 94.2억원`;
  }
  
  const localTax = nationalTax * 0.1;
  const totalTax = nationalTax + localTax;
  
  return {
    nationalTax: Math.max(0, nationalTax),
    localTax: Math.max(0, localTax),
    totalTax: Math.max(0, totalTax),
    formula: formula
  };
}

export function compareTaxResults(individual: TaxResult, corporate: TaxResult): TaxComparison {
  const savings = Math.abs(individual.totalTax - corporate.totalTax);
  let recommendation: 'individual' | 'corporate' | 'equal';
  
  if (individual.totalTax < corporate.totalTax) {
    recommendation = 'individual';
  } else if (corporate.totalTax < individual.totalTax) {
    recommendation = 'corporate';
  } else {
    recommendation = 'equal';
  }
  
  return {
    individual,
    corporate,
    recommendation,
    savings
  };
}
