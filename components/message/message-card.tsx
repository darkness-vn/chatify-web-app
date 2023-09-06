import { iMessage } from "@/types/message"
import { useEffect, useRef } from "react"
import { AiOutlineDelete } from "react-icons/ai"
import { removeMessage } from "@/firebase/service"

type Props = {
    data: iMessage
    zone: string
}

const MessageCard: React.FC<Props> = ({ data, zone }) => {
    const date = new Date(data.time)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const dateString = `${date.toDateString()} ${hours}:${minutes}`
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {   
        ref.current?.scrollIntoView({behavior:"smooth"})
    }, [data])

    return <div ref={ref} className="p-2 flex justify-between items-center">
        <div className="message-detail">
            <div className="flex space-x-2 items-center">
                <img src={data.sender.photoURL} alt="" className="w-8 h-8 rounded-full" />
                <div className="">
                    <p className="text-gray-300 text-sm font-semibold">{data.sender.displayName}</p>
                    <p className="text-gray-400 text-xs">{dateString}</p>
                </div>
            </div>
            <p className="mt-2 text-white text-base font-semibold">{data.msg}</p>
        </div>
        <button onClick={() => removeMessage(zone as string, data._id)}>
            <AiOutlineDelete className="text-red-500 text-xl" />
        </button>
    </div>
}

export default MessageCard