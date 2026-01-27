// import { fetchProductBySlug } from "@/lib/actions/action-products";
// import { gemini, generateRecipePromptForProduct } from "@/lib/ai/server-ai";
// import RecipeTypewriter from "./recipe-typewriter"; // Import the animator
// import { unstable_cache } from "next/cache";

// async function AIRecipeSection({ slug }: { slug: string }) {
//   const product = await fetchProductBySlug(slug);
//   if (!product) return null;

//   const prompt = await generateRecipePromptForProduct({
//     productName: product.name,
//   });
//   // const recipeSuggested = await gemini({ prompt: prompt });
//   //
//   const getCachedRecipe = unstable_cache(
//     async (prompt: string) => {
//       return await gemini({ prompt });
//     },
//     ["recipe-suggestion"], // cache key prefix
//     {
//       revalidate: 3600, // 1 hour in seconds
//       tags: ["recipes"], // optional: for on-demand revalidation
//     },
//   );

//   // Usage
//   const recipeSuggested = await getCachedRecipe(prompt);

//   return (
//     <div className="container mx-auto px-4 md:px-6 mt-16">
//       <div className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-green-900/5 relative overflow-hidden">
//         {/* Decorative Background Element */}
//         <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-9xl">
//           🥗
//         </div>

//         <div className="flex items-center gap-4 mb-8">
//           <div className="bg-green-500 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200 text-white text-2xl">
//             👩‍🍳
//           </div>
//           <div className="flex flex-col">
//             <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tight">
//               Hey chef... here is your Try It Out!
//             </h2>
//             <span className="text-xs font-bold text-green-600 flex items-center gap-1">
//               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
//               Generating fresh ideas...
//             </span>
//           </div>
//         </div>

//         {/* Use the Typewriter Component here */}
//         <RecipeTypewriter text={recipeSuggested} />

//         <div className="mt-6 pt-4 border-t border-green-200 text-xs text-green-700 italic">
//           *Try this healthy recipe with our fresh {product.name}!
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AIRecipeSection;

import { fetchProductBySlug } from "@/lib/actions/action-products";
import { gemini, generateRecipePromptForProduct } from "@/lib/ai/server-ai";
import RecipeTypewriter from "./recipe-typewriter";
import { unstable_cache } from "next/cache";
import { Suspense } from "react";

// Separate the cached recipe function for better reusability
const getCachedRecipe = unstable_cache(
  async (productName: string) => {
    const prompt = await generateRecipePromptForProduct({
      productName,
    });
    return await gemini({ prompt });
  },
  ["recipe-suggestion"], // cache key prefix
  {
    revalidate: 3600, // 1 hour in seconds
    tags: ["recipes"], // optional: for on-demand revalidation
  },
);

async function AIRecipeSection({ slug }: { slug: string }) {
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 md:px-6 mt-16">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-600">Product not found</p>
        </div>
      </div>
    );
  }

  // Get cached recipe based on product name
  const recipeSuggested = await getCachedRecipe(product.name);

  return (
    <div className="container mx-auto px-4 md:px-6 mt-16">
      <div className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-green-900/5 relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-9xl select-none">
          🥗
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="bg-green-500 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200 text-white text-2xl">
            👩‍🍳
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tight">
              Hey chef... here&apos;s your Try It Out!
            </h2>
            <span className="text-xs font-bold text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Your AI companion
            </span>
          </div>
        </div>

        {/* Typewriter Component with Suspense fallback */}
        <Suspense
          fallback={
            <div className="flex items-center gap-2 text-green-600 mb-2 animate-pulse">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
              </div>
              <span className="text-sm font-medium">Generating recipe...</span>
            </div>
          }
        >
          <RecipeTypewriter text={recipeSuggested} />
        </Suspense>

        <div className="mt-6 pt-4 border-t border-green-200 text-xs text-green-700 italic">
          *Try this healthy recipe with our fresh {product.name}!
        </div>
      </div>
    </div>
  );
}

export default AIRecipeSection;
