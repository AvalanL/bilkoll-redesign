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
          
          {/* Fallbacks for other routes mentioned in the brief */}
          <Route path="besiktning/:brand?/:model?" element={<Home />} />
          <Route path="skatt/:brand?/:model?/:year?" element={<Home />} />
          <Route path="vardering/:brand?/:model?/:year?" element={<Home />} />
          <Route path="forsakring/:brand?/:model?" element={<Home />} />
          <Route path="dack/:brand?/:model?" element={<Home />} />
          <Route path="service/:brand?/:model?" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}
