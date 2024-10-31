import LocationTsType from './LocationTsType'

type ItemTsType = {
    itemId: number
    itemName: string
    description: string | null
    location: LocationTsType | null
}

export default ItemTsType
