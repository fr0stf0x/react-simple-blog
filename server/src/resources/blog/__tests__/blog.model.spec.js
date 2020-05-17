import { Blog } from '../blog.model'
import mongoose from 'mongoose'

describe('Blog model', () => {
  describe('schema', () => {
    //   test('name', () => {
    //     const name = Blog.schema.obj.name
    //     expect(name).toEqual({
    //       type: String,
    //       required: true,
    //       trim: true,
    //       maxlength: 50
    //     })
    //   })

    // test('status', () => {
    //   const status = Blog.schema.obj.status
    //   expect(status).toEqual({
    //     type: String,
    //     required: true,
    //     enum: ['active', 'complete', 'pastdue'],
    //     default: 'active'
    //   })
    // })

    // test('notes', () => {
    //   const notes = Blog.schema.obj.notes
    //   expect(notes).toEqual(String)
    // })

    // test('due', () => {
    //   const due = Blog.schema.obj.due
    //   expect(due).toEqual(Date)
    // })

    test('createdBy', () => {
      const createdBy = Blog.schema.obj.createdBy
      expect(createdBy).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
      })
    })

    test('tag', () => {
      const tag = Blog.schema.obj.tag
      expect(tag).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'tag',
        required: true
      })
    })
  })
})
