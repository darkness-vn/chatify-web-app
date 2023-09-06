import { cookies } from "next/headers";
import ZoneMenu from "./menu";
import { redirect } from "next/navigation";
import axios from "axios";
import { iZone } from "@/types/zone";

export const loader = async (zoneId: string) => {
    try {
        const cookieStore = cookies()
        const token = cookieStore.get("token")?.value
        const { data } = await axios.get(`http://localhost:8888/zone/zone-detail/${zoneId}`, { headers: { Authorization: token } })
        return data
    } catch (err: any) {
        console.log(err.message)
        return redirect("/login")
    }
}

type LayoutProps = {
    children: React.ReactNode
    params: { zone: string }
}

export default async function ZoneLayout(props: LayoutProps) {

    const data = await loader(props.params.zone) as iZone

    return <div className="flex-grow flex bg-dark-3">
        <ZoneMenu zone={data}/>
        {props.children}
    </div>
}