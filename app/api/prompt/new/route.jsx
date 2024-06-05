
import Prompt from "@models/prompt";
import { connectDB } from "@utils/Database";



export async function POST(req , res) {
    const { prompt , tag , userId } = await  req.json();
    console.log(prompt , tag , userId);
    try {
        await connectDB();

        const newPrompt = new Prompt({
            creator:userId,
            tag,
            prompt
        })
       
        await newPrompt.save();
       
        return new Response(JSON.stringify(newPrompt) , {status:201})
    } catch (error) {

        return new Response("Failed to create a new prompt" , {status:500});
        
    }

}