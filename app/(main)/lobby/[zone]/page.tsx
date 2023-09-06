// import { cookies } from "next/headers"
// import ZoneMenu from "./menu"
// import axios from "axios"
// import { redirect } from "next/navigation"
// import { iZone } from "@/types/zone"

// export const getZoneDetail = async (zoneId: string) => {
//     try {
//         const cookieStore = cookies()
//         const token = cookieStore.get("token")?.value
//         const { data } = await axios.get(`http://localhost:8888/zone/zone-detail/${zoneId}`, { headers: { Authorization: token } })
//         return data
//     } catch (err: any) {
//         console.log(err.message)
//         return redirect("/login")
//     }
// }

export default async function Zone({ params }: {params: {zone: string}}) {
    // const cookieStore = cookies()
    // const token = cookieStore.get("token")?.value
    // const { data } = await axios.get(`http://localhost:8888/zone/zone-detail/${params.zone}`, { headers: { Authorization: token } })
    return <div className="flex-grow bg-red-500">
        <p>ZONE</p>
    </div>
}