import { iParticipatedZone, iZone } from "@/types/zone"
import { auth, store, realtime } from "./config"
import { signInWithEmailAndPassword } from "firebase/auth"
import { collection, doc, where, query, getDocs } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"
import { ref, set, remove } from "firebase/database"
import { iMessage } from "@/types/message"

export async function loginWithEmailAndPassword(email: string, password: string) {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        return user
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export async function getListOfParticipantZone() {
    try {
        let results: any = []
        const docRef = collection(store, 'participants')
        const q = query(docRef, where("uid", "==", auth.currentUser?.uid))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            results.push(doc.data())
        });

        return results
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export async function getListZoneByListId(list: Array<iParticipatedZone>) {
    try {
        let results: any = []
        let listId = list.map(i => i.zoneId)
        const docRef = collection(store, 'zones')
        const q = query(docRef, where("_id", 'in', listId))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            results.push(doc.data())
        });

        return results
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const sendMessage = async (input: Object, channel: string) => {
    try {
        const _id = uuidv4()
        await set(ref(realtime, "messages/" + channel + "/" + _id), {
            _id, ...input, time: Date.now()
        })
    } catch (error: any) {
        throw new Error("Some thing went wrong, can not send message")
    }
}

export const removeMessage = async (channel: string, messageId: string) => {
    try {
        await remove(ref(realtime, "messages/" + channel + "/" + messageId))
    } catch (error: any) {
        console.log(error.message)
    }
}

type invitePayload = {
    from: {
        uid: string
        displayName: string,
        photoURL: string
    }, to: string,
    zone: iZone
}

export const invite = async ({ from, to, zone }: invitePayload) => {
    const _id = uuidv4()
    await set(ref(realtime, `invitations/${to}/${zone._id}`), {
        _id, from, to, zone, status: 0, time: Date.now()
    })
}
