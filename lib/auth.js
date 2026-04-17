import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function protectAdminRoute() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Not an admin" }, { status: 403 });
    }

    return null; 
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
  }
}
