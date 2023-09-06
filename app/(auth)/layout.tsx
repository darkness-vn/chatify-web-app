type Props = { children: React.ReactNode }

export default function AuthLayout ({ children }: Props) {
    return <div className="bg-background">
        { children }
    </div>
}