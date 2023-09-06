"use client"

import { auth } from "@/firebase/config"
import axios from "axios"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"

type Handlers = {
    onSuccess?: () => void
    onError?: () => void
}
const useAxios = ({ onSuccess, onError }: Handlers = {}) => {
    const router = useRouter()
    const token = getCookie("token")
    const instance = axios.create({
        baseURL: 'http://localhost:8888',
        timeout: 100000,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    })

    instance.interceptors.request.use(config => {
        return config
    }, error => {
        return Promise.reject(error)
    })

    instance.interceptors.response.use(response => {
        return response
    }, error => {
        if (error.response) {
            if (error.response.status === 401) {
                auth.signOut().then(() => {
                    console.log(`error 401: sign out`)
                    router.push("/login")
                })
            }
            return Promise.reject(error.response)
        }

        return Promise.reject(error)
    })

    return instance
}

export default useAxios