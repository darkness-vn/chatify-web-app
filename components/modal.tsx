import { ReactNode, FC, useState } from "react"

type Props = {
    children: ReactNode
    close: () => void
    open: () => void
    visible: boolean
}

const Modal: FC<Props> = (props) => {
    return props.visible && <div onClick={props.close} className="duration-300 ease-in mt-0 fixed top-0 left-0 w-screen h-screen flex items-center justify-center flex-col bg-white bg-opacity-20 z-50">
        <div onClick={(e) => { e.stopPropagation() }}>
            {props.children}
        </div>
    </div>
}

export default Modal