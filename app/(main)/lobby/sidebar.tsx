import Sidebar from "@/components/Sidebar"
import axios from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const getParticipatedZone = async () => {
    try {
        const cookieStore = cookies()
        const token = cookieStore.get("token")?.value
        const { data } = await axios.get("http://localhost:8888/zone/participated-zone", { headers: { Authorization: token } })
        return data.zones
    } catch (err: any) {
        console.log(err.message)
        return redirect("/login")
    }
}

export default async function SidebarProvider () {
    const data = await getParticipatedZone()
    return <Sidebar zones={data} />
}