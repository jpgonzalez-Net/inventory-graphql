import axios from 'axios'
import BASE_URL from './BASE_URL'

const fetchResponseByURL = (relativeURL: string) => {
    return axios
        .get(`${BASE_URL}${relativeURL}`)
        .then((res) => res.data)
        .catch((e) => {
            throw e
        })
}

export const fetchAllItems = () => {
    return fetchResponseByURL('/items').catch((e) => {
        if (e.status === 404) {
            throw new Error('No items could be found.')
        } else {
            throw new Error('There was an error searching for all the items.')
        }
    })
}

export const fetchItemById = (id: number) => {
    return fetchResponseByURL(`/items/${id}`).catch((e) => {
        if (e.status === 404) {
            throw new Error(`An item with id of ${id} could not be found.`)
        } else {
            throw new Error('There was an error finding your item.')
        }
    })
}

export const fetchAllLocations = () => {
    return fetchResponseByURL('/locations').catch((_) => {
        throw new Error('There was an error finding all locations')
    })
}
