import { ArrowRight, Search, Gavel, CreditCard, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Browse Auctions",
      description: "Explore our wide range of unique items across multiple categories.",
    },
    {
      icon: <Gavel className="h-10 w-10 text-primary" />,
      title: "Place Your Bid",
      description: "Set your maximum bid and compete with other bidders in real-time.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Win & Pay",
      description: "If you're the highest bidder when the auction ends, complete your purchase securely.",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Receive Your Item",
      description: "Your item will be delivered to your doorstep or available for pickup.",
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-white text-black relative overflow-hidden" id="how-it-works">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-primary/10 text-primary font-medium px-4 py-1 rounded-full text-sm mb-4">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Bidding on BidMaster is simple, secure, and exciting. Follow these steps to start your bidding journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg shadow-lg">
                {index + 1}
              </div>
              <div className="mb-4 mt-2">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>

              {index < steps.length - 1 && (
                <>
                  {/* Desktop arrow */}
                  <div className="hidden lg:block absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 text-primary">
                    <ArrowRight className="h-6 w-6" />
                  </div>

                  {/* Mobile arrow */}
                  <div className="flex lg:hidden justify-center mt-4 text-primary">
                    <ArrowRight className="h-6 w-6 transform rotate-90" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-12 text-center">
          <Button
            asChild
            className="bg-black hover:bg-black/80 text-white px-6 sm:px-8 py-3 sm:py-6 h-auto text-base sm:text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Link href="/how-it-works">
              Learn More
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

