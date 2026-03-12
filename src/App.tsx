import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import BrandPage from './pages/BrandPage';
import ModelYearPage from './pages/ModelYearPage';
import SearchPage from './pages/SearchPage';
import MarketPage from './pages/MarketPage';
import ReportLandingPage from './pages/ReportLandingPage';
import ReportViewPage from './pages/ReportViewPage';
import GuidePage from './pages/GuidePage';
import PremiumPage from './pages/PremiumPage';

/**
 * For routes not handled by the SPA (guides, besiktning, skatt, etc.),
 * force a full page reload so the server can serve the static HTML.
 */
function StaticRedirect() {
  // Force a server-side navigation for non-SPA routes
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
          <Route path="bil/:brand" element={<BrandPage />} />
          <Route path="bil/:brand/:model" element={<ModelYearPage />} />
          <Route path="bil/:brand/:model/:year" element={<ModelYearPage />} />
          <Route path="sok" element={<SearchPage />} />
          <Route path="marknad" element={<MarketPage />} />
          <Route path="rapport/:brand/:model" element={<ReportLandingPage />} />
          <Route path="rapport/visa/:token" element={<ReportViewPage />} />
          <Route path="guide/:slug" element={<GuidePage />} />
          <Route path="premium" element={<PremiumPage />} />
          
          {/* Routes served by static HTML — redirect to server */}
          <Route path="*" element={<StaticRedirect />} />
        </Route>
      </Routes>
    </Router>
  );
}
