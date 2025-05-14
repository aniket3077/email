"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"
import { motion } from "framer-motion"
import AnimatedSection from "./animated-section"
import AnimatedButton from "./ui/animated-button"

export default function Testimonials() {
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
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white" id="testimonials">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What our customers say</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Trusted by thousands of businesses worldwide
            </p>
          </div>
        </AnimatedSection>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} delay={index * 0.2}>
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="border-gray-200 h-full">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div className="grid gap-1">
                      <h3 className="text-lg font-medium">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                    <div className="ml-auto flex items-center">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <Star className="h-4 w-4 fill-current text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 text-sm">
                    <p className="text-gray-600">{testimonial.text}</p>
                    <div className="mt-4">
                      <AnimatedButton variant="outline" size="sm" asChild>
                        <Link href="/case-studies">Read Full Case Study</Link>
                      </AnimatedButton>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection delay={0.6} className="text-center mt-8">
          <AnimatedButton asChild>
            <Link href="/testimonials">View All Customer Stories</Link>
          </AnimatedButton>
        </AnimatedSection>
      </div>
    </section>
  )
}
