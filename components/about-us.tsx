"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Building, Award, Users } from "lucide-react"

export default function AboutUs() {
  return (
    <section id="about" className="w-full py-16 bg-sky-50/90">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-sky-700 mb-4">About Us</h2>
          <p className="text-sky-600 max-w-3xl mx-auto text-lg">
            We are a dedicated team of email verification experts committed to helping businesses 
            maintain clean email lists and improve deliverability.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="bg-sky-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-5 mx-auto">
              <Building className="h-8 w-8 text-sky-600" />
            </div>
            <h3 className="text-xl font-semibold text-sky-700 text-center mb-3">Our Mission</h3>
            <p className="text-sky-600 text-center">
              To provide the most accurate and reliable email verification solution that helps businesses worldwide improve their email marketing performance.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white p-8 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-sky-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-5 mx-auto">
              <Award className="h-8 w-8 text-sky-600" />
            </div>
            <h3 className="text-xl font-semibold text-sky-700 text-center mb-3">Our Expertise</h3>
            <p className="text-sky-600 text-center">
              With over 10 years of experience in email verification technology, we've developed advanced algorithms that provide 99.8% accuracy in validation results.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white p-8 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-sky-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-5 mx-auto">
              <Users className="h-8 w-8 text-sky-600" />
            </div>
            <h3 className="text-xl font-semibold text-sky-700 text-center mb-3">Our Team</h3>
            <p className="text-sky-600 text-center">
              Our diverse team of engineers, data scientists, and email experts work tirelessly to ensure you get the best email verification service available.
            </p>
          </motion.div>
        </div>

        <div className="text-center mt-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/contact" 
              className="inline-block px-6 py-3 bg-white text-sky-600 font-medium rounded-md border border-sky-200 hover:bg-sky-50 transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 