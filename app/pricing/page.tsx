"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, HelpCircle, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import AnimatedButton from "@/components/ui/animated-button"
import React from "react"

export default function PricingPage() {
  // Define the pricing plans
  const pricingPlans = [
    {
      title: "Free",
      description: "For individuals just getting started",
      price: "$0",
      period: "forever",
      features: [
        { name: "Email verifications", value: "100/month" },
        { name: "API access", value: "Basic" },
        { name: "Support", value: "Email" },
        { name: "Verification speed", value: "Standard" },
        { name: "Data retention", value: "30 days" },
        { name: "Team members", value: "1" },
      ],
      highlight: false,
      buttonText: "Start Free",
      buttonLink: "/signup?plan=free",
    },
    {
      title: "Pro",
      description: "For growing businesses",
      price: "$29",
      period: "per month",
      features: [
        { name: "Email verifications", value: "10,000/month" },
        { name: "API access", value: "Full" },
        { name: "Support", value: "Priority email" },
        { name: "Verification speed", value: "Fast" },
        { name: "Data retention", value: "1 year" },
        { name: "Team members", value: "5" },
      ],
      highlight: true,
      buttonText: "Start Pro Trial",
      buttonLink: "/signup?plan=pro",
    },
    {
      title: "Enterprise",
      description: "For large organizations",
      price: "$99",
      period: "per month",
      features: [
        { name: "Email verifications", value: "Unlimited" },
        { name: "API access", value: "Advanced" },
        { name: "Support", value: "24/7 phone & email" },
        { name: "Verification speed", value: "Fastest" },
        { name: "Data retention", value: "Unlimited" },
        { name: "Team members", value: "Unlimited" },
      ],
      highlight: false,
      buttonText: "Contact Sales",
      buttonLink: "/contact",
    },
  ]

  // Define credit packages
  const creditPackages = [
    {
      credits: 10000,
      price: 19,
      description: "Best for small businesses and startups",
      pricePerThousand: "$1.90",
      savings: "0%",
    },
    {
      credits: 50000,
      price: 79,
      description: "Popular for medium-sized businesses",
      pricePerThousand: "$1.58",
      savings: "17%",
    },
    {
      credits: 100000,
      price: 139,
      description: "Great for growing businesses",
      pricePerThousand: "$1.39",
      savings: "27%",
    },
    {
      credits: 500000,
      price: 599,
      description: "Ideal for large businesses",
      pricePerThousand: "$1.20",
      savings: "37%",
    },
    {
      credits: 1000000,
      price: 999,
      description: "Best value for enterprises",
      pricePerThousand: "$1.00",
      savings: "47%",
    },
  ]

  // Define feature comparison table
  const featureComparison = [
    {
      category: "Email Verification",
      features: [
        { 
          name: "Syntax Validation", 
          free: true, 
          pro: true, 
          enterprise: true,
          description: "Checks if the email address follows the correct format"
        },
        { 
          name: "Domain Validation", 
          free: true, 
          pro: true, 
          enterprise: true,
          description: "Verifies if the domain exists and is configured for email" 
        },
        { 
          name: "MX Record Check", 
          free: true, 
          pro: true, 
          enterprise: true,
          description: "Checks if the domain has valid mail exchange records" 
        },
        { 
          name: "Disposable Email Detection", 
          free: true, 
          pro: true, 
          enterprise: true,
          description: "Identifies temporary or disposable email addresses" 
        },
        { 
          name: "Mailbox Verification", 
          free: false, 
          pro: true, 
          enterprise: true,
          description: "Verifies if the specific mailbox exists without sending an email" 
        },
        { 
          name: "Role-based Email Detection", 
          free: false, 
          pro: true, 
          enterprise: true,
          description: "Identifies role-based emails like info@, support@, etc." 
        },
        { 
          name: "Catch-all Domain Detection", 
          free: false, 
          pro: true, 
          enterprise: true,
          description: "Identifies domains that accept all emails regardless of mailbox" 
        },
        { 
          name: "Free Email Provider Detection", 
          free: false, 
          pro: true, 
          enterprise: true,
          description: "Identifies emails from free providers like Gmail, Yahoo, etc." 
        },
        { 
          name: "Risk Scoring", 
          free: false, 
          pro: false, 
          enterprise: true,
          description: "Advanced algorithm that assigns a risk score to each email" 
        },
        { 
          name: "Custom Validation Rules", 
          free: false, 
          pro: false, 
          enterprise: true,
          description: "Create custom rules specific to your business needs" 
        },
      ]
    },
    {
      category: "API & Integration",
      features: [
        { 
          name: "REST API Access", 
          free: true, 
          pro: true, 
          enterprise: true,
          description: "Access our API with standard REST endpoints" 
        },
        { 
          name: "Webhook Integration", 
          free: false, 
          pro: true, 
          enterprise: true,
          description: "Receive verification results via webhooks" 
        },
        { 
          name: "Batch Processing", 
          free: false, 
          pro: true, 
          enterprise: true,
          description: "Process multiple emails in a single request" 
        },
        { 
          name: "Custom Rate Limits", 
          free: false, 
          pro: false, 
          enterprise: true,
          description: "Set custom API rate limits based on your needs" 
        },
        { 
          name: "Multiple API Keys", 
          free: false, 
          pro: true, 
          enterprise: true,
          description: "Create and manage multiple API keys" 
        },
      ]
    },
    {
      category: "Support & Services",
      features: [
        { 
          name: "Email Support", 
          free: true, 
          pro: true, 
          enterprise: true,
          description: "Support via email with various response times" 
        },
        { 
          name: "Priority Support", 
          free: false, 
          pro: true, 
          enterprise: true,
          description: "Faster response times for your support tickets" 
        },
        { 
          name: "Phone Support", 
          free: false, 
          pro: false, 
          enterprise: true,
          description: "Direct phone support with our team" 
        },
        { 
          name: "Dedicated Account Manager", 
          free: false, 
          pro: false, 
          enterprise: true,
          description: "Personal account manager for your business" 
        },
        { 
          name: "Custom Integration Support", 
          free: false, 
          pro: false, 
          enterprise: true,
          description: "Help with integrating our services into your systems" 
        },
      ]
    },
  ]

  // FAQ items
  const faqItems = [
    {
      question: "How does the email verification process work?",
      answer: "Our email verification service uses a multi-step process including syntax checks, domain validation, MX record verification, and mailbox existence verification to ensure email addresses are valid without sending actual emails to them. This helps maintain your sender reputation and improve deliverability."
    },
    {
      question: "What's the difference between monthly plans and credit packs?",
      answer: "Monthly plans provide a recurring subscription with a set number of verifications per month. Credit packs allow you to purchase a specific amount of verification credits that never expire, providing flexibility for businesses with variable usage patterns."
    },
    {
      question: "Do unused verifications roll over to the next month?",
      answer: "No, monthly verification allocations do not roll over to the following month. For businesses that need more flexibility, we recommend our credit packs which never expire."
    },
    {
      question: "How accurate is your email verification?",
      answer: "Our verification service provides over 95% accuracy on average. However, accuracy can vary based on the email provider and their specific security measures. Enterprise plans include our highest level of verification accuracy with additional verification layers."
    },
    {
      question: "Can I upgrade or downgrade my plan at any time?",
      answer: "Yes, you can change your plan at any time. When upgrading, you'll be charged the prorated difference for the remainder of the billing cycle. When downgrading, the new lower rate will apply at the start of your next billing cycle."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, we offer a 7-day free trial of our Pro plan with 1,000 verification credits. No credit card is required to start your trial, and you can cancel at any time."
    },
    {
      question: "Is there a discount for annual payments?",
      answer: "Yes, we offer a 20% discount when you pay annually for any of our subscription plans. This option is available during the checkout process."
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose the perfect plan for your email verification needs, with no hidden fees or complicated pricing structures.
        </p>
      </div>

      {/* Pricing Tabs */}
      <Tabs defaultValue="subscription" className="max-w-5xl mx-auto mb-16">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="subscription">Monthly Plans</TabsTrigger>
            <TabsTrigger value="credits">Credit Packs</TabsTrigger>
          </TabsList>
        </div>

        {/* Monthly Plans Tab */}
        <TabsContent value="subscription">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 40px -15px rgba(0, 0, 0, 0.1)" }}
                className={plan.highlight ? "relative" : ""}
              >
                {plan.highlight && (
                  <div className="absolute top-0 right-0 left-0 mx-auto w-32 -mt-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full text-center shadow-lg">
                    Most Popular
                  </div>
                )}
                <Card className={`h-full ${plan.highlight ? "border-blue-200 shadow-lg mt-4" : ""}`}>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.title}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-500 ml-2">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="border-t border-b py-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex justify-between">
                          <span className="text-gray-600">{feature.name}</span>
                          <span className="font-medium">{feature.value}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-center pt-6">
                    <AnimatedButton
                      className={`w-full ${plan.highlight ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                      asChild
                    >
                      <Link href={plan.buttonLink}>{plan.buttonText}</Link>
                    </AnimatedButton>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center text-gray-500 mt-8">
            <p>All plans include standard features like syntax validation, domain checks, and basic API access.</p>
            <p className="mt-2">Need a custom plan? <Link href="/contact" className="text-blue-600 hover:underline">Contact our sales team</Link>.</p>
          </div>
        </TabsContent>

        {/* Credit Packs Tab */}
        <TabsContent value="credits">
          <div className="text-center mb-8">
            <h3 className="text-xl font-medium mb-2">Pay only for what you need</h3>
            <p className="text-gray-600">Purchase verification credits that never expire. Perfect for businesses with variable needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {creditPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.1)" }}
              >
                <Card className={`h-full ${index === 2 ? "border-blue-200 shadow-lg" : ""}`}>
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <h3 className="text-2xl font-bold">{pkg.credits.toLocaleString()} Credits</h3>
                      <p className="text-sm text-gray-500">{pkg.description}</p>
                    </div>

                    <div className="flex items-center justify-center mb-4">
                      <span className="text-3xl font-bold">${pkg.price}</span>
                      <span className="text-gray-500 ml-2">one-time</span>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Price per 1,000</span>
                        <span className="font-medium">{pkg.pricePerThousand}</span>
                      </div>
                      {pkg.savings !== "0%" && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">You Save</span>
                          <span className="font-medium text-green-600">{pkg.savings}</span>
                        </div>
                      )}
                    </div>

                    <Button className={`w-full ${index === 2 ? "bg-blue-600 hover:bg-blue-700" : ""}`}>
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,, 0, 0, 0.1)" }}
              className="md:col-span-2 lg:col-span-3"
            >
              <Card className="bg-blue-50 border-blue-100">
                <CardContent className="flex flex-col md:flex-row items-center justify-between p-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Need more than 1 million credits?</h3>
                    <p className="text-gray-600 max-w-2xl">
                      We offer custom pricing for high-volume customers. Contact our sales team for a personalized quote.
                    </p>
                  </div>
                  <Button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700" asChild>
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="text-center text-gray-500 mt-8">
            <p>All credit packs never expire and can be used at any time.</p>
            <p className="mt-2">For recurring usage, consider our <button className="text-blue-600 hover:underline" onClick={() => {
              const subscriptionTab = document.querySelector('[data-value="subscription"]') as HTMLElement;
              if (subscriptionTab) {
                subscriptionTab.click();
              }
            }}>monthly subscription plans</button>.</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Feature Comparison Table */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Compare All Features</h2>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Feature</TableHead>
                <TableHead className="text-center">Free</TableHead>
                <TableHead className="text-center">Pro</TableHead>
                <TableHead className="text-center">Enterprise</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {featureComparison.map((category, categoryIndex) => (
                <React.Fragment key={`category-${categoryIndex}`}>
                  <TableRow>
                    <TableCell colSpan={4} className="font-bold">
                      {category.category}
                    </TableCell>
                  </TableRow>
                  {category.features.map((feature, featureIndex) => (
                    <TableRow key={`feature-${categoryIndex}-${featureIndex}`}>
                      <TableCell className="flex items-center">
                        {feature.name}
                        <span className="relative group">
                          <HelpCircle className="h-4 w-4 text-gray-400 ml-2 cursor-help" />
                          <span className="absolute z-10 invisible group-hover:visible bg-black text-white text-xs rounded p-2 -mt-2 ml-2 w-48">
                            {feature.description}
                          </span>
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {feature.free ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-300 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {feature.pro ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-300 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {feature.enterprise ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-300 mx-auto" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 rounded-xl p-8 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Start improving your email deliverability today with EmailVerify. Sign up for free, no credit card required.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/signup">Get Started for Free</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Talk to Sales</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 