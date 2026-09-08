import type { ReactNode } from "react";
import { ArrowRight, LockKeyhole, Mail, UserRound } from "lucide-react";
import { Button, Input, Label } from "../ui";

type AuthCardProps = {
  mode: "login" | "register";
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function AuthCard({ mode, onSubmit }: AuthCardProps) {
  const login = mode === "login";

  return (
    <div className="w-full max-w-[430px]">
      {/* Header */}
      <div className="mb-7 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.12em] text-webzark">
        <span className="flex h-8 w-8 items-center justify-center rounded-[14px] bg-blue-50 text-webzark">
          <UserRound size={14} />
        </span>
        {login ? "Welcome back" : "Join Webzark"}
      </div>

      <h1 className="font-display text-3xl font-extrabold tracking-[-.05em] text-navy">
        {login ? "Sign in to Webzark" : "Create your account"}
      </h1>

      <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
        {login
          ? "Access your account to continue shopping for quality hardware and tools."
          : "Get started today and unlock a better way to buy hardware for your business."}
      </p>

      {/* Form */}
      <form className="mt-7 space-y-4" onSubmit={onSubmit}>
        {!login && (
          <div className="grid gap-3 sm:grid-cols-2">
            <AuthField
              id="first-name"
              label="First name"
              placeholder="Rohit"
              icon={<UserRound size={14} />}
              required
            />

            <AuthField
              id="last-name"
              label="Last name"
              placeholder="Saini"
              icon={<UserRound size={14} />}
              required
            />
          </div>
        )}

        <AuthField
          id="auth-email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          icon={<Mail size={14} />}
          required
        />

        {!login && (
          <AuthField
            id="phone"
            label="Phone number"
            placeholder="+91 98765 43210"
            icon={<UserRound size={14} />}
            required
          />
        )}

        <AuthField
          id="auth-password"
          label="Password"
          type="password"
          placeholder={login ? "Enter your password" : "Create a password"}
          icon={<LockKeyhole size={14} />}
          required
        />

        {login ? (
          <div className="flex items-center justify-between text-[10px] text-muted">
            <label className="flex items-center gap-2">
              <input
                className="h-3.5 w-3.5 accent-webzark"
                type="checkbox"
              />
              Keep me signed in
            </label>

            <a
              className="font-bold text-webzark transition-colors hover:text-webzark-dark"
              href="/forgot-password"
            >
              Forgot password?
            </a>
          </div>
        ) : (
          <p className="text-[10px] leading-4 text-muted">
            Use at least 8 characters with one number and one special
            character.
          </p>
        )}

        {!login && (
          <label className="flex items-start gap-2 text-[10px] leading-4 text-muted">
            <input
              className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-webzark"
              type="checkbox"
              required
            />

            <span>
              I agree to the{" "}
              <a
                className="font-bold text-webzark transition-colors hover:text-webzark-dark"
                href="/terms"
              >
                Terms of Service
              </a>{" "}
              and Privacy Policy
            </span>
          </label>
        )}

        <Button
          className="w-full rounded-[14px]"
          type="submit"
        >
          {login ? "Sign in" : "Create account"}
          <ArrowRight size={15} />
        </Button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[.1em] text-muted">
        <span className="h-px flex-1 bg-border" />
        <span>Or continue with</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* Social buttons */}
      <div className="grid grid-cols-3 gap-2">
        <SocialButton label="Google" />
        <SocialButton label="Microsoft" />
        <SocialButton label="Apple" />
      </div>

      {/* Auth switch */}
      <p className="mt-6 text-center text-xs text-muted">
        {login ? "Don't have an account?" : "Already have an account?"}{" "}
        <a
          className="font-bold text-webzark underline-offset-4 transition-colors hover:text-webzark-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark/20"
          href={login ? "/register" : "/login"}
        >
          {login ? "Sign up" : "Sign in"}
        </a>
      </p>
    </div>
  );
}

function AuthField({
  id,
  label,
  type = "text",
  placeholder,
  icon,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  icon: ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <Label
        className="mb-1.5 block text-[10px] font-bold uppercase tracking-[.08em] text-navy"
        htmlFor={id}
      >
        {label}
      </Label>

      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400">
          {icon}
        </span>

        <Input
          className="rounded-[14px] py-3 pl-9 text-sm"
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
}

function SocialButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="rounded-[14px] border border-slate-200 bg-white px-2.5 py-2.5 text-[10px] font-semibold text-navy shadow-none transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark/20"
    >
      {label}
    </button>
  );
}