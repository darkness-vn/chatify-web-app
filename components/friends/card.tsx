"use client"

interface CardProps { }
export const FriendCard: React.FC<CardProps> = (props) => {
    return <div className="mb-2 shadow-lg drop-shadow-lg flex bg-dark-1 hover:bg-dark-3 p-2 rounded-md items-center justify-between">
        <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-red-500"></div>
            <p className="text-sm text-gray-300 font-semibold">Username</p>
        </div>
        <button className="px-5 py-1 text-sm text-gray-200 rounded-lg bg-green-600 hover:bg-green-500">Mời</button>
    </div>
}