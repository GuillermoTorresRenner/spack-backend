import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import jwt from 'jsonwebtoken'
import { UserService } from '../services/users.service'
import { UsersRepository } from '../repositories/users.repository'

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: 'http://localhost:3000/api/auth/google/callback'
},

async (_accessToken, _refreshToken, profile, done) => {
  const userService = new UserService(new UsersRepository())
  try {
    const user = await userService.findOrCreateGoogleUser(profile)
    const token = jwt.sign({ id: user.userID }, process.env.JWT_SECRET as string, { expiresIn: '1h' })
    return done(null, { user, token })
  } catch (err) {
    return done(err, false)
  }
}))

export default passport
