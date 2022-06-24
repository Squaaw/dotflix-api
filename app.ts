import express from 'express'
import * as bodyParser from "body-parser"
import { customersRoute } from './src/routes/CustomerRoutes'
import { dbConnection } from './src/db/MongoDBConnection'
import { invoicesRoute } from './src/routes/InvoiceRoutes'
import { config } from './src/config'
import { subscriptionsRoute } from './src/routes/SubscriptionRoutes'
import { moviesRoute } from './src/routes/MovieRoutes'

const app = express()
const urlPrefix = "/api"

dbConnection()

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(urlPrefix, customersRoute, invoicesRoute, subscriptionsRoute)
app.use(urlPrefix, moviesRoute)

app.listen(config.server.API_PORT, ()=> {
    console.log(`Server listening at http://localhost:${config.server.API_PORT}`)
})