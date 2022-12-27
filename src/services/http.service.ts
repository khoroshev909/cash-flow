import axios, {AxiosRequestConfig} from "axios";
import configFile from '../config'
import storageService from "./localStorage.service";
import authService from "./auth.service";

const httpService = axios.create({
    baseURL: configFile.REACT_APP_BASE_ENDPOINT
})

httpService.interceptors.request.use(
    async function (config: AxiosRequestConfig) {
        if (configFile.REACT_APP_BACKEND === 'FIREBASE') {
            const containSlash = /\/$/gi.test(config.url!)
            config.url = (containSlash ? config.url!.slice(0, -1) : config.url) + '.json'
        }
        const refreshToken = storageService.getRefreshToken()
        const expiresIn = storageService.getExpiresIn()
        if (refreshToken && expiresIn && +expiresIn < Date.now()) {
            const { data } = await authService.post('token', {
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
        const accessToken = storageService.getAccessToken()
        if (accessToken) {
            config.params = { ...config.params, auth: accessToken }
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

export default httpService
