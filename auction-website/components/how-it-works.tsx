"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Search, Gavel, CreditCard, Award, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Auto-advance steps every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  // Intersection Observer to trigger animations when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    const section = document.getElementById("how-it-works")
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  const steps = [
    {
      icon: <Search className="h-12 w-12 text-primary" />,
      title: "Browse Auctions",
      description: "Explore our wide range of unique items across multiple categories.",
      details: "Filter by category, price range, or auction end time to find exactly what you're looking for.",
    },
    {
      icon: <Gavel className="h-12 w-12 text-primary" />,
      title: "Place Your Bid",
      description: "Set your maximum bid and compete with other bidders in real-time.",
      details: "Our system will automatically increase your bid incrementally as needed, up to your maximum amount.",
    },
    {
      icon: <CreditCard className="h-12 w-12 text-primary" />,
      title: "Win & Pay",
      description: "If you're the highest bidder when the auction ends, complete your purchase securely.",
      details: "Multiple payment options available including credit card, PayPal, and bank transfer.",
    },
    {
      icon: <Award className="h-12 w-12 text-primary" />,
      title: "Receive Your Item",
      description: "Your item will be delivered to your doorstep or available for pickup.",
      details: "Track your shipment in real-time and rate your experience after receiving your item.",
    },
  ]

  const handleStepClick = (index) => {
    setActiveStep(index)
  }

  return (
    <section className="py-16 md:py-24 bg-black text-white relative overflow-hidden" id="how-it-works">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary/5 rounded-full animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-48 h-48 bg-primary/5 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container relative z-10 px-4 sm:px-6">
        <div
          className={cn(
            "text-center mb-12 md:mb-16 transition-all duration-1000 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <div className="inline-block bg-primary/20 text-primary font-medium px-4 py-1 rounded-full text-sm mb-4">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">How It Works</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg">
            Bidding on BidMaster is simple, secure, and exciting. Follow these steps to start your bidding journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12">
          {/* Interactive step visualization */}
          <div
            className={cn(
              "relative transition-all duration-1000 transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10",
            )}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8 h-full">
              <div className="flex items-center mb-6">
                {steps.map((_, index) => (
                  <div key={index} className="flex items-center" onClick={() => handleStepClick(index)}>
                    <button
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 cursor-pointer",
                        activeStep === index
                          ? "bg-primary text-white scale-110"
                          : "bg-white/10 text-white hover:bg-white/20",
                      )}
                    >
                      {index + 1}
                    </button>
                    {index < steps.length - 1 && (
                      <div className="h-1 w-12 md:w-16 mx-1">
                        <div
                          className={cn(
                            "h-full bg-white/20 rounded-full overflow-hidden",
                            activeStep > index && "bg-primary/50",
                          )}
                        >
                          {activeStep === index && <div className="h-full bg-primary animate-progress-bar"></div>}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="relative h-[300px] md:h-[350px]">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={cn(
                      "absolute top-0 left-0 w-full h-full transition-all duration-500",
                      activeStep === index
                        ? "opacity-100 translate-x-0"
                        : activeStep > index
                          ? "opacity-0 -translate-x-full"
                          : "opacity-0 translate-x-full",
                    )}
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-6 transform transition-all duration-500 hover:scale-110">
                        <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                          {step.icon}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">{step.title}</h3>
                      </div>
                      <p className="text-gray-300 text-lg mb-4">{step.description}</p>
                      <div className="mt-auto">
                        <div className="bg-white/5 rounded-lg p-4 border-l-4 border-primary">
                          <p className="text-gray-300 text-sm">{step.details}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step cards */}
          <div
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-1000 transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10",
            )}
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "relative bg-white/5 backdrop-blur-sm p-6 rounded-xl border transition-all duration-500",
                  activeStep === index
                    ? "border-primary shadow-lg shadow-primary/10 scale-105"
                    : "border-white/10 hover:border-white/30",
                  "transform transition-all cursor-pointer",
                  `animate-fade-in-up delay-${index * 2}`,
                )}
                onClick={() => handleStepClick(index)}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-black flex items-center justify-center border border-white/20 text-white">
                  {index + 1}
                </div>
                <div className="mb-4">
                  {activeStep === index ? (
                    <div className="text-primary animate-bounce">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                  ) : (
                    <div className="text-primary/70">{step.icon}</div>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-gray-300 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "text-center transition-all duration-1000 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 h-auto text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
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

