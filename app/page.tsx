"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Bell,
  CheckCircle,
  CreditCard,
  Download,
  Eye,
  EyeOff,
  FileText,
  FileUp,
  Grid,
  HelpCircle,
  History,
  List,
  MoreVertical,
  Pencil,
  Search,
  Shield,
  X,
} from "lucide-react"
import { Home as HomeIcon } from "lucide-react"

// Import UI components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import ScrollToTop from "@/components/ui/scroll-to-top"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Pricing from "@/components/pricing"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <ScrollToTop />
    </>
  )
}

// Define types
interface NavigationProps {
  setCurrentPage: (page: string) => void;
}

function EmailVerificationApp() {
  const [currentPage, setCurrentPage] = useState("home")
  const router = useRouter()

  // Render the appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePageComponent setCurrentPage={setCurrentPage} />
      case "login":
        return <LoginPage setCurrentPage={setCurrentPage} />
      case "signup":
        return <SignupPage setCurrentPage={setCurrentPage} />
      case "dashboard":
        return <DashboardPage setCurrentPage={setCurrentPage} />
      default:
        return <HomePageComponent setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className={inter.className}>
      {renderPage()}
      <ScrollToTop />
    </div>
  )
}

function HomePageComponent({ setCurrentPage }: NavigationProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#" onClick={() => setCurrentPage("home")}>
          <img src="/images/logo.png" alt="Logo" className="h-8 w-auto" />
          <span className="ml-2 text-lg font-semibold">EmailVerify</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 wave-bg">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Protect your email reputation
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Our email verification service helps you maintain a clean email list, improve deliverability, and
                    protect your sender reputation.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700" onClick={() => setCurrentPage("signup")}>
                    <Link href="#">Get Started</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="/images/illustration.png"
                  alt="Email Verification"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
          <div className="wave-bottom"></div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" id="features">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our email verification service offers powerful features to help you maintain a clean email list.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 md:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <CheckCircle className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">Real-time Verification</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Verify email addresses in real-time with our powerful API.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">Secure & Private</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Your data is secure and private with our encrypted verification process.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">Detailed Reports</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Get detailed reports on your email verification results.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pricing</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Choose the plan that works best for your needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:gap-12">
              <div className="flex flex-col rounded-lg border bg-white p-6 shadow-lg dark:bg-gray-950">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Basic</h3>
                  <div className="text-4xl font-bold">400$</div>
                </div>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Per month</p>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>2,000 Credits</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>API Access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Detailed Reports</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Buy Now</Button>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border bg-white p-6 shadow-lg dark:bg-gray-950">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <div className="text-4xl font-bold">$37</div>
                </div>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Per month</p>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>10,000 Credits</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>API Access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Detailed Reports</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Priority Support</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Buy Now</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2025 Email Verification Service. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

// Login Page Component
function LoginPage({ setCurrentPage }: NavigationProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real app, you would connect to your backend API here
    console.log("Login with:", { email, password })

    // For demo purposes, we'll just redirect to the dashboard
    setCurrentPage("dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col wave-bg">
      <div className="container flex-1 flex items-center justify-center py-12">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-center max-w-6xl w-full">
          <div className="flex flex-col justify-center space-y-4">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="space-y-2 mb-6">
                <h1 className="text-3xl font-bold">Login to your account</h1>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="balamia@gmail.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="text-sm text-blue-600 hover:underline">
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Login
                </Button>
              </form>
              <div className="mt-6 text-center text-sm">
                Don&apos;t Have An Account?{" "}
                <Link
                  href="#"
                  onClick={() => setCurrentPage("signup")}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <img
              src="/images/illustration.png"
              alt="Login Illustration"
              className="max-w-full h-auto"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Signup Page Component
function SignupPage({ setCurrentPage }: NavigationProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real app, you would connect to your backend API here
    console.log("Signup with:", { email, password })

    // For demo purposes, we'll just redirect to the dashboard
    setCurrentPage("dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col wave-bg">
      <div className="container flex-1 flex items-center justify-center py-12">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-center max-w-6xl w-full">
          <div className="flex flex-col justify-center space-y-4">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="space-y-2 mb-6">
                <h1 className="text-3xl font-bold">Create an account</h1>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="balamia@gmail.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Create account
                </Button>
              </form>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
                    <path
                      d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                      fill="#34A853"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div>
              <div className="mt-6 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="#"
                  onClick={() => setCurrentPage("login")}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <img
              src="/images/illustration.png"
              alt="Signup Illustration"
              className="max-w-full h-auto"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Dashboard Page Component
function DashboardPage({ setCurrentPage }: NavigationProps) {
  const [dashboardTab, setDashboardTab] = useState("main")

  // Render the appropriate dashboard sub-page
  const renderDashboardContent = () => {
    switch (dashboardTab) {
      case "main":
        return <DashboardMain />
      case "profile":
        return <ProfilePage />
      case "history":
        return <HistoryPage />
      case "verifications":
        return <VerificationsPage />
      case "credits":
        return <CreditsPage />
      case "add-subuser":
        return <AddSubuserPage />
      default:
        return <DashboardMain />
    }
  }

  // Navigation items for sidebar
  const navItems = [
    { href: "#", label: "Home", icon: HomeIcon, page: "main" },
    { href: "#", label: "List Items", icon: List, page: "list-items" },
    { href: "#", label: "Verifications", icon: CheckCircle, page: "verifications" },
    { href: "#", label: "Credits", icon: CreditCard, page: "credits" },
    { href: "#", label: "History", icon: History, page: "history" },
    { href: "#", label: "Help", icon: HelpCircle, page: "help" },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r min-h-screen p-4 flex flex-col">
        <div className="flex-1">
          <div className="mb-8">
            <Link href="#" onClick={() => setDashboardTab("main")} className="flex items-center">
              <img src="/images/logo.png" alt="Logo" className="h-8 w-auto" />
              <span className="ml-2 text-lg font-semibold">EmailVerify</span>
            </Link>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = dashboardTab === item.page

              return (
                <Link
                  key={item.href}
                  href="#"
                  onClick={() => setDashboardTab(item.page)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    isActive ? "bg-blue-100 text-blue-900" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="border-t pt-4 mt-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Credits:</span>
              <span className="font-bold">99</span>
            </div>
            <Button variant="outline" className="w-full" size="sm" onClick={() => setDashboardTab("credits")}>
              Buy Credit
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-white">
          <div className="flex h-16 items-center justify-end px-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600"></span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setDashboardTab("profile")}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDashboardTab("settings")}>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setCurrentPage("login")}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 bg-gray-50">{renderDashboardContent()}</main>
      </div>
    </div>
  )
}

// Dashboard Main Component
function DashboardMain() {
  const [emailList, setEmailList] = useState("")
  const [recentVerifications, setRecentVerifications] = useState([
    {
      id: "255553",
      name: "Swapnil - Sheet 1.csv",
      date: "2025-04-04 12:38:39",
      valid: 220,
      invalid: 20,
      risky: 5,
    },
    {
      id: "255553",
      name: "Swapnil - Sheet 1.csv",
      date: "2025-04-04 12:38:39",
      valid: 220,
      invalid: 20,
      risky: 5,
    },
  ])

  const handleVerify = () => {
    // In a real app, you would connect to your backend API here
    console.log("Verifying emails:", emailList)

    // For demo purposes, we'll just add a fake verification to the list
    const newVerification = {
      id: "255554",
      name: "Manual Verification",
      date: new Date().toISOString().replace("T", " ").substring(0, 19),
      valid: Math.floor(Math.random() * 100) + 150,
      invalid: Math.floor(Math.random() * 30),
      risky: Math.floor(Math.random() * 10),
    }

    setRecentVerifications([newVerification, ...recentVerifications])
    setEmailList("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Email Verification</h1>
      </div>

      <Tabs defaultValue="single-mail" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="single-mail">Single Mail</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        <TabsContent value="single-mail" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Paste mail list</p>
                  <Textarea
                    placeholder="Enter email addresses, one per line"
                    className="min-h-[150px]"
                    value={emailList}
                    onChange={(e) => setEmailList(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleVerify}>
                    Verify Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Card className="border border-gray-200">
              <CardContent className="pt-6 flex flex-col items-center">
                <FileUp className="h-10 w-10 text-blue-500 mb-2" />
                <h3 className="font-medium mb-1">Upload File</h3>
                <p className="text-xs text-gray-500 mb-4">SVG, PNG, JPG or GIF (max. 3MB)</p>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                    </div>
                    <Input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="pt-6 flex flex-col items-center">
                <FileText className="h-10 w-10 text-blue-500 mb-2" />
                <h3 className="font-medium mb-1">Upload File</h3>
                <p className="text-xs text-gray-500 mb-4">SVG, PNG, JPG or GIF (max. 3MB)</p>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                    </div>
                    <Input id="dropzone-file-2" type="file" className="hidden" />
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="upload" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileUp className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">CSV, Excel, or Text files</p>
                  </div>
                  <Input id="dropzone-file-upload" type="file" className="hidden" />
                </label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Integration Options</h3>
                <p className="text-gray-500">
                  Connect your email service provider to automatically verify your email lists.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {["Mailchimp", "SendGrid", "Campaign Monitor", "HubSpot", "Constant Contact", "ActiveCampaign"].map(
                    (provider) => (
                      <Button key={provider} variant="outline" className="h-20 flex flex-col">
                        <span>{provider}</span>
                        <span className="text-xs text-gray-500">Connect</span>
                      </Button>
                    ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Documentation</h3>
                <p className="text-gray-500">Use our API to integrate email verification into your applications.</p>
                <div className="bg-gray-100 p-4 rounded-md">
                  <pre className="text-sm overflow-x-auto">
                    <code>
                      {`// Example API Request
fetch('https://api.emailverify.com/v1/verify', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    email: 'example@domain.com'
  })
})`}
                    </code>
                  </pre>
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600">Get API Key</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recents</h2>
        <div className="space-y-4">
          {recentVerifications.map((verification, index) => (
            <Card key={index} className="border border-gray-200">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">ID {verification.id}</p>
                    <p className="font-medium">{verification.name}</p>
                    <p className="text-xs text-gray-500">{verification.date}</p>
                  </div>
                  <div className="flex items-center gap-8 mt-4 md:mt-0">
                    <div className="text-center">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                      <p className="text-sm font-medium mt-1">Valid</p>
                      <p className="text-sm">{verification.valid}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                          <X className="h-4 w-4 text-red-600" />
                        </div>
                      </div>
                      <p className="text-sm font-medium mt-1">Invalid</p>
                      <p className="text-sm">{verification.invalid}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 text-yellow-600"
                          >
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm font-medium mt-1">Risky</p>
                      <p className="text-sm">{verification.risky}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" className="text-xs">
                    Download
                    <Download className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// Profile Page Component
function ProfilePage() {
  const [user, setUser] = useState({
    name: "Swapnil Chavan",
    email: "enter lamark",
    phone: "enter lamark",
    password: "••••••••",
    currentBalance: "enter lamark",
    business: "enter lamark",
    city: "enter lamark",
    postalCode: "••••••••",
    address: "enter lamark",
    country: "Swapnil Chavan",
    preferredCurrency: "enter lamark",
  })

  const handleChange = (field: string, value: string) => {
    setUser({ ...user, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <Button className="bg-blue-500 hover:bg-blue-600">Add Subuser</Button>
      </div>

      <Card className="bg-blue-50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600"
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Change avatar</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={user.name} onChange={(e) => handleChange("name", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user.email} onChange={(e) => handleChange("email", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={user.phone} onChange={(e) => handleChange("phone", e.target.value)} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentBalance">Current Balance</Label>
                <div className="flex gap-2">
                  <Input
                    id="currentBalance"
                    value={user.currentBalance}
                    onChange={(e) => handleChange("currentBalance", e.target.value)}
                    className="flex-1"
                  />
                  <Button className="bg-blue-500 hover:bg-blue-600">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-bold mb-4">Billing Details</h2>
        <Card className="bg-blue-50">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business">Business</Label>
                  <Input
                    id="business"
                    value={user.business}
                    onChange={(e) => handleChange("business", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={user.city} onChange={(e) => handleChange("city", e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" value={user.address} onChange={(e) => handleChange("address", e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" value={user.country} onChange={(e) => handleChange("country", e.target.value)} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={user.postalCode}
                    onChange={(e) => handleChange("postalCode", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredCurrency">Preferred Currency</Label>
                  <Input
                    id="preferredCurrency"
                    value={user.preferredCurrency}
                    onChange={(e) => handleChange("preferredCurrency", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// History Page Component
function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const historyData = [
    {
      date: "2025-04-16 11:17 AM",
      action: "Start verifying: swapap email - Sheet01.csv (28500143)",
      spend: -1,
      balance: 97,
    },
    {
      date: "2025-04-16 11:17 AM",
      action: "Start verifying: swapap email - Sheet01.csv (28500143)",
      spend: -1,
      balance: 98,
    },
    {
      date: "2025-04-16 11:17 AM",
      action: "Start verifying: swapap email - Sheet01.csv (28500143)",
      spend: -1,
      balance: 99,
    },
    {
      date: "2025-04-16 11:17 AM",
      action: "Free Credits",
      spend: 100,
      balance: 100,
    },
  ]

  const filteredHistory = historyData.filter((item) => item.action.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">History</h1>
        <div className="text-right">
          <p className="text-sm text-gray-500">Current Balance:</p>
          <p className="text-xl font-bold">97</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Swapnil Chavan</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search history..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Spend</TableHead>
                <TableHead>Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-sm">{item.date}</TableCell>
                  <TableCell className="text-sm">{item.action}</TableCell>
                  <TableCell className={`text-sm ${item.spend > 0 ? "text-green-600" : "text-red-600"}`}>
                    {item.spend > 0 ? `+${item.spend}` : item.spend}
                  </TableCell>
                  <TableCell className="text-sm">{item.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Verifications Page Component
function VerificationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid")

  const verificationResults = [
    {
      id: "255553",
      name: "Swapnil - Sheet 1.csv",
      date: "2025-04-04 12:38:39",
      validPercent: 81,
      riskyPercent: 18,
      badPercent: 1,
      validCount: 50,
      riskyCount: 50,
      badCount: 50,
    },
    {
      id: "255553",
      name: "Swapnil - Sheet 1.csv",
      date: "2025-04-04 12:38:39",
      validPercent: 81,
      riskyPercent: 18,
      badPercent: 1,
      validCount: 50,
      riskyCount: 50,
      badCount: 50,
    },
    {
      id: "255553",
      name: "Swapnil - Sheet 1.csv",
      date: "2025-04-04 12:38:39",
      validPercent: 81,
      riskyPercent: 18,
      badPercent: 1,
      validCount: 50,
      riskyCount: 50,
      badCount: 50,
    },
    {
      id: "255553",
      name: "Swapnil - Sheet 1.csv",
      date: "2025-04-04 12:38:39",
      validPercent: 81,
      riskyPercent: 18,
      badPercent: 1,
      validCount: 50,
      riskyCount: 50,
      badCount: 50,
    },
  ]

  const filteredResults = verificationResults.filter(
    (item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.includes(searchQuery),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Results</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="File Name or ID"
              className="pl-8 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setSearchQuery("")}
              >
                <span className="sr-only">Clear search</span>
                <span className="text-gray-500">×</span>
              </Button>
            )}
          </div>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResults.map((result, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">ID {result.id}</p>
                    <p className="font-medium">{result.name}</p>
                    <p className="text-xs text-gray-500">{result.date}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16">
                        <svg viewBox="0 0 36 36" className="w-16 h-16 transform -rotate-90">
                          <circle cx="18" cy="18" r="16" fill="none" stroke="#e6e6e6" strokeWidth="2"></circle>
                          <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            stroke="#4ade80"
                            strokeWidth="2"
                            strokeDasharray={`${result.validPercent} 100`}
                          ></circle>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-medium">{result.validPercent}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Good emails are valid, existing emails.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16">
                          <svg viewBox="0 0 36 36" className="w-16 h-16 transform -rotate-90">
                            <circle cx="18" cy="18" r="16" fill="none" stroke="#e6e6e6" strokeWidth="2"></circle>
                            <circle
                              cx="18"
                              cy="18"
                              r="16"
                              fill="none"
                              stroke="#fbbf24"
                              strokeWidth="2"
                              strokeDasharray={`${result.riskyPercent} 100`}
                            ></circle>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-medium">{result.riskyPercent}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Risky emails may exist or not</p>
                          <p className="text-sm">Count: {result.riskyCount}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16">
                          <svg viewBox="0 0 36 36" className="w-16 h-16 transform -rotate-90">
                            <circle cx="18" cy="18" r="16" fill="none" stroke="#e6e6e6" strokeWidth="2"></circle>
                            <circle
                              cx="18"
                              cy="18"
                              r="16"
                              fill="none"
                              stroke="#f87171"
                              strokeWidth="2"
                              strokeDasharray={`${result.badPercent} 100`}
                            ></circle>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-medium">{result.badPercent}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Bad emails don't exist</p>
                          <p className="text-sm">Count: {result.badCount}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    Download
                    <Download className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {filteredResults.map((result, index) => (
                <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">ID {result.id}</p>
                      <p className="font-medium">{result.name}</p>
                      <p className="text-xs text-gray-500">{result.date}</p>
                    </div>
                    <div className="flex items-center gap-8 mt-4 md:mt-0">
                      <div className="text-center">
                        <div className="flex justify-center">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                        <p className="text-sm font-medium mt-1">Valid</p>
                        <p className="text-sm">{result.validCount}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex justify-center">
                          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 text-yellow-600"
                            >
                              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                              <line x1="12" y1="9" x2="12" y2="13"></line>
                              <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                          </div>
                        </div>
                        <p className="text-sm font-medium mt-1">Risky</p>
                        <p className="text-sm">{result.riskyCount}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex justify-center">
                          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                            <X className="h-4 w-4 text-red-600" />
                          </div>
                        </div>
                        <p className="text-sm font-medium mt-1">Bad</p>
                        <p className="text-sm">{result.badCount}</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-4">
                        Download
                        <Download className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Credits Page Component
function CreditsPage() {
  const [selectedCredits, setSelectedCredits] = useState(5000)

  const creditPackages = [
    {
      credits: 2000,
      price: 4.9,
      description: "Most schedules are designed for teams, that is designed for freelancers who want a simple way.",
    },
    {
      credits: 10000,
      price: 37,
      description: "Most schedules are designed for teams, that is designed for freelancers who want a simple way.",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Credits</h1>
      </div>

      <Card className="bg-blue-50 border-blue-100">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-medium">Buy at least 5,000,000 credits & get 1 million credits for free</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {creditPackages.map((pkg, index) => (
          <Card key={index} className="border border-gray-200">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold">{pkg.credits.toLocaleString()} Credits</h3>
                  <p className="text-sm text-gray-500">{pkg.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">${pkg.price}</div>
                  <div className="text-sm text-gray-500">Per Month</div>
                </div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">Buy Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Credits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold">{selectedCredits.toLocaleString()} Credit</h3>
              <p className="text-sm text-gray-500">Per Credit Price: ${(0.00224).toFixed(5)}</p>
            </div>

            <div className="space-y-4">
              <Slider
                defaultValue={[5000]}
                max={25000}
                step={5000}
                onValueChange={(value) => setSelectedCredits(value[0])}
              />

              <div className="flex justify-between">
                <Button
                  variant={selectedCredits === 5000 ? "default" : "outline"}
                  onClick={() => setSelectedCredits(5000)}
                  className="flex-1 mx-1"
                >
                  5k
                </Button>
                <Button
                  variant={selectedCredits === 10000 ? "default" : "outline"}
                  onClick={() => setSelectedCredits(10000)}
                  className="flex-1 mx-1"
                >
                  10k
                </Button>
                <Button
                  variant={selectedCredits === 15000 ? "default" : "outline"}
                  onClick={() => setSelectedCredits(15000)}
                  className="flex-1 mx-1"
                >
                  15k
                </Button>
                <Button
                  variant={selectedCredits === 20000 ? "default" : "outline"}
                  onClick={() => setSelectedCredits(20000)}
                  className="flex-1 mx-1"
                >
                  20k
                </Button>
                <Button
                  variant={selectedCredits === 25000 ? "default" : "outline"}
                  onClick={() => setSelectedCredits(25000)}
                  className="flex-1 mx-1"
                >
                  25k
                </Button>
                <Button variant="outline" className="flex-1 mx-1">
                  Custom
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Add Subuser Page Component
function AddSubuserPage() {
  const [formData, setFormData] = useState({
    name: "Swapnil Chavan",
    email: "",
    phone: "",
    accountType: "isolated",
  })

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real app, you would connect to your backend API here
    console.log("Adding subuser:", formData)
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="enter lamark"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="enter lamark"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Account Type</Label>
              <RadioGroup
                value={formData.accountType}
                onValueChange={(value) => handleChange("accountType", value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="isolated" id="isolated" />
                  <Label htmlFor="isolated">Isolated</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="access" id="access" />
                  <Label htmlFor="access">Access</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
              Add
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <Footer />
    </>
  )
}
