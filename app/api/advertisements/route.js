import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Advertisement from "@/models/Advertisement";
import { protectAdminRoute } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const ads = await Advertisement.find({}).sort({ createdAt: -1 });
    return NextResponse.json(ads, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const authError = await protectAdminRoute();
    if (authError) return authError;

    await connectDB();
    const data = await req.json();
    
    const newAd = await Advertisement.create(data);
    return NextResponse.json(newAd, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}