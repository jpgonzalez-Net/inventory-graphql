import axios from 'axios'

const REST_PORT: string = '8080'
const BASE_URL: string = `http://localhost:${REST_PORT}`

const fetchResponseByURL = (relativeURL: string) => {
    return axios.get(`${BASE_URL}${relativeURL}`).then((res) => res.data)
}

export const fetchAllItems = () => {
    return fetchResponseByURL('/items')
}

export const fetchItemById = (id: number) => {
    return fetchResponseByURL(`/items/${id}`)
}
