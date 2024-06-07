import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ prompt, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");
  const [showFullPrompt, setShowFullPrompt] = useState(false);

  const handleProfileClick = () => {
    if (prompt.creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${prompt.creator._id}?name=${prompt.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  const togglePromptVisibility = () => {
    setShowFullPrompt(!showFullPrompt);
  };

  return (
    <div className="prompt_card p-4 border border-gray-200 rounded-lg shadow-md max-w-md mx-auto">
  <div className="flex flex-col sm:flex-row justify-between items-start gap-5">
    <div className="flex items-center gap-3 cursor-pointer flex-1">
      <Image src={prompt.creator.image} alt="user_image" width={40} height={40} className="rounded-full object-contain" />
      <div>
        <h3 className="font-satoshi font-semibold text-gray-900 whitespace-nowrap overflow-hidden overflow-ellipsis">{prompt.creator.username}</h3>
        <p className="font-inter text-sm text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis">{prompt.creator.email}</p>
      </div>
    </div>

    <div className="copy_btn cursor-pointer">
      <Image src={copied === prompt.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"} alt={copied === prompt.prompt ? "tick_icon" : "copy_icon"} width={12} height={12} />
    </div>
  </div>

  <p className="my-4 font-satoshi text-sm text-gray-700 overflow-hidden overflow-ellipsis whitespace-pre-line">
    {showFullPrompt ? prompt.prompt : prompt.prompt.slice(0, 200)}
    {prompt.prompt.length > 100 && (
      <span className="cursor-pointer text-blue-500" onClick={togglePromptVisibility}>
        {showFullPrompt ? " Read less" : " Read more"}
      </span>
    )}
  </p>

  <div className="flex flex-wrap gap-2">
    {prompt.tag.map((t, index) => (
      <span key={index} className="font-inter text-sm blue_gradient cursor-pointer">{`#${t}`}</span>
    ))}
  </div>

  {session?.user.id === prompt.creator._id && pathName === "/profile" && (
    <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
      <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>Edit</p>
      <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>Delete</p>
    </div>
  )}
</div>
  );
};

export default PromptCard;
