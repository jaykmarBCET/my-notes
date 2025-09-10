import React from "react";
import SideBar from '@/components/SideBar'
import Footer from '@/components/Footer'


export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
    return <html lang="en">
        <body className="flex flex-col  "> 
            <div className="flex">
                <SideBar/>
                {children}
            </div>
             <Footer/>
        </body>
    </html>
}