import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function GET() {
  await connectDB();

  const existing = await Admin.findOne({ email: "admin@example.com" });
  if (existing) {
    return NextResponse.json({ message: "Admin exists" });
  }

  const hashed = await bcrypt.hash("admin123", 10);

  await Admin.create({
    email: "admin@example.com",
    password: hashed,
  });

  return NextResponse.json({
    message: "Admin created",
    email: "admin@example.com",
    password: "admin123",
  });
}