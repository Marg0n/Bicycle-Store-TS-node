import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';
import bycript from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide a name.'],
    },
    email: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: `{Value} is not a valid email address. Please provide a valid email address.`,
      },
      immutable: true,
      required: [true, 'Please provide email address.'],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      selected: false, // password field will not be returned in response
      required: [true, 'Please provide a password.'],
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'customer'],
        message: '{VALUE} is not valid. Please provide a valid type.',
      },
      required: [true, 'Please provide a role.'],
      default: 'customer',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Middleware to update 'updatedAt' field before updating a document
userSchema.pre<IUser>('findOneAndUpdate', function (next) {
  // this.setOptions({ runValidators: true, new: true });
  // this.set({ updatedAt: new Date() });
  next();
});

// password hashing
userSchema.pre<IUser>('save', async function (next) {
  const user = this;

  user.password = await bycript.hash(
    user.password,
    Number(config.bycript_salt_rounds),
  );

  next();
});

// password field empty
userSchema.post('save', function (doc, next) {
  
  doc.password = '';

  next();
});

const User = model<IUser>('User', userSchema);

export default User;
