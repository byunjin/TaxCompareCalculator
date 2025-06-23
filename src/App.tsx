import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import TaxCalculator from "@/pages/tax-calculator";
import NotFound from "@/pages/not-found";
import SentenceSplitterApp from "./pages/sentenceSplitter";
import NavigationBar from "./components/NavigationBar";
import GlobalHeader from "./components/GlobalHeader";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ScoreToGraphApp from "./pages/scoreToGraph";

function Router() {
  return (
    <Switch>
      <Route path="/" component={TaxCalculator} />
      <Route path="/pdf" component={SentenceSplitterApp} />
      <Route path="/graph" component={ScoreToGraphApp} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>개인사업자 vs 법인사업자 세금 계산기 - 2025년 기준</title>
        <meta name="description" content="2025년 세법 기준으로 개인사업자와 법인사업자의 세금을 비교하여 어떤 사업 형태가 더 유리한지 계산해보세요. 종합소득세, 법인세 계산기." />
        <meta property="og:title" content="개인사업자 vs 법인사업자 세금 계산기 - 2025년 기준" />
        <meta property="og:description" content="2025년 세법 기준으로 개인사업자와 법인사업자의 세금을 비교하여 어떤 사업 형태가 더 유리한지 계산해보세요. 종합소득세, 법인세 계산기" />
        <link rel="canonical" href="https://tool.surpass-lab.com/" />
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          {/* ─── 공통 헤더 (항상 최상단) ─── */}
          <GlobalHeader />
          {/* ─── 페이지 내비게이션 ─── */}
          <NavigationBar />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
