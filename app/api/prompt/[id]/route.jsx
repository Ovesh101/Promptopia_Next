import Prompt from "@models/prompt";
import { connectDB } from "@utils/Database";

// GET Request 
export async function GET(req  , {params}) {
    try {
    await connectDB();
    const getSinglePrompt = await Prompt.findById(params.id).populate("creator");
    if(!getSinglePrompt)return new Response(`Prompts not found with ID:${params.id}` , {status:404})
    return new Response(JSON.stringify(getSinglePrompt) , {status:200})
        
    } catch (error) {
        return new Response("Failed to fetch all prompts " , {status:500})
        
    }
    
}
// Pacth Request: Update the prompt

export async function PATCH(req,{params}) {
    const {prompt , tag} = await req.json();
    try {
        await connectDB();
        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt)return new Response(`Prompts not found with ID:${params.id}` , {status:404})

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt) , {status:200})

    } catch (error) {
        return new Response("Failed to fetch  prompts " , {status:500})
        
    }
    
}

// Delete Request:  Delete a Prompt


export async function DELETE(req,{params}) {
    try {
        await connectDB();
        const deletePrompt = await Prompt.findByIdAndDelete(params.id);
        if(!deletePrompt) return new Response(`Prompts not found with ID:${params.id}` , {status:404})
        
        return new Response("Prompt deleted successfully" , {status:200})
        
    } catch (error) {
        return new Response("Failed to fetch  prompts " , {status:500})
        
    }
    
}