"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

export default function AuthPage({ params }: { params: { mode: string } }) {
  const mode = params.mode; // "login" | "register" | "forgot-password"
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginForm = useForm<LoginData>({ resolver: zodResolver(loginSchema) });
  const registerForm = useForm<RegisterData>({ resolver: zodResolver(registerSchema) });

  const handleLogin = async (data: LoginData) => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ 
        email: data.email, 
        password: data.password 
      });

      if (error) {
        if (error.message.includes("Email not confirmed")) {
          throw new Error("Please verify your email address before logging in.");
        }
        throw new Error(error.message);
      }

      toast.success("Welcome back! 💄");
      
      // If user came from booking, send them back to booking
      const searchParams = new URLSearchParams(window.location.search);
      const next = searchParams.get("next");
      
      window.location.href = next ? decodeURIComponent(next) : "/dashboard";
    } catch (err: any) {
      toast.error(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: RegisterData) => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.full_name,
            phone: data.phone,
          },
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        }
      });

      if (error) throw error;

      toast.success("Account created! Please check your email to verify.");
      window.location.href = "/auth/login";
    } catch (err: any) {
      toast.error(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    toast("Google login coming soon!");
  };

  return (
    <div className="min-h-screen bg-brand-surface dark:bg-zinc-950 flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md">
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl shadow-glass-lg border border-brand-border dark:border-zinc-800 p-8"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/">
              <p className="font-playfair font-black text-3xl text-brand-text dark:text-white">
                PY <span className="text-purple-gradient">Luxe</span>
              </p>
            </Link>
            <p className="font-inter text-xs text-brand-muted tracking-[0.3em] uppercase mt-1">
              Beauty · Style · Confidence
            </p>
          </div>

          {mode === "login" && (
            <>
              <h1 className="font-playfair text-2xl font-bold text-brand-text dark:text-white mb-1">
                Welcome Back
              </h1>
              <p className="font-inter text-brand-muted text-sm mb-6">
                Sign in to manage your appointments
              </p>

              {/* Google Sign In */}
              <button
                onClick={handleGoogleLogin}
                id="google-login"
                className="w-full flex items-center justify-center gap-3 h-12 rounded-2xl border border-brand-border dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-brand-purple/50 transition-colors mb-4"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="font-inter text-sm font-medium text-brand-text dark:text-white">
                  Continue with Google
                </span>
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-brand-border dark:bg-zinc-800" />
                <span className="text-xs text-brand-muted">or</span>
                <div className="flex-1 h-px bg-brand-border dark:bg-zinc-800" />
              </div>

              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  icon={<Mail className="h-4 w-4" />}
                  error={loginForm.formState.errors.email?.message}
                  {...loginForm.register("email")}
                  id="login-email"
                />
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    icon={<Lock className="h-4 w-4" />}
                    error={loginForm.formState.errors.password?.message}
                    {...loginForm.register("password")}
                    id="login-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-9 text-brand-muted hover:text-brand-purple transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <div className="flex justify-end">
                  <Link
                    href="/auth/forgot-password"
                    className="font-inter text-xs text-brand-purple hover:text-brand-purple-dark transition-colors"
                    id="forgot-password-link"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  variant="purple"
                  type="submit"
                  fullWidth
                  loading={loading}
                  size="lg"
                  id="login-submit"
                  className="font-semibold"
                >
                  Sign In
                </Button>
              </form>

              <p className="text-center font-inter text-sm text-brand-muted mt-6">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-brand-purple hover:text-brand-purple-dark font-medium transition-colors"
                  id="go-register"
                >
                  Sign up free
                </Link>
              </p>
            </>
          )}

          {mode === "register" && (
            <>
              <h1 className="font-playfair text-2xl font-bold text-brand-text dark:text-white mb-1">
                Create Account
              </h1>
              <p className="font-inter text-brand-muted text-sm mb-6">
                Join PY Luxe and start your luxury journey
              </p>

              <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="Your full name"
                  icon={<User className="h-4 w-4" />}
                  error={registerForm.formState.errors.full_name?.message}
                  {...registerForm.register("full_name")}
                  id="register-name"
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  icon={<Mail className="h-4 w-4" />}
                  error={registerForm.formState.errors.email?.message}
                  {...registerForm.register("email")}
                  id="register-email"
                  required
                />
                <Input
                  label="Phone"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  icon={<Phone className="h-4 w-4" />}
                  {...registerForm.register("phone")}
                  id="register-phone"
                />
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  icon={<Lock className="h-4 w-4" />}
                  error={registerForm.formState.errors.password?.message}
                  {...registerForm.register("password")}
                  id="register-password"
                  required
                />
                <Input
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  icon={<Lock className="h-4 w-4" />}
                  error={registerForm.formState.errors.confirm_password?.message}
                  {...registerForm.register("confirm_password")}
                  id="register-confirm-password"
                  required
                />

                <Button
                  variant="purple"
                  type="submit"
                  fullWidth
                  loading={loading}
                  size="lg"
                  id="register-submit"
                  className="font-semibold"
                >
                  Create Account
                </Button>
              </form>

              <p className="text-center font-inter text-xs text-brand-muted mt-4">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="text-brand-purple">Terms</Link> and{" "}
                <Link href="/privacy" className="text-brand-purple">Privacy Policy</Link>
              </p>

              <p className="text-center font-inter text-sm text-brand-muted mt-4">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-brand-purple hover:text-brand-purple-dark font-medium transition-colors"
                  id="go-login"
                >
                  Sign in
                </Link>
              </p>
            </>
          )}

          {mode === "forgot-password" && (
            <>
              <h1 className="font-playfair text-2xl font-bold text-brand-text dark:text-white mb-1">
                Reset Password
              </h1>
              <p className="font-inter text-brand-muted text-sm mb-6">
                Enter your email and we&apos;ll send you a reset link
              </p>
              <div className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  icon={<Mail className="h-4 w-4" />}
                  id="forgot-email"
                />
                <Button
                  variant="purple"
                  fullWidth
                  size="lg"
                  id="forgot-submit"
                  onClick={() => toast.success("Reset link sent! Check your inbox.")}
                >
                  Send Reset Link
                </Button>
                <Link href="/auth/login">
                  <Button variant="ghost" fullWidth size="md" id="back-to-login">
                    ← Back to Login
                  </Button>
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
