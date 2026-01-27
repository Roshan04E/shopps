import { Suspense } from "react";
import { getMyCart } from "@/lib/actions/action-cart";
import Spinner from "@/components/ui/spinner";
import ProductHero from "./product-hero";
import AIRecipeSection from "./ai-recipe-section";
import YouTubeSection from "./youtube-section";
import SimilarProducts from "./similar-products";
import { fetchProductBySlug } from "@/lib/actions/action-products";

async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const cart = await getMyCart();
  const product = await fetchProductBySlug(slug);

  return (
    <section className="pt-20 md:pt-28 pb-16 bg-slate-50/50">
      {/* Product Hero - Loads First */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-96">
            <Spinner />
          </div>
        }
      >
        <ProductHero slug={slug} cart={cart} product={product} />
        <SimilarProducts
          productId={product.id}
          category={product.category}
          cart={cart}
        />
      </Suspense>

      {/* AI Recipe - Loads Second */}
      <Suspense
        fallback={
          <div className="container mx-auto px-4 md:px-6 mt-16">
            <div className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-green-900/5 animate-pulse">
              <div className="h-8 bg-green-200 rounded w-1/3 mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-green-100 rounded w-full"></div>
                <div className="h-4 bg-green-100 rounded w-5/6"></div>
                <div className="h-4 bg-green-100 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        }
      >
        <AIRecipeSection slug={slug} />
      </Suspense>

      {/* YouTube Videos - Loads Third */}
      <Suspense
        fallback={
          <div className="container mx-auto px-4 md:px-6 mt-16">
            <div className="h-8 bg-slate-200 rounded w-1/4 mb-8 animate-pulse"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 animate-pulse"
                >
                  <div className="aspect-video bg-slate-200"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <YouTubeSection slug={slug} />
      </Suspense>
    </section>
  );
}

export default ProductPage;
