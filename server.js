const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000

app.use(express.static(__dirname + '/dist'))
app.use(bodyParser.json())

app.get('/database/:page', (req, res) => {
  const page = req.params.page
  fs.readFile('./public/database/paymentList.json', 'utf8', (err, data) => {
    if (err) {
      console.log(`Oops: ${err}`)
    }
    data = JSON.parse(data)
    data = Object.fromEntries(
      Object.entries(data).slice((page - 1), page)
    )
    res.send(JSON.stringify(data))
  })
})

app.get('/lengthList', (req, res) => {
  fs.readFile('./public/database/paymentList.json', 'utf8', (err, data) => {
    if (err) {
      console.log(`Get length err: ${err}`)
    }
    data = JSON.parse(data)
    data = Object.entries(data).length
    data = JSON.stringify(data)
    res.send(data)
  })
})

// app.get('/cartlist', (req, res) => {
//     fs.readFile('./public/database/cartlist.json', 'utf8', (err, data) => {
//         if (err) {
//             console.log(`Oops: ${err}`);
//         }
//         res.send(data);
//     });
// });

// app.post('/cartlist', (req, res) => {
//   const filePath = './public/database/cartlist.json'
//   const data = req.body

//     fs.writeFile(filePath, JSON.stringify(data), (err) => {
//         if (err) {
//             console.log(`Oops: ${err}`);
//         }
//         res.send(data);
//     });
// });

app.listen(port, (err) => {
  if (err) {
    console.log(`Oops: ${err}`)
  }
  console.log(`Server started at ${port} port`)
})
