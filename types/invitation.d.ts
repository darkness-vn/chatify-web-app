import { iZone } from "./zone"

export interface Invitation {
    _id: string
    from: From
    status: number
    to: string
    zone: iZoneZone
    time: number
  }
  
  export interface From {
    displayName: string
    photoURL: string
    uid: string
  }
