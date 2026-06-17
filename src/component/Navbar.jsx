"use client";


import { authClient, useSession } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  console.log(user)

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="flex h-16 items-center justify-between px-6">

        {/* Left side */}
        <div className="flex items-center gap-4">

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Menu</span>

            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            Logo
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">

          {/* Nav links */}
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/features">Features</Link>
            </li>

            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
          </ul>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">

            <Link
              href="/signin"
              className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Sign Up
            </Link>

          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">

            <li>
              <Link
                href="/features"
                className="block py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
            </li>

            <li>
              <Link
                href="/pricing"
                className="block py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
            </li>

            <div className="mt-4 flex flex-col gap-3">

              <Link
                href="/signin"
                className="rounded-md border px-4 py-2 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                className="rounded-md bg-black px-4 py-2 text-center text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>

            </div>

          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;