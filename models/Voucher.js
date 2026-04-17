import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
  title: {
    type: String,
    required: function () {
      return !this.image; // required ONLY if no image
    },
  },
  description: {
    type: String,
    required: function () {
      return !this.image;
    },
  },
  price: {
    type: String,
    required: function () {
      return !this.image;
    },
  },
  buttonLabel: {
    type: String,
    required: function () {
      return !this.image;
    },
  },
  image: {
    type: String,
    default: "",
  },
}, { timestamps: true });

export default mongoose.models.Voucher || mongoose.model("Voucher", voucherSchema);