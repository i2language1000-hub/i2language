import mongoose from 'mongoose';

const contentItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['vouchers', 'blogs', 'advertisements'],
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    price: String,
    description: String,
    buttonLabel: String,
    category: String,
    excerpt: String,
    readTime: String,
    placement: String,
    cta: String,
    image: String
  },
  {
    timestamps: true
  }
);

export const ContentItem =
  mongoose.models.ContentItem || mongoose.model('ContentItem', contentItemSchema);
