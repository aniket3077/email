"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import AnimatedSection from "./animated-section"
import AnimatedButton from "./ui/animated-button"
import { Check } from "lucide-react"

export default function Pricing() {
  const pricingPlans = [
    {
      title: "Free",
      description: "For individuals just getting started",
      price: "$0",
      period: "forever",
      features: ["100 email verifications/month", "Basic API access", "Email support", "Standard verification speed"],
      highlight: false,
      buttonText: "Start Free",
      buttonLink: "/signup?plan=free",
    },
    {
      title: "Pro",
      description: "For growing businesses",
      price: "$29",
      period: "per month",
      features: [
        "10,000 email verifications/month",
        "Full API access",
        "Priority email support",
        "Fast verification speed",
        "Detailed analytics",
      ],
      highlight: true,
      buttonText: "Start Pro Trial",
      buttonLink: "/signup?plan=pro",
    },
    {
      title: "Enterprise",
      description: "For large organizations",
      price: "$99",
      period: "per month",
      features: [
        "Unlimited email verifications",
        "Advanced API access",
        "24/7 phone support",
        "Fastest verification speed",
        "Custom integrations",
        "Dedicated account manager",
      ],
      highlight: false,
      buttonText: "Contact Sales",
      buttonLink: "/contact",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Best Email Verification Prices
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that works best for your needs
            </p>
          </div>
        </AnimatedSection>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-3 lg:gap-8">
          {pricingPlans.map((plan, index) => (
            <AnimatedSection key={index} delay={index * 0.2}>
              <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card
                  className={`flex flex-col h-full ${
                    plan.highlight ? "border-blue-500 shadow-lg relative overflow-hidden" : ""
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 transform rotate-45 translate-x-2 -translate-y-1 shadow-md">
                        Popular
                      </div>
                    </div>
                  )}
                  <CardHeader className="flex flex-col items-center space-y-1">
                    <CardTitle className="text-2xl">{plan.title}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <motion.div
                      className="text-4xl font-bold"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {plan.price}
                    </motion.div>
                    <div className="text-sm text-gray-500">{plan.period}</div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-center"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <AnimatedButton
                      className={`w-full ${plan.highlight ? "bg-blue-500 hover:bg-blue-600" : ""}`}
                      asChild
                    >
                      <Link href={plan.buttonLink}>{plan.buttonText}</Link>
                    </AnimatedButton>
                  </CardFooter>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
