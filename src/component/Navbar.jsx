"use client";

import { Button } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Properties", href: "/properties" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center transition-colors">
                <span className="text-background font-bold tracking-tight text-lg">
                  AE
                </span>
              </div>
              <span className="text-xl tracking-tight text-foreground hidden sm:block font-heading">
                CozyCorner
              </span>
            </Link>

            {/* Center Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                >
                  {link.label}
                  {/* Underline matching your exact --gold theme variable */}
                  <span className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-[hsl(var(--gold))] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3">
              {/* Theme Switcher Button */}
              <Button
                isIconOnly
                variant="light"
                radius="full"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {mounted && theme === "dark" ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}
              </Button>

              <div className="hidden md:flex items-center gap-2">
                {/* Sign In Link with dynamic hover color matching --gold */}
                <Link
                  href="/signin"
                  className="px-5 py-2.5 text-sm font-medium text-foreground hover:text-[hsl(var(--gold))] transition-colors duration-300"
                >
                  Sign In
                </Link>
                <Link href="/signup">
                  <Button
                    radius="full"
                    className="bg-[hsl(var(--gold))] text-[hsl(var(--accent-foreground))] font-medium shadow-md hover:bg-[hsl(var(--gold-light))] transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Toggle button */}
              <Button
                isIconOnly
                variant="light"
                onClick={() => setMobileOpen(true)}
                className="md:hidden text-foreground hover:bg-muted"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Drawer System */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between px-6 h-20">
              <Link
                href="/"
                className="flex items-center gap-3"
                onClick={() => setMobileOpen(false)}
              >
                <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
                  <span className="text-background font-bold tracking-tight text-lg">
                    AE
                  </span>
                </div>
              </Link>
              <Button
                isIconOnly
                variant="light"
                onClick={() => setMobileOpen(false)}
                className="text-foreground hover:bg-muted"
                aria-label="Close menu"
              >
                <X size={22} />
              </Button>
            </div>

            <div className="flex flex-col items-center justify-center gap-8 pt-20">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-3xl text-foreground font-heading hover:text-[hsl(var(--gold))] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-4 pt-8"
              >
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Link href="/signup">
                  <Button
                    radius="full"
                    className="bg-[hsl(var(--gold))] text-[hsl(var(--accent-foreground))] font-medium shadow-md hover:bg-[hsl(var(--gold-light))] transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
