"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { FaSignInAlt, FaGlobe, FaChevronDown, FaGoogle } from "react-icons/fa";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  // Fetch user location during login
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude.toFixed(4),
            lon: position.coords.longitude.toFixed(4),
            name: `My Field Coordinates (${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)})`,
          };
          localStorage.setItem("userLocation", JSON.stringify(coords));
          console.log("User location saved on login:", coords);
        },
        (error) => {
          console.warn("Location access denied or failed during login:", error);
        },
      );
    }
  }, []);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmail && trimmedPassword) {
      setIsLoading(true);

      try {
        const result = await signIn("credentials", {
          email: trimmedEmail,
          password: trimmedPassword,
          redirect: false,
        });

        if (result?.error) {
          alert("Invalid email or password. Please try again.");
        } else {
          router.push("/alerts");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occurred during login.");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please enter a valid email and password");
    }
  };

  if (status === "loading" || status === "authenticated") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 via-white to-emerald-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <p className="font-semibold text-emerald-800">Loading CropGuard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-linear-to-br from-emerald-50 via-white to-emerald-100">
      <div className="w-full max-w-sm animate-fade-in">
        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl shadow-emerald-900/5 px-8 py-9">
          {/* Brand Section */}
          <div className="text-center mb-7">
            <h1 className="text-2xl font-bold tracking-tight text-emerald-900">
              CropGuard
            </h1>
            <p className="text-xs font-medium text-emerald-600/70 mt-1.5">
              Catch crop disease before it spreads.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Input Group */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="emailInput"
                className="font-medium text-sm text-emerald-800"
              >
                Email Address
              </label>
              <input
                type="email"
                id="emailInput"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2.5 rounded-lg text-sm text-emerald-900 bg-emerald-50/50 border border-emerald-200 outline-none transition-all duration-200 focus:border-emerald-500 focus:bg-emerald-50 focus:ring-2 focus:ring-emerald-500/20 placeholder:text-emerald-400"
              />
            </div>

            {/* Password Input Group */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="passwordInput"
                className="font-medium text-sm text-emerald-800"
              >
                Password
              </label>
              <input
                type="password"
                id="passwordInput"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2.5 rounded-lg text-sm text-emerald-900 bg-emerald-50/50 border border-emerald-200 outline-none transition-all duration-200 focus:border-emerald-500 focus:bg-emerald-50 focus:ring-2 focus:ring-emerald-500/20 placeholder:text-emerald-400"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-2.5 px-5 rounded-lg font-semibold text-sm tracking-wide text-white bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-1"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <FaSignInAlt className="text-sm" />
                  <span>Login</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="grow h-px bg-emerald-200" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                Or
              </span>
              <div className="grow h-px bg-emerald-200" />
            </div>

            {/* Google Sign-In Button */}
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="flex items-center justify-center gap-2 py-2.5 px-5 rounded-lg font-semibold text-sm tracking-wide text-emerald-800 bg-white border border-emerald-200 hover:bg-emerald-50 transition-all duration-200"
            >
              <FaGoogle className="text-base text-emerald-600" />
              <span>Sign in with Google</span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center justify-center gap-2 py-2 mt-1 rounded-lg text-xs font-medium text-emerald-700 bg-emerald-50/50 border border-emerald-200">
              <FaGlobe className="text-emerald-500" />
              <span>Language</span>
              <span className="px-2.5 py-0.5 rounded-md font-semibold text-emerald-800 bg-emerald-100">
                English
              </span>
              <FaChevronDown className="text-[10px] text-emerald-400" />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
