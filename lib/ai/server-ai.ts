"use server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

// export async function gemini({ prompt }: { prompt: string }) {
//   const response = await ai.models.generateContent({
//     model: "gemini-3-flash-preview",
//     contents: prompt,
//   });
//   return response.text;
// }

export async function gemini({ prompt }: { prompt: string }) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite", // updated model
      contents: prompt,
    });

    if (!response || !response.text) {
      return "Humare special recipes load ho rahe hain, kripya thodi der baad dekhein.";
    }

    return response.text;
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return "Aaj ki taaza recipe thodi der mein dikhegi. Tab tak fresh veggies order karein!";
  }
}

export async function geminiStream({ prompt }: { prompt: string }) {
  try {
    const stream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return stream; // this is a ReadableStream of chunks
  } catch (error: any) {
    console.error("Gemini Stream Error:", error);
    return null;
  }
}

// export async function generateRecipePromptForProduct({
//   productName,
// }: {
//   productName: string;
// }) {
//   return `
// You are a warm, experienced Indian mother and home cook (like a "Maasi" or "Dadi"). You are teaching a neighbor how to cook ${productName} in a simple, middle-class Indian kitchen.

// PRODUCT: ${productName}

// RULES:
// - Language: Use "Hinglish" (Simple English mixed with common Hindi words like Kadhai, Tadka, Masala, Swaad, Seeti).
// - Tone: Helpful, encouraging, and focused on "Bachhat" (saving money/time) and "Sehat" (health).
// - Equipment: ONLY Gas Stove and Pressure Cooker. No Oven, Microwave, or Air Fryer.
// - Ingredients: Only use things found in a basic Indian spice box (Masala Danni).

// Output the following TWO sections:

// ====================
// 1. JALDI WALI RECIPE (Quick Version)
// ====================
// Dish Name: [Catchy Name in English + Hindi Script, e.g., Chatpata ${productName} (चटपटा ${productName})]

// - Ekdum simple 3-4 steps recipe for busy mornings.
// - Focus on using a Pressure Cooker if it saves time.
// - Max 60 words.

// --------------------
// 2. TARIKE SE (Detailed Version)
// --------------------
// [Dish Name in Hindi Script]

// Prep Time: [X mins] | Servings: [X people]

// Ingredients:
// - List with common quantities (e.g., 1 Chammach, Ek katori).
// - Use dash (-) points.

// Step-by-Step Method:
// - Numbered steps (1-6).
// - Explain like you are standing next to them (e.g., "Jab tak tel na chhootne lage," "Ek seeti aane tak").
// - Keep sentences short.

// Dadi Maa Ke Nuskhe (Special Tips):
// - 2 secret tips to make it tastier or how to use leftovers.
// - Suggest what to eat it with (Roti, Chawal, or Paratha).

// Output only the recipe content without any AI preamble.`;
// }

export async function generateRecipePromptForProduct({
  productName,
}: {
  productName: string;
}) {
  return `You are a helpful Indian kitchen expert and friendly neighbor sharing recipes with Indian housewives.

**RECIPE REQUIREMENTS:**

**Product:** ${productName}

**Recipe Structure:**
1. **Dish Name:** Create a catchy, appealing name (e.g., "Chatpata ${productName}" or "Masaledar ${productName}")

2. **Ingredients (4-5 items only):**
   - Use only common Indian kitchen staples
   - Items that are readily available in every home

3. **Method (Maximum 6 steps):**
   - Write in simple "Do this, then do that" style
   - Each step should be one clear action
   - Focus on gas stove or pressure cooker cooking

**STYLE GUIDELINES:**
- **Language:** Mix simple Hinglish language with common Hindi cooking terms (Kadhai, Masala, Tadka, Seeti, Haldi, Jeera)
- **Tone:** Warm, encouraging, like talking to a friend
- **Length:** Keep TOTAL response under 120 words
- **Equipment:** Only gas stove, pressure cooker, kadhai - NO ovens or fancy gadgets

**AVOID:**
- Complex techniques or restaurant-style garnishes
- Uncommon ingredients
- Long cooking times
- Oven baking or air frying

Write the recipe now in a simple, easy-to-follow format that any housewife can quickly understand and cook.`;
}

export async function getYouTubeRecipes(productName: string) {
  try {
    const query = encodeURIComponent(
      `${productName} ki sabji recipe in hindi simple housewife style`,
    );
    const apiKey = process.env.YOUTUBE_API_KEY;
    const maxResults = 6;

    // Added videoDuration=medium to filter out Shorts (< 1 min)
    // medium = 4 to 20 minutes (perfect for cooking videos)
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=${maxResults}&type=video&videoEmbeddable=true&videoDuration=medium&key=${apiKey}`,
    );

    const data = await response.json();

    if (!data.items) {
      console.error("YouTube Error:", data);
      return [];
    }

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      channel: item.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  } catch (error) {
    console.error("YouTube Fetch Error:", error);
    return [];
  }
}

//
//
//
//
//
// @/lib/ai/server-ai.ts
export async function claudeStream({ prompt }: { prompt: string }) {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.body;
  } catch (error: any) {
    console.error("Claude Stream Error:", error);
    return null;
  }
}
