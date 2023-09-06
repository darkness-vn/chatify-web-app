"use client"

import { FC, useState, useEffect } from "react"
import '@livekit/components-styles';
import {
    useTracks,
    LiveKitRoom,
    VideoConference,
    GridLayout,
    ParticipantTile,
} from '@livekit/components-react';
import { auth } from "@/firebase/config"

type Props = {
    roomId: string
    video: boolean
    audio: boolean
}

const MediaRoom: FC<Props> = ({ roomId, video, audio }) => {

    const user = auth.currentUser
    const [token, $token] = useState<string>("")

    const handleConnect = async () => {
        try {
            const response = await fetch(`/api/live?room=${roomId}&username=Tung Hwang`)
            const data = await response.json()

            $token(data.token)
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(process.env.NEXT_PUBLIC_LIVEKIT_URL)
        handleConnect()

    }, [roomId, user?.email])

    if (!token) {
        return <div className="flex flex-1 flex-col justify-center items-center">
            <p>Loading ...</p>
        </div>
    }

    return <>
        <LiveKitRoom
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            connect={true}
            video={video}
            audio={audio}
            connectOptions={{ autoSubscribe: false }}
            data-lk-theme="default"
            style={{ height: '100dvh' }}
        >
            <VideoConference />
        </LiveKitRoom>
        
    </>
}


export default MediaRoom