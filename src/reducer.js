export default function reducer(state = {}, action) {
    if (action.type == "LAST_TEN_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.msgs,
        };
    }
    if (action.type == "ADD_MESSAGES") {
        state = Object.assign({}, state, {
            chatMessages: state.chatMessages.concat(action.msg),
        });
    }

    console.log("this is my action in friends state:", action, state);
    return state;
}
