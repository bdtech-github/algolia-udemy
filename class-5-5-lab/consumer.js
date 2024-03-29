const { Kafka } = require('kafkajs');
const algoliasearch = require('algoliasearch');
const { difference } = require('./util');
require('dotenv').config();

const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
const index = algoliaClient.initIndex(process.env.ALGOLIA_INDEX);

const kafka = new Kafka({
    brokers: [process.env.KAFKA_BROKER],
    ssl: true,
    logLevel: 2,
    sasl: {
        mechanism: 'plain',
        username: process.env.KAFKA_USERNAME,
        password:process.env.KAFKA_PASSWORD
    }
});
const consumer = kafka.consumer({ groupId: 'default' });

const run = async () => {
    // CONECTARSE AL SERVIDOR DE KAFKA
    await consumer.connect();

    // SUSCRIBIRSE A UN TOPICO
    await consumer.subscribe({ topic: process.env.KAFKA_TOPIC, fromBeginning: false });

    console.log('Consumer running...')
    // INICIAR EL CONSUMIDOR
    consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            const value = JSON.parse(message.value.toString());
            console.log({
                partition,
                offset: message.offset,
                value,
            });

            let result;
            if (value.after === null) {
                // DELETE FROM users WHERE id = 'ae147ae1-47ae-4800-8000-000000000098';
                console.log('DELETE...')
                result = await index.deleteObject(value.before.id);
            } else if (value.before === null) {
                // INSERT INTO users VALUES ('ae147ae1-47ae-4800-8000-000000000098', 'Bogota', 'Diego Prieto', 'Calle 123', '45678934');
                console.log('INSERT...')
                const user = { objectID: value.after.id, ...value.after, createdTime: new Date(), updateTime: null };
                result = await index.saveObject(user, { autoGenerateObjectIDIfNotExist: false });
            } else {
                // UPDATE users SET address = 'calle 4567' WHERE id = 'ae147ae1-47ae-4800-8000-000000000098';
                console.log('UPDATE...')
                const diff = difference(value.before, value.after);
                console.log(diff)
                const user = { objectID: value.after.id, ...diff, updateTime: new Date() };
                result = await index.partialUpdateObject(user, { createIfNotExists: true });
            }

            console.log(result);
        }
    })

};

run().catch(console.error)
