"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FadeInSection } from "../ui/fade-in-section";
import { Button } from "../button";
import SmallProductCard from "../ui/small-product-cart";
import {
  fetchLatestProducts,
  fetchProductBySlug,
} from "@/lib/actions/action-products";
import { formatINR } from "@/util/helpers";
import AddToCart from "../shared/header/add-to-cart";
import Spinner from "../ui/spinner";
import { cart, cartItem, Product } from "@/types";
import Link from "next/link";

function LatestProducts({ cart }: { cart: cart }) {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchLatestProducts();
        const featured = await fetchProductBySlug("fresh-potato");
        setLatestProducts(products);
        setFeaturedProduct(featured ?? null);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <section
      className="py-20 bg-gradient-to-b from-white to-[#f8f9f7]"
      id="menu"
    >
      <div className="container mx-auto px-6">
        <FadeInSection className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[#7fb069] font-semibold uppercase text-sm tracking-wide">
              Weekly Specials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d3e2d] mt-2">
              Fresh this Week
            </h2>
          </div>
          <Link href={"/menu"}>
            <Button variant="outline" className="hidden md:flex">
              View Full Menu
            </Button>
          </Link>
        </FadeInSection>

        {isLoading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 min-h-[600px]">
            {/* Featured Product */}
            {featuredProduct && (
              <div className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden shadow-xl shadow-[#8b9c8f]/10 group">
                <Image
                  src={featuredProduct.images[0]}
                  alt={featuredProduct.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 md:group-hover:scale-105"
                />

                {/* Gradient overlay with sage tones */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d3e2d]/30 via-[#2d3e2d]/20 to-transparent p-8 flex flex-col justify-end">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {featuredProduct.name}
                  </h3>
                  <p className="text-[#d4e0d1] mb-4 line-clamp-2">
                    {featuredProduct.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-xl font-bold">
                      {formatINR(featuredProduct.price)}
                    </span>
                    <AddToCart cart={cart} product={featuredProduct} />
                  </div>
                </div>
              </div>
            )}

            {/* Small cards */}
            {latestProducts.map((product) => (
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

export default LatestProducts;
