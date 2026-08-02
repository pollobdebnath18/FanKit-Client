import { lazy, Suspense } from "react";
import PageLoader from "../../components/loader/PageLoader";

const OffersPage = lazy(() => import("./OffersPage"));

const LazyOffersPage = () => (
  <Suspense fallback={<PageLoader />}>
    <OffersPage />
  </Suspense>
);

export default LazyOffersPage;
