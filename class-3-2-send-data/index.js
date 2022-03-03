require("dotenv").config()
const _ = require('lodash')
const algoliasearch = require("algoliasearch")
const { Client } = require('pg')

const REACT_APP_ALGOLIA_API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY
const REACT_APP_ALOGLIA_APP_ID = process.env.REACT_APP_ALOGLIA_APP_ID

const algoliaClient = algoliasearch(
  REACT_APP_ALOGLIA_APP_ID,
  REACT_APP_ALGOLIA_API_KEY
)
const pgClient = new Client({ database: 'postgres' })

const index = algoliaClient.initIndex("dev_TESTING")

const saveOne = async () => {  
  const people = [
    {
      name: 'Omar',
      email: 'omar@mail.com'
    },
    {
      name: 'Claudia',
      email: 'claudia@mail.com'
    }
  ]
  const result = await index.saveObject(people[1], { autoGenerateObjectIDIfNotExist: true })
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