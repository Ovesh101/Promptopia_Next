import User from "@models/user";
import { connectDB } from "@utils/Database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET_ID
        })
    ],
    callbacks:{
        async session({session}){
           

            const userSession = await User.findOne({
                email:session.user.email
            })
            session.user.id = userSession._id.toString();   
            return session
    
        },
        async signIn({profile}){
            try {
                await connectDB();
                
                // check if a user exist 
                const userExist = await User.findOne({
                    email:profile.email
                })
                 // if not create one
                if(!userExist){
                    await User.create({
                        email:profile.email,
                        username:profile.name.replace(" ", "").toLowerCase(),
                        image:profile.picture
                    })
    
                }
    
                return true;
    
               
                
            } catch (error) {
                console.log(error);
                return false;
                
            }
    
            
    
        }

    }

  

})

export  {handler as GET , handler as POST }