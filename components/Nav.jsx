'use client'
import Link from "next/link"
import Image from "next/image"
import { useState , useEffect , } from "react"
import {signIn , signOut , getProviders , useSession} from "next-auth/react"

const Nav = () => {
  const {data:session} = useSession();
  const [providers , setProviders] = useState(null);
  const [toggleDropdown , setToggleDropDown] = useState(false);
  useEffect(()=>{
    const setProvidersFunc = async ()=>{
      const response = await getProviders();
      setProviders(response);
    }

    setProvidersFunc()

  } , [])
  return (
   <nav className="flex-between w-full mb-16 pt-3">
    <Link href="/" className="flex gap-2 flex-center ">
      <Image src="/assets/images/logo.svg" alt="Promptopia Logo" className="object-contain" width={30} height={30} />
      <p className="logo_text">Promptopia</p>
    </Link>

    {/* Desktop Navigation */}
    <div className="sm:flex hidden">
      {session?.user ? (<div className="flex gap-3 md:gap-5 ">
        <Link href="/create-prompt" className="black_btn">
          Create Post

        </Link>
        <button className="outline_btn" onClick={signOut}  type="button">
          SignOut
        </button>
        <Link href="/profile" >
          <Image src={session?.user.image} alt="profile" width={35} height={35} className="rounded-full" />
        </Link>
 
      </div>): (
        <>
        {providers && Object.values(providers).map((provider)=>(
          <button type="button" className="black_btn" key={provider.name} onClick={()=>signIn(provider.id)} >SignIn</button>
        ))}
        </>
      )}


    </div>
  
    {/* Mobile Navi gation */}
    <div className="sm:hidden flex relative">
      {session?.user ? (
        <div className="flex ">
           <Image src={session?.user.image}  alt="profile" width={35} height={35} className="rounded-full" onClick={()=>setToggleDropDown(prev=>!prev)} />
           {toggleDropdown && (
            <div className="dropdown ">
              <Link href="/profile" className="dropdown_link" onClick={()=>setToggleDropDown(false)}>
                My Profile

              </Link>
              <Link href="/create-prompt" className="dropdown_link" onClick={()=>setToggleDropDown(false)}>
                Create Prompt

              </Link>
              <button type="button" className="mt-5 w-full black_btn " onClick={()=>{
                setToggleDropDown(false);
                signOut();

              }}>
                SignOut
              </button>
            </div>
           ) }


        </div>

      ): (
        <>
         {providers && Object.values(providers).map((provider)=>(
          <button type="button" className="black_btn" key={provider.name} onClick={()=>signIn(provider.id)} >SignIn</button>

        ))}
        </>
       

        
      )}
    </div>

   

   </nav>
  )
}

export default Nav