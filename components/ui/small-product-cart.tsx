import { cart, cartItem, Product } from "@/types";
import { formatINR, formatWeight } from "@/util/helpers";
import Link from "next/link";
import AddToCart from "../shared/header/add-to-cart";
import Image from "next/image";

function SmallProductCard({ product, cart }: { product: Product; cart: cart }) {
  const { slug, name, brand, price, stock, images } = product;
  const qty =
    (cart?.items ?? ([] as cartItem[])).find(
      (curr) => curr.productId === product.id,
    )?.qty ?? 0;

  return (
    <div className="relative group rounded-3xl overflow-hidden cursor-pointer bg-white shadow-lg shadow-[#8b9c8f]/10 border border-[#8b9c8f]/20 hover:shadow-xl hover:shadow-[#8b9c8f]/20 transition-all duration-300 h-full flex flex-col">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Link href={`/product/${slug}`}>
          <Image
            src={images[0]}
            fill
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-110"
          />
        </Link>

        {/* Subtle overlay on hover - hidden on mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d3e2d]/20 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-1/2">
        <div className="flex justify-between items-start gap-2">
          <Link href={`/product/${slug}`} className="flex-1">
            <h4 className="font-bold text-[#2d3e2d] group-hover:text-[#7fb069] transition-colors duration-300">
              {name}
            </h4>
            <p className="text-xs text-[#6d8666] mt-1">{brand}</p>
          </Link>

          {/* In Cart Badge */}
          {qty > 0 && (
            <div className="z-10 bg-gradient-to-r from-[#f0f4ee] to-[#e8ede6] border border-[#8b9c8f]/30 py-1 px-2 rounded-full text-xs font-semibold text-[#5f7d5a]">
              In Cart: {qty}
            </div>
          )}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between mt-3 gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-baseline">
              <span className="font-bold text-lg text-[#7fb069]">
                {formatINR(price)}
              </span>
              <span className="text-xs text-[#6d8666]">
                / {formatWeight(product.unitQty)}
              </span>
            </div>
            <span className="bg-[#f0f4ee] py-1 px-2 rounded-full text-xs font-medium text-[#5f7d5a] inline-flex items-center gap-1 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7fb069]"></span>
              Stock: {stock}
            </span>
          </div>

          {/* Add to Cart Button */}
          <AddToCart varient="small" product={product} cart={cart} />
        </div>
      </div>
    </div>
  );
}

export default SmallProductCard;
