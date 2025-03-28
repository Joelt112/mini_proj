"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Clock, Gavel, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HoverButton } from "@/components/ui/hover-button";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuctionItems } from "@/store/slices/auctionSlice";
import { RootState, AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";

export default function FeaturedAuctions() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { allAuctions, loading } = useSelector(
    (state: RootState) => state.auction
  );

  useEffect(() => {
    dispatch(getAllAuctionItems());
  }, [dispatch]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const updateScrollInfo = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setScrollPosition(scrollLeft);
      setMaxScroll(scrollWidth - clientWidth);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount =
        direction === "left" ? -current.clientWidth / 1.5 : current.clientWidth / 1.5;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
        updateScrollInfo();
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("scroll", updateScrollInfo);

    updateScrollInfo();

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("scroll", updateScrollInfo);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("featured-auctions");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section
      id="featured-auctions"
      className="py-16 md:py-24 bg-black text-white relative overflow-hidden"
    >
      <div className="container relative z-10">
        <div
          className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-3">
              Featured Auctions
            </h2>
            <p className="text-gray-300 text-lg max-w-xl">
              Bid on our most exclusive items before they're gone. These premium auctions
              are hand-selected by our curators.
            </p>
          </div>
        </div>
  
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {loading ? (
            <p className="text-white">Loading auctions...</p>
          ) : Array.isArray(allAuctions) && allAuctions.length > 0 ? (
            allAuctions.slice(0, 100).map((auction, index) => {
              const auctionId = auction._id || `auction-${index}`;

              return (
                <div
                  key={auctionId}
                  className="min-w-[280px] md:min-w-[350px] snap-start"
                  onMouseEnter={() => setHoveredCard(auctionId)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm text-white overflow-hidden ">
                    <div className="relative">
                      <Badge className="absolute top-2 right-2 bg-primary text-white ">
                        {auction.category}
                      </Badge>
                      <div className="relative h-48 md:h-64 overflow-hidden rounded-t-lg ">
                        <Image
                          src={auction.image.url || "/placeholder.svg"}
                          alt={auction.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="text-lg font-semibold line-clamp-1 text-white">
                        {auction.title}
                      </h3>
                      <p className="text-primary font-bold flex items-center gap-2">
                        
                        ${auction.currentBid.toLocaleString()}
                      </p>
                      <Clock className="mr-1 h-3 w-3  text-red-500" />
                      {new Date(auction.endTime).toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
})}{" "}
{new Date(auction.endTime).toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
})}
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <ChevronLeft className="h-6 w-6 text-white cursor-pointer" onClick={() => scroll("left")} />
                      <HoverButton
                        defaultContent={auction.category}
                        hoverContent={
                          <>
                            <Gavel className="h-4 w-4" />
                            <span>bid</span>
                          </>
                        }
                        className="bg-primary text-white"
                        onClick={() =>  router.push(`/bid/${auctionId}`)}
                      />
                      <ChevronRight className="h-6 w-6 text-white cursor-pointer" onClick={() => scroll("right")} />
                    </CardFooter>
                  </Card>
                </div>
              );
            })
          ) : (
            <p className="text-white">No auctions available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
