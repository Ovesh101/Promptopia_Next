import Prompt from "@models/prompt";
import { connectDB } from "@utils/Database";
export async function GET(req , res) {
    try {
    await connectDB();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts) , {status:200})
        
    } catch (error) {
        return new Response("Failed to fetch all prompts " , {status:500})
        
    }
    

    
}