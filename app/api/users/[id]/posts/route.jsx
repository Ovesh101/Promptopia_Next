import Prompt from "@models/prompt";
import { connectDB } from "@utils/Database";
export async function GET(req , {params}) {
    console.log("Params of current" , params);
    try {
    await connectDB();
    const prompts = await Prompt.find({
        creator:params.id
    }).populate("creator");
   
    return new Response(JSON.stringify(prompts) , {status:200})
        
    } catch (error) {
        return new Response("Failed to fetch all prompts" , {status:500})
        
    }
    

    
}