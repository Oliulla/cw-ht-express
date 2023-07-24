import { Schema, model } from "mongoose"
import { AdminModel, IAdmin, AdminRole } from "./admin.interface"
import bcrypt from "bcrypt"
import config from "../../../config"

const AdminSchema = new Schema<IAdmin>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: [AdminRole.ADMIN],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

// Pre-save hook to bcrypt the password before saving
AdminSchema.pre<IAdmin>("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }

  try {
    const salt = await bcrypt.genSalt(Number(config.bcrypt_salt_rounds))
    this.password = await bcrypt.hash(this.password, salt)
    return next()
  } catch (error) {
    return next(error as Error)
  }
})

// Static method to check if a user exists by admin_id
AdminSchema.statics.isUserExist = async function (admin_id: string) {
  return this.findOne({ _id: admin_id }).exec()
}

export const Admin = model<IAdmin, AdminModel>("Admin", AdminSchema)
