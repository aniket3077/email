"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import AnimatedButton from "@/components/ui/animated-button"
import { GlassmorphicCard } from "@/components/ui/glassmorphic-card"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Validate form fields
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Please fill in all required fields")
      }

      if (!formData.email.includes('@')) {
        throw new Error("Please enter a valid email address")
      }

      // Send the form data to our API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message. Please try again later.")
      }

      // Clear form and show success message
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setSuccess(true)
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    } catch (err: any) {
      console.error("Contact form submission error:", err)
      setError(err.message || "Failed to send message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col relative px-4 py-12 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient with animated shapes - sky blue theme */}
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

      {/* Logo header - positioned at the top left */}
      <header className="w-full relative z-10 mb-8">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between"
          >
            <Link href="/" className="flex items-center">
              <motion.img 
                src="/images/logo.png" 
                alt="Sphurti Logo" 
                className="h-12 w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
              <motion.h2 
                className="ml-3 text-2xl font-bold text-sky-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Sphurti
              </motion.h2>
            </Link>
            
            <motion.nav 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden md:flex items-center space-x-6"
            >
              <Link 
                href="/#features"
                className="text-sky-700 hover:text-sky-900 font-medium transition-colors"
              >
                Features
              </Link>
              <Link 
                href="/#pricing"
                className="text-sky-700 hover:text-sky-900 font-medium transition-colors"
              >
                Pricing
              </Link>
              <Link 
                href="/#about"
                className="text-sky-700 hover:text-sky-900 font-medium transition-colors"
              >
                About Us
              </Link>
              <Link 
                href="/login"
                className="text-sky-700 hover:text-sky-900 font-medium transition-colors"
              >
                Login
              </Link>
              <AnimatedButton 
                asChild 
                size="sm"
                className="bg-sky-600 hover:bg-sky-700"
              >
                <Link href="/signup">
                  Sign Up
                </Link>
              </AnimatedButton>
            </motion.nav>
          </motion.div>
        </div>
      </header>

      <motion.div
        className="container mx-auto flex-grow relative z-10 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-sky-700 mb-3">Contact Us</h1>
            <p className="text-sky-600 max-w-2xl mx-auto">
              Have a question or need help with our services? Our team is here to help you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              <motion.div 
                className="p-6 bg-white bg-opacity-70 backdrop-blur-sm rounded-xl shadow-md border border-sky-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex flex-col space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-sky-700 mb-2">Get In Touch</h3>
                    <p className="text-sky-600 text-sm">
                      Fill out the form or contact us through the information below.
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-sky-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-sky-700">Email Us</p>
                      <a 
                        href="mailto:support@sphurti.com" 
                        className="text-sky-600 text-sm hover:text-sky-800"
                      >
                        support@sphurti.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-sky-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-sky-700">Call Us</p>
                      <a 
                        href="tel:+1-234-567-8900" 
                        className="text-sky-600 text-sm hover:text-sky-800"
                      >
                        +1 (234) 567-8900
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-sky-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-sky-700">Visit Us</p>
                      <p className="text-sky-600 text-sm">
                        123 Email Avenue,<br />
                        Tech District, CA 94107
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="md:col-span-2">
              <GlassmorphicCard className="p-6" glassEffect={true} rotateEffect={false}>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <motion.div 
                      className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md flex items-start"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {success && (
                    <motion.div 
                      className="p-3 bg-green-50 border border-green-200 text-green-600 text-sm rounded-md flex items-start"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span>Your message has been sent successfully! We'll get back to you soon.</span>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        className="h-10 border-sky-200 rounded-md focus-visible:ring-sky-500"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="h-10 border-sky-200 rounded-md focus-visible:ring-sky-500"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What is your message about?"
                      className="h-10 border-sky-200 rounded-md focus-visible:ring-sky-500"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">Message <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please provide details about your inquiry..."
                      className="min-h-[150px] border-sky-200 rounded-md focus-visible:ring-sky-500"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <AnimatedButton 
                      type="submit"
                      className="w-full md:w-auto h-10 font-medium bg-sky-600 hover:bg-sky-700" 
                      disabled={isLoading}
                      isLoading={isLoading}
                      loadingText="Sending message..."
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </AnimatedButton>
                  </div>
                </form>
              </GlassmorphicCard>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 