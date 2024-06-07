import Prompt from "@models/prompt";
import { connectDB } from "@utils/Database";

export async function POST(req, res) {
  try {
    const { prompt, tag, userId } = await req.json();

    console.log(prompt, tag, userId);

    // Ensure tag is an array
    const tagsArray = Array.isArray(tag) ? tag : tag.split(' ').filter(t => t.trim() !== '');
    

    await connectDB();

    const newPrompt = new Prompt({
      creator: userId,
      tag: tagsArray,
      prompt
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
}
