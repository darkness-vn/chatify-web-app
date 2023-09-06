"use client"
import { FC, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import ZoneCard from "./zone/zone.card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BsPersonWorkspace, BsFillJournalBookmarkFill, BsBox } from "react-icons/bs"
import { auth, realtime, store } from "@/firebase/config"
import { setDoc, doc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import Modal from "./modal"
import Logo from "./logo"
import { useToast } from "./ui/use-toast"
import Indicator from "./indicator"
import { iParticipatedZone, iZone } from "@/types/zone"
import useAxios from "@/lib/axios"
import { onValue, ref } from "firebase/database"
import { getCookie } from "cookies-next"
import { AuthState } from "@/types/auth"
import { Invitation } from "@/types/invitation"
import { setInvitationStatus } from "@/firebase/service"
type Props = { zones: any }

const Sidebar: FC<Props> = (props) => {
    const router = useRouter()
    const user = JSON.parse(getCookie("auth")!) as AuthState
    const [zones, $zones] = useState<Array<iZone>>(props.zones)
    const [zoneType, $zoneType] = useState<string>("")
    const [zoneName, $zoneName] = useState<string>("")
    const [showCreateZoneBox, $showCreateZoneBox] = useState<boolean>(false)
    const [isLoading, $isLoading] = useState<boolean>(false)
    const { toast } = useToast()
    const axios = useAxios()
    const loader = async () => {
        try {
            const { data } = await axios.get("/zone/participated-zone")
            $zones(data.zones)
        } catch (error: any) {
            toast({
                duration: 3000,
                title: "Error",
                description: <p className="text-red-500">{error.message}</p>
            })
        }
    }

    const join = async (zone: iZone) => {
        // Set lai status ve 1
        await axios.post("/zone/participated-zone", { zone })
        await loader()
        await setInvitationStatus({ userId: user.uid, zoneId: zone._id })
        return router.push(`/lobby/${zone._id}`)
    }

    useEffect(() => {
        const invitations = ref(realtime, 'invitations/' + user.uid)
        onValue(invitations, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                const invitations: Invitation[] = []
                snapshot.forEach(i => {
                    invitations.push(i.val() as Invitation)
                })

                const sortedData = invitations.sort((a, b) => b.time - a.time)
                console.log(sortedData)

                if (sortedData[0].status == 0) {
                    toast({
                        description: <div>
                            <div className="flex space-x-2 items-center">
                                <img src={sortedData[0].from.photoURL} alt="" className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="text-gray-600 font-bold">{sortedData[0].from.displayName}</p>
                                    <p>Đã mời bạn vào Zone {sortedData[0].zone.zone_name}</p>
                                    <button onClick={() => join(sortedData[0].zone)} className="bg-green-500 px-4 text-white">Vào ngay</button>
                                </div>
                            </div>
                        </div>
                    })
                }
            }
        })
    }, [])

    const handleCreateZone = async () => {
        $isLoading(true)
        try {
            if (!zoneName || !zoneType) throw Error("Zone name và Zone type không hợp lệ")
            const _id = uuidv4()
            const newZone = { _id, zone_name: zoneName, zone_type: zoneType, uid: auth.currentUser?.uid! }
            await setDoc(doc(store, 'zones', _id), { ...newZone })
            await axios.post("/zone/participated-zone", { zone: newZone })
            await loader()

            $showCreateZoneBox(false)
            return router.push(`/lobby/${_id}`)

        } catch (error: any) {
            console.log(error.message)
            toast({
                duration: 3000,
                title: "Error",
                description: <p className="text-red-500">{error.message}</p>
            })
        } finally { $isLoading(false); $zoneName(""); $zoneType("") }
    }

    return <div className="w-14 bg-dark-1 py-3 min-h-screen">
        <div className="flex flex-col items-center space-y-2">
            {zones?.length > 0 && zones.map(zone => <ZoneCard key={zone._id} zone={zone} />)}
            <button onClick={() => $showCreateZoneBox(true)} className="w-11 h-11 rounded-full bg-dark-2 text-white text-3xl">+</button>
        </div>
        <Modal visible={showCreateZoneBox} close={() => $showCreateZoneBox(false)} open={() => $showCreateZoneBox(true)}>
            <div className="w-[500px] bg-black bg-opacity-50 rounded-xl pt-4">
                <div className="mb-4 px-6">
                    <Logo />
                    <p className="text-white">Create a new Zone</p>
                </div>
                <div className="bg-dark-2 px-5 py-8 space-y-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="zone_name" className="text-right text-white">
                            Zone Name
                        </Label>
                        <Input id="name" onChange={(e) => $zoneName(e.target.value)} className="w-[300px]" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="zone_type" className="text-right text-white">
                            Zone Type
                        </Label>
                        <Select onValueChange={(value) => $zoneType(value)}>
                            <SelectTrigger className="w-[300px]">
                                <SelectValue placeholder="Lựa chọn loại hình" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="education">
                                    <div className="flex space-x-2 items-center">
                                        <BsFillJournalBookmarkFill /><p>Giáo Dục</p>
                                    </div>
                                </SelectItem>
                                <SelectItem value="gamming">
                                    <div className="flex space-x-2 items-center">
                                        <BsBox /><p>Trò Chơi</p>
                                    </div>
                                </SelectItem>
                                <SelectItem value="working">
                                    <div className="flex space-x-2 items-center">
                                        <BsPersonWorkspace /><p>Công Việc</p>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <button onClick={handleCreateZone} className="w-full py-3 bg-green-500 hover:bg-green-400 text-white rounded-b-xl">Hoàn tất</button>
            </div>
        </Modal>
        <Indicator overlay visible={isLoading} />
    </div>
}

export default Sidebar