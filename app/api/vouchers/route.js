import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Voucher from "@/models/Voucher";
import { protectAdminRoute } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const vouchers = await Voucher.find({}).sort({ createdAt: -1 });
    return NextResponse.json(vouchers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();
    console.log("DATA RECEIVED:", data); // 👈 ADD THIS

    const newVoucher = await Voucher.create(data);

    return NextResponse.json(newVoucher, { status: 201 });

  } catch (error) {
    console.log("ERROR:", error); // 👈 VERY IMPORTANT
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}