'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'
import { syncUserWithDb } from '@/lib/SyncUserWithDb'

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk()
  const router = useRouter()

  useEffect(() => {
    async function processOAuthSignInCallback() {
      try {
        //@ts-ignore
        const { createdSessionId, signUp, signIn } = await handleRedirectCallback()

        if (createdSessionId) {
          // If this is a sign-up, additional user data will be available
          if (signUp?.createdUserId) {
            const { firstName, lastName, emailAddresses } = signUp.userData

            // Sync the new user data with your database
            await syncUserWithDb({
              email: emailAddresses[0]?.emailAddress || '',
              firstName: firstName || '',
              lastName: lastName || '',
            })
          } else if (signIn?.userData) {
            // For sign-in, we might want to sync or update user data as well
            const { firstName, lastName, emailAddresses } = signIn.userData
            await syncUserWithDb({
              email: emailAddresses[0]?.emailAddress || '',
              firstName: firstName || '',
              lastName: lastName || '',
            })
          }

          // Redirect to the home page or dashboard after successful authentication
          router.push('/home')
        }
      } catch (error) {
        console.error('Error handling OAuth callback:', error)
        // Redirect to an error page or show an error message
        router.push('/auth-error')
      }
    }

    processOAuthSignInCallback()
  }, [handleRedirectCallback, router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Processing your sign-in...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
      </div>
    </div>
  )
}