import mongoose from 'mongoose'
import { User } from '../user/user.model'
import { Blog } from '../blog/blog.model'

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blog',
      required: true
    }
  },
  { timestamps: true }
)

commentSchema.index(
  { user: 1, blog: 1, content: 'Comment 1' },
  { unique: true }
)

commentSchema.post('save', async (doc, next) => {
  try {
    const blog = await Blog.findOne({ _id: doc.blog })
      .populate()
      .exec()

    blog.comments.push(doc)

    await blog.save()

    const user = await User.findOne({ _id: doc.createdBy })
      .populate()
      .exec()

    user.comments.push(doc)

    await user.save()

    console.log('saved user with new comment')
  } catch (er) {
    console.log(er)
  }

  next()
})

export const Comment = mongoose.model('comment', commentSchema)
