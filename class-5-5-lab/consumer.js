const { Kafka } = require('kafkajs')
const algoliasearch = require("algoliasearch")

const algoliaClient = algoliasearch(

)

const index = algoliaClient.initIndex("users")

const kafka = new Kafka({
    brokers: ['pkc-ymrq7.us-east-2.aws.confluent.cloud:9092'],
    ssl: true,
    logLevel: 2,
    sasl: {
        mechanism: 'plain',

    }
})

const consumer = kafka.consumer({ groupId: 'default' })
const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'topic_1', fromBeginning: false })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const value = JSON.parse(message.value.toString())
            const user = { objectID: value.orderid, ...value };
            console.log({
                partition,
                offset: message.offset,
                value,
                user,
            });
            //const result = await index.saveObject(user, { autoGenerateObjectIDIfNotExist: false })
            //console.log(result);
        },
    })
}

run().catch(console.error)