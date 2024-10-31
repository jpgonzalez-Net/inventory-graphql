import axios from 'axios'
import BASE_URL from './BASE_URL'

export const removeItem = (itemId: number) => {
    return axios.delete(`${BASE_URL}/items/${itemId}`).then((res) => res.data)
}
