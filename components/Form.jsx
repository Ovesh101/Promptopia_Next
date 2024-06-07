import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Form = ({ type, post, setPost,  submitting, handleSubmit }) => {
  // const [characterCount, setCharacterCount] = useState(val);

  const handlePromptChange = (e) => {
    const promptText = e.target.value;
    if (promptText.length <= 300) {
      setPost({ ...post, prompt: promptText });
      // setCharacterCount(promptText.length);
    } else {
      toast.error("Maximum character limit exceeded (300 characters)");
    }
  };
  useEffect(()=>{
    

  } , [])
  const TagSingleClick = (e)=>{
    const inputTags = e.target.value.split(' ').filter(tag => tag.trim() !== '');
    console.log("input tag" , inputTags);
    setPost({ ...post, tag: inputTags });
}

  return (
    <section className="w-full max-w-full flex-start flex-col ">
      <h1 className="head_text text_left">
        <span className="blue_gradient ">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform!!
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 ">
            Your AI Prompt
          </span>
          <textarea
            className="form_textarea"
            value={post.prompt}
            onChange={handlePromptChange}
            required
          />
          {/* <div className="text-right text-gray-500">{characterCount}/300</div> */}
          <div className="text-right text-gray-500">{post.prompt ? post.prompt.length : 0}/300</div>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 ">
            Tag {` `}
            <span className="font-normal ">
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          <input
            className="form_input"
            
            onChange={TagSingleClick}
            required
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4 ">
          <Link href="/" className="text-gray-700 text-xl">Cancel</Link>
          <button className="px-5 py-2 text-xl bg-primary-orange rounded-full text-white " type="submit" disabled={submitting}>
            {submitting ? `${type}....` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
