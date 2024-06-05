"use client"
import { useState , useEffect } from "react"

import PromptCardList from "./PromptCardList";
import Loading from "@app/loading";



const Feed = () => {
  const [loading,setLoading] = useState(true);
  const [searchText , setSearchText] = useState("");
  const [searchTimeout , setSearchTimeout] = useState(null);
  const [searchResult , setSearchResult] = useState([])
  const [prompt , setPrompt] = useState([]);
  const fetchPrompt = async ()=>{
    const response = await fetch("/api/prompt" , {cache : "no-store"});
    const data = await response.json();
    console.log("data",data);
    setPrompt(data);
    setLoading(false);
  }

  useEffect(()=>{
    fetchPrompt();
  } , [])

  const filteredPrompt = (searchText)=>{
    const regex = new RegExp(searchText , "i"); // "i" flag for case-insensitive search
    return prompt.filter((item)=>regex.test(item.creator.username) || regex.test(item.prompt) || regex.test(item.tag));


  }
  const handleSearchChange = (e)=>{
    clearTimeout(searchTimeout);
    console.log(e.target.value);
    setSearchText(e.target.value);
    // Debounce method
    setSearchTimeout(
      setTimeout(()=>{
        const searchResult = filteredPrompt(searchText);
        console.log("inside debounce");
       setSearchResult(searchResult)
      }, 500)
    )
  }

  const handleTagClick = (tagName)=>{
    setSearchText(tagName);
    const searchResult = filteredPrompt(tagName);
    setSearchResult(searchResult);


  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center ">
        <input 
        type="text"
        placeholder="Search for a tag or a username"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer"
          />

      </form>
 
      {searchText ? 
        (<PromptCardList data={searchResult} handleTagClick={handleTagClick}  />)
      :
      loading ? <Loading /> : 
       
        (<PromptCardList data={prompt} handleTagClick={handleTagClick} />)
      }

    </section>
  )
}

export default Feed
