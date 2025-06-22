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

function Router() {
  return (
    <Switch>
      <Route path="/" component={TaxCalculator} />
      <Route path="/pdf" component={SentenceSplitterApp} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
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
  );
}

export default App;
