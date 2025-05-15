"use client"

import Link from "next/link"
import { CheckCircle, Shield, Smile, Zap, BarChart, Clock, FileText } from "lucide-react"
import { motion } from "framer-motion"
import AnimatedSection from "./animated-section"
import AnimatedButton from "./ui/animated-button"
import { FeatureCard } from "./ui/glassmorphic-card"

export default function Features() {
  const features = [
    {
      icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
      title: "99.8% Accuracy Guaranteed",
      description: "Our deep-level email verification ensures the highest accuracy in the industry.",
      link: "/features/accuracy",
      color: "from-blue-500 to-indigo-600",
      delay: 0.1,
    },
    {
      icon: <Shield className="h-8 w-8 text-emerald-600" />,
      title: "Enterprise-Grade Security",
      description: "Your data is encrypted and protected with enterprise-grade security measures.",
      link: "/features/security",
      color: "from-emerald-500 to-teal-600",
      delay: 0.2,
    },
    {
      icon: <Zap className="h-8 w-8 text-amber-600" />,
      title: "Lightning Fast Verification",
      description: "Process millions of emails quickly with our optimized verification system.",
      link: "/features/speed",
      color: "from-amber-500 to-orange-600",
      delay: 0.3,
    },
    {
      icon: <BarChart className="h-8 w-8 text-violet-600" />,
      title: "Detailed Analytics",
      description: "Get comprehensive reports and insights about your email verification results.",
      link: "/features/analytics",
      color: "from-violet-500 to-purple-600",
      delay: 0.4,
    },
    {
      icon: <Smile className="h-8 w-8 text-rose-600" />,
      title: "User-Friendly Interface",
      description: "Our intuitive interface makes email verification simple and efficient.",
      link: "/features/experience",
      color: "from-rose-500 to-pink-600",
      delay: 0.5,
    },
    {
      icon: <Clock className="h-8 w-8 text-cyan-600" />,
      title: "Real-Time Verification",
      description: "Verify emails in real-time with our powerful API and webhook integrations.",
      link: "/features/realtime",
      color: "from-cyan-500 to-blue-600",
      delay: 0.6,
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-white" id="features">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <motion.div 
            className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-800 mb-2 border border-blue-100"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Zap className="mr-1 h-4 w-4" /> Powerful Features
          </motion.div>
          <div className="space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything you need for perfect <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">email verification</span>
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
              Our comprehensive toolset gives you the power to keep your email lists clean and your deliverability high
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-6xl">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={feature.delay}>
              <FeatureCard>
                <div className="flex flex-col h-full">
                  <motion.div
                    className={`flex h-20 w-20 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900 mb-4 shadow-md`}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                    }}
                  >
                    <div className="text-sky-600 dark:text-sky-400">{feature.icon}</div>
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-500 flex-grow mb-4">{feature.description}</p>
                  <AnimatedButton variant="ghost" asChild className="justify-start p-0 hover:bg-transparent text-blue-600 font-medium">
                    <Link href={feature.link} className="inline-flex items-center gap-1 hover:gap-2 transition-all">
                      Learn More
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </AnimatedButton>
                </div>
              </FeatureCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
