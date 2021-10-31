const myMongoose = require("mongoose")
try {
  myMongoose.connect(process.env.DBURL, {});
} catch (e) {
  console.log(e);
}

