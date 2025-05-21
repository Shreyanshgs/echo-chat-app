type MessageBubbleProps = {
    content: string;
    timestamp: string;
    senderId: string;
    senderUsername: string;
    currentUserId: string;
};

export default function MessageBubble({
    content,
    timestamp,
    senderId,
    senderUsername,
    currentUserId,
}: MessageBubbleProps) {
    const isCurrentUser = senderId === currentUserId;

    return (
        <div className={`flex w-full ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
            <div className="flex flex-col items-start gap-1 max-w-[80%]">
                {!isCurrentUser && (
                    <div className="text-sm font-semibold text-gray-600">{senderUsername}</div>
                )}
                <div
                    className={`mr-1 px-3 py-2 rounded-2xl text-sm break-words whitespace-pre-wrap ${isCurrentUser
                            ? 'bg-blue-600 text-white rounded-br-sm self-end'
                            : 'bg-blue-100 text-black rounded-bl-sm self-start'
                        }`}
                >
                    {content}
                </div>
                <div
                    className={`text-xs text-black ${isCurrentUser ? 'text-right self-end mr-2' : 'text-left self-start'
                        }`}
                >
                    {new Date(timestamp).toLocaleString('en-US', {
                        timeZone: 'America/Los_Angeles',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    })}
                </div>
            </div>
        </div>
    );
}
