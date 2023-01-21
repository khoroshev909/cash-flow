import configFile from "../../../config";
import storageService from "../../localStorage.service";
import authService from "../../auth.service";
const fetchFn = async (input: RequestInfo) => {
    // @ts-ignore
    let {url} = input
    if (configFile.REACT_APP_BACKEND === 'FIREBASE') {
        const containSlash = /\/$/gi.test(url)
        url = (containSlash ? url!.slice(0, -1) : url) + '.json'
    }
    const accessToken = storageService.getAccessToken()
    if (!accessToken) {
        throw new Error('unauthorized')
    }
    const refreshToken = storageService.getRefreshToken()
    const expiresIn = storageService.getExpiresIn()
    if (refreshToken && expiresIn && +expiresIn < Date.now()) {
        const {data} = await authService.post('token', {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        })
        storageService.setTokens({
            idToken: data.id_token,
            refreshToken: data.refresh_token,
            localId: data.user_id,
            expiresIn: data.expires_in
        })
    }
    const response = await fetch(url + `?auth=${accessToken}`)
    return Promise.resolve(response)
}
export default fetchFn