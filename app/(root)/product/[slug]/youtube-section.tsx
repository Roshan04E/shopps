import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getYouTubeRecipes } from "@/lib/ai/server-ai";
import { BiLogoYoutube } from "react-icons/bi";

async function YouTubeSection({ slug }: { slug: string }) {
  const youtubeVideos = await getYouTubeRecipes(slug);

  if (!youtubeVideos || youtubeVideos.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 md:px-6 mt-16">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-3">
          <span className="bg-red-600 text-white p-1.5 rounded-xl text-md">
            <BiLogoYoutube />
          </span>
          Video Dekhkar Banaye
        </h3>

        <span className="text-slate-400 text-sm font-medium hidden sm:block">
          <Link
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
              slug.replace(/-/g, " ") + " recipe or dishes in hindi",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Swipe for more →
          </Link>
        </span>
      </div>

      {/* Horizontal Scroll on Mobile, Grid on Desktop */}
      <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 no-scrollbar">
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          youtubeVideos.slice(0, 6).map((video: any) => (
            <Link
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group min-w-[280px] sm:min-w-0 bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-video">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-300 flex items-center justify-center">
                  <div className="bg-white/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition translate-y-2 group-hover:translate-y-0 text-red-600 shadow-xl">
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-base font-bold text-slate-800 line-clamp-2 leading-tight mb-2 group-hover:text-green-600 transition">
                  {video.title}
                </p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  {video.channel}
                </p>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  );
}

export default YouTubeSection;
