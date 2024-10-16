'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Trophy } from 'lucide-react'
import { useSignIn, useSignUp, useClerk } from '@clerk/nextjs'
import { syncUserWithDb, syncSignUpDb } from '@/lib/SyncUserWithDb'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type FormData = {
  email: string
  password: string
  confirmPassword?: string
  firstName?: string
  lastName?: string
  phone?: string
  location?: string
}

function AuthForm({ isSignUp = false }: { isSignUp?: boolean }) {
  const router = useRouter()
  const { signIn, isLoaded: isSignInLoaded } = useSignIn()
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp()
  const { setActive } = useClerk()
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!isSignInLoaded) {
      setError('Sign-in is not available at this time.')
      setIsLoading(false)
      return
    }

    try {
      const result = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        await syncUserWithDb({
          email: formData.email,
          firstName: result.userData?.firstName || '',
          lastName: result.userData?.lastName || '',
        })
        router.push('/home')
      } else {
        setError('Failed to sign in. Please check your credentials.')
      }
    } catch (err) {
      console.error('Sign-in error:', err)
      setError('Failed to sign in. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!isSignUpLoaded) {
      setError('Sign-up is not available at this time.')
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      setIsLoading(false)
      return
    }

    try {
      const result = await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        await syncSignUpDb({
          email: formData.email,
          firstName: formData.firstName || null,
          lastName: formData.lastName || null,
          password: formData.password,
        })
        router.push('/home')
      } else {
        setError('Failed to sign up. Please try again.')
      }
    } catch (err) {
      console.error('Sign-up error:', err)
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthSignIn = async (strategy: 'oauth_google') => {
    setError('')
    setIsLoading(true)

    try {
      if (isSignUp) {
        await signUp?.authenticateWithRedirect({
          strategy,
          redirectUrl: '/sso-callback',
          redirectUrlComplete: '/home',
        })
      } else {
        await signIn?.authenticateWithRedirect({
          strategy,
          redirectUrl: '/sso-callback',
          redirectUrlComplete: '/home',
        })
      }
    } catch (error) {
      console.error(`Failed to initiate ${strategy} sign-in:`, error)
      setError(`Failed to sign in with ${strategy}. Please try again!`)
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center py-4 border-b border-gray-200">
          <Trophy className="w-10 h-10 text-primary" />
          <CardTitle className="text-2xl font-bold">PlayPals</CardTitle>
        </div>
        <CardDescription>
          {isSignUp ? 'Create an account' : 'Sign in to your account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
          {isSignUp && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              required
            />
          </div>
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                required
              />
            </div>
          )}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </span>{' '}
          <Link href={isSignUp ? '/sign-in' : '/sign-up'} className="text-primary hover:underline">
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Link>
        </div>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => handleOAuthSignIn('oauth_google')}
          className="w-full"
          disabled={isLoading}
        >
          {isSignUp ? 'Sign up' : 'Sign in'} with Google
        </Button>
      </CardContent>
    </Card>
  )
}

export default function FormAuth({ isSignUp = false }: { isSignUp?: boolean }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <AuthForm isSignUp={isSignUp} />
    </div>
  )
}