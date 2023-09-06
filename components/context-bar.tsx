"use client"
import { v4 as uuidv4 } from "uuid"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from "@/components/ui/context-menu"

type MenuItem = React.ReactNode

export default function ContextBar(
    props: { children: React.ReactNode, menu: Array<MenuItem> }
) {
    return <ContextMenu>
        <ContextMenuTrigger>
            { props.children }
        </ContextMenuTrigger>
        <ContextMenuContent>
            { props.menu.map(item => <ContextMenuItem key={uuidv4()}>
                {item}
            </ContextMenuItem>) }
        </ContextMenuContent>
    </ContextMenu>
}