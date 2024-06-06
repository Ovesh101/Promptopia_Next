
import PromptCard from "./PromptCard"

const PromptCardList = ({data , handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
       
        {data.map((singlePrompt)=>(
            <PromptCard 
            key={singlePrompt._id}
            prompt={singlePrompt}
            handleTagClick={handleTagClick}

            />

        ))}
    </div>
  )
}

export default PromptCardList