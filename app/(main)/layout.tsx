import { ReactNode } from "react"

export default async function MainLayout(props: { children: ReactNode }) {
    return <div>
        { props.children }
    </div>
}