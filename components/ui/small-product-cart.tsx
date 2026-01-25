import { cart, cartItem, Product} from "@/types";
import { formatINR, formatWeight } from "@/util/helpers";
import Link from "next/link";
import AddToCart from "../shared/header/add-to-cart";
import Image from "next/image";



// export interface ServerProductProps {
//   id: string;
//   name: string;
//   slug: string;
//   category: string;
//   images: string[];
//   brand: string;
//   description: string;
//   stock: number;
//   price: number;
//   rating: number;
//   numReviews: number;
//   isFeatured: boolean;
//   banner: string | null;
//   createdAt: string;
// }




function SmallProductCard({product, cart} : {product: Product, cart: cart}) {
  const {slug, name, brand, price, stock, images} = product;
  const qty = (cart?.items ?? [] as cartItem[]).find(curr => curr.productId === product.id)?.qty ?? 0;
  return (
    <div className="relative group rounded-3xl overflow-hidden cursor-pointer bg-white shadow-sm border border-slate-100 h-full flex flex-col">
    <div className="relative h-64 overflow-hidden">
      <Link href={`/product/${slug}`}>

        <Image src={images[0]} fill alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </Link>
    </div>
    <div className="p-4 flex flex-col justify-between h-1/2">
      <div className="flex justify-between items-center">
        <Link href={`/product/${slug}`}>

          <h4 className="font-bold text-slate-900">{name}</h4>
          <p className="text-xs text-slate-500">{brand}</p>
        </Link>
      {qty > 0 && <div className="z-10 bg-[#f3f6f2] py-1 px-2">In Cart : {qty}</div>}

      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex gap-2 items-center justify-center">
          <span className="font-bold text-orange-600">{formatINR(price)} </span>
          <span className="text-muted-foreground"> / {formatWeight(product.unitQty)}</span>
          <span className={`bg-gray-50 py-1 px-3 rounded text-sm  text-gray-500`}>Stock: {stock}</span>
        </div>
        <AddToCart varient="small" product={product} cart={cart}/>
      </div>
    </div>
  </div>
  )
}

export default SmallProductCard;
