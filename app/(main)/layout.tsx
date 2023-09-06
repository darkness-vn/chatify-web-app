import Sidebar from "@/components/Sidebar"
import axios from "axios"
import { ReactNode } from "react"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"

const loader = async () => {
    try {
        const cookieStore = cookies()
        const token = cookieStore.get("token")?.value
        const res = await axios.get("http://localhost:8888/zone/participated-zone", { headers: { Authorization: token } })
        if (res.status == 401) {
            return redirect("/login")
        } else { return res.data }
    } catch (err) {
        console.log(`error`)
    }
}

export default async function MainLayout(props: { children: ReactNode }) {
    return <div>
        { props.children }
    </div>
}