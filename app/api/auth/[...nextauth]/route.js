import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google";
import prisma from "@lib/db"


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ], 
  callbacks: {
     async session({ session }) {
      //console.log(session)
    try {
      const sessionUser = await prisma.user.findUnique({
        where: {
          email: session.user.email
        }
      });
       session.user.id = sessionUser.id;

      return session;
    } catch (error) {
      console.error("Error in session callback:", error.message);
      return session;
    }
  },
  async signIn({ profile }) {
   // console.log(profile)
    try {
      const userExists = await prisma.user.findUnique({
        where: {
          email: profile.email
        }
      });

      if (!userExists) {
        await prisma.user.create({
          data: {
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          }
        });
      }
      return true;
    } catch (error) {
      console.error("Error checking if user exists:", error.message);
      return false;

    }
  }
  }
 
})
  
export { handler as GET, handler as POST };

//Get: retrieves data from the server.
//Post: sends data to the server, used for operations, like creating data.