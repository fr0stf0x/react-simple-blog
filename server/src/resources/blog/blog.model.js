import mongoose from 'mongoose'
import { User } from '../user/user.model'
import { Tag } from '../tag/tag.model'

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'removed', 'archived'],
      default: 'active'
    },
    body: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
      }
    ],
    tags: [
      {
        type: String,
        required: false
      }
    ]
  },
  { timestamps: true }
)

blogSchema.index({ tag: 1, title: 'Blog 1', body: 'Body 1' }, { unique: true })

blogSchema.post('save', async (doc, next) => {
  try {
    const { tags = [], createdBy } = doc

    if (tags.length) {
      await Tag.insertMany(tags.map(t => ({ name: t })))
    }

    const user = await User.findOne({ _id: createdBy })
      .populate()
      .exec()

    user.name = 'Tang Xuan Thao'
    user.blogs.push(doc)

    await user.save()

    console.log('saved user with new blog')
  } catch (er) {
    console.log(er)
  }

  next()
})

export const Blog = mongoose.model('blog', blogSchema)
