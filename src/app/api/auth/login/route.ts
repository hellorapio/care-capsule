import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate required fields
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Validate the user credentials against your database
    // 2. Generate a JWT or session token
    // 3. Set cookies or return token in response

    // Simulating a successful login for demo purposes
    // In a real app, you'd check credentials against your database
    const mockUserCredentials = {
      username: "testuser",
      password: "password123",
    };

    // Check if credentials match (simple demo)
    if (
      username === mockUserCredentials.username &&
      password === mockUserCredentials.password
    ) {
      // Return successful response with mock user data
      return NextResponse.json(
        {
          success: true,
          message: "Login successful",
          user: {
            id: "123",
            username: username,
            fullName: "Test User",
            email: "testuser@example.com",
          },
        },
        { status: 200 }
      );
    } else {
      // Return error for invalid credentials
      return NextResponse.json(
        { success: false, message: "Invalid username or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
