import AddToCart from "@/components/shared/header/add-to-cart";
import Header from "@/components/shared/header/header"
import { Button } from "@/components/button";
import Spinner from "@/components/ui/spinner";
import { fetchProductBySlug } from "@/lib/actions/action-products"
import { formatINR, formatWeight } from "@/util/helpers";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import { getMyCart } from "@/lib/actions/action-cart";
import Image from "next/image";
import { cart } from "@/types";
import NotFound from "@/app/not-found";
import Link from "next/link";
import { BiLogoWhatsapp } from "react-icons/bi";
import { auth } from "@/auth";

async function ProductContent({ slug, cart }: { slug: string, cart: cart }) {
    const session = await auth()
    const product = await fetchProductBySlug(slug);
    const message = `Hi, I am ${session?.user.name} and can you show me photos of ${product.name}\n`

    const url = `https://wa.me/916200020159?text=${encodeURIComponent(message)}`

    // console.log(product);


    if (!product) {
        return <NotFound />;
    }



    return (
        <>

            <section className="pt-28 pb-16">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10">

                    {/* Image */}
                    <div className="relative h-72 md:h-105 rounded-2xl overflow-hidden bg-white/70 backdrop-blur-md border border-white/20">
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col gap-5 py-2 md:py-10">
                        <span className="text-sm text-orange-600 font-medium">
                            {product.category}
                        </span>

                        <h1 className="text-3xl font-bold text-slate-900">
                            {product.name}
                        </h1>

                        <p className="text-slate-600 whitespace-pre-line">
                            {product.description}
                        </p>

                        <div className="flex items-center gap-4">
                            <span className="text-2xl font-semibold text-orange-500">
                                {formatINR(product.price)}
                            </span>
                            <span className="text-muted-foreground">/ {formatWeight(product.unitQty)}</span>
                            <span className="text-sm text-slate-500">
                                ⭐ {product.rating} ({product.numReviews} reviews)
                            </span>
                        </div>

                        <div className="text-sm text-slate-600">
                            {product.stock > 0 ? `In stock: ${product.stock} Kgs` : "Out of stock"}
                        </div>

                        <div className="flex gap-2">
                        <AddToCart cart={cart} product={product} />
                            <Button variant='green' >
                                <Link
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="flex gap-2 items-center  justify-center">
                                        <span>Request live images on whatsapp</span><BiLogoWhatsapp className='h-6 w-6' />
                                    </div>
                                </Link>
                            </Button>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}


async function ProductPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const cart = await getMyCart();

    return (
        <>
            {/* <Header cart={cart} /> */}

            <Suspense fallback={
                <div className="flex justify-center items-center h-96">
                    <Spinner />
                </div>
            }>
                <ProductContent slug={slug} cart={cart} />
            </Suspense>
        </>
    )
}

export default ProductPage
