"use client"
import Feed from "@components/Feed"
import toast from "react-hot-toast"
import { useSearchParams , useRouter } from "next/navigation"
import { useEffect } from "react"


const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams);


  useEffect(()=>{
    const message = searchParams.get("message");
    if(message === 'unauthorized'){
      toast.error('You are not authorized to access that page. Please log in.', {
        duration: 3000, // Duration in milliseconds
        position: 'bottom-left', // Position of the toast
        style: {
          background: '#ff0000', // Background color
          color: '#ffffff', // Text color
        },
        icon: '🔒', // Custom icon
        closeButton: true, // Include close button
      });
     router.push("/")
     console.log("uedfdfl");
    
    }

  } , [searchParams])

  return (
    <section className="w-full flex flex-center  flex-col ">
        <h1 className="head_text text-center ">
            Discover & Share
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center " >AI Powered Prompts </span>
        </h1>
        <p className=" desc text-center">
            Promptopia is an open-source AI prompting 
            tool for modern world to discover , create and share creative prompts
        </p>

        <Feed />

    </section>
  )
}

export default Home