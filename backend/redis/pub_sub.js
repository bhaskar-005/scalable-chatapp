const Redis = require("ioredis");

const redis_url = "redis://localhost:6379";
const sub = new Redis(redis_url);
const pub = new Redis(redis_url);

 const publish = async(channel, message)=>{
    await pub.publish(channel, JSON.stringify(message));
}

 const subscribe = (channel, callback )=>{
    sub.subscribe(channel, (err, count) => {
        if (err) {
          console.error("Failed to subscribe: %s", err.message);
        } else {
          console.log(
            `Subscribed successfully! This client is currently subscribed to ${count} channels.`
          );
        }
      });

      //now continuously listen for messages
      sub.on(channel, (chnl, message) => {
        if (channel === chnl) {
          callback(message);
        }
      });
}

module.exports = {publish , subscribe};