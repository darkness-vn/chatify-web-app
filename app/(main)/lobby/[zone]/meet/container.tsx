"use client"
import { LiveKitRoom,VideoConference } from '@livekit/components-react'
import '@livekit/components-styles';
import { FC } from "react"

type Props = { token: string }

const RoomContainer: FC<Props> = ({ token }) => {
    return <LiveKitRoom
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        token={token}
        connect={true}
        video={false}
        audio={true}
        connectOptions={{ autoSubscribe: false }}
        data-lk-theme="default"
        style={{ height: '100dvh' }}
    >
        <VideoConference />
    </LiveKitRoom>
}

export default RoomContainer