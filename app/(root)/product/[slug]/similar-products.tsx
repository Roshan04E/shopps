"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FadeInSection } from "@/components/ui/fade-in-section";
import { Button } from "@/components/button";
import Spinner from "@/components/ui/spinner";
import SmallProductCard from "@/components/ui/small-product-cart";
import { fetchSimilarProducts } from "@/lib/actions/action-products";
import { cart, Product } from "@/types";

function SimilarProducts({
  cart,
  category,
  productId,
}: {
  cart: cart;
  category: string;
  productId: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchSimilarProducts(category, productId);

        setProducts(res);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [category, productId]);

  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <FadeInSection className="flex justify-between items-end mb-12">
          <div>
            <span className="text-orange-600 font-semibold uppercase text-sm">
              You may also like
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              Similar Products
            </h2>
          </div>
          <Link href="/menu">
            <Button variant="outline" className="hidden md:flex">
              View All
            </Button>
          </Link>
        </FadeInSection>

        {isLoading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <SmallProductCard
                key={product.id}
                product={product}
                cart={cart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default SimilarProducts;
