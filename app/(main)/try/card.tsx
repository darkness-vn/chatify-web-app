
import { handleRemove } from "@/actions/serverActions"
import { Item } from "@/types/items"
import axios from "axios"
import { revalidatePath, revalidateTag } from "next/cache"

function Card({ data }: { data: Item }) {

    return <div className="shadow-md drop-shadow-md rounded-lg p-3">
        <p>{data.name}</p>
        <p>{data._id}</p>
        <button type="submit" formAction={async () => {
            "use server"
            const _id = data._id
            await axios.delete(`http://localhost:8888/try/items/${_id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            revalidateTag("items")
        }} className="px-2 bg-red-500 text-white">Remove</button>
    </div>
}

export default Card