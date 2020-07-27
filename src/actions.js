export async function chatMessages(msgs) {
    return {
        type: "LAST_TEN_MESSAGES",
        msgs,
    };
}

export async function chatMessage(msg) {
    return {
        type: "ADD_MESSAGES",
        msg,
    };
}
