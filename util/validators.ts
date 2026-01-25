// import * as z from "zod";

// // export interface ServerProductProps {
// //   id: string;
// //   name: string;
// //   slug: string;
// //   category: string;
// //   images: string[];
// //   brand: string;
// //   description: string;
// //   stock: number;
// //   price: number;
// //   rating: number;
// //   numReviews: number;
// //   isFeatured: boolean;
// //   banner: string | null;
// //   createdAt: string;
// // }

// export const insertProductSchema = z.object({
//   name: z.string().min(1, "Product name is required"),
//   slug: z.string().min(1, "Slug is required"),
//   description: z.string().min(1, "Description is required"),
//   brand: z.string().min(1, "Brand is required"),
//   category: z.string().min(1, "Category is required"),
//   price: z.number().nonnegative("Price cannot be negative"),
//   unitQty: z.coerce.number().nonnegative("Unit Quantity can not be negative"),
//   stock: z.number().min(0, "Stock cannot be negative"),
//   images: z.array(z.string()).min(1, "At least one image is required"),
//   banner: z.string().nullable(),
//   isFeatured: z.boolean(),
// });

// export const cartItemSchema = z.object({
//   productId: z.string().min(1, "Product ID is required"),
//   name: z.string().min(1, "Product name is required"),
//   slug: z.string().min(1, "Slug is required"),
//   image: z.string().min(1, "Image is required"),
//   price: z.number().nonnegative("Price cannot be negative"),
//   unitQty: z.coerce.number().nonnegative("Unit Quantity can not be negative"),
//   qty: z.number().int().nonnegative("Quantity must be at least 1"),
// });

// export const insertCartSchema = z.object({
//   items: z.array(cartItemSchema).min(1, "Cart must have at least one item"),
//   itemsPrice: z.number().nonnegative("Items price cannot be negative"),
//   totalPrice: z.number().nonnegative("Total price cannot be negative"),
//   shippingPrice: z.number().nonnegative("Shipping price cannot be negative"),
//   taxPrice: z.number().nonnegative("Tax price cannot be negative"),
//   sessionCartId: z.string().min(1, "Session cart ID is required"),
//   userId: z.string().optional().nullable(),
// });

// // Schema for signing the user
// export const signInFormSchema = z.object({
//   email: z
//     .string()
//     .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
//   password: z.string().min(4, "Password should be atleast 4 characters"),
// });

// // Schema for signing up a user

// export const signUpFormSchema = z
//   .object({
//     name: z.string().min(3, "Minimum 3 characters are required for the name"),
//     email: z
//       .string()
//       .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
//     password: z.string().min(4, "Password should be atleast 4 characters"),
//     confirmPassword: z
//       .string()
//       .min(4, "Confirm password should be atleast 4 characters"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Confirm password donot matched.",
//     path: ["confirmPassword"],
//   });

// // Schema for the shipping address
// export const shippingAddressSchema = z.object({
//   fullName: z.string().min(3, "Name must be at least 3 characters"),
//   phone: z.string().regex(/^\d{10}$/, "Invalid phone number"),
//   streetAddress: z.string().min(3, "Address must be at least 3 characters"),
//   city: z.string().min(3, "City must be at least 3 characters"),
//   postalCode: z.string().min(3, "Postal code must be at least 3 characters"),
//   country: z.string().min(3, "Country must be at least 3 characters"),
//   lat: z.number().optional(),
//   lng: z.number().optional(),
// });

// export const userSchema = z.object({
//   name: z.string().optional(),
//   email: z
//     .string()
//     .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
//   phone: z.string().regex(/^\d{10}$/, "Phone numbers should be 10 digits"),
//   password: z.string().optional(),
//   role: z.string(),
//   address: z.array(shippingAddressSchema).optional(),
//   paymentMethod: z.string().optional(),
//   image: z.string().optional(),
// });

// export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
//   ? process.env.PAYMENT_METHODS.split(",").map(m => m.trim())
//   : ["CashOnDelivery"];

// export const DEFAULT_PAYMENT_METHOD =
//   process.env.DEFAULT_PAYMENT_METHOD || "CashOnDelivery";


// export const paymentMethodSchema = z
//   .object({
//     type: z.string().min(1, "Payment method is required"),
//   })
//   .refine((data) => PAYMENT_METHODS.includes(data.type), {
//     path: ["type"],
//     message: "Invalid payment method",
//   });


// // Schema for inserting orders

// export const insertOrderSchema = z.object({
//   userId: z.string().min(1, "User is requires"),
//   itemsPrice: z.number().nonnegative("Items price cannot be negative"),
//   shippingPrice: z.number().nonnegative("Shipping price cannot be negative"),
//   taxPrice: z.number().nonnegative("Tax price cannot be negative"),
//   totalPrice: z.number().nonnegative("Total price cannot be negative"),
//   paymentMethod: z.string().refine(data => PAYMENT_METHODS.includes(data), {
//     message: "Invalid payment method"
//   }),
//   shippingAddress: shippingAddressSchema

// })


// export const insertOrderItemSchema = z.object({
//   productId: z.string(),
//   slug: z.string(),
//   image: z.string(),
//   name: z.string(),
//   // Use z.string() or z.number() and refine it
//   price: z.number().nonnegative("Price cannot be negative"),
//   unitQty: z.coerce.number().nonnegative("Unit Quantity can not be negative"),
//   qty: z.number().int().positive("Quantity should be positive"),
// });



// // schema for updating user informations 

// export const userProfileUpdateSchema = z.object({
//   name: z.string().min(2, "Name must be 2 of atleast characters"),
//   email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
//   phone: z.string().regex(/^\d{10}$/, "Phone numbers should be 10 digits")
// })


import * as z from "zod";

export const insertProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  price: z.coerce.number().nonnegative("Price cannot be negative"),
  unitQty: z.coerce.number().nonnegative("Unit Quantity can not be negative"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  banner: z.string().optional(),
  isFeatured: z.boolean(),
});






// export const UpdateProductSchema = z.object({
//   id: z.string(),
//   name: z.string().min(1, "Name is required"),
//   slug: z.string().min(1, "Slug is required"),
//   description: z.string().min(1, "Description is required"),
//   brand: z.string().min(1, "Brand is required"),
//   category: z.string().min(1, "Category is required"),

//   // Use coerce to handle string inputs from the form
//   price: z.coerce.number().min(0),
//   unitQty: z.coerce.number().min(0),
//   stock: z.coerce.number().int().min(0),

//   images: z.array(z.string()).min(1, "At least one image is required"),
//   banner: z.string().optional().nullable().transform(val => val ?? undefined),

//   isFeatured: z.boolean().default(false),
//   isTaxable: z.boolean().optional(),

//   rating: z.coerce.number().min(0).max(5).optional(),
//   numReviews: z.coerce.number().int().nonnegative().optional(),

//   createdAt: z.coerce.date().optional(),
//   updatedAt: z.coerce.date().optional(),
// })


export const UpdateProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  brand: z.string(),
  category: z.string(),

  price: z.number(),
  unitQty: z.number(),
  stock: z.number(),

  images: z.array(z.string()),
  banner: z.string().optional(),

  isFeatured: z.boolean(),
  isTaxable: z.boolean().optional(),

  rating: z.number().optional(),
  numReviews: z.number().optional(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})


export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Product name is required"),
  slug: z.string().min(1, "Slug is required"),
  image: z.string().min(1, "Image is required"),
  price: z.coerce.number().nonnegative("Price cannot be negative"),
  unitQty: z.coerce.number().nonnegative("Unit Quantity can not be negative"),
  qty: z.coerce.number().int().nonnegative("Quantity must be at least 1"),
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema).min(1, "Cart must have at least one item"),
  itemsPrice: z.coerce.number().nonnegative("Items price cannot be negative"),
  totalPrice: z.coerce.number().nonnegative("Total price cannot be negative"),
  shippingPrice: z.coerce.number().nonnegative("Shipping price cannot be negative"),
  taxPrice: z.coerce.number().nonnegative("Tax price cannot be negative"),
  sessionCartId: z.string().min(1, "Session cart ID is required"),
  userId: z.string().optional().nullable(),
});

export const signInFormSchema = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: z.string().min(4, "Password should be atleast 4 characters"),
});

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Minimum 3 characters are required for the name"),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    password: z.string().min(4, "Password should be atleast 4 characters"),
    confirmPassword: z.string().min(4, "Confirm password should be atleast 4 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password donot matched.",
    path: ["confirmPassword"],
  });

export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().regex(/^\d{10}$/, "Invalid phone number"),
  streetAddress: z.string().min(3, "Address must be at least 3 characters"),
  city: z.string().min(3, "City must be at least 3 characters"),
  postalCode: z.string().min(3, "Postal code must be at least 3 characters"),
  country: z.string().min(3, "Country must be at least 3 characters"),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

export const userSchema = z.object({
  name: z.string().optional(),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone numbers should be 10 digits"),
  password: z.string().optional(),
  role: z.string(),
  address: z.array(shippingAddressSchema).optional(),
  paymentMethod: z.string().optional(),
  image: z.string().optional(),
});

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(",").map((m) => m.trim())
  : ["CashOnDelivery"];

export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || "CashOnDelivery";

export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, "Payment method is required"),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ["type"],
    message: "Invalid payment method",
  });

export const insertOrderSchema = z.object({
  userId: z.string().min(1, "User is requires"),
  itemsPrice: z.coerce.number().nonnegative(),
  shippingPrice: z.coerce.number().nonnegative(),
  taxPrice: z.coerce.number().nonnegative(),
  totalPrice: z.coerce.number().nonnegative(),
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
    message: "Invalid payment method",
  }),
  shippingAddress: shippingAddressSchema,
});

export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: z.coerce.number().nonnegative(),
  unitQty: z.coerce.number().nonnegative(),
  qty: z.coerce.number().int().positive("Quantity should be positive"),
});

export const userProfileUpdateSchema = z.object({
  name: z.string().min(2, "Name must be 2 of atleast characters"),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone numbers should be 10 digits"),
});
