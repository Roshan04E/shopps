'use server';

import { toPlain } from "@/util/helpers";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import z from "zod";
import { insertProductSchema } from "@/util/validators";
import { Product } from "@/types";

export async function fetchLatestProducts() {
    // fetch 4 latest products from the database
    const latestProducts = await prisma.products.findMany({
        take: 4,
        orderBy: {
            updatedAt: 'desc',
        },
    });

    return latestProducts.map(product => (toPlain({
    ...product,
    unitQty: product.unitQty.toNumber(),
    price: product.price.toNumber(), // Convert Decimal to number
    rating: product.rating.toNumber(), // Convert Decimal to number
    createdAt: product.createdAt.toISOString(), // Convert Date to string
    updatedAt: product.updatedAt.toISOString()
  })))
}

export async function fetchProductBySlug(slug:string){
    // console.log(slug);
    
    const product = await prisma.products.findUnique({
        where: { 
            slug: slug 
        },
    });

    // console.log(product?.unitQty.toNumber());
    

    if (product) return toPlain({
    ...product,
    unitQty: product.unitQty.toNumber(),
    price: product.price.toNumber(), // Convert Decimal to number
    rating: product.rating.toNumber(), // Convert Decimal to number
    createdAt: product.createdAt.toISOString(), // Convert Date to string
    updatedAt: product.updatedAt.toISOString()
  })

}

export async function getProductById(id:string){
    // console.log(slug);
    
    const product = await prisma.products.findUnique({
        where: { 
            id: id
        },
    });

    // console.log(product?.unitQty.toNumber());
    

    if (product) return toPlain({
    ...product,
    unitQty: product.unitQty.toNumber(),
    price: product.price.toNumber(), // Convert Decimal to number
    rating: product.rating.toNumber(), // Convert Decimal to number
    createdAt: product.createdAt.toISOString(), // Convert Date to string
    updatedAt: product.updatedAt.toISOString()
  })

}


// get all products
export async function getAllProducts({page = 1, limit = 8, category, query}: {page: number, limit: number, category?: string, query?: string}) {
    const data = await prisma.products.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
            createdAt: 'desc'
        }
    }); // data

    const dataCount = await prisma.products.count();

    return toPlain({
        data,
        totalPages: Math.ceil(dataCount / limit)
    })
}



export async function searchProducts({
  query = '',
  category,
  page = 1,
  limit = 12
}: {
  query?: string;
  category?: string;
  page?: number;
  limit?: number;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = { AND: [] }

  if (query) {
    where.AND.push({
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { category: { contains: query, mode: 'insensitive' } }
      ]
    })
  }

  if (category) where.AND.push({ category })

  const [products, count] = await Promise.all([
    prisma.products.findMany({
      where: where.AND.length > 0 ? where : {},
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.products.count({ where: where.AND.length > 0 ? where : {} })
  ])

  return toPlain({
    data: products,
    totalPages: Math.ceil(count / limit),
    totalResults: count
  })
}

// delete product by id

export async function deleteProductById(id: string) {
   try {
     await prisma.products.delete({
         where: {
             id: id
         }
     }) // await 

     revalidatePath('/admin/products')

     return {
        success: true,
        message: `Product id #${id.slice(-6)} has been deleted`
     }
   } catch (error) {
    console.log(error);
    return {
        success: false,
        message: "Error occured while deleting the product"
    }
    
   }
}

// Create new product

export async function createNewProduct(data: z.infer<typeof insertProductSchema>) {
    try {

        const product = insertProductSchema.parse(data)

        await prisma.products.create({
            data: product
        })

        revalidatePath('/admin/products')

        return {
            success: true,
            message: `${product.name} has been added to database`
        }


    } catch (error) {
        console.log(error);
        return {
        success: false,
        message: "Error occured while creating the product"
    }
    }
}

// Update new product

export async function updateProduct(data: Product) {
    try {

        await prisma.products.update({
            where: {
                id: data.id
            },
            data: data
        })

        revalidatePath('/admin/products')

        return {
            success: true,
            message: `[+] ${data.name} has been updated successfully`
        }


    } catch (error) {
        console.log(error);
        return {
        success: false,
        message: "Error occured while creating the product"
    }
    }
}