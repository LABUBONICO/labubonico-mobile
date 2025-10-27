type Message = {
    type: "message" | "image",
    role: "user" | "agent",
    content: string,
    timestamp: string,
    imageUri?: string | undefined;
}

export {
    Message
}