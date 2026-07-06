import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import AdminLayout from '../components/admin/AdminLayout.jsx';

// ─── Lazy public pages ────────────────────────────────────────────────────────
const PlaceholderPage    = lazy(() => import('../pages/PlaceholderPage.jsx'));
const HomePage           = lazy(() => import('../pages/public/HomePage.jsx'));
const AboutPage          = lazy(() => import('../pages/public/AboutPage.jsx'));
const ServicesPage       = lazy(() => import('../pages/public/ServicesPage.jsx'));
const SpecialtiesPage    = lazy(() => import('../pages/public/SpecialtiesPage.jsx'));
const CountriesPage      = lazy(() => import('../pages/public/CountriesPage.jsx'));
const CountryDetailPage  = lazy(() => import('../pages/public/CountryDetailPage.jsx'));
const HospitalsPage      = lazy(() => import('../pages/public/HospitalsPage.jsx'));
const HospitalDetailPage = lazy(() => import('../pages/public/HospitalDetailPage.jsx'));
const HowItWorksPage     = lazy(() => import('../pages/public/HowItWorksPage.jsx'));
const MedicalRequestPage = lazy(() => import('../pages/public/MedicalRequestPage.jsx'));
const BlogListPage       = lazy(() => import('../pages/public/BlogListPage.jsx'));
const BlogPostPage       = lazy(() => import('../pages/public/BlogPostPage.jsx'));
const FAQPage            = lazy(() => import('../pages/public/FAQPage.jsx'));
const PrivacyPolicyPage  = lazy(() => import('../pages/public/PrivacyPolicyPage.jsx'));
const TermsPage          = lazy(() => import('../pages/public/TermsPage.jsx'));

// ─── Lazy admin pages ─────────────────────────────────────────────────────────
const AdminLogin       = lazy(() => import('../pages/admin/AdminLogin.jsx'));
const AdminDashboard   = lazy(() => import('../pages/admin/AdminDashboard.jsx'));
const AdminRequests    = lazy(() => import('../pages/admin/AdminRequests.jsx'));
const AdminBlog        = lazy(() => import('../pages/admin/AdminBlog.jsx'));
const AdminBlogEditor  = lazy(() => import('../pages/admin/AdminBlogEditor.jsx'));
const AdminHospitals   = lazy(() => import('../pages/admin/AdminHospitals.jsx'));
const AdminCountries   = lazy(() => import('../pages/admin/AdminCountries.jsx'));
const AdminSpecialties = lazy(() => import('../pages/admin/AdminSpecialties.jsx'));
const AdminTestimonials= lazy(() => import('../pages/admin/AdminTestimonials.jsx'));
const AdminFAQs        = lazy(() => import('../pages/admin/AdminFAQs.jsx'));
const AdminMessages    = lazy(() => import('../pages/admin/AdminMessages.jsx'));
const AdminNewsletter  = lazy(() => import('../pages/admin/AdminNewsletter.jsx'));
const AdminSettings    = lazy(() => import('../pages/admin/AdminSettings.jsx'));

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-blue/20 border-t-brand-teal" />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ── Public ── */}
        <Route path="/"               element={<HomePage />} />
        <Route path="/about"          element={<AboutPage />} />
        <Route path="/services"       element={<ServicesPage />} />
        <Route path="/specialties"    element={<SpecialtiesPage />} />
        <Route path="/specialties/:slug" element={<PlaceholderPage title="Specialty Detail" />} />
        <Route path="/countries"      element={<CountriesPage />} />
        <Route path="/countries/:slug"element={<CountryDetailPage />} />
        <Route path="/hospitals"      element={<HospitalsPage />} />
        <Route path="/hospitals/:id"  element={<HospitalDetailPage />} />
        <Route path="/how-it-works"   element={<HowItWorksPage />} />
        <Route path="/medical-request"element={<MedicalRequestPage />} />
        <Route path="/blog"           element={<BlogListPage />} />
        <Route path="/blog/:slug"     element={<BlogPostPage />} />
        <Route path="/contact"        element={<PlaceholderPage title="Contact Us" />} />
        <Route path="/faq"            element={<FAQPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms"          element={<TermsPage />} />

        {/* ── Admin login (no sidebar layout) ── */}
        <Route path="/admin/login"    element={<AdminLogin />} />

        {/* ── Admin (sidebar layout, all protected) ──
            AdminLayout renders <Outlet /> so every child route
            appears inside the sidebar+topbar shell automatically. */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index            element={<AdminDashboard />} />
          <Route path="requests"  element={<AdminRequests />} />
          <Route path="blog"      element={<AdminBlog />} />
          <Route path="blog/new"  element={<AdminBlogEditor />} />
          <Route path="blog/:id/edit" element={<AdminBlogEditor />} />
          <Route path="hospitals" element={<AdminHospitals />} />
          <Route path="countries" element={<AdminCountries />} />
          <Route path="specialties" element={<AdminSpecialties />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="faqs"      element={<AdminFAQs />} />
          <Route path="messages"  element={<AdminMessages />} />
          <Route path="newsletter"element={<AdminNewsletter />} />
          <Route path="settings"  element={<AdminSettings />} />
        </Route>

        {/* ── 404 ── */}
        <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
      </Routes>
    </Suspense>
  );
}