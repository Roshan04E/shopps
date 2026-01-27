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
        {/* Image with Glass Effect */}
        <div className="relative aspect-square md:aspect-auto md:h-125 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 bg-white border border-white">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider mb-2">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-4 py-2">
            <span className="text-3xl font-bold text-green-600">
              {formatINR(product.price)}
            </span>
            <span className="text-lg text-slate-400 font-medium">
              / {formatWeight(product.unitQty)}
            </span>
          </div>

          <p className="text-slate-600 text-lg leading-relaxed border-l-4 border-orange-200 pl-4 italic">
            {product.description}
          </p>

          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span className="flex items-center gap-1">⭐ {product.rating}</span>
            <span className="text-slate-400">•</span>
            <span>{product.numReviews} reviews</span>
            <span className="text-slate-400">•</span>
            <span
              className={product.stock > 0 ? "text-green-600" : "text-red-600"}
            >
              {product.stock > 0
                ? `In stock: ${product.stock} Kgs`
                : "Out of stock"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <div className="flex-1">
              <AddToCart cart={cart} product={product} />
            </div>
            <Button
              variant="green"
              className="h-12 px-8 rounded-xl shadow-lg shadow-green-100"
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
