"use client"

import { useState, useEffect } from "react"
import { 
  BarChart, RefreshCw, AlertCircle, Download, 
  Check, X, Clock, Search, CalendarIcon 
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { verifyEmails } from "@/lib/email-verification"
import { useAuth } from "@/contexts/auth-context"
import { Label } from "@/components/ui/label"

// Mock verification data
const generateMockVerifications = (count: number) => {
  const statuses = ['valid', 'invalid', 'risky'];
  const types = ['single', 'batch', 'api', 'import'];
  const users = [
    { id: 'user1', name: 'Alice Smith', email: 'alice@example.com' },
    { id: 'user2', name: 'Bob Johnson', email: 'bob@company.com' },
    { id: 'user3', name: 'Charlie Brown', email: 'charlie@gmail.com' },
    { id: 'user4', name: 'Diana Prince', email: 'diana@outlook.com' },
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const user = users[Math.floor(Math.random() * users.length)];
    const emailCount = Math.floor(Math.random() * 100) + 1;
    const validCount = Math.floor(Math.random() * emailCount);
    const invalidCount = Math.floor(Math.random() * (emailCount - validCount));
    const riskyCount = emailCount - validCount - invalidCount;
    
    return {
      id: `v${i+1}`,
      date: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
      userId: user.id,
      user: user.name,
      type: types[Math.floor(Math.random() * types.length)],
      emailCount,
      validCount,
      invalidCount,
      riskyCount,
      status: Math.random() > 0.9 ? 'in_progress' : 'completed'
    };
  });
};

// Mock email data
const generateMockVerifiedEmails = (count: number) => {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'company.com', 'example.org'];
  const reasons = [
    'Invalid format', 
    'Domain does not exist', 
    'Mailbox not found', 
    'Temporary rejection',
    'Disposable email',
    'Potential typo',
    'Role-based email'
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const name = `user${Math.floor(Math.random() * 10000)}`;
    const email = `${name}@${domain}`;
    const status = Math.random() < 0.7 ? 'valid' : (Math.random() < 0.7 ? 'invalid' : 'risky');
    const score = status === 'valid' ? Math.floor(Math.random() * 30) + 70 :
                 status === 'risky' ? Math.floor(Math.random() * 40) + 30 :
                 Math.floor(Math.random() * 30);
    
    return {
      id: `email${i+1}`,
      email,
      status,
      score,
      date: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
      reason: status !== 'valid' ? reasons[Math.floor(Math.random() * reasons.length)] : undefined
    };
  });
};

// Format date helper
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Sample emails for the verification tester
const sampleEmails = [
  "valid@gmail.com",
  "user@test.invalid",
  "bounce@example.com",
  "typo@gmial.com",
  "user@disposable.com",
  "noreply@company.org"
];

export default function EmailVerificationPage() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [verifications, setVerifications] = useState<any[]>([]);
  const [verifiedEmails, setVerifiedEmails] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [testEmails, setTestEmails] = useState("");
  const [testResults, setTestResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Fetch verification data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Generate mock data
        const mockVerifications = generateMockVerifications(25);
        const mockEmails = generateMockVerifiedEmails(100);
        
        setVerifications(mockVerifications);
        setVerifiedEmails(mockEmails);
      } catch (error) {
        console.error("Error fetching verification data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [token]);
  
  // Filter verifications based on time filter
  const filteredVerifications = verifications.filter(v => {
    if (timeFilter === "all") return true;
    
    const date = new Date(v.date);
    const now = new Date();
    
    switch (timeFilter) {
      case "today":
        return date.setHours(0, 0, 0, 0) === now.setHours(0, 0, 0, 0);
      case "week":
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return date >= oneWeekAgo;
      case "month":
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return date >= oneMonthAgo;
      default:
        return true;
    }
  });
  
  // Search verifications
  const searchedVerifications = filteredVerifications.filter(v => 
    v.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Test email verification
  const handleTestVerification = () => {
    if (!testEmails.trim()) {
      setTestEmails(sampleEmails.join("\n"));
      return;
    }
    
    const emails = testEmails
      .split(/[\n,]/)
      .map(email => email.trim())
      .filter(email => email.length > 0);
    
    if (emails.length === 0) return;
    
    // Use the development verification algorithm
    const results = verifyEmails(emails);
    setTestResults(results);
  };
  
  // Get verification stats
  const getStats = () => {
    if (loading || verifications.length === 0) {
      return {
        total: 0,
        valid: 0,
        invalid: 0,
        risky: 0,
        validPercent: 0,
        invalidPercent: 0,
        riskyPercent: 0
      };
    }
    
    const totalEmails = verifications.reduce((sum, v) => sum + v.emailCount, 0);
    const validEmails = verifications.reduce((sum, v) => sum + v.validCount, 0);
    const invalidEmails = verifications.reduce((sum, v) => sum + v.invalidCount, 0);
    const riskyEmails = verifications.reduce((sum, v) => sum + v.riskyCount, 0);
    
    return {
      total: totalEmails,
      valid: validEmails,
      invalid: invalidEmails,
      risky: riskyEmails,
      validPercent: Math.round((validEmails / totalEmails) * 100),
      invalidPercent: Math.round((invalidEmails / totalEmails) * 100),
      riskyPercent: Math.round((riskyEmails / totalEmails) * 100)
    };
  };
  
  const stats = getStats();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Email Verification</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      
      {/* Tabs for different sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="history">Verification History</TabsTrigger>
          <TabsTrigger value="test">Verification Tester</TabsTrigger>
        </TabsList>
        
        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Verified</CardTitle>
                <CardDescription>All time</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {loading ? "..." : stats.total.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-green-600">Valid</CardTitle>
                <CardDescription>Deliverable emails</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-green-600">
                    {loading ? "..." : stats.valid.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    ({loading ? "..." : stats.validPercent}%)
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-red-600">Invalid</CardTitle>
                <CardDescription>Undeliverable emails</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-red-600">
                    {loading ? "..." : stats.invalid.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    ({loading ? "..." : stats.invalidPercent}%)
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-amber-600">Risky</CardTitle>
                <CardDescription>Potentially problematic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-amber-600">
                    {loading ? "..." : stats.risky.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    ({loading ? "..." : stats.riskyPercent}%)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Recent Verifications</CardTitle>
                <CardDescription>Last 10 verification batches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Results</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            <RefreshCw className="h-6 w-6 animate-spin mx-auto" />
                            <p className="text-sm text-gray-500 mt-2">Loading verifications...</p>
                          </TableCell>
                        </TableRow>
                      ) : verifications.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            <p className="text-sm text-gray-500">No verifications found</p>
                          </TableCell>
                        </TableRow>
                      ) : (
                        verifications.slice(0, 10).map((verification) => (
                          <TableRow key={verification.id}>
                            <TableCell>{formatDate(verification.date)}</TableCell>
                            <TableCell>{verification.user}</TableCell>
                            <TableCell className="capitalize">{verification.type}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                                ${verification.status === 'completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-blue-100 text-blue-800'
                                }`}>
                                {verification.status === 'completed' 
                                  ? <Check className="h-3 w-3 mr-1" /> 
                                  : <Clock className="h-3 w-3 mr-1" />
                                }
                                {verification.status === 'completed' ? 'Completed' : 'In Progress'}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end">
                                <span className="text-green-600 mr-3">
                                  {verification.validCount} 
                                  <span className="text-xs ml-1">valid</span>
                                </span>
                                <span className="text-red-600 mr-3">
                                  {verification.invalidCount} 
                                  <span className="text-xs ml-1">invalid</span>
                                </span>
                                <span className="text-amber-600">
                                  {verification.riskyCount} 
                                  <span className="text-xs ml-1">risky</span>
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Invalid Reasons</CardTitle>
                <CardDescription>Most common issues</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="py-6 flex justify-center">
                    <RefreshCw className="h-6 w-6 animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[
                      { reason: 'Domain does not exist', count: 185, percent: 42 },
                      { reason: 'Mailbox not found', count: 126, percent: 29 },
                      { reason: 'Invalid format', count: 73, percent: 17 },
                      { reason: 'Disposable email', count: 52, percent: 12 },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-1">
                          <p className="text-sm font-medium">{item.reason}</p>
                          <p className="text-sm text-gray-500">{item.count}</p>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 rounded-full" 
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Verification History Tab */}
        <TabsContent value="history" className="space-y-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search verifications..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Last 7 days</SelectItem>
                    <SelectItem value="month">Last 30 days</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Emails</TableHead>
                    <TableHead className="text-right">Valid</TableHead>
                    <TableHead className="text-right">Invalid</TableHead>
                    <TableHead className="text-right">Risky</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8">
                        <RefreshCw className="h-6 w-6 animate-spin mx-auto" />
                        <p className="text-sm text-gray-500 mt-2">Loading verification history...</p>
                      </TableCell>
                    </TableRow>
                  ) : searchedVerifications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8">
                        <p className="text-sm text-gray-500">No matching verifications found</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    searchedVerifications.map((verification) => (
                      <TableRow key={verification.id}>
                        <TableCell>{formatDate(verification.date)}</TableCell>
                        <TableCell>{verification.id}</TableCell>
                        <TableCell>{verification.user}</TableCell>
                        <TableCell className="capitalize">{verification.type}</TableCell>
                        <TableCell className="text-right">{verification.emailCount}</TableCell>
                        <TableCell className="text-right text-green-600">
                          {verification.validCount}
                          <span className="text-xs text-gray-500 ml-1">
                            ({Math.round((verification.validCount / verification.emailCount) * 100)}%)
                          </span>
                        </TableCell>
                        <TableCell className="text-right text-red-600">
                          {verification.invalidCount}
                          <span className="text-xs text-gray-500 ml-1">
                            ({Math.round((verification.invalidCount / verification.emailCount) * 100)}%)
                          </span>
                        </TableCell>
                        <TableCell className="text-right text-amber-600">
                          {verification.riskyCount}
                          <span className="text-xs text-gray-500 ml-1">
                            ({Math.round((verification.riskyCount / verification.emailCount) * 100)}%)
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                            ${verification.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                            }`}>
                            {verification.status === 'completed' 
                              ? <Check className="h-3 w-3 mr-1" /> 
                              : <Clock className="h-3 w-3 mr-1" />
                            }
                            {verification.status === 'completed' ? 'Completed' : 'In Progress'}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        
        {/* Verification Tester Tab */}
        <TabsContent value="test" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Verification Tester</CardTitle>
              <CardDescription>
                Test the email verification system with sample emails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="test-emails">
                  Emails to verify (one per line or comma separated)
                </Label>
                <textarea
                  id="test-emails"
                  className="w-full min-h-32 p-3 rounded-md border border-gray-300"
                  placeholder={sampleEmails.join("\n")}
                  value={testEmails}
                  onChange={(e) => setTestEmails(e.target.value)}
                />
                <div className="flex items-center text-sm text-blue-600">
                  <button 
                    className="underline"
                    onClick={() => setTestEmails(sampleEmails.join("\n"))}
                  >
                    Load sample emails
                  </button>
                  <span className="mx-2">•</span>
                  <button 
                    className="underline"
                    onClick={() => setTestEmails("")}
                  >
                    Clear
                  </button>
                </div>
              </div>
              
              <Button onClick={handleTestVerification}>
                Verify Emails
              </Button>
              
              {testResults && (
                <div className="mt-6 space-y-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Summary</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-2xl font-bold">{testResults.summary.total}</p>
                      </div>
                      <div>
                        <p className="text-sm text-green-500">Valid</p>
                        <p className="text-2xl font-bold text-green-600">{testResults.summary.valid}</p>
                      </div>
                      <div className="flex justify-around">
                        <div>
                          <p className="text-sm text-red-500">Invalid</p>
                          <p className="text-2xl font-bold text-red-600">{testResults.summary.invalid}</p>
                        </div>
                        <div>
                          <p className="text-sm text-amber-500">Risky</p>
                          <p className="text-2xl font-bold text-amber-600">{testResults.summary.risky}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Detailed Results</h3>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Score</TableHead>
                            <TableHead>Reason</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {testResults.results.map((result: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell>{result.email}</TableCell>
                              <TableCell>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                                  ${result.status === 'valid' 
                                    ? 'bg-green-100 text-green-800' : 
                                    result.status === 'invalid'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-amber-100 text-amber-800'
                                  }`}>
                                  {result.status === 'valid' 
                                    ? <Check className="h-3 w-3 mr-1" /> : 
                                    result.status === 'invalid'
                                    ? <X className="h-3 w-3 mr-1" />
                                    : <AlertCircle className="h-3 w-3 mr-1" />
                                  }
                                  {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end">
                                  <div className="w-12 bg-gray-200 rounded-full h-2 mr-2">
                                    <div 
                                      className={`h-2 rounded-full ${
                                        result.status === 'valid' 
                                          ? 'bg-green-600' : 
                                          result.status === 'invalid'
                                          ? 'bg-red-600'
                                          : 'bg-amber-600'
                                      }`}
                                      style={{ width: `${result.score}%` }}
                                    />
                                  </div>
                                  {result.score}
                                </div>
                              </TableCell>
                              <TableCell>
                                {result.reason || 'Valid email address'}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 