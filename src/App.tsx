import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy-load all pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const BrandsIndexPage = lazy(() => import('./pages/BrandsIndexPage'));
const BrandPage = lazy(() => import('./pages/BrandPage'));
const ModelYearPage = lazy(() => import('./pages/ModelYearPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const MarketPage = lazy(() => import('./pages/MarketPage'));
const ReportLandingPage = lazy(() => import('./pages/ReportLandingPage'));
const ReportViewPage = lazy(() => import('./pages/ReportViewPage'));
const GuidePage = lazy(() => import('./pages/GuidePage'));
const GuidesIndexPage = lazy(() => import('./pages/GuidesIndexPage'));
const PremiumPage = lazy(() => import('./pages/PremiumPage'));
const BesiktningPage = lazy(() => import('./pages/BesiktningPage'));
const BesiktningModelPage = lazy(() => import('./pages/BesiktningModelPage'));
const FinancingCalculatorPage = lazy(() => import('./pages/FinancingCalculatorPage'));

function StaticRedirect() {
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
  return null;
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-500 border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            
            {/* Märken */}
            <Route path="bil" element={<BrandsIndexPage />} />
            <Route path="bil/:brand" element={<BrandPage />} />
            <Route path="bil/:brand/:model" element={<ModelYearPage />} />
            <Route path="bil/:brand/:model/:year" element={<ModelYearPage />} />
            
            {/* Sök & Marknad */}
            <Route path="sok" element={<SearchPage />} />
            <Route path="marknad" element={<MarketPage />} />
            
            {/* Besiktning */}
            <Route path="besiktning" element={<BesiktningPage />} />
            <Route path="besiktning/:brand" element={<BesiktningPage />} />
            <Route path="besiktning/:brand/:model" element={<BesiktningModelPage />} />
            
            {/* Rapporter */}
            <Route path="rapport/:brand/:model" element={<ReportLandingPage />} />
            <Route path="rapport/visa/:token" element={<ReportViewPage />} />
            
            {/* Guider */}
            <Route path="guide" element={<GuidesIndexPage />} />
            <Route path="guide/:slug" element={<GuidePage />} />
            
            {/* Premium */}
            <Route path="premium" element={<PremiumPage />} />
            
            {/* Kalkylator */}
            <Route path="kalkylator" element={<FinancingCalculatorPage />} />
            <Route path="kalkylator/:slug" element={<FinancingCalculatorPage />} />
            
            {/* Static fallback */}
            <Route path="*" element={<StaticRedirect />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
