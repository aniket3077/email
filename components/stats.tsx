"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Users, Mail, Check, Clock } from "lucide-react"
import AnimatedSection from "./animated-section"
import { StatsCard } from "./ui/glassmorphic-card"

interface CounterProps {
  end: number
  duration?: number
  delay?: number
  suffix?: string
  decimals?: number
}

function AnimatedCounter({ end, duration = 2, delay = 0.3, suffix = "", decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let startTime: number
    let animationFrame: number
    
    const startAnimation = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      setCount(progress * end)
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(startAnimation)
      }
    }
    
    // Add delay before starting animation
    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(startAnimation)
    }, delay * 1000)
    
    return () => {
      cancelAnimationFrame(animationFrame)
      clearTimeout(timer)
    }
  }, [end, duration, delay])
  
  const displayValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString()
  
  return <span>{displayValue}{suffix}</span>
}

export default function Stats() {
  const stats = [
    {
      icon: <Users className="h-6 w-6 text-blue-500" />,
      value: 10000,
      label: "Happy Customers",
      suffix: "+",
      delay: 0.1,
      decimal: 0,
      iconBg: "bg-blue-100"
    },
    {
      icon: <Mail className="h-6 w-6 text-green-500" />,
      value: 500,
      label: "Million Emails Processed",
      suffix: "M+",
      delay: 0.2,
      decimal: 0,
      iconBg: "bg-green-100"
    },
    {
      icon: <Check className="h-6 w-6 text-purple-500" />,
      value: 99.8,
      label: "Verification Accuracy",
      suffix: "%",
      delay: 0.3,
      decimal: 1,
      iconBg: "bg-purple-100"
    },
    {
      icon: <Clock className="h-6 w-6 text-amber-500" />,
      value: 24,
      label: "Hour Support",
      suffix: "/7",
      delay: 0.4,
      decimal: 0,
      iconBg: "bg-amber-100"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <motion.div 
          className="absolute top-20 left-[15%] w-36 h-36 rounded-full bg-blue-100 opacity-50 blur-3xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-[15%] w-48 h-48 rounded-full bg-indigo-100 opacity-40 blur-3xl"
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted by businesses worldwide</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our email verification service has helped thousands of businesses improve their email deliverability
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <AnimatedSection key={index} delay={stat.delay}>
              <StatsCard>
                <div className="flex items-start gap-4">
                  <div className={`${stat.iconBg} p-3 rounded-lg`}>
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1 flex items-end">
                      <AnimatedCounter 
                        end={stat.value} 
                        suffix={stat.suffix} 
                        delay={stat.delay} 
                        decimals={stat.decimal}
                      />
                    </div>
                    <p className="text-gray-500">{stat.label}</p>
                  </div>
                </div>
              </StatsCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
} 