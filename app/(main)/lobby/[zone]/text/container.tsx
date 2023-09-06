"use client"
import { sendMessage } from "@/firebase/service"
import { ref, onValue } from "firebase/database"
import { AiOutlineFileAdd, AiOutlineFileGif, AiOutlineSmile } from "react-icons/ai"
import { FormEvent, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { auth, realtime } from "@/firebase/config"
import { iMessage } from "@/types/message"
import { useToast } from "@/components/ui/use-toast"
import { getCookie } from "cookies-next"
import { AuthState } from "@/types/auth"
import { ScrollArea } from "@/components/ui/scroll-area"
import MessageCard from "@/components/message/message-card"

type Props = {}
const TextChannelContainer: React.FC<Props> = () => {
    const { toast } = useToast()
    const { zone } = useParams()
    const [messages, $messages] = useState<Array<iMessage>>([])
    const [text, $text] = useState<string>("")
    useEffect(() => {
        const currentZone = ref(realtime, 'messages/' + zone)

        onValue(currentZone, (snapshot) => {
            let listOfMessages: iMessage[] = []
            snapshot.forEach((i: any) => {
                listOfMessages.push(i.val() as iMessage)
            })
            $messages(listOfMessages.sort((a, b) => a.time - b.time))
        })

    }, [])

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault()
        try {
            const auth = JSON.parse(getCookie("auth")!) as AuthState

            await sendMessage({
                msg: text,
                sender: {
                    uid: auth.uid,
                    email: auth.email,
                    displayName: auth.displayName,
                    photoURL: auth.photoURL,
                }
            }, zone as string)
            $text("")
        } catch (error: any) {
            toast({
                title: "Error",
                description: <span className="text-red-500">{error.message}</span>
            })
        }
    }

    return <div className="relative w-full h-full">
        <div className="w-full h-10 bg-dark-2">

        </div>
        {messages.length > 0 && <ScrollArea className="h-[88vh] w-full rounded-md p-2">
            {messages.map((i) => <MessageCard key={i._id} data={i} zone={zone as string} />)}
        </ScrollArea>}

        <form onSubmit={onSubmit} className="absolute bottom-0 w-full z-20 p-2">
            <div className="flex space-x-2 bg-dark-2 rounded-xl w-full h-full p-1">
                <input onChange={e => $text(e.target.value)} value={text} type="text" className="flex-grow border-none outline-none text-base text-white px-2 bg-dark-2 rounded-xl" />
                <div className="flex space-x-3 items-center">
                    <AiOutlineFileAdd className="text-2xl text-gray-200"/>
                    <AiOutlineFileGif className="text-2xl text-gray-200"/>
                    <AiOutlineSmile className="text-2xl text-gray-200"/>
                    <button type="submit" className="text-white font-semibold bg-sky-500 rounded-xl px-4 py-1">Send</button>
                </div>
            </div>
        </form>

    </div>
}

export default TextChannelContainer