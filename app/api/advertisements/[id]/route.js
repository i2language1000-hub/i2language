import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Advertisement from "@/models/Advertisement";
import { protectAdminRoute } from "@/lib/auth";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const ad = await Advertisement.findById(params.id);
    if (!ad) return NextResponse.json({ error: "Ad not found" }, { status: 404 });
    return NextResponse.json(ad, { status: 200 });
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
    const updated = await Advertisement.findByIdAndUpdate(params.id, data, { new: true });
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
    await Advertisement.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}