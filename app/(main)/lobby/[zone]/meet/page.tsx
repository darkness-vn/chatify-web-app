import { cookies } from 'next/headers'
import axios from "axios"
import RoomContainer from './container'

/** 
 * @param {string} id : Room id
 * @param {string} username : displayName
*/
const loader = async (id: string, username: string) => {
    try {
        const { data } = await axios.get(`http://localhost:3000/api/live?room=${id}&username=${username}`)
        return data.token
    } catch (error: any) {
        console.log(error)
    }
}

type PageProps = {
    params: { zone: string }
}

export default async function Meet({ params }: PageProps) {
    
    const cookieStore = cookies()
    const auth = JSON.parse(cookieStore.get('auth')?.value!) as { displayName: string }
    const token = await loader(params.zone, auth.displayName)
    return <><RoomContainer token={ token } /></>
}