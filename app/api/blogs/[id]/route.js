import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { protectAdminRoute } from "@/lib/auth";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const blog = await Blog.findById(params.id);
    if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const authError = await protectAdminRoute();
    if (authError) return authError;
    await connectDB();
    const data = await req.json();
    const updated = await Blog.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const authError = await protectAdminRoute();
    if (authError) return authError;
    await connectDB();
    await Blog.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}