import configFile from "../config";

export const transformUrl = (resource: string) => {
    return configFile.REACT_APP_BACKEND === 'FIREBASE' ? `/${resource}.json` : `/${resource}`
}