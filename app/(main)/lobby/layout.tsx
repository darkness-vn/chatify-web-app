import Sidebar from "@/components/Sidebar"
import axios from "axios"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import SidebarProvider from "./sidebar"



export default async function LobbyLayout(props: { children: React.ReactNode }) {
    return <main className="flex">
        <SidebarProvider />
        {props.children}
    </main>
}