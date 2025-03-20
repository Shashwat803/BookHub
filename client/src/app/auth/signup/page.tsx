"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {
    // Validate fields
    const newErrors = {
      name: !formData.name,
      email: !formData.email,
      password: !formData.password,
      confirmPassword:
        !formData.confirmPassword || formData.confirmPassword !== formData.password,
    };

    setErrors(newErrors);

    // If any field is invalid, return
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    // Submit form data
    console.log("Signup Data:", formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: false }); // Clear error on change
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-8 border border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">BookHub Sign Up</h2>

        {/* Name Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Name
          </label>
          <div className="relative">
            <Input
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={cn(
                "bg-gray-800 text-white border-gray-700 focus:border-gray-500 h-12",
                errors.name && "border-red-500"
              )}
            />
            <User className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <div className="relative">
            <Input
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={cn(
                "bg-gray-800 text-white border-gray-700 focus:border-gray-500 h-12",
                errors.email && "border-red-500"
              )}
            />
            <Mail className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className={cn(
                "bg-gray-800 text-white border-gray-700 focus:border-gray-500 h-12",
                errors.password && "border-red-500"
              )}
            />
            <Lock className="absolute right-10 top-3.5 h-5 w-5 text-gray-400" />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              className={cn(
                "bg-gray-800 text-white border-gray-700 focus:border-gray-500 h-12",
                errors.confirmPassword && "border-red-500"
              )}
            />
            <Lock className="absolute right-10 top-3.5 h-5 w-5 text-gray-400" />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              Passwords do not match.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          className="w-full hover:bg-blue-700 text-white h-12 px-6"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default Signup;