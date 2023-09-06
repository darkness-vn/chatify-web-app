import { handleAdd, handleRemove } from "@/actions/serverActions"
import { Item } from "@/types/items"
import axios from "axios"
import { revalidateTag } from "next/cache"
import TryButton from "./button"
import Card from "./card"

export default async function Try() {
    const res = await fetch(`http://localhost:8888/try/items`, {
        cache: "no-cache",
        next: { tags: ["items"] }
    })
    const items: Item[] = await res.json()

    /** @function onSubmit : use when submit a image input, ... */
    const onSubmit = async (item: Item) => {
        "use server"
        const _id = item._id
        await axios.delete(`http://localhost:8888/try/items/${_id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        revalidateTag("items")
    }

    return <main className="flex-1 flex items-center justify-center p-12">
        <div className="flex space-x-4">
            <form action={handleAdd} className="flex space-x-4">
                <div className="flex flex-col items-center w-60 rounded-xl p-3 space-y-2 bg-red-500 text-white">
                    <input type="text" name="name" className="bg-dark-2 rounded-lg py-1 px-3" />
                    <input type="text" name="desc" className="bg-dark-2 rounded-lg py-1 px-3" />
                    <button className="bg-dark-2 w-full py-1 text-white rounded-lg">Post</button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {items.map(i => <Card key={i._id} data={i} />)}
                </div>
            </form>
            <TryButton />
        </div>
    </main>
}