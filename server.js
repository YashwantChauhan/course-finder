const express = require('express')
const { env } = require('process')
const { ApolloServer } = require('apollo-server-express')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const Query = require('./resolvers/query')
const Mutation = require('./resolvers/mutations')
const User = require('./resolvers/User')
const Friend = require('./resolvers/Friend')
const { PrismaClient } = require('@prisma/client')
const { getUserId } = require('./helpers/jwt-utils')
const dataRouter = require('./routers/data/data')
const app = new express()
const prisma = new PrismaClient()

app.use(morgan('dev'))
app.use(dataRouter)
async function main() {
    const apolloServer = new ApolloServer({
        typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8'),
        resolvers: {
            Query,
            Mutation,
            User,
            Friend
        },
        context: async ({ req }) => {
            return {
                prisma,
                userId: req && req.headers ? await getUserId(req.headers.authorization,prisma) : null
            }
        }
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({ app })

    const port = env.PORT || 8000
    app.on('error', onerror)
    function onerror(error) {
        console.error(error);
    }
    app.listen(port, () => {
        console.log(`Server listening in port ${port}`);
    })

}

main()