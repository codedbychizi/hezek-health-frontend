import { Link } from 'react-router-dom';
import SEO from '../../seo/SEO.jsx';
import Container from '../../components/common/Container.jsx';

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found" />
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <span className="font-display text-8xl font-bold text-brand-teal/30">404</span>
        <h1 className="mt-4 font-display text-2xl font-bold text-brand-blue sm:text-3xl">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-brand-ink/60">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:bg-brand-blue-dark"
          >
            Go to Homepage
          </Link>
          <Link
            to="/medical-request"
            className="rounded-full border border-brand-blue/20 px-6 py-3 text-sm font-semibold text-brand-blue hover:bg-brand-mist"
          >
            Submit a Medical Request
          </Link>
        </div>
      </Container>
    </>
  );
}