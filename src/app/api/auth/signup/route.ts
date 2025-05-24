import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, username, email, password } = body;

    // Validate required fields
    if (!fullName || !username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address",
        },
        { status: 400 }
      );
    }

    // Password strength validation
    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters long",
        },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Check if the username or email already exists in your database
    // 2. Hash the password securely (using bcrypt or similar)
    // 3. Create a new user record in your database
    // 4. Generate initial auth token or session if auto-login is desired

    // For this demo, we'll just simulate a successful registration
    // In a real app, you'd insert this data into your database

    // Simulate checking for existing username/email (demo only)
    if (username === "testuser") {
      return NextResponse.json(
        { success: false, message: "Username already exists" },
        { status: 409 }
      );
    }

    if (email === "testuser@example.com") {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 409 }
      );
    }

    // Return successful response
    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        user: {
          id: "new-user-id",
          username,
          fullName,
          email,
          // Don't include password in the response
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
