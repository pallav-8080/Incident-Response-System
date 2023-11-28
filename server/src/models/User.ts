import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

import ROLES from '../utils/Roles'

const SALT_WORK_FACTOR = 10

// @see https://mongoosejs.com/docs/deprecations.html#ensureindex
mongoose.set('useCreateIndex', true)

export interface IUser extends Document {
  username: string
  password?: string
  role: string

  comparePassword: (candidatePassword: string) => Promise<boolean>
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  // hide password in queries
  password: { type: String, required: true, select: false },
  role: { type: String, required: true, default: ROLES.CITIZEN },
  // hide version field in queries
  __v: { type: Number, select: false },
})

// @see https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
UserSchema.pre('save', function(next) {
  const user = this as IUser

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      user.password = hash

      next()
    })
  })
})

UserSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password!, (error, isMatch) => {
      if (error) {
        reject(error)
      } else {
        resolve(isMatch)
      }
    })
  })
}

export default mongoose.model<IUser>('User', UserSchema)
