import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql'
import {
    fetchAllItems,
    fetchAllLocations,
    fetchItemById,
} from './service/fetch'
import LocationTsType from './assets/LocationTsType'
import { createItem, createLocation } from './service/create'
import ItemTsType from './assets/ItemTsType'
import { removeItem } from './service/remove'

const LocationType = new GraphQLObjectType({
    name: 'Location',
    description: 'Some location',
    fields: () => ({
        locationId: {
            type: GraphQLInt,
        },
        state: {
            type: GraphQLString,
        },
        address: {
            type: GraphQLString,
        },
        phoneNumber: {
            type: GraphQLInt,
        },
    }),
})

const ItemType = new GraphQLObjectType({
    name: 'Item',
    description: 'Some item',
    fields: () => ({
        itemId: {
            type: GraphQLInt,
        },
        itemName: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        location: {
            type: LocationType,
        },
    }),
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'The root of all... queries',
    fields: () => ({
        allItems: {
            type: new GraphQLList(ItemType),
            resolve: fetchAllItems, // Fetch the index of people from the REST API,
        },
        item: {
            type: ItemType,
            args: {
                itemId: { type: GraphQLInt },
            },
            resolve: (_, args) => fetchItemById(args.itemId), // Fetch the person with ID `args.id`,
        },
        allLocations: {
            type: new GraphQLList(LocationType),
            resolve: fetchAllLocations,
        },
    }),
})

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addLocation: {
            type: LocationType,
            args: {
                locationId: { type: new GraphQLNonNull(GraphQLInt) },
                state: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: GraphQLString },
                phoneNumber: { type: GraphQLInt },
            },
            resolve: (_, args) => {
                const location: LocationTsType = {
                    locationId: args.locationId,
                    state: args.state,
                    address: args.address,
                    phoneNumber: args.phoneNumber,
                }

                return createLocation(location)
            },
        },
        addItem: {
            type: ItemType,
            args: {
                itemId: { type: new GraphQLNonNull(GraphQLInt) },
                itemName: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                locationId: { type: GraphQLInt },
            },
            resolve: (_, args) => {
                const location: LocationTsType = {
                    locationId: args.locationId | 1,
                    state: '',
                    address: null,
                    phoneNumber: null,
                }

                const item: ItemTsType = {
                    itemId: args.itemId,
                    itemName: args.itemName,
                    description: args.description,
                    location: args.locationId ? location : null,
                }

                return createItem(item)
            },
        },
        removeItem: {
            type: ItemType,
            args: {
                itemId: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: (_, args) => removeItem(args.itemId),
        },
    }),
})

const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
})
export default schema
