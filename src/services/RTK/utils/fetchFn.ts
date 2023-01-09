import configFile from "../../../config";
import storageService from "../../localStorage.service";
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
    const response = await fetch(url + `?auth=${accessToken}`)
    return Promise.resolve(response)
}
export default fetchFn