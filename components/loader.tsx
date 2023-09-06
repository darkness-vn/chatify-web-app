"use client"
import { useRouter } from "next/navigation"
import { FC, useEffect} from "react"
import { auth, store } from "@/firebase/config"
import { doc, getDoc } from "firebase/firestore"
import Logo from "./logo"

type Props = {
    timeout: number
    onSuccessRedirectPath?: string
    onErrorRedirectPath?: string
}

const Loader:FC<Props> = ({ timeout, onSuccessRedirectPath, onErrorRedirectPath }) => {

    const router = useRouter()

    const userAuthChecker = async () => {
        try {
            auth.onAuthStateChanged(async (credential) => {
                if (credential?.uid) {
                    try {
                        let snap = await getDoc(doc(store, 'users', credential?.uid))
    
                        if (snap.exists()) {
                            // set user data
                        }
    
                        setTimeout(() => {
                            router.push(onSuccessRedirectPath ?? "/lobby")
                        }, timeout ?? 2000)
    
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    setTimeout(() => {
                        router.push(onErrorRedirectPath ?? "/login")
                    }, timeout ?? 2000)
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        userAuthChecker()
    }, [])

    return <div className="w-screen min-h-screen bg-cover flex justify-center flex-col items-center" style={{backgroundImage:`url(/images/chatify-bg.jpg)`}}>
        <img src="/images/loader.svg" alt="" className="w-20 h-20" />
        <Logo />
    </div>
}; export default Loader