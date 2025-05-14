"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, Book, FileText, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "How does email verification work?",
    answer: "Our email verification service checks multiple aspects of an email address: format validation, domain existence, MX record verification, and checks for disposable or role-based email addresses. This helps ensure your email list contains valid, deliverable addresses."
  },
  {
    question: "What is the difference between valid, invalid, and risky emails?",
    answer: "Valid emails are confirmed deliverable addresses. Invalid emails have syntax errors or non-existent domains. Risky emails might be valid but are associated with disposable email services or role-based accounts (like info@, support@) which may have lower engagement rates."
  },
  {
    question: "How many emails can I verify at once?",
    answer: "You can verify up to 10,000 emails in a single batch. For larger lists, we recommend splitting them into smaller batches for optimal performance."
  },
  {
    question: "How are credits calculated?",
    answer: "Each email verification consumes one credit. Credits are non-refundable and expire after 12 months. You can purchase additional credits at any time through your dashboard."
  },
  {
    question: "What file formats are supported for bulk verification?",
    answer: "We support CSV, TXT, and Excel files for bulk email verification. The file should contain one email address per line or column."
  }
]

const supportChannels = [
  {
    title: "Email Support",
    description: "Get help from our support team",
    icon: Mail,
    action: "Contact Support",
    href: "mailto:support@emailverify.com"
  },
  {
    title: "Live Chat",
    description: "Chat with our support team in real-time",
    icon: MessageSquare,
    action: "Start Chat",
    href: "#"
  },
  {
    title: "Documentation",
    description: "Browse our detailed guides and API documentation",
    icon: Book,
    action: "View Docs",
    href: "/docs"
  },
  {
    title: "Knowledge Base",
    description: "Search our comprehensive knowledge base",
    icon: FileText,
    action: "Browse Articles",
    href: "/kb"
  }
]

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Help & Support</h1>
          <p className="text-gray-500">Get help with your email verification needs</p>
        </div>
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {supportChannels.map((channel) => (
          <Card key={channel.title}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <channel.icon className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">{channel.title}</CardTitle>
              </div>
              <CardDescription>{channel.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(channel.href, "_blank")}
              >
                {channel.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            <CardTitle>Frequently Asked Questions</CardTitle>
          </div>
          <CardDescription>Find answers to common questions about our service</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Get in touch with our support team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Support Hours</h3>
            <p className="text-gray-500">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
          </div>
          <div>
            <h3 className="font-medium">Email</h3>
            <p className="text-gray-500">support@emailverify.com</p>
          </div>
          <div>
            <h3 className="font-medium">Phone</h3>
            <p className="text-gray-500">+1 (555) 123-4567</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 