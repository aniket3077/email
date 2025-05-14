"use client"

import Link from "next/link"
import { CheckCircle, Shield, Smile } from "lucide-react"
import { motion } from "framer-motion"
import AnimatedSection from "./animated-section"
import AnimatedButton from "./ui/animated-button"

export default function Features() {
  const features = [
    {
      icon: <CheckCircle className="h-10 w-10 text-blue-600" />,
      title: "Accuracy Guaranteed",
      description: "Our deep-level email verification ensures the highest accuracy in the industry.",
      link: "/features/accuracy",
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-600" />,
      title: "Data Is In Safe Hands",
      description: "Your data is encrypted and protected with enterprise-grade security measures.",
      link: "/features/security",
    },
    {
      icon: <Smile className="h-10 w-10 text-blue-600" />,
      title: "Best User Experience",
      description: "Our intuitive interface makes email verification simple and efficient.",
      link: "/features/experience",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white" id="features">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose Us</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our email verification service offers the best features in the industry
            </p>
          </div>
        </AnimatedSection>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 md:gap-12">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={index * 0.2}>
              <motion.div
                className="flex flex-col items-center space-y-4 text-center"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100"
                  whileHover={{
                    backgroundColor: "#dbeafe",
                    boxShadow: "0 0 0 8px rgba(59, 130, 246, 0.2)",
                  }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                <AnimatedButton variant="outline" asChild>
                  <Link href={feature.link}>Learn More</Link>
                </AnimatedButton>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
