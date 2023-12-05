const fs = require('fs');

const subscribeEvent = async (queue) => {
  const connection = await amqp.connect(process.env.RABITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: false });
  channel.consume(queue, (msg) => {
    const message = msg.content.toString();
    // Log the message to a file
    fs.appendFileSync('event_logs.txt', `Received message: ${message}\n`);
  }, { noAck: true });
}
module.exports = { subscribeEvent }


