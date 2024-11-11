import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.index({ email: 1 });

export let userMongooseModel = mongoose.model("users", userSchema);
