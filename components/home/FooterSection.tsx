import { Button } from "@/components/button";

export default function FooterSection() {
  return (
    <footer className="relative bg-slate-900 text-white pt-20 pb-10 overflow-hidden">
      {/* Gradient background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Main CTA Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text !text-transparent">
              Ready to eat better?
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Join Shopps today and get some off on your first order of fresh, local groceries.
            </p>
            <div className="flex gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition duration-300"></div>
                <Button 
                  variant="glass" 
                  className="
                    relative
                    bg-gradient-to-r from-orange-500 to-pink-500
                    text-white font-semibold
                    hover:shadow-2xl hover:shadow-orange-400/50
                    hover:scale-105
                    active:scale-95
                    transition-all duration-300
                  "
                >
                  Get Started
                </Button>
              </div>
              <Button 
                variant="outline" 
                className="
                  border-2 border-slate-700 
                  text-slate-300 font-semibold
                  hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700
                  hover:border-orange-500/50
                  hover:scale-105
                  active:scale-95
                  transition-all duration-300
                "
              >
                Download App
              </Button>
            </div>
          </div>

          {/* Waitlist Card */}
          <div className="relative group">
            {/* Card glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl opacity-20 group-hover:opacity-40 blur-xl transition duration-500"></div>
            
            <div className="relative bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center text-center border border-slate-700/50 shadow-2xl">
              <span className="text-6xl mb-4 animate-bounce-slow">🥑</span>
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text !text-transparent">
                Join the waitlist for 2026
              </h3>
              <div className="w-full max-w-sm flex gap-2 mt-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="
                    flex-1 bg-slate-900/80 
                    border-2 border-slate-700 
                    rounded-lg px-4 py-2.5
                    text-white placeholder:text-slate-500
                    focus:outline-none 
                    focus:border-orange-500
                    focus:ring-2 focus:ring-orange-500/20
                    transition-all duration-300
                  " 
                />
                <div className="relative group/button">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg opacity-75 group-hover/button:opacity-100 blur transition duration-300"></div>
                  <Button className="
                    relative
                    bg-gradient-to-r from-orange-500 to-pink-500
                    text-white font-semibold
                    hover:shadow-lg hover:shadow-orange-400/50
                    hover:scale-105
                    active:scale-95
                    transition-all duration-300
                  ">
                    Join
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Shopps Inc. All rights reserved.</p>
          <div className="font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text !text-transparent">
            A product of ARK Industries.
          </div>
          <div className="flex gap-6">
            <a 
              href="#" 
              className="
                hover:bg-gradient-to-r hover:from-orange-400 hover:to-pink-400 
                hover:bg-clip-text hover:!text-transparent
                transition-all duration-300
                hover:scale-110
              "
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="
                hover:bg-gradient-to-r hover:from-orange-400 hover:to-pink-400 
                hover:bg-clip-text hover:!text-transparent
                transition-all duration-300
                hover:scale-110
              "
            >
              Terms
            </a>
            <a 
              href="#" 
              className="
                hover:bg-gradient-to-r hover:from-orange-400 hover:to-pink-400 
                hover:bg-clip-text hover:!text-transparent
                transition-all duration-300
                hover:scale-110
              "
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}