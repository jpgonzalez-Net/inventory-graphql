import axios from 'axios'
import LocationTsType from '../assets/LocationTsType'
import BASE_URL from './BASE_URL'
import ItemTsType from '../assets/ItemTsType'

export const createLocation = (location: LocationTsType) => {
    return axios.post(`${BASE_URL}/locations`, location).then((res) => res.data)
}

export const createItem = (item: ItemTsType) => {
    return axios.post(`${BASE_URL}/items`, item).then((res) => res.data)
}
