require("dotenv").config()
const _ = require('lodash')
const algoliasearch = require("algoliasearch")
const { Client } = require('pg')

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID
const ALGOLIA_APP_KEY = process.env.ALGOLIA_APP_KEY

const algoliaClient = algoliasearch(
  ALGOLIA_APP_ID,
  ALGOLIA_APP_KEY
)
const pgClient = new Client({ database: 'postgres' })

const index = algoliaClient.initIndex("dev_TESTING")

const saveOne = async () => {  
  const employee = {"id":2,"firstName":"Rhoda","lastName":"Trevarthen","email":"rtrevarthen1@google.co.jp","gender":"Male","ipAddress":"130.62.87.233","company":"Tagfeed","salaryCurrency":"BRL","salary":9908.96}
  const result = await index.saveObject(employee, { autoGenerateObjectIDIfNotExist: true })
  console.log(result)  
}

const saveMultiple = async () => {
  const employees = require('./employees.json')
  result = await index.saveObjects(employees, { autoGenerateObjectIDIfNotExist: true })     
}

const saveFromDB = async () => {
  pgClient.connect()
  const res = await pgClient.query('SELECT * FROM EMPLOYEE_small')
  index.saveObjects(res.rows, { autoGenerateObjectIDIfNotExist: true })
  pgClient.end()
}

const saveFromDBUsingChunks = async () => {
  pgClient.connect()
  const res = await pgClient.query('SELECT * FROM EMPLOYEE')
  const chunks = _.chunk(res.rows, 1000)  
  chunks.forEach(chunk => index.saveObjects(chunk, { autoGenerateObjectIDIfNotExist: true }))  
  pgClient.end()
}

saveFromDBUsingChunks().catch(err => console.log(err))