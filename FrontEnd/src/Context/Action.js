export const LoginStart = (userCredentialComplete) => ({
    type: "LOGINSTART",
})
export const LoginSuccess = (user) => ({
    type: "LOGINSUCCESS",
    payload: user,
})
export const LoginFailure = () => ({
    type: "LOGINFAILED",
})

export const Logout = () => ({
    type: "LOGOUT",
})

export const updatePasswordStart = (userCredentialComplete) => ({
    type: "UPDATE_PASSWORD_START",
})
export const updatePasswordSucc = (user) => ({
    type: "UPDATE_PASSWORD_SUCCESS",
    payload: user,
})
export const updatePasswordFailure = () => ({
    type: "UPDATE_PASSWORD_FAILED",
})
