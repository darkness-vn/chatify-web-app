import { Orbitron } from 'next/font/google'
import { FC } from 'react'
import { PiChatsTeardropFill } from "react-icons/pi"
const orbitron = Orbitron({ weight: "500", subsets: ['latin'] })

interface Props {
    size?: number
}

const Logo: FC<Props> = ({ size }) => {
    return <div className='flex space-x-1 items-center'>
        <p className={orbitron.className} style={{ fontSize: size ?? 30, fontWeight: 600, color: "white" }}>
            Chatify
        </p><PiChatsTeardropFill style={{ fontSize: size ?? 30, color: "white" }} />
    </div>
}

export default Logo