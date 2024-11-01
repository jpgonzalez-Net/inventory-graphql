import axios from 'axios'
import LocationTsType from '../assets/LocationTsType'
import BASE_URL from './BASE_URL'
import ItemTsType from '../assets/ItemTsType'

const createByUrl = (relativeURL: string, object: any) => {
    return axios
        .post(`${BASE_URL}${relativeURL}`)
        .then((res) => res.data)
        .catch((e) => {
            throw e
        })
}

export const createLocation = (location: LocationTsType) => {
    return createByUrl('/locations', location).catch((e) => {
        if (e.status === 400) {
            throw new Error(
                'The Location you are attempting to create is invalid.'
            )
        } else if (e.status === 409) {
            throw new Error(
                'The ID given for the Location conflicts with an already existing Location (locationId must be unique).'
            )
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
            if (e.status === 400) {
                return 'The Item you are attempting to create is invalid.'
            } else if (e.status === 409) {
                return 'The ID given for the Item conflicts with an already existing Item (itemId must be unique).'
            } else {
                return 'There was an error creating your Item.'
            }
        })
}
