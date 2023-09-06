"use client"
import { iZone } from "@/types/zone"
import { FormEvent, useState } from "react"
import { auth } from "@/firebase/config"
import { AiOutlineSearch, AiOutlineUser, AiOutlineSetting, AiOutlineUsergroupAdd, AiOutlineVideoCamera } from "react-icons/ai"
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2"
import { useParams, useRouter } from "next/navigation"
import { getCookie } from "cookies-next"
import { AuthState } from "@/types/auth"
import Modal from "@/components/modal"
import { FriendCard } from "@/components/friends/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Logo from "@/components/logo"
import { invite } from "@/firebase/service"
import useAxios from "@/lib/axios"

interface Props {
    zone: iZone
}

export default function ZoneMenu({ zone }: Props) {

    const router = useRouter()
    const [showInviteBox, $showInviteBox] = useState<boolean>(false)
    const [text, $text] = useState<string>("")
    const user = JSON.parse(getCookie("auth")!) as AuthState
    const axios = useAxios()

    const handleInvite = async (event: FormEvent) => {
        event.preventDefault()
        // Can check xem user da vao phong nay chua...
        await invite({
            from: {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL
            }, to: text,
            zone: zone
        })
        $showInviteBox(false)
        $text("")
    }

    return <div className="relative w-60 bg-dark-2">
        <div className="w-full h-10 shadow-lg drop-shadow-lg px-4 flex items-center justify-between">
            <p className="text-white font-semibold">{zone.zone_name}</p>
            <div className="flex items-center space-x-2">
                <AiOutlineUsergroupAdd onClick={() => $showInviteBox(true)} className="cursor-pointer text-lg text-white" />
                <AiOutlineSetting className="text-lg text-white" />
            </div>
        </div>

        <div className="p-2 space-y-2">
            <button onClick={() => router.push(`/lobby/${zone._id}/text`)}
                className="text-sm py-1 font-semibold hover:bg-dark-3 w-full flex items-center justify-between px-2 text-gray-300 rounded-md">
                <p className="flex space-x-2 items-center">
                    <HiOutlineChatBubbleBottomCenterText className="text-lg" />
                    <span>Text Channel</span>
                </p>
                <div className="flex space-x-1">
                    <AiOutlineSetting />
                    <AiOutlineUsergroupAdd />
                </div>
            </button>

            <button onClick={() => router.push(`/lobby/${zone._id}/meet`)}
                className="text-sm py-1 font-semibold hover:bg-dark-3 w-full flex items-center justify-between px-2 text-gray-300 rounded-md">
                <p className="flex space-x-2 items-center">
                    <AiOutlineVideoCamera className="text-lg" />
                    <span>Meet Channel</span>
                </p>
                <div className="flex space-x-1">
                    <AiOutlineSetting />
                    <AiOutlineUsergroupAdd />
                </div>
            </button>
        </div>

        <div className="absolute flex items-center space-x-2 w-full bottom-0 h-12 bg-gray-600 px-2">
            <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full" />
            <div className="flex-grow flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold text-white">{user.displayName}</p>
                    <p className="text-xs text-gray-300">{user.lastLoginAt}</p>
                </div>
                <div className="icons flex space-x-2">
                    <AiOutlineUser className="text-lg text-white" />
                    <AiOutlineSetting className="text-lg text-white" />
                </div>
            </div>
        </div>

        <Modal visible={showInviteBox} open={() => $showInviteBox(true)} close={() => $showInviteBox(false)}>
            <div className="w-[500px] bg-dark-1 rounded-xl pt-2">
                <div className="my-3 px-6">
                    <Logo />
                    <p className="text-white">Mời bạn bè vào Zone</p>
                </div>
                <div className="modal-header border-b-2 border-dark-1 px-4 shadow-lg drop-shadow-lg">
                    <form onSubmit={handleInvite} className="mt-2 flex bg-dark-2 space-x-2 px-2 py-1 items-center rounded-md justify-between">
                        <input type="text" value={text} onChange={(e)=>$text(e.target.value)} placeholder="Tìm kiếm bạn bè" className="text-white py-1 bg-dark-2 outline-none border-none w-full" />
                        <AiOutlineSearch className="text-white text-lg" />
                    </form>
                </div>
                <ScrollArea className="list-friends w-full p-3 space-y-2 h-[220px]">
                    <FriendCard />
                    <FriendCard />
                    <FriendCard />
                    <FriendCard />
                    <FriendCard />
                    <FriendCard />
                </ScrollArea>
                <div className="w-full p-3">
                    <p className="text-white text-sm font-semibold">Hoặc gửi link này đến bạn bè:</p>
                    <div className="mt-2 flex bg-dark-2 space-x-2 px-2 items-center py-1 rounded-md justify-between">
                        <input type="text" className="text-white py-1 bg-dark-2 outline-none border-none w-full" />
                        <button className="px-5 py-1 text-sm text-gray-200 rounded-lg bg-green-600 hover:bg-green-500">Copy</button>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
}