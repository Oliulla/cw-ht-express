import { Schema, model } from "mongoose"
import { AdminModel, IAdmin } from "./admin.interface"

const AdminSchema = new Schema<IAdmin, AdminModel>({
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  address: {
    type: String,
    required: true,
  },
})

export const Admin = model<IAdmin, AdminModel>("Admin", AdminSchema)