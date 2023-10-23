'use client'
import { signOut } from "next-auth/react"
import { useEffect } from "react"


export default function Page() {
    useEffect(()=>{
        signOut({
            callbackUrl: '/auth/login'
        
        })
    },[])

    return (
        <h1 className="text-4xl">
            Signing out...
        </h1>
    )

}