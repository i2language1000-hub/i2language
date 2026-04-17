import mongoose from "mongoose";

const advertisementSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: function () { return !this.image; } 
  },
  placement: { 
    type: String, 
    required: function () { return !this.image; } 
  },
  description: { 
    type: String, 
    required: function () { return !this.image; } 
  },
  cta: { 
    type: String, 
    required: function () { return !this.image; } 
  },
  link: { 
    type: String 
  },
  image: { 
    type: String, 
    required: function () { return !this.title; } // Require image if no title is provided
  },
}, { timestamps: true });

export default mongoose.models.Advertisement || mongoose.model("Advertisement", advertisementSchema);