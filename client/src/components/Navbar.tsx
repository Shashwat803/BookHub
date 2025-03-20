"use client";
import React from "react";
import { Book, User } from "lucide-react";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 fixed w-full z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Title and Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">BookHub</span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            {/* Navigation Menu */}
            <div className="flex items-center space-x-8">
              <Link
                href="/book"
                className="text-gray-300 hover:text-white flex items-center space-x-2"
              >
                <Book className="h-5 w-5" />
                <span>Book</span>
              </Link>
              <Link
                href="/author"
                className="text-gray-300 hover:text-white flex items-center space-x-2"
              >
                <User className="h-5 w-5" />
                <span>Author</span>
              </Link>
            </div>

            {/* Logout Button (Conditional Rendering) */}
            <SignedOut>
              <div className="flex items-center space-x-4">
                <SignInButton>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200">
                    Login
                  </button>
                </SignInButton>
                {/* <SignUpButton>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-200">
                    Sign Up
                  </button>
                </SignUpButton> */}
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;