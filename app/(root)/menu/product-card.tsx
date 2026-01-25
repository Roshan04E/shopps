// components/ProductCard.tsx
import AddToCart from "@/components/shared/header/add-to-cart";
import SmallProductCard from "@/components/ui/small-product-cart";
import { Product, cart } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  product,
  cart,
}: {
  product: Product;
  cart: cart;
}) {
  return (
    <div className="">
        {/* <div className="relative h-64 w-full overflow-hidden rounded-xl rounded-b-none">
            <Link href={`/product/${product.slug}`}>
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </Link>
        </div>

      <div className="space-y-3">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-base text-gray-800 hover:text-orange-500 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-orange-500 font-bold text-lg">₹{product.price}</p>
            <p className="text-xs text-gray-500">Stock: {product.stock}</p>
          </div>

          <AddToCart product={product} cart={cart} />
        </div>
      </div> */}

      <SmallProductCard product={product} cart={cart} />
    </div>
  );
}