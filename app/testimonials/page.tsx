"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"
import AnimatedSection from "@/components/animated-section"
import AnimatedButton from "@/components/ui/animated-button"

export default function TestimonialsPage() {
  // Extended list of testimonials for the dedicated page
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      text: "EmailVerify has transformed our email marketing campaigns. We've seen a 40% increase in open rates and significantly reduced bounce rates. The API integration was seamless and their customer support is exceptional.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      company: "GrowthLabs",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 4,
      text: "We've tried several email verification services, but EmailVerify stands out with its accuracy and speed. The detailed analytics help us understand our email list quality, and the pricing is very competitive.",
    },
    {
      name: "Jessica Williams",
      role: "E-commerce Manager",
      company: "StyleBoutique",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      text: "Since implementing EmailVerify, our email deliverability has improved dramatically. The real-time verification API has been a game-changer for our signup process, reducing fake emails by over 90%.",
    },
    {
      name: "David Rodriguez",
      role: "Digital Marketing Lead",
      company: "GlobalReach",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      text: "After switching to EmailVerify, our email campaign performance metrics improved by over 35%. The detailed reporting helps us make informed decisions, and their customer support team has been incredibly responsive.",
    },
    {
      name: "Lisa Thompson",
      role: "Email Marketing Specialist",
      company: "MarketPro",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      text: "EmailVerify is now an essential part of our email marketing strategy. The bulk verification feature has saved us countless hours, and the accuracy is impressive compared to competitors we've used.",
    },
    {
      name: "Robert Kim",
      role: "E-commerce Director",
      company: "ShopFusion",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 4,
      text: "We integrated EmailVerify with our signup forms and saw an immediate reduction in bounce rates. The real-time API is fast and reliable, and the implementation was straightforward with their excellent documentation.",
    },
    {
      name: "Emma Davis",
      role: "CRM Manager",
      company: "DataDrive",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      text: "EmailVerify has been instrumental in maintaining our database quality. Their comprehensive verification process catches issues that other services miss, and the dashboard makes it easy to monitor our list health.",
    },
    {
      name: "Thomas Wright",
      role: "Sales Director",
      company: "GrowthPartners",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 4,
      text: "Our sales team relies heavily on email outreach, and EmailVerify has significantly improved our deliverability rates. The detailed verification reports give us confidence in our contact data quality.",
    },
    {
      name: "Sophia Martinez",
      role: "Digital Strategy VP",
      company: "Innovatech",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      text: "EmailVerify provides exceptional value for the price. The API integrations with our existing workflows were simple to implement, and the accuracy of verification has exceeded our expectations.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">Customer Stories</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Discover how businesses of all sizes are improving their email marketing performance with EmailVerify.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <h3 className="text-lg font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
                <div className="ml-auto flex items-center">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                  ))}
                </div>
              </CardHeader>
              <CardContent className="pt-4 text-sm">
                <p className="text-gray-600">{testimonial.text}</p>
                <div className="mt-4">
                  <AnimatedButton variant="outline" size="sm" asChild>
                    <Link href={`/case-studies/${testimonial.company.toLowerCase().replace(/\s+/g, '-')}`}>
                      Read Full Case Study
                    </Link>
                  </AnimatedButton>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-6">Ready to improve your email deliverability?</h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 mb-8">
          Join thousands of satisfied customers who have transformed their email marketing with EmailVerify.
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