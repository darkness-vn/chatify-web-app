"use client"
import { auth } from "@/firebase/config"
import { AuthState } from "@/types/auth"
import { getCookie } from "cookies-next"
import { useState } from "react"
import { motion } from "framer-motion"

type Props = {

}

const Helper: React.FC<Props> = () => {

    const [show, $show] = useState<boolean>(false)

    const user = JSON.parse(getCookie("auth")!) as AuthState

    return show ? <div onClick={() => $show(false)} className="fixed z-50 w-full h-full flex justify-end">
        <div onClick={(e) => e.stopPropagation()} className="w-[25%] h-full bg-gray-400">

        </div>
    </div> : <motion.div drag
        style={{
            backgroundImage: `url(${user.photoURL})`
        }}
        dragConstraints={{
            top: -4,
            right: 125,
            bottom: 125,
            left: -125,
        }}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        dragElastic={0.5}
        whileTap={{ cursor: "grabbing" }} onClick={() => $show(true)} className="bg-cover cursor-pointer bg-green-500 w-10 h-10 rounded-full fixed top-5 right-3 z-50">
        
    </motion.div>
}

export default Helper