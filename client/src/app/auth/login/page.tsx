"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleSubmit = () => {
    // Validate fields
    const newErrors = {
      email: !formData.email,
      password: !formData.password,
    };

    setErrors(newErrors);

    // If any field is invalid, return
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    // Submit form data
    console.log("Login Data:", formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: false }); // Clear error on change
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-8 border border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">BookHub Login</h2>

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
            <User className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <Input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className={cn(
                "bg-gray-800 text-white border-gray-700 focus:border-gray-500 h-12",
                errors.password && "border-red-500"
              )}
            />
            <Lock className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          className="w-full hover:bg-blue-700 text-white h-12 px-6"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;