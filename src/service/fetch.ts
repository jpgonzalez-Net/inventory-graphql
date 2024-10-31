import axios from 'axios'
import BASE_URL from './BASE_URL'

const fetchResponseByURL = (relativeURL: string) => {
    return axios
        .get(`${BASE_URL}${relativeURL}`)
        .then((res) => res.data)
        .catch((e) => console.log(e))
}

export const fetchAllItems = () => {
    return fetchResponseByURL('/items')
}

export const fetchItemById = (id: number) => {
    return fetchResponseByURL(`/items/${id}`)
}

export const fetchAllLocations = () => {
    return fetchResponseByURL('/locations')
}
