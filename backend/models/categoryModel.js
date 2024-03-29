import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
    maxLengh: 32,
    unique: true,
  },
});

export default mongoose.model("Category", categorySchema);
