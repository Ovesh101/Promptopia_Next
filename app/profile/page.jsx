"use client"
import Profile from "@components/Profile"
import { useState , useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const ProfilePage = () => {
    const [prompts , setPrompts] = useState([]);
    const {data:session} = useSession();
    const router = useRouter();
    useEffect(()=>{
      
        const fetchPrompt = async ()=>{
          const response = await fetch(`api/users/${session?.user.id}/posts`);
          const data = await response.json();
       
          setPrompts(data);
         
    
        }
        if(session?.user.id)fetchPrompt()
           
    
      },[session?.user.id])

      const handleEdit = (singlePrompt)=>{
        router.push(`/update-prompt?id=${singlePrompt._id}`)
        

      }
      const handleDelete = async (singlePrompt)=>{
        const hasConfirmed = confirm("Are you sure you want to delete this prompt");
        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${singlePrompt._id}` , {
                    method:"DELETE"
                });

                const filteredPrompt = prompts.filter((p)=>p._id != singlePrompt._id);
                setPrompts(filteredPrompt)
            } catch (error) {
              
               
                
            }
        }

      }
      
  return (
   <Profile 
   name="My"
   desc="welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
   data={prompts}
   handleEdit={handleEdit}
   handleDelete={handleDelete}
   
   />
  )
}

export default ProfilePage