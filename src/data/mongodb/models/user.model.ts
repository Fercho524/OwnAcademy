import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true,"Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true,"Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    rol: {
      type: [String],
      default: ['USER_ROLE'],
      enum: ['USER_ROLE','ADMIN_ROLE']
    },
    password: {
      type: String,
      required: [true,"Password is required"],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true, // agrega createdAt y updatedAt
    versionKey: false, // elimina __v
  }
);


export const UserModel = mongoose.model('users',UserSchema)