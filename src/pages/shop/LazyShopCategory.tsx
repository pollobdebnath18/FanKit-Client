import { lazy, Suspense } from "react";
import PageLoader from "../../components/loader/PageLoader";

const ShopCategory = lazy(() => import("./ShopCategory"));

const LazyShopCategory = () => (
  <Suspense fallback={<PageLoader />}>
    <ShopCategory />
  </Suspense>
);

export default LazyShopCategory;
