export interface iMessage {
    _id: string,
    msg: string,
    sender: {
        uid: string,
        email: string,
        displayName: string,
        photoURL: string
    },
    time: number
}