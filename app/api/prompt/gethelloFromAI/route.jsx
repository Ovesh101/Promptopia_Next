const { GoogleGenerativeAI } = require("@google/generative-ai");
import OpenAI from "openai";

// console.log(process.env.OPENAI_API_KEY)

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function POST(req, res) {
  try {
    const {category ,  subCategory , description} = await req.json();
    console.log(category);
    // const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = 
    ` i need any sample for js language only. i want to give me diffrent response of your choice based on info that i have give you like category: ${category} , sub category: ${subCategory} , description:${description}
     with this info make diffrent prompt. provide only  one and best from out of all possible prompts.
     focus on specific and problem-focussed. remove title and give 3 line of prompts and if anything info bu users placed in [] ?`

    //  console.log(prompt)
    // const result = await model.generateContent(prompt);
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "user", content: `${prompt}` }],
      });
    // const response = await result.response;
    // const text = response.text();
    // console.log("completion",completion)
    const response = completion.choices[0].message.content;
    console.log(response);
    return new Response(response, { status: 200 });
  } catch (error) {
    return new Response("Failed to Ai prompt ", { status: 500 });
  }
}
