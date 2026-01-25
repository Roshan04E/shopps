'use client'

import React, { useEffect, useState } from 'react'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUpUser } from '@/lib/actions/action-users'
import { Button } from "@/components/button"
import { useRouter, useSearchParams } from 'next/navigation' 
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react"
import { Alert, AlertDescription } from '@/components/ui/alert'

function SignUpFormCredentials() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get("callbackUrl") || "/"
  
  // Server only returns { success: boolean, message: string }
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: ""
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  })
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [clientErrors, setClientErrors] = useState<{[key: string]: string}>({})

  useEffect(() => {
    if (data?.success) {
      router.push(callbackUrl)
    }
  }, [data?.success, callbackUrl, router])

  useEffect(() => {
    // Check password strength
    const pwd = formData.password
    setPasswordStrength({
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    })
  }, [formData.password])

  useEffect(() => {
    // Check if passwords match
    if (formData.confirmPassword) {
      setPasswordsMatch(formData.password === formData.confirmPassword)
    } else {
      setPasswordsMatch(true)
    }
  }, [formData.password, formData.confirmPassword])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear client-side error for this field when user starts typing
    if (clientErrors[name]) {
      setClientErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {}

    // Validate name
    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }

    // Validate email
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    // Validate password
    if (!formData.password) {
      errors.password = "Password is required"
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters"
    } else if (!Object.values(passwordStrength).every(v => v)) {
      errors.password = "Password does not meet all requirements"
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    setClientErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (formDataObj: FormData) => {
    // Client-side validation before sending to server
    if (validateForm()) {
      action(formDataObj)
    }
  }

  function SignUpFormButton() {
    const { pending } = useFormStatus()
    
    const isFormValid = 
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.length >= 8 &&
      passwordsMatch &&
      Object.values(passwordStrength).every(v => v)

    return (
      <Button 
        disabled={pending || !isFormValid} 
        type="submit" 
        className="w-full"
      >
        {pending ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin">⏳</span>
            Signing up...
          </span>
        ) : (
          "Sign Up"
        )}
      </Button>
    )
  }

  const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
    <div className="flex items-center gap-2 text-sm">
      {met ? (
        <CheckCircle2 className="h-4 w-4 text-green-500" />
      ) : (
        <XCircle className="h-4 w-4 text-gray-400" />
      )}
      <span className={met ? "text-green-700" : "text-gray-600"}>{text}</span>
    </div>
  )

  return (
    <form action={handleSubmit} className="space-y-4">
      <Input type="hidden" name="callbackUrl" value={callbackUrl || ''} />
      
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleInputChange}
          className={clientErrors.name ? "border-red-500" : ""}
        />
        {clientErrors.name && (
          <p className="text-sm text-red-500">{clientErrors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="m@example.com"
          value={formData.email}
          onChange={handleInputChange}
          className={clientErrors.email ? "border-red-500" : ""}
        />
        {clientErrors.email && (
          <p className="text-sm text-red-500">{clientErrors.email}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={clientErrors.password ? "border-red-500 pr-10" : "pr-10"}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        
        {formData.password && (
          <div className="mt-3 p-3 bg-gray-50 rounded-md space-y-2">
            <p className="text-sm font-medium text-gray-700">Password Requirements:</p>
            <PasswordRequirement met={passwordStrength.length} text="At least 8 characters" />
            <PasswordRequirement met={passwordStrength.uppercase} text="One uppercase letter" />
            <PasswordRequirement met={passwordStrength.lowercase} text="One lowercase letter" />
            <PasswordRequirement met={passwordStrength.number} text="One number" />
            <PasswordRequirement met={passwordStrength.special} text="One special character" />
          </div>
        )}
        
        {clientErrors.password && (
          <p className="text-sm text-red-500">{clientErrors.password}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={
              clientErrors.confirmPassword || (formData.confirmPassword && !passwordsMatch)
                ? "border-red-500 pr-10" 
                : "pr-10"
            }
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        
        {clientErrors.confirmPassword && (
          <p className="text-sm text-red-500">{clientErrors.confirmPassword}</p>
        )}
        
        {!clientErrors.confirmPassword && formData.confirmPassword && !passwordsMatch && (
          <p className="text-sm text-red-500">Passwords do not match</p>
        )}
        
        {!clientErrors.confirmPassword && formData.confirmPassword && passwordsMatch && formData.password && (
          <p className="text-sm text-green-600 flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" /> Passwords match
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <SignUpFormButton />
      </div>

      {/* Server Response Messages */}
      {data && !data.success && data.message && (
        <Alert variant="destructive">
          <AlertDescription>{data.message}</AlertDescription>
        </Alert>
      )}

      {data?.success && data.message && (
        <Alert className="border-green-500 bg-green-50">
          <AlertDescription className="text-green-800">
            {data.message}
          </AlertDescription>
        </Alert>
      )}
    </form>
  )
}

export default SignUpFormCredentials