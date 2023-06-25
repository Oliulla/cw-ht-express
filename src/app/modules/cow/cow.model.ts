import { Schema, model, Types } from "mongoose"
import { Category, CowModel, ICow, Label, Location } from "./cow.interface"

const locationValues = Object.values(Location)
const labelValues = Object.values(Label)
const categoryValues = Object.values(Category)

const cowSchema = new Schema<ICow>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  price: { type: Number, required: true },
  location: { type: String, enum: locationValues, required: true },
  breed: { type: String, required: true },
  weight: { type: Number, required: true },
  label: { type: String, enum: labelValues, required: true },
  category: { type: String, enum: categoryValues, required: true },
  seller: { type: Types.ObjectId, ref: "User", required: true },
})

export const Cow = model<ICow, CowModel>("Cow", cowSchema)
