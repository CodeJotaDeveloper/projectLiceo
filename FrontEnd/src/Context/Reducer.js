// setp 1.1
const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGINSTART":
            return {
                user: null,
                FetchData: true,
                error: false,
            }
        case "LOGINSUCCESS":
            return {
                user: action.payload,
                FetchData: false,
                error: false,
            }
        case "LOGINFAILED":
            return {
                user: null,
                FetchData: false,
                error: true,
            }
        case "LOGOUT":
            return {
                user: null,
                FetchData: false,
                error: false,
            }



        case "UPDATE_PASSWORD_START":
            return {
                ...state,
                FetchData: true,
            }
        case "UPDATE_PASSWORD_SUCCESS":
            return {
                user: action.payload,
                FetchData: false,
                error: false,
            }
        case "UPDATE_PASSWORD_FAILED":
            return {
                user: state.user,
                FetchData: false,
                error: true,
            }

        default:
            return state
    }
}
export default Reducer
