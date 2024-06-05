
import PromptCard from "./PromptCard"


const Profile = ({name , desc , data , handleDelete , handleEdit }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left ">
        <span className="blue_gradient ">{name} Profile </span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-16 prompt_layout">
       
       {data && data.map((singlePrompt)=>(
           <PromptCard 
           key={singlePrompt._id}
           prompt={singlePrompt}
           handleEdit={()=>handleEdit && handleEdit(singlePrompt)}
           handleDelete={()=>handleDelete && handleDelete(singlePrompt)}

           />

       ))}
   </div>



    </section>
  )
}

export default Profile