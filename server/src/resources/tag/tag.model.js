import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true
    }
  },
  { timestamps: true }
)

tagSchema.index({ name: 1 }, { unique: true })

export const Tag = mongoose.model('tag', tagSchema)
