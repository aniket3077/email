"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import AnimatedSection from "./animated-section"

export default function Footer() {
  const footerLinks = [
    { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
    { title: "Services", links: ["Email Verification", "List Cleaning", "API Access", "Integrations"] },
    { title: "Legal", links: ["Terms of Service", "Privacy Policy", "Cookie Policy", "GDPR"] },
    { title: "Resources", links: ["Help Center", "Documentation", "Tutorials", "Status"] },
  ]

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((section, i) => (
              <div key={section.title}>
                <motion.h3
                  className="font-semibold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {section.title}
                </motion.h3>
                <ul className="space-y-2">
                  {section.links.map((link, j) => (
                    <motion.li
                      key={link}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                    >
                      <Link href="#" className="text-gray-500 hover:text-blue-600 text-sm">
                        {link}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="flex items-center mb-4 md:mb-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <img src="/images/logo.png" alt="EmailVerify Logo" className="h-8 w-auto mr-2" />
              <p className="text-sm text-gray-500">© 2025 EmailVerify. All rights reserved.</p>
            </motion.div>
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {["Twitter", "LinkedIn", "Facebook", "Instagram"].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  {social}
                </Link>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  )
}
