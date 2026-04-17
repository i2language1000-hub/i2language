import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Voucher from "@/models/Voucher";
import { protectAdminRoute } from "@/lib/auth";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const voucher = await Voucher.findById(params.id);
    if (!voucher) {
      return NextResponse.json({ error: "Voucher not found" }, { status: 404 });
    }
    return NextResponse.json(voucher, { status: 200 });
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
    
    const updatedVoucher = await Voucher.findByIdAndUpdate(params.id, data, { new: true });
    if (!updatedVoucher) {
      return NextResponse.json({ error: "Voucher not found" }, { status: 404 });
    }
    
    return NextResponse.json(updatedVoucher, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const authError = await protectAdminRoute();
    if (authError) return authError;

    await connectDB();
    const deletedVoucher = await Voucher.findByIdAndDelete(params.id);
    
    if (!deletedVoucher) {
      return NextResponse.json({ error: "Voucher not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Voucher deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
