// const fallback = require('express-history-api-fallback')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 5000
const root = `${__dirname}/dist`

app.use(express.static(root))
app.use(bodyParser.json())
// app.use(fallback('index.html', { root }))

app.get('/database/:page', (req, res) => {
  const page = req.params.page
  fs.readFile('./dist/database/paymentList.json', 'utf8', (err, data) => {
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
  fs.readFile('./dist/database/paymentList.json', 'utf8', (err, data) => {
    if (err) {
      console.log(`Get length err: ${err}`)
    }
    data = JSON.parse(data)
    data = Object.entries(data).length
    data = JSON.stringify(data)
    res.send(data)
  })
})

app.post('/fetchAddToList', (req, res) => {
  const filePath = './dist/database/paymentList.json'
  let item = req.body

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log(`Read file err: ${err}`)
    }

    data = JSON.parse(data)
    data = Object.entries(data)

    // Определяем количество элементов на последней странице
    const lastPageLength = data[data.length - 1][1].length

    // Определяем id последнего элемента списка и добавляем следующий id к новому элементу
    const lastId = data[data.length - 1][1][lastPageLength - 1].id
    const newId = ['id', lastId + 1]

    // Добавляем id к новому элементу списка
    item = Object.entries(item)
    item.unshift(newId)
    item = Object.fromEntries(item)

    // Если последняя страница не заполнена заполняем её, иначе заполняем новую
    if (lastPageLength < 3) {
      data[data.length - 1][1].push(item)
    } else {
      const newPage = [`page${data.length + 1}`, [item]]
      data.push(newPage)
    }

    data = Object.fromEntries(data)

    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if (err) {
        console.log(`Error write: ${err}`)
      }
      res.send(data)
    })
  })
})

app.listen(port, (err) => {
  if (err) {
    console.log(`Oops: ${err}`)
  }
  console.log(`Server started at ${port} port`)
})
