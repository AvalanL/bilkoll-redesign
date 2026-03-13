import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import BrandsIndexPage from './pages/BrandsIndexPage';
import BrandPage from './pages/BrandPage';
import ModelYearPage from './pages/ModelYearPage';
import SearchPage from './pages/SearchPage';
import MarketPage from './pages/MarketPage';
import ReportLandingPage from './pages/ReportLandingPage';
import ReportViewPage from './pages/ReportViewPage';
import GuidePage from './pages/GuidePage';
import GuidesIndexPage from './pages/GuidesIndexPage';
import PremiumPage from './pages/PremiumPage';
import BesiktningPage from './pages/BesiktningPage';
import BesiktningModelPage from './pages/BesiktningModelPage';

function StaticRedirect() {
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
  return null;
}

export default function App() {
  return (
    <Router>
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
          
          {/* Static fallback */}
          <Route path="*" element={<StaticRedirect />} />
        </Route>
      </Routes>
    </Router>
  );
}
