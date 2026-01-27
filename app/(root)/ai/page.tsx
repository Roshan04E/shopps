"use client";
import {
  claudeStream,
  generateRecipePromptForProduct,
} from "@/lib/ai/server-ai";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

function AIRecipeStream({ slug }: { slug: string }) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchStream() {
      try {
        setIsLoading(true);
        setError(null);
        setText("");

        const prompt = await generateRecipePromptForProduct({
          productName: slug,
        });

        const stream = await claudeStream({ prompt });
        if (!stream) {
          setError("Failed to initialize stream");
          return;
        }

        const reader = stream.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done || cancelled) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.type === "content_block_delta") {
                  const textDelta = parsed.delta?.text;
                  if (textDelta) {
                    setText((prev) => prev + textDelta);
                  }
                }
              } catch (e) {
                // Skip invalid JSON lines
              }
            }
          }
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || "An error occurred");
          console.error("Stream Error:", err);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchStream();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <div className="prose prose-green max-w-none">
      {error && <div className="text-red-600 mb-4">Error: {error}</div>}
      <ReactMarkdown>{text}</ReactMarkdown>
      {isLoading && !text && (
        <div className="text-gray-500">Generating recipe...</div>
      )}
    </div>
  );
}

export default AIRecipeStream;
