type MessageBubbleProps = {
    content: string;
    timestamp: string;
    senderId: string;
    senderUsername: string;
    currentUserId: string;
    image: string;
    prevMessageTime: string | null;
    showAvatar: boolean;
};

const fiveMinCheck = (t1: string, t2: string) => {
    const time1 = new Date(t1).getTime();
    const time2 = new Date(t2).getTime();
    return Math.abs(time1 - time2) <= 5 * 60 * 1000; // 5 minutes in ms
};

export default function MessageBubble({
    content,
    timestamp,
    senderId,
    senderUsername,
    currentUserId,
    image,
    prevMessageTime,
    showAvatar,
}: MessageBubbleProps) {
    const isCurrentUser = senderId === currentUserId;
    const isGrouped =
        prevMessageTime !== null &&
        fiveMinCheck(timestamp, prevMessageTime);


    return (
        <div className={`flex w-full ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col gap-1 max-w-[80%] ${isCurrentUser ? 'items-end' : 'items-start'}`}>

                <div className="flex items-center space-x-3">
                    {!isCurrentUser && (
                        <div className="w-7 h-7">
                            {showAvatar ? (
                                <img
                                    src={image}
                                    alt="avatar"
                                    className="w-7 h-7 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-7 h-7" />
                            )}
                        </div>
                    )}

                    <div
                        className={`mr-1 px-3 py-2 rounded-2xl text-base break-words whitespace-pre-wrap ${isCurrentUser
                            ? 'bg-blue-600 text-white rounded-br-sm rounded-tr-sm self-end'
                            : 'bg-blue-100 text-black rounded-bl-sm rounded-tl-sm self-start'
                            }`}
                    >
                        {content}
                    </div>
                </div>

                {/* Only show timestamp if it's not grouped */}
                {showAvatar && (
                    <div
                        className={`text-xs text-black ${isCurrentUser ? 'text-right self-end mr-2' : 'text-left self-start'}`}
                    >
                        {new Date(timestamp).toLocaleString('en-US', {
                            timeZone: 'America/Los_Angeles',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                        })}
                    </div>
                )}

            </div>
        </div>
    );
}