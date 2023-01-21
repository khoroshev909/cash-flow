import {AuthResponse} from "./auth.service";

export const setTokens = ({ localId, idToken, refreshToken, expiresIn }: AuthResponse) => {
    localStorage.setItem('localId', localId)
    localStorage.setItem('idToken', idToken)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('expiresIn', expiresIn.toString())
}

export const removeTokens = () => {
    localStorage.removeItem('localId')
    localStorage.removeItem('idToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('expiresIn')
}

export const getAuthId = () => localStorage.getItem('localId')
export const getAccessToken = () => localStorage.getItem('idToken')
export const getRefreshToken = () => localStorage.getItem('refreshToken')
export const getExpiresIn = () => localStorage.getItem('expiresIn')
export const setCurrentBill = (billId: string) => localStorage.setItem('currentBill', billId)
export const getCurrentBill = () => localStorage.getItem('currentBill')

const storageService = {
    setTokens,
    removeTokens,
    getAuthId,
    getAccessToken,
    getRefreshToken,
    getExpiresIn,
    setCurrentBill,
    getCurrentBill
}
export default storageService