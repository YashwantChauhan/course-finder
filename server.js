const express = require('express')
const { env } = require('process')
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const { getUsers } = require('./resolvers/query')
const { signup, login } = require('./resolvers/mutations')
const { PrismaClient } = require('@prisma/client')
const { getUserId } = require('./helpers/jwt-utils')


const app = new express()
const prisma = new PrismaClient()

const schema = buildSchema(fs.readFileSync(path.join(__dirname, 'schema.graphql'), { encoding: 'utf-8' }));

const resolvers = {
    getUsers,
    signup,
    login,
}

app.use(morgan('dev'))
app.use('/graphql', graphqlHTTP((req, res, graphQlParams) => {
    return {
        schema,
        rootValue: resolvers,
        context: {
            prisma,
            ...req,
            userId: req && req.headers ? getUserId(req.headers.authorization) : null
        },
        graphiql: {
            headerEditorEnabled: true
        },
    }
}))

const port = env.PORT || 8000

app.on('error', onerror)

function onerror(error) {
    console.error(error);
}

app.listen(port, () => {
    console.log(`Server listening in port ${port}`);
})