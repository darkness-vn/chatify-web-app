import { loginWithEmailAndPassword } from "@/firebase/service"
import { FormEvent } from "react"
import LoginContainer from "./container"
import { Toaster } from "@/components/ui/toaster"

export default function Login() {
    
    return <main className="min-h-screen">
        <LoginContainer />
    </main>
}