var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const fetch = require('node-fetch');
var nodemailer = require('nodemailer');

app.get('/', function (req, res) {
  res.send('<h1>Hello world</h1>');

});
const sendEmail = (email, mailOptions) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'stakingalert@gmail.com', // email
      pass: '', //SET MDP 
    }
  });


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error.message);
    }
    console.info('success send email to ', email);
  });
}

const formatDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://stake:stake@cluster0-phjhw.mongodb.net/test?retryWrites=true&w=majority';

const client = new MongoClient(url, { useNewUrlParser: true });

io.on('connection', function (socket) {
  client.connect(err => {
  console.log("CONNECTION ")
  socket.on('sendAddress', (data) => {
    
      var doc = {
        email: data.email, addr: data.addr, idTx: -1, heure: formatDate(new Date()),
      };
      if (!err)
        console.log("success")
      const collection = client.db("test").collection("users");
      collection.insertOne(doc, function (err, res) {
        if (err) throw err;
        console.log("Document inserted ", doc);
        let mailOptions = {
          from: 'stakingAlert',
          to: data.email,
          subject: 'Alert Reward Tezos',
          text: "You register ",
        };
        sendEmail(data.email, mailOptions);
      })
    });
 
  socket.on('deleteMe', (data) => {

      var myquery = { addr: data.addr, email: data.email };
      const collection = client.db("test").collection("users");
      collection.deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("Document deleted ", myquery);
        let mailOptions = {
          from: 'stakingAlert',
          to: data.email,
          subject: 'Alert Reward Tezos',
          text: "You Deleted your account ",
        };
        sendEmail(data.email, mailOptions);
      })
  })
})
});

const fetchDataApi = async (api, info) => {

  try {
    const response = await fetch(api + info);
    const json = await response.json();
    return json;
  } catch (error) {
    //console.error("Erreur fetch data");
  }
  fetch(`${api}` + `${info}`)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(err => { })
}

 const findOne = async() => {

  const client = await MongoClient.connect(url, { useNewUrlParser: true })
    .catch(err => { console.log(err); });
  if (!client) {
    return;
  }
  try {
    const db = client.db("test");
    let collection = db.collection('users');
    let res = await collection.find().toArray();
    return res;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

 const insertOne = async (tabCollection, heure) => {

  const client = await MongoClient.connect(url, { useNewUrlParser: true })
    .catch(err => { console.log(err); });

  if (!client) {
    return;
  }
  try {
    const db = client.db("test");
    var myquery = { addr: tabCollection.addr };
    var newvalues = { $set: { heure: heure } };
    let collection = db.collection("users");
    let res = await collection.updateOne(myquery, newvalues)
  } catch (err) {

    console.log(err);
  } finally {

    client.close();
  }
}

const insertOne2 = async (tabCollection, alias, newAddrDeleg) => {

  const client = await MongoClient.connect(url, { useNewUrlParser: true })
    .catch(err => { console.log(err); });

  if (!client) {
    return;
  }
  try {
    const db = client.db("test");
    var myquery = { addr: tabCollection.addr };
    var newvalues = { $set: { delegName: alias, delegAddr: newAddrDeleg } };
    let collection = db.collection("users");
    let res = await collection.updateOne(myquery, newvalues)
  } catch (err) {

    console.log(err);
  } finally {

    client.close();
  }
}

 const insertOne3 = async (tabCollection, reponseApi) => {

  const client = await MongoClient.connect(url, { useNewUrlParser: true })
    .catch(err => { console.log(err); });

  if (!client) {
    return;
  }
  try {

    const db = client.db("test");
    var myquery = { addr: tabCollection.addr };
    var newvalues = { $set: { idTx: reponseApi.id } };
    let collection = db.collection("users");
    await collection.updateOne(myquery, newvalues)
  } catch (err) {

    console.log(err);
  } finally {

    client.close();
  }
}



const Loop = async (rep, delegAddr) => {
  for (let y = 0; y < rep.length; y++) {

    const r = await fetchDataApi('https://api.tzkt.io/v1', `/Accounts/${rep[y].target.address}/metadata`)
    if (r && r.owner === delegAddr) {
      return rep[y].target.address;
    }
  }
}

setInterval(async function () {
  let dateActual = formatDate(new Date());
  const tabCollection = await findOne()

  for (let i = 0; i < tabCollection.length; i++) {
    const rep = await fetchDataApi('https://api.tzkt.io/v1', `/Accounts/${tabCollection[i].addr}`);
    if (rep.delegate)
      insertOne2(tabCollection[i], rep.delegate.alias, rep.delegate.address)
    const re = await fetchDataApi('https://api.tzkt.io/v1', `/Accounts/${tabCollection[i].addr}/operations?type=transaction`)
    const repp = await fetchDataApi('https://api.tzkt.io/v1', `/Accounts/${tabCollection[i].delegAddr}/operations?type=transaction`)
    const res = await Loop(repp, tabCollection[i].delegAddr)
    for (let y = 0; y < re.length; y++) {
      if (dateActual !== tabCollection[i].heure) {
        await insertOne(tabCollection[i], dateActual)
      }
      let compareAddr;
      if (res !== undefined)
        compareAddr = res
      else
        compareAddr = tabCollection[i].delegAddr
      if (re[y].sender.address === compareAddr) {
        if (formatDate(re[y].timestamp) === dateActual && re[y].id !== tabCollection[i].idTx) {
          await insertOne3(tabCollection[i], re[y])
          let mailOptions = {
            from: 'stakingAlert',
            to: tabCollection[i].email,
            subject: 'Alert Reward Tezos',
            text: "You receive " + re[y].amount + " From " + tabCollection[i].delegName + " at " + re[y].timestamp
          };
          sendEmail(tabCollection[i].email, mailOptions)
        }
      }
    }
  }
}, 10000);

http.listen(3000, function () {
  console.log('listening on *:3000');
});
