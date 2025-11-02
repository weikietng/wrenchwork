import Image from "next/image"
import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 md:p-10">
        <SignupForm className="w-full" />
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/garage.jpg"
          alt="Garage workspace"
          fill
          sizes="(min-width: 1024px) 50vw, 0"
          className="object-cover dark:brightness-[0.2] dark:grayscale"
          priority
        />
      </div>
    </div>
  )
}
