// --- Types & Interfaces ---

import { cartItemSchema, insertCartSchema, insertOrderItemSchema, insertOrderSchema, insertProductSchema, shippingAddressSchema, userProfileUpdateSchema, userSchema } from "@/util/validators";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import z from "zod";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'glass' | 'green';
  className?: string;
}

export interface Nav {
  menu: string,
  link: string
}


export interface FeatureProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}

export interface ProductProps {
  img: string;
  title: string;
  price: string;
  unitQty: string;
  farm?: string;
}

export interface ReviewProps {
  name: string;
  role: string;
  text: string;
}

export interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
}

export interface ServerProductProps {
  id: string;
  name: string;
  slug: string;
  category: string;
  images: string[];
  brand: string;
  description: string;
  stock: number;
  price: number;
  unitQty: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  banner: string | null;
  createdAt: Date;
}

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating?: number;
  numReviews?: number;
  createdAt?: Date;
}


export type Cart = z.infer<typeof insertCartSchema>


export type cart = z.infer<typeof insertCartSchema> & {
  id: string
};
export type cartItem = z.infer<typeof cartItemSchema>;
export type shippingAddress = z.infer<typeof shippingAddressSchema>

export type user = z.infer<typeof userSchema> & {
  id:string,
  emailVerified: Date,
  createdAt: Date,
  updatedAt: Date,
}

export type orderItem = z.infer<typeof insertOrderItemSchema>
export type order = z.infer<typeof insertOrderSchema> & {
  id: string,
  createdAt: Date,
  isPaid: boolean,
  paidAt: Date | null,
  isDelivered: boolean,
  deliveredAt: Date | null,
  orderItems: orderItem[],
  user: {name: string, email: string}
}

export type userProfileUpdate = z.infer<typeof userProfileUpdateSchema>

export type DashboardData = {
  ordersCount: number,
  usersCount: number,
  productsCount: number,

  totalSales: string,

  salesData: {
    month: string
    totalSales: number
  }[],

  latestSales: {
    id: string
    userId: string
    shippingAddress: object
    paymentMethod: string
    paymentResult: object | null
    itemsPrice: string
    shippingPrice: string
    taxPrice: string
    totalPrice: string
    isPaid: boolean
    paidAt: string | null
    isDelivered: boolean
    deliveredAt: string | null
    createdAt: string
    user: user
  }[]
}

export type PaginatedOrders = {
  data: {
    id: string
    userId: string
    shippingAddress: object
    paymentMethod: string
    paymentResult: object | null
    itemsPrice: string
    shippingPrice: string
    taxPrice: string
    totalPrice: string
    isPaid: boolean
    paidAt: string | null
    isDelivered: boolean
    deliveredAt: string | null
    createdAt: string
    user: {
      name: string
      email: string
      phone: string
    }
  }[]
  totalPages: number
}

