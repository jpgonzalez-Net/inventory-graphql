import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql'
import { fetchAllItems, fetchItemById } from './service/fetch'

const LocationType = new GraphQLObjectType({
    name: 'Location',
    description: 'Some location',
    fields: () => ({
        id: {
            type: GraphQLInt,
            resolve: (location) => location.locationId,
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
        id: {
            type: GraphQLInt,
            resolve: (item) => item.itemId,
        },
        itemName: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        // location: {
        //     type: LocationType,
        // },
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
        Item: {
            type: ItemType,
            args: {
                id: { type: GraphQLInt },
            },
            resolve: (root, args) => fetchItemById(args.id), // Fetch the person with ID `args.id`,
        },
    }),
})

const schema = new GraphQLSchema({
    query: QueryType,
})
export default schema
