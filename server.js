const express = require('express')
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const { getUsers } = require('./resolvers/query')
const { signup } = require('./resolvers/mutations')
const { PrismaClient }  = require('@prisma/client')


const app = new express()
const prisma = new PrismaClient()

const schema = buildSchema(fs.readFileSync(path.join(__dirname,'schema.graphql'), { encoding: 'utf-8'} ));

const resolvers = {
    getUsers,
    signup
}

app.use(morgan('dev'))

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    context: {
        prisma
    },
    graphiql: true,
   
}))


app.listen(8000, ()=> {
    console.log('Server listening in port 8000');
})