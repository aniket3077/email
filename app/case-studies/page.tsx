"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRight, Building, FileText, Star } from "lucide-react"
import AnimatedButton from "@/components/ui/animated-button"

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      company: "TechCorp",
      title: "How TechCorp increased email open rates by 40%",
      industry: "Technology",
      brief: "TechCorp implemented EmailVerify to clean their existing database and verify new subscribers, resulting in significantly improved campaign performance.",
      results: [
        "40% increase in open rates",
        "35% reduction in bounce rates",
        "28% improvement in click-through rates"
      ],
      logo: "/placeholder.svg?height=80&width=80",
      rating: 5
    },
    {
      company: "GrowthLabs",
      title: "GrowthLabs improved deliverability with real-time verification",
      industry: "Marketing",
      brief: "GrowthLabs integrated EmailVerify's API directly into their signup forms to prevent invalid emails from entering their database.",
      results: [
        "89% reduction in invalid email submissions",
        "22% increase in conversion rates",
        "Significant cost savings on marketing campaigns"
      ],
      logo: "/placeholder.svg?height=80&width=80",
      rating: 4
    },
    {
      company: "StyleBoutique",
      title: "StyleBoutique's path to 90% reduction in fake emails",
      industry: "E-commerce",
      brief: "By implementing EmailVerify, StyleBoutique was able to clean their customer database and improve their email campaign targeting.",
      results: [
        "90% reduction in fake email submissions",
        "42% increase in email-driven revenue",
        "Improved customer data quality"
      ],
      logo: "/placeholder.svg?height=80&width=80",
      rating: 5
    },
    {
      company: "GlobalReach",
      title: "GlobalReach achieves 35% better email performance metrics",
      industry: "Digital Marketing",
      brief: "GlobalReach used EmailVerify to clean their existing lists and verify new subscribers in real-time.",
      results: [
        "35% improvement in overall email performance",
        "Reduced ISP complaints by 65%",
        "Improved sender reputation scores"
      ],
      logo: "/placeholder.svg?height=80&width=80",
      rating: 5
    },
    {
      company: "MarketPro",
      title: "How MarketPro saved countless hours on list verification",
      industry: "Marketing Agency",
      brief: "MarketPro integrated EmailVerify's bulk verification tools into their workflow to streamline client onboarding.",
      results: [
        "75% reduction in time spent on list management",
        "48% improvement in deliverability rates",
        "Higher client satisfaction ratings"
      ],
      logo: "/placeholder.svg?height=80&width=80",
      rating: 5
    },
    {
      company: "ShopFusion",
      title: "ShopFusion's journey to reducing bounce rates with real-time API",
      industry: "E-commerce",
      brief: "ShopFusion integrated EmailVerify's API with their checkout process to ensure high-quality customer data.",
      results: [
        "74% reduction in bounce rates",
        "31% increase in successful order confirmations",
        "Improved customer communication efficiency"
      ],
      logo: "/placeholder.svg?height=80&width=80",
      rating: 4
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">Customer Success Stories</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Discover how businesses across different industries have achieved remarkable results with EmailVerify
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {caseStudies.map((study, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Building className="h-8 w-8 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{study.company}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{study.industry}</span>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        {Array.from({ length: study.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3">{study.title}</h4>
                <p className="text-gray-600 mb-4">{study.brief}</p>
                
                <div className="mb-4">
                  <h5 className="font-semibold text-sm mb-2 text-gray-700">Key Results:</h5>
                  <ul className="space-y-1">
                    {study.results.map((result, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <AnimatedButton variant="outline" className="w-full" asChild>
                  <Link href={`/case-studies/${study.company.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span className="flex items-center justify-center gap-2">
                      Read Full Case Study <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </AnimatedButton>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-6">Ready to write your own success story?</h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 mb-8">
          Join these satisfied customers and start improving your email deliverability today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <AnimatedButton className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
            <Link href="/signup">Start Free Trial</Link>
          </AnimatedButton>
          <AnimatedButton variant="outline" asChild>
            <Link href="/pricing">View Pricing</Link>
          </AnimatedButton>
        </div>
      </div>
    </div>
  )
} 