import Helper from "@/components/helper/helper"
import SidebarProvider from "./sidebar"

export default async function LobbyLayout(props: { children: React.ReactNode }) {
    return <main className="flex">
        <Helper />
        <SidebarProvider />
        {props.children}
    </main>
}