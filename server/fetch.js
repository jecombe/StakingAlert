const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://stake:stake@cluster0-phjhw.mongodb.net/test?retryWrites=true&w=majority';

const client = new MongoClient(url, { useNewUrlParser: true });



/*client.connect(err => {
  var doc = {
    email: "TEST", addr: "TESTAddr", idTx: -1, heure: new Date(),
  };
  if (!err)
    console.log("success")
  const collection = client.db("test").collection("users");
  collection.insertOne(doc, function (err, res) {
    if (err) throw err;
    console.log("Document inserted", doc);
  })
  client.close();
});
*/
/*client.connect(err => {

  var myquery = { addr: "TESTAddr", email: "TEST" };
  const collection = client.db("test").collection("users");
  collection.deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted", obj);
    client.close();
  })
})
*/

client.connect(err => {
  var doc = {
    email: "TEST", addr: "TESTAddr", idTx: -1, heure: new Date(),
  };
  if (!err)
    console.log("success")
  const collection = client.db("test").collection("users");
  collection.insertOne(doc, function (err, res) {
    if (err) throw err;
    console.log("Document inserted");
  })

  var myquery = { addr: "TESTAddr", email: "TEST" };
  collection.deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    client.close();
  })
})
