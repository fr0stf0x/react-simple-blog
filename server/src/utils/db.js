import mongoose from 'mongoose'
import options from '../config'
import { get } from 'lodash'

export const connect = (
  url = get(options, 'db.url', ''),
  opts = get(options, 'db.options', '')
) => {
  console.log('OUTPUT: url', url, 'opts', opts)

  return mongoose.connect(url, { ...opts, useNewUrlParser: true })
}
