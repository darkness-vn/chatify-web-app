import { FC } from "react"

type Props = {
    visible: boolean
    overlay?: boolean
}

const Indicator:FC<Props> = ({ visible, overlay }) => {
    return visible && <div className={`${overlay&&"bg-dark-1"} fixed w-screen z-10 h-screen top-0 left-0 flex flex-col items-center justify-center bg-opacity-50`}>
        <img src="/images/loader.svg" alt="" />
    </div>
}

export default Indicator