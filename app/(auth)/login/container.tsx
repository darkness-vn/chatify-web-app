"use client"
import { FcGoogle } from "react-icons/fc"
import { BsFacebook } from "react-icons/bs"
import { FC } from "react"
import { store, auth } from "@/firebase/config"
import { getDoc, setDoc, doc } from "firebase/firestore"
import { useToast } from "@/components/ui/use-toast"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { setCookie } from "cookies-next"
import { useRouter, redirect } from "next/navigation"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

type Props = {}

const LoginContainer: FC<Props> = (props) => {

    const { toast } = useToast()
    const router = useRouter()

    const loginWithGoogle = async () => {
        try {
            const { user } = await signInWithPopup(auth, new GoogleAuthProvider())
            const docRef = doc(store, "users", user.uid)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                console.log(`User existed`)
            } else {
                const userData = {
                    _id: user.uid,
                    email: user.email,
                    name: null, 
                    avatar: null
                }
                await setDoc(doc(store, 'users', user.uid), userData)
            }

            const tokenId = await user.getIdToken()
            setCookie("token", tokenId)
            setCookie("auth", user)
            return router.push("/lobby")
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message
            })
        }
    }

    return <div className="min-h-screen flex flex-col items-center justify-center bg-cover"
        style={{ backgroundImage: `url(/images/chatify-bg.jpg)` }}
    >
        <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Đăng nhập</TabsTrigger>
                <TabsTrigger value="register">Đăng ký</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Card>
                    <CardHeader>
                        <CardTitle>Đăng Nhập</CardTitle>
                        <CardDescription>
                            Có thể sử dụng Google, Facebook hoặc tài khoản mật khẩu của bạn
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">

                        <div className="flex space-x-2">
                            <Button onClick={loginWithGoogle} className="flex-1">
                                <FcGoogle className="text-xl mr-2" />
                                Google
                            </Button>
                            <Button className="flex-1">
                                <BsFacebook className="text-xl mr-2" />
                                Facebook
                            </Button>
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Đăng Nhập</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="register">
                <Card>
                    <CardHeader>
                        <CardTitle>Đăng Ký</CardTitle>
                        <CardDescription>
                            Đăng ký tài khoản nhanh chóng với email và mật khẩu
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">Password</Label>
                            <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Đăng Ký</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
}

export default LoginContainer