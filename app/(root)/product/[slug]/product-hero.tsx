import Image from "next/image";
import Link from "next/link";
import { BiLogoWhatsapp } from "react-icons/bi";
import { fetchProductBySlug } from "@/lib/actions/action-products";
import { formatINR, formatWeight } from "@/util/helpers";
import { cart, Product } from "@/types";
import NotFound from "@/app/not-found";
import { auth } from "@/auth";
import AddToCart from "@/components/shared/header/add-to-cart";
import { Button } from "@/components/button";

async function ProductHero({
  slug,
  cart,
  product,
}: {
  slug: string;
  cart: cart;
  product: Product;
}) {
  const session = await auth();

  if (!product) {
    return <NotFound />;
  }

  const message = `Hi, I am ${session?.user.name} and can you show me photos of ${product.name}\n`;
  const url = `https://wa.me/916200020159?text=${encodeURIComponent(message)}`;

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Image with Sage Border */}
        <div className="relative aspect-square md:aspect-auto md:h-125 rounded-3xl overflow-hidden shadow-2xl shadow-[#8b9c8f]/20 bg-white border-2 border-[#8b9c8f]/20 group">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 md:group-hover:scale-105"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          {/* Category Badge */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#f0f4ee] to-[#e8ede6] border border-[#8b9c8f]/30 text-[#5f7d5a] text-xs font-bold uppercase tracking-wider mb-2">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#2d3e2d] tracking-tight">
              {product.name}
            </h1>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 py-2">
            <span className="text-3xl font-bold text-[#7fb069]">
              {formatINR(product.price)}
            </span>
            <span className="text-lg text-[#6d8666] font-medium">
              / {formatWeight(product.unitQty)}
            </span>
          </div>

          {/* Description */}
          <p className="text-[#5a6b5a] text-lg leading-relaxed border-l-4 border-[#7fb069] pl-4 italic">
            {product.description}
          </p>

          {/* Rating & Stock Info */}
          <div className="flex items-center gap-3 text-sm text-[#5a6b5a]">
            <span className="flex items-center gap-1">⭐ {product.rating}</span>
            <span className="text-[#8b9c8f]">•</span>
            <span>{product.numReviews} reviews</span>
            <span className="text-[#8b9c8f]">•</span>
            <span
              className={
                product.stock > 0
                  ? "text-[#7fb069] font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {product.stock > 0
                ? `In stock: ${product.stock} Kgs`
                : "Out of stock"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <div className="flex-1">
              <AddToCart cart={cart} product={product} />
            </div>
            <Button
              variant="green"
              className="h-12 px-8 rounded-xl shadow-lg shadow-[#7fb069]/20 bg-gradient-to-r from-[#7fb069] to-[#88b04b] hover:shadow-xl hover:shadow-[#7fb069]/30 transition-all duration-300"
            >
              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <span className="font-bold">Live Photos (WhatsApp)</span>
                <BiLogoWhatsapp className="h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductHero;
