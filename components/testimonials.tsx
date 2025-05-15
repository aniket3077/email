"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"
import AnimatedSection from "./animated-section"
import AnimatedButton from "./ui/animated-button"
import { TestimonialCard } from "./ui/glassmorphic-card"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      text: "EmailVerify has transformed our email marketing campaigns. We've seen a 40% increase in open rates and significantly reduced bounce rates. The API integration was seamless and their customer support is exceptional.",
      color: "bg-blue-50",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      company: "GrowthLabs",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 4,
      text: "We've tried several email verification services, but EmailVerify stands out with its accuracy and speed. The detailed analytics help us understand our email list quality, and the pricing is very competitive.",
      color: "bg-purple-50",
    },
    {
      name: "Jessica Williams",
      role: "E-commerce Manager",
      company: "StyleBoutique",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      text: "Since implementing EmailVerify, our email deliverability has improved dramatically. The real-time verification API has been a game-changer for our signup process, reducing fake emails by over 90%.",
      color: "bg-amber-50",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden" id="testimonials">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200 z-0">
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-sky-300 opacity-20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-sky-400 opacity-20 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <motion.div 
            className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-800 mb-2 border border-blue-100"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Quote className="mr-1 h-4 w-4" /> Customer Success Stories
          </motion.div>
          <div className="space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              See what our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">customers</span> are saying
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
              Thousands of businesses worldwide trust EmailVerify to improve their email deliverability
            </p>
          </div>
        </AnimatedSection>
        
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} delay={index * 0.2}>
              <TestimonialCard className={`h-full ${testimonial.color} border-none`}>
                <div className="relative z-10">
                  <div className="absolute -top-8 -left-2 text-blue-200 opacity-50">
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 11L8 17H4L7 11V7H10V11ZM20 11L18 17H14L17 11V7H20V11Z" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                  </div>
                  
                  <div className="flex flex-row items-center gap-4 mb-4">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
                      <Avatar className="h-12 w-12 border-2 border-white shadow-md">
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
                  </div>
                  
                  <div className="flex items-center mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                  
                  <p className="text-gray-600 mb-4 italic">{testimonial.text}</p>
                  
                  <AnimatedButton variant="outline" size="sm" asChild className="mt-2">
                    <Link href="/" className="flex items-center gap-1">
                      Contact Us
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </Link>
                  </AnimatedButton>
                </div>
              </TestimonialCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
