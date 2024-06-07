"use client";
import { useState , } from "react"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"
import Form from "@components/Form"



const CreatePrompt = () => {
    const {data:session} = useSession();
    const router  = useRouter()
    const [submitting , setSubmitting] = useState(false);
    const [post , setPost] = useState({
        prompt: '',
        tag:[],
    })

    const TagSingleClick = (e)=>{
        const inputTags = e.target.value.split(' ').filter(tag => tag.trim() !== '');
        console.log("input tag" , inputTags);
        setPost({ ...post, tag: inputTags });
    }
    const createPrompt = async (e)=>{
        e.preventDefault();
        setSubmitting(true);
       
        try {
            const res = await fetch('/api/prompt/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    prompt:post.prompt,
                    userId:session?.user.id,
                    tag:post.tag
    
                })
            } )
            if(res.ok){
                toast.success('Operation completed successfully!', {
                    duration: 3000, // Duration in milliseconds
                    position: 'bottom-left', // Position of the toast
                    style: {
                      background: '#00ff00', // Background color
                      color: '#000000', // Text color
                    },
                    icon: '✔️', // Custom icon
                  });
                router.push("/");
            }
            
        } catch (error) {
            setSubmitting(false)
            console.log(error);

            
        }finally{
            setSubmitting(false)
        }
       

    }
  return (
    <Form
    type="Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit = {createPrompt}
    TagSingleClick={TagSingleClick}
    
    />
    
  )
}

export default CreatePrompt