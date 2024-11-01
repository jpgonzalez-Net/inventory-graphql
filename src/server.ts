import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema'
import cors from 'cors'

const server = express()

server.use(
    cors({
        origin: true,
        credentials: true,
        methods: '*',
        allowedHeaders:
            'Content-Type,Accept,Authorization,Access-Control-Allow-Origin',
    })
)

server.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    })
)

export default server
