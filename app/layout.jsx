/* eslint-disable react/display-name */
import '@/styles/globals.css'
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { Toaster } from "react-hot-toast";



export const metadata = ({
   title:"Promptopia",
   description:"Discover & Share AI Prompts"
})

 const  RootLayout = ({children})=>{
    return (
        <html lang='en' suppressHydrationWarning={true}>
            <body> 
               <Provider>
                <div className='main'>
                    <div className='gradient' />
                    
                </div>

                <main className='app'>
                    <Nav />
                    <Toaster position='bottom-center' />
                    {children}
                </main>
                </Provider>
            </body>
        </html>

    )
}
 
export default RootLayout;
    