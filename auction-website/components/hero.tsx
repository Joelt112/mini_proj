import Link from "next/link"
import { Button } from "@/components/ui/button"
import TypingAnimation from "./typing-animation"

export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-black z-0"></div>
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="container relative z-10">
        <div className="max-w-2xl">
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight flex flex-wrap">
              <div className="whitespace-nowrap overflow-hidden">
                <TypingAnimation
                  text="Discover Unique Items at"
                  className="inline-block"
                  typingSpeed={100}
                  deletingSpeed={50}
                />
              </div>
              <span className="text-primary whitespace-nowrap">Unbeatable Prices</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Join thousands of bidders and find rare collectibles, luxury items, and one-of-a-kind treasures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/auctions">Browse Auctions</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/how-it-works">How It Works</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Transition element - connects Hero to Admin Dashboard */}
      <div className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>

        {/* Decorative elements that visually connect the sections */}
        <div className="absolute bottom-0 left-1/4 w-1 h-16 bg-primary/20 rounded-t-full transform translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/3 w-1 h-24 bg-primary/30 rounded-t-full transform translate-y-1/3"></div>
        <div className="absolute bottom-0 left-1/2 w-1 h-20 bg-primary/40 rounded-t-full transform -translate-x-1/2 translate-y-1/4"></div>
        <div className="absolute bottom-0 right-1/3 w-1 h-16 bg-primary/30 rounded-t-full transform translate-y-1/3"></div>
        <div className="absolute bottom-0 right-1/4 w-1 h-24 bg-primary/20 rounded-t-full transform translate-y-1/2"></div>

        {/* Subtle wave pattern */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-12"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="rgba(220, 38, 38, 0.05)"
            className="opacity-25"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill="rgba(220, 38, 38, 0.05)"
            className="opacity-50"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="rgba(220, 38, 38, 0.03)"
            className="opacity-75"
          ></path>
        </svg>
      </div>
    </section>
  )
}

