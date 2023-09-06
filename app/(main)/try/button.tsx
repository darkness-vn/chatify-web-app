"use client"
import { handleAdd } from "@/actions/serverActions"
import { startTransition, useTransition } from "react"

type Props = { }
const TryButton:React.FC<Props> = (props) => {
    const [isPending, $startTransition] = useTransition()

    const formData = new FormData()
    formData.append("name", "Tungdz")
    formData.append("desc", "Vai lol")

    return <button onClick={
        ()=> startTransition(
            // @ts-ignore
            ()=>handleAdd(formData)
        )
    } className="fixed bottom-3 right-3">
        { isPending ? "Add..." : "Added" }
    </button>
}

export default TryButton