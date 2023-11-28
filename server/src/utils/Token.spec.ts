import mongoose from 'mongoose'

import * as Token from './Token'

describe('Token', () => {
  const uid = mongoose.Types.ObjectId().toHexString()
  let token: string

  it('can generate a valid token', () => {
    token = Token.generate(uid)

    // not null
    expect(token).toMatch(/.+/)
  })

  it('can accpect a valid token', () => {
    expect(Token.validate(uid, token)).toBeTruthy()
  })

  it('will reject an invalid token', () => {
    expect(Token.validate(uid, 'some-random-token')).toBeFalsy()
  })
})
