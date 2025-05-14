"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { apiService } from "@/lib/api-service"
import { Loader2, Upload, FileText, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import debounce from "lodash/debounce"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const SUPPORTED_FILE_TYPES = [".csv", ".txt", ".xlsx", ".xls"]
const MAX_EMAILS = 10000

export default function NewVerificationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [emailList, setEmailList] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [previewCount, setPreviewCount] = useState<number | null>(null)

  const validateEmails = (emails: string[]): { valid: string[]; invalid: string[] } => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const valid: string[] = []
    const invalid: string[] = []

    emails.forEach(email => {
      const trimmedEmail = email.trim()
      if (trimmedEmail && emailRegex.test(trimmedEmail)) {
        valid.push(trimmedEmail)
      } else if (trimmedEmail) {
        invalid.push(trimmedEmail)
      }
    })

    return { valid, invalid }
  }

  const handleEmailListChange = useCallback(
    debounce((value: string) => {
      const emails = value.split(/[\n,]/).filter(Boolean)
      const { valid, invalid } = validateEmails(emails)
      
      if (invalid.length > 0) {
        setError(`${invalid.length} invalid email format(s) detected`)
      } else {
        setError(null)
      }

      if (valid.length > MAX_EMAILS) {
        setError(`Maximum ${MAX_EMAILS} emails allowed`)
      }
    }, 500),
    []
  )

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`
    }

    const extension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase()
    if (!SUPPORTED_FILE_TYPES.includes(extension)) {
      return `Unsupported file type. Please use ${SUPPORTED_FILE_TYPES.join(", ")}`
    }

    return null
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setSelectedFile(file)

    // Preview file contents for text files
    if (file.type === "text/plain" || file.name.endsWith(".csv")) {
      try {
        const text = await file.text()
        const emails = text.split(/[\n,]/).filter(Boolean)
        const { valid } = validateEmails(emails)
        setPreviewCount(valid.length)

        if (valid.length > MAX_EMAILS) {
          setError(`Maximum ${MAX_EMAILS} emails allowed`)
        }
      } catch (err) {
        setError("Failed to read file contents")
      }
    }
  }

  const handleVerification = async () => {
    if (!user?.token) return

    setIsLoading(true)
    setError(null)
    setUploadProgress(0)

    try {
      let result

      if (selectedFile) {
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => Math.min(prev + 10, 90))
        }, 500)

        result = await apiService.verification.verifyFile(user.token, selectedFile)
        clearInterval(progressInterval)
        setUploadProgress(100)
      } else {
        const emails = emailList.split(/[\n,]/).filter(Boolean)
        const { valid, invalid } = validateEmails(emails)

        if (invalid.length > 0) {
          throw new Error(`${invalid.length} invalid email format(s) detected`)
        }

        if (valid.length > MAX_EMAILS) {
          throw new Error(`Maximum ${MAX_EMAILS} emails allowed`)
        }

        result = await apiService.verification.verifyEmails(user.token, valid)
      }

      toast({
        title: "Success",
        description: "Email verification started successfully",
      })

      router.push(`/dashboard/verification/${result.id}`)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to process verification")
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process verification",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New Verification</h1>
        <p className="text-gray-500">Verify your email addresses</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Enter Email Addresses</CardTitle>
          <CardDescription>
            Enter email addresses (one per line or comma-separated)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter email addresses..."
            value={emailList}
            onChange={(e) => {
              setEmailList(e.target.value)
              handleEmailListChange(e.target.value)
            }}
            className="h-[200px]"
            disabled={isLoading || !!selectedFile}
          />
        </CardContent>
      </Card>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload File</CardTitle>
          <CardDescription>
            Upload a CSV, TXT, XLSX, or XLS file containing email addresses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-6">
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-gray-500" />
                <div className="text-sm text-gray-500">
                  {selectedFile ? (
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>{selectedFile.name}</span>
                      {previewCount !== null && (
                        <span className="text-green-500">
                          ({previewCount} valid emails)
                        </span>
                      )}
                    </div>
                  ) : (
                    "Drag and drop your file here, or click to browse"
                  )}
                </div>
                <input
                  type="file"
                  accept=".csv,.txt,.xlsx,.xls"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  disabled={isLoading || !!emailList}
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("file-upload")?.click()}
                  disabled={isLoading || !!emailList}
                >
                  Select File
                </Button>
              </div>
            </div>

            {isLoading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} />
                <p className="text-sm text-gray-500 text-center">
                  {uploadProgress < 100 ? "Processing..." : "Completing..."}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Button
        className="w-full"
        onClick={handleVerification}
        disabled={isLoading || (!emailList && !selectedFile)}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Start Verification"
        )}
      </Button>
    </div>
  )
} 