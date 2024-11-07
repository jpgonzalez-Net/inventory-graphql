import axios from 'axios'
import LocationTsType from '../assets/LocationTsType'
import BASE_URL from './BASE_URL'
import ItemTsType from '../assets/ItemTsType'

const createByUrl = (relativeURL: string, object: any) => {
    return axios
        .post(`${BASE_URL}${relativeURL}`, object)
        .then((res) => res.data)
        .catch((e) => {
            throw e
        })
}

export const createLocation = (location: LocationTsType) => {
    return createByUrl('/locations', location).catch((e) => {
        console.error(`${e.status}: ${e}`)
        if (e.status === 400) {
            throw new Error('Location invalid.')
        } else if (e.status === 409) {
            throw new Error('The ID of the Location must be unique.')
        } else {
            throw new Error('There was an error creating your Location.')
        }
    })
}

export const createItem = (item: ItemTsType) => {
    return axios
        .post(`${BASE_URL}/items`, item)
        .then((res) => res.data)
        .catch((e) => {
            console.error(`${e.status}: ${e}`)
            if (e.status === 400) {
                throw new Error('Item invalid.')
            } else if (e.status === 409) {
                throw new Error('The ID of the Item must be unique.')
            } else {
                throw new Error('There was an error creating your Item.')
            }
        })
}
