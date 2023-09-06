"use server"

import { Item } from "@/types/items"
import axios from "axios"
import { revalidateTag } from "next/cache"

export const handleAdd = async (e: FormData) => {
    const name = e.get("name")?.toString()
    const desc = e.get("desc")?.toString()

    if (!name || !desc) return

    const newItems:Item = { name, desc }
    await axios.post("http://localhost:8888/try/items", newItems, { headers: {
        "Content-Type": "application/json"
    }})

    revalidateTag("items")
}

export const handleRemove = async (item: Item) => {
    const _id = item._id
    await axios.delete(`http://localhost:8888/try/items/${_id}`, { headers: {
        "Content-Type": "application/json"
    }})
    revalidateTag("items")
}