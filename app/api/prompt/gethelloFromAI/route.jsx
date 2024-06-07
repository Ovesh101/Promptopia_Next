const { GoogleGenerativeAI } = require("@google/generative-ai");
import OpenAI from "openai";

// console.log(process.env.OPENAI_API_KEY)

const openai = new OpenAI({apiKey:process.env.OPEN_AI_API_KEY});
console.log(process.env.OPEN_AI_API_KEY);

export async function POST(req, res) {
  try {
    const {category ,  subCategory , description} = await req.json();
    console.log(category);
    // const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Based on the provided information: category: ${category}, sub category: ${subCategory}, and description: ${description}, generate a single, concise, and problem-focused prompt. Follow these guidelines to ensure relevance and specificity:

    The prompt must directly relate to the given category and subcategory.
    Focus on addressing the problem or issue described.
    If information is missing, make logical assumptions based on typical scenarios in the given context.
    Limit the response to three lines.
    Avoid generalities; prioritize detailed and specific prompts.
    From all possible prompts, select and provide only the best one.`


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
