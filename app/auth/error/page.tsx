'use client'

import { use } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card'
import { Button } from '@/components/button'
import { useRouter } from 'next/navigation'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; error_code?: string; error_description?: string }>
}) {
  const router = useRouter()
  const params = use(searchParams)

  const getErrorMessage = (errorCode?: string | null, errorDesc?: string | null) => {
    if (errorCode === 'otp_expired' || errorDesc?.includes('expired')) {
      return 'The email confirmation link has expired. Please sign up again to receive a new confirmation email.'
    }
    if (errorCode === 'access_denied') {
      return 'Access was denied. Please try signing in again.'
    }
    if (errorDesc) {
      return errorDesc
    }
    return 'An unspecified error occurred during authentication.'
  }

  const errorCode = params.error_code
  const errorDesc = params.error_description
  const errorMessage = getErrorMessage(errorCode, errorDesc)

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-md">
        <Card className="border border-border-subtle">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
              <CardTitle className="text-2xl">
                Authentication Error
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {errorMessage}
            </p>

            {errorCode === 'otp_expired' && (
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-sm text-primary font-medium">
                  💡 Tip: Email confirmation links expire after 1 hour. If you need to disable email confirmation for development, check your Supabase project settings.
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3 pt-4">
              <Button
                onClick={() => router.push('/auth/sign-up')}
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/')}
                className="w-full"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
