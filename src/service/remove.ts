import axios from 'axios'
import BASE_URL from './BASE_URL'

export const removeItem = (itemId: number) => {
    return axios
        .delete(`${BASE_URL}/items/${itemId}`)
        .then((res) => res.data)
        .catch((e) => {
            if (e.status === 404) {
                throw new Error(
                    `An item with id of ${itemId} could not be found.`
                )
            } else {
                throw new Error('There was an error deleting your item.')
            }
        })
}
