import TextChannelContainer from "./container"

type PageProps = {
    params: { zone: string }
}

export default function Text({ params }: PageProps) {
    return <div className="bg-dark-3 flex-grow">
        <TextChannelContainer />
    </div>
}