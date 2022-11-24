import axios from "axios";
import config from '../config'

const httpService = axios.create({
    baseURL: config.REACT_APP_BASE_ENDPOINT
})

export default httpService
