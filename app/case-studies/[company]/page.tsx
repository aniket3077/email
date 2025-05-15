"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Building, ChevronRight, Download, Star } from "lucide-react"
import AnimatedButton from "@/components/ui/animated-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// This would typically come from a database or API
const caseStudiesData = {
  "techcorp": {
    company: "TechCorp",
    title: "How TechCorp increased email open rates by 40%",
    industry: "Technology",
    logo: "/placeholder.svg?height=100&width=100",
    website: "https://example.com/techcorp",
    companySize: "500-1000 employees",
    location: "San Francisco, CA",
    challengeTitle: "The Challenge",
    challenge: `TechCorp was struggling with declining email engagement metrics. Their email marketing campaigns were experiencing high bounce rates and low open rates, affecting their ability to communicate effectively with customers and prospects.

The marketing team identified several key issues:
• An outdated email database with many invalid or dormant email addresses
• No verification process for new email signups
• Poor segmentation due to unreliable data
• Declining sender reputation with email service providers`,
    solutionTitle: "The Solution",
    solution: `After evaluating several email verification solutions, TechCorp implemented EmailVerify to address their challenges:

1. Bulk Verification: They started with a complete database cleanup, removing invalid, dormant, and risky email addresses.

2. Real-time API Integration: They integrated EmailVerify's API with their website forms and CRM system to verify new emails at the point of collection.

3. Regular Maintenance: They established a quarterly verification process to keep their database clean.

4. Improved Segmentation: With cleaner data, they implemented more precise audience segmentation strategies.`,
    resultsTitle: "The Results",
    results: [
      {
        metric: "Increase in Open Rates",
        value: "40%",
        description: "Email open rates jumped significantly after implementing EmailVerify, as messages were delivered to valid and active inboxes."
      },
      {
        metric: "Reduction in Bounce Rates",
        value: "35%",
        description: "Hard bounces decreased dramatically as invalid and risky email addresses were removed from their database."
      },
      {
        metric: "Improvement in Click-through Rates",
        value: "28%",
        description: "With better delivery and targeting, more recipients engaged with the content of their emails."
      },
      {
        metric: "Increase in Conversion Rate",
        value: "15%",
        description: "Higher engagement led to more recipients taking desired actions after reading emails."
      }
    ],
    testimonial: {
      quote: "EmailVerify has transformed our email marketing campaigns. We've seen a 40% increase in open rates and significantly reduced bounce rates. The API integration was seamless and their customer support is exceptional.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      avatar: "/placeholder.svg?height=60&width=60"
    },
    rating: 5
  },
  "growthlabs": {
    company: "GrowthLabs",
    title: "GrowthLabs improved deliverability with real-time verification",
    industry: "Marketing",
    logo: "/placeholder.svg?height=100&width=100",
    website: "https://example.com/growthlabs",
    companySize: "50-200 employees",
    location: "Austin, TX",
    challengeTitle: "The Challenge",
    challenge: `GrowthLabs, a fast-growing marketing agency, was experiencing issues with their client email campaigns:

• High bounce rates were damaging sender reputation
• Client dissatisfaction with campaign performance
• Manual verification processes were time-consuming
• Difficulty scaling email operations efficiently`,
    solutionTitle: "The Solution",
    solution: `GrowthLabs chose EmailVerify to streamline their email verification process:

1. API Integration: They integrated the EmailVerify API directly into client signup forms to validate emails in real-time.

2. Bulk Verification Tool: For existing client databases, they used the bulk verification tool to clean lists before campaigns.

3. Detailed Reporting: They implemented EmailVerify's analytics to provide clients with transparent data on list quality.

4. Educational Resources: They used EmailVerify's resources to educate clients on email list hygiene best practices.`,
    resultsTitle: "The Results",
    results: [
      {
        metric: "Reduction in Invalid Emails",
        value: "89%",
        description: "Real-time verification prevented nearly all invalid emails from entering client databases."
      },
      {
        metric: "Increase in Conversion Rates",
        value: "22%",
        description: "Cleaner lists and better targeting led to higher conversion rates for client campaigns."
      },
      {
        metric: "Time Saved on List Management",
        value: "65%",
        description: "Automated verification processes reduced the time spent on manual list cleaning and maintenance."
      },
      {
        metric: "Improvement in Client Retention",
        value: "18%",
        description: "Better campaign results led to higher client satisfaction and retention rates."
      }
    ],
    testimonial: {
      quote: "We've tried several email verification services, but EmailVerify stands out with its accuracy and speed. The detailed analytics help us understand our email list quality, and the pricing is very competitive.",
      author: "Michael Chen",
      role: "CTO",
      avatar: "/placeholder.svg?height=60&width=60"
    },
    rating: 4
  },
  "styleboutique": {
    company: "StyleBoutique",
    title: "StyleBoutique's path to 90% reduction in fake emails",
    industry: "E-commerce",
    logo: "/placeholder.svg?height=100&width=100",
    website: "https://example.com/styleboutique",
    companySize: "100-500 employees",
    location: "New York, NY",
    challengeTitle: "The Challenge",
    challenge: `StyleBoutique, an online fashion retailer, was facing significant challenges with their customer database:

• High percentage of fake or incorrect email addresses
• Difficulty delivering order confirmations and shipping updates
• Wasted marketing budget on unreachable customers
• Poor customer experience due to communication failures`,
    solutionTitle: "The Solution",
    solution: `After researching various options, StyleBoutique implemented EmailVerify across their e-commerce platform:

1. Real-time Verification: They integrated the verification API with their checkout process to validate emails before order completion.

2. Database Cleanup: They conducted a comprehensive verification of their existing customer database.

3. Integration with Marketing Tools: They connected EmailVerify with their email marketing platform to maintain list hygiene.

4. Custom Rules: They implemented custom verification rules based on their specific business needs and customer patterns.`,
    resultsTitle: "The Results",
    results: [
      {
        metric: "Reduction in Fake Emails",
        value: "90%",
        description: "Real-time verification virtually eliminated fake email submissions at signup and checkout."
      },
      {
        metric: "Increase in Email-Driven Revenue",
        value: "42%",
        description: "Improved deliverability led to more customers receiving and responding to promotional emails."
      },
      {
        metric: "Improvement in Order Communication",
        value: "95%",
        description: "Nearly all customers now receive order confirmations and shipping updates reliably."
      },
      {
        metric: "Reduction in Support Tickets",
        value: "38%",
        description: "Fewer issues with missed communications led to a significant decrease in customer support inquiries."
      }
    ],
    testimonial: {
      quote: "Since implementing EmailVerify, our email deliverability has improved dramatically. The real-time verification API has been a game-changer for our signup process, reducing fake emails by over 90%.",
      author: "Jessica Williams",
      role: "E-commerce Manager",
      avatar: "/placeholder.svg?height=60&width=60"
    },
    rating: 5
  }
}

export default function CaseStudyPage() {
  const params = useParams()
  const companySlug = typeof params.company === 'string' ? params.company : ''
  
  // Try to find the case study data
  const caseStudy = caseStudiesData[companySlug as keyof typeof caseStudiesData]
  
  // If no data found, show a fallback message
  if (!caseStudy) {
    return (
      <div className="container mx-auto px-4 py-12 md:px-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Case Study Not Found</h1>
        <p className="mb-8">The case study you're looking for doesn't exist or has been moved.</p>
        <AnimatedButton asChild>
          <Link href="/case-studies">View All Case Studies</Link>
        </AnimatedButton>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/case-studies" className="hover:text-gray-700">Case Studies</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-900">{caseStudy.company}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-2/3"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{caseStudy.title}</h1>
          <div className="flex items-center mb-4">
            <div className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full mr-3">
              {caseStudy.industry}
            </div>
            <div className="flex">
              {Array.from({ length: caseStudy.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:w-1/3"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                  <Building className="h-8 w-8 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-bold">{caseStudy.company}</h3>
                  <p className="text-sm text-gray-500">{caseStudy.location}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Company Size</span>
                  <span>{caseStudy.companySize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Industry</span>
                  <span>{caseStudy.industry}</span>
                </div>
                <div className="pt-2">
                  <Button variant="outline" className="w-full text-sm" asChild>
                    <Link href={caseStudy.website} target="_blank">
                      Visit Website
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2 space-y-12">
          {/* Challenge section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">{caseStudy.challengeTitle}</h2>
            <div className="prose max-w-none">
              {caseStudy.challenge.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-4">
                  {paragraph.includes('•') ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {paragraph.split('•').filter(Boolean).map((item, j) => (
                        <li key={j}>{item.trim()}</li>
                      ))}
                    </ul>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Solution section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4">{caseStudy.solutionTitle}</h2>
            <div className="prose max-w-none">
              {caseStudy.solution.split('\n\n').map((paragraph, i) => (
                <div key={i} className="mb-4">
                  {paragraph.includes('1.') ? (
                    <ol className="list-decimal pl-5 space-y-2">
                      {paragraph.split(/\d+\./).filter(Boolean).map((item, j) => (
                        <li key={j}>{item.trim()}</li>
                      ))}
                    </ol>
                  ) : (
                    <p>{paragraph}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Results section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6">{caseStudy.resultsTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {caseStudy.results.map((result, index) => (
                <Card key={index} className="border-gray-200">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-1">{result.metric}</h3>
                    <p className="text-3xl font-bold text-blue-600 mb-2">{result.value}</p>
                    <p className="text-sm text-gray-600">{result.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="space-y-8">
          {/* Testimonial card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-blue-50 border-blue-100">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={caseStudy.testimonial.avatar} alt={caseStudy.testimonial.author} />
                    <AvatarFallback>{caseStudy.testimonial.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{caseStudy.testimonial.author}</h3>
                    <p className="text-sm text-gray-600">{caseStudy.testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic mb-2">
                  "{caseStudy.testimonial.quote}"
                </blockquote>
                <div className="flex">
                  {Array.from({ length: caseStudy.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Related resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold mb-4">Related Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="#" 
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Full Case Study (PDF)
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/testimonials" 
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Browse All Customer Stories
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/pricing" 
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                  >
                    View Our Pricing Options
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-blue-50 p-8 rounded-xl text-center mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">Ready to achieve similar results?</h2>
        <p className="max-w-2xl mx-auto mb-6 text-gray-600">
          Start improving your email deliverability today with EmailVerify's powerful verification tools.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <AnimatedButton className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
            <Link href="/signup">Start Free Trial</Link>
          </AnimatedButton>
          <AnimatedButton variant="outline" asChild>
            <Link href="/contact">Talk to Sales</Link>
          </AnimatedButton>
        </div>
      </motion.div>

      {/* Back to case studies */}
      <div className="text-center">
        <AnimatedButton variant="outline" asChild>
          <Link href="/case-studies" className="inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Case Studies
          </Link>
        </AnimatedButton>
      </div>
    </div>
  )
} 