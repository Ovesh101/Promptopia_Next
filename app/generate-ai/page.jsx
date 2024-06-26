"use client"
import React, { useState } from 'react';
import Image from 'next/image';

const AIForm = () => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [description, setDescription] = useState('');
  const [copied, setCopied] = useState("");
  const [isLoading , setLoading] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const categories = {
    coding: {
      create: ['create a regex', 'create code for me'],
      database: ['design a database schema', 'optimize a query'],
      explain: ['explain a feature', 'explain a concept'],
      sample: ['provide a sample code', 'provide a sample data'],
    },
    education: {
      'lesson plan': ['create a lesson plan', 'create a course outline'],
      quiz: ['create a quiz', 'create a test'],
      explain: ['explain a topic', 'explain a theory'],
      sample: ['provide sample questions', 'provide sample answers'],
    },
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubCategory('');
    setDescription('');
  };
  const handleCopy = () => {
    setCopied(generatedPrompt);
    navigator.clipboard.writeText(generatedPrompt);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
    setDescription('');
  };

//   This Function read the text when api send only text not json
  const handleGeneratePrompt = async () => {
    setLoading(true);
    var response = {};
    try {
        const prompt =  await fetch("/api/prompt/gethelloFromAI" ,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                category:category,
                subCategory:subCategory,
               description:description
            })
        } )
        console.log(typeof(prompt))
        response = prompt;
        
    } catch (error) {
        console.log("post req is not handled");
        
    }
    setLoading(false)
   
    const reader = response.body.getReader();
    let text = '';
    while (true) {
    const { done, value } = await reader.read();
  if (done) {
    break;
  }
  text += new TextDecoder().decode(value);
}
    console.log(text);
    
    
    setGeneratedPrompt(text)
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generate Prompt</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select a category</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        {category && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Sub-Category</label>
            <select
              value={subCategory}
              onChange={handleSubCategoryChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select a sub-category</option>
              {Object.keys(categories[category]).map((subCat) => (
                <option key={subCat} value={subCat}>{subCat}</option>
              ))}
            </select>
          </div>
        )}
        {subCategory && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <select
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select a description</option>
              {categories[category][subCategory].map((desc) => (
                <option key={desc} value={desc}>{desc}</option>
              ))}
            </select>
          </div>
        )}
        <div>
          <button
            type="button"
            onClick={handleGeneratePrompt}
             disabled={isLoading} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
              {isLoading ? 'Generating...' : 'Generate Prompt'}
          </button>
        </div>
      </form>
      {generatedPrompt && (
       <div className=" relative mt-6 p-4 border border-gray-300 rounded-md">
       <div className="absolute top-4 right-5">
         <div className="copy_btn cursor-pointer flex" onClick={handleCopy}>
           <Image src={copied === generatedPrompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"} alt={copied === generatedPrompt ? "tick_icon" : "copy_icon"} width={12} height={12} />
         </div>
       </div>
       <h2 className="text-lg font-semibold">Generated Prompt:</h2>
       <p className="mt-2">{generatedPrompt}</p>
     </div>
      )}
    </div>
  );
};

export default AIForm;
