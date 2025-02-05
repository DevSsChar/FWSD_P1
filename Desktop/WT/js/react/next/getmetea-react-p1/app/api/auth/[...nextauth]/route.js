import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import mongoose from 'mongoose'
import User from '@/models/User'
import Payment from '@/models/Payment'
import connectDB from '@/db/connectDb'

export const authoptions= NextAuth({
    providers: [
      // OAuth authentication providers...
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        // authorization: { params: { scope: 'read:user user:email' } },
      }),
      // AppleProvider({
      //   clientId: process.env.APPLE_ID,
      //   clientSecret: process.env.APPLE_SECRET
      // }),
      // FacebookProvider({
      //   clientId: process.env.FACEBOOK_ID,
      //   clientSecret: process.env.FACEBOOK_SECRET
      // }),
      // GoogleProvider({
      //   clientId: process.env.GOOGLE_ID,
      //   clientSecret: process.env.GOOGLE_SECRET
      // }),
      // // Passwordless / email sign in
      // EmailProvider({
      //   server: process.env.MAIL_SERVER,
      //   from: 'NextAuth.js <no-reply@example.com>'
      // }),
    ],
    logger: {
      debug: (message) => console.debug("[NextAuth Debug]", message),
      error: (message) => console.error("[NextAuth Error]", message),
    },
    debug:true,
    callbacks: {
      async signIn({ user, account, profile }) {
        if (account.provider === 'github') {
          try {
            await connectDB(0);
            // Use email from profile or fallback to placeholder
            const email = profile?.email || `${profile?.login}@placeholder.com`;
      
            // Check if user already exists
            let existingUser = await User.findOne({ email:email });
      
            if (!existingUser) {
              // Create a new user if not found
              const newUser = new User({
                email,
                username: profile?.login || email.split('@')[0],
              });
              await newUser.save();
            } 
            return true; // Sign-in successful
          } catch (error) {
            console.error("Sign-in error:", error);
            return false; // Sign-in failed
          }
        }
        return false; 
      },
      callbacks: {
        async session({ session, token, user }) {
          const dbUser = await User.findOne({ email: session.user.email });
          session.user.name = dbUser.username;
          return session
        }
      }
    }
  })
  
export {authoptions as GET, authoptions as POST}
 