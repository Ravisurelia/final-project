import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const elemRef = useRef();
    const chatMessages = useSelector((state) => state && state.chatMessages);
    console.log("here are the last 10 chat messages: ", chatMessages);

    useEffect(() => {
        console.log(("my element ref", elemRef));
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("My message:", e.target.value);
            socket.emit("My amazing chat message", e.target.value);
            e.target.value = "";
        }
    };
    return (
        <div className="chat-title">
            <p className="chat-title1">Welcome to Yatra-Chat</p>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map((each) => (
                        <div key={each.message_id} className="img-message">
                            <div className="one">
                                <p className="chat-msg">
                                    [ {each.first} {each.last} ] :
                                </p>
                                <p className="chat-msg">{each.message}</p>
                            </div>
                        </div>
                    ))}
            </div>
            <textarea
                className="chat-text"
                placeholder="type your message here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
