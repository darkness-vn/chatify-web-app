import { iZone } from "@/types/zone"
import ContextBar from "../context-bar"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"
type MenuItem = React.ReactNode

type Props = {
    zone: iZone
}

const ZoneCard: React.FC<Props> = (props) => {
    const menu: ReactNode[] = [
        <button className="text-red-500">Left</button>
    ]
    const router = useRouter()
    return <ContextBar menu={menu}>
        <div onClick={() => router.push(`/lobby/${props.zone._id}`)} className="cursor-pointer rounded-full bg-dark-2 w-11 h-11 flex items-center justify-center">
            <p className="uppercase text-xl text-white">{props.zone.zone_name[0]}</p>
        </div>
    </ContextBar>
}
export default ZoneCard