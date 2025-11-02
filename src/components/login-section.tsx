import { cn } from "@/lib/utils"
import { LoginForm } from "@/components/login-form"

export function LoginSection({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "flex flex-col gap-6 text-left",
        "max-w-sm",
        className
      )}
      {...props}
    >
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="text-muted-foreground text-sm">
          Enter your credentials to access your garages.
        </p>
      </div>
      <LoginForm className="w-full" />
    </section>
  )
}
