// const history = require('connect-history-api-fallback')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 5000
const root = `${__dirname}/dist`

app.use(express.static(root))
app.use(bodyParser.json())
// app.use(history())

// Колличество элементов на странице
const itemsOnPage = 5

app.get('/getList/:page', (req, res) => {
  const page = req.params.page
  const filePath = './dist/database/paymentListCopy.json'

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log(`Read file err: ${err}`)
    }

    data = JSON.parse(data)
    data = Object.entries(data)
    data = data.flat()[1]
    data = Object.fromEntries(
      getPages(data).slice((page - 1), page)
    )
    res.send(JSON.stringify(data))
  })
})

function getPages (data) {
  // Создаём первую пустую страницу
  const dataWithPages = [['Page1', []]]
  // Определяем количество элементов на последней странице
  let lastPageLength = 0

  for (const item of data) {
    // Если последняя страница не заполнена заполняем её, иначе заполняем новую
    if (lastPageLength < itemsOnPage) {
      dataWithPages[dataWithPages.length - 1][1].push(item)
    } else {
      const newPage = [`page${dataWithPages.length + 1}`, [item]]
      dataWithPages.push(newPage)
    }

    lastPageLength = dataWithPages[dataWithPages.length - 1][1].length
  }

  return dataWithPages
}

app.get('/getLength', (req, res) => {
  fs.readFile('./dist/database/paymentListCopy.json', 'utf8', (err, data) => {
    if (err) {
      console.log(`Get length err: ${err}`)
    }
    data = JSON.parse(data)
    data = Object.entries(data)
    data = data.flat()[1].length
    data = Math.ceil(data / itemsOnPage)
    data = JSON.stringify(data)
    res.send(data)
  })
})

// Добавленеие элемента списка
app.post('/addItem', (req, res) => {
  const filePath = './dist/database/paymentListCopy.json'
  let item = req.body

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log(`Read file err: ${err}`)
    }

    data = JSON.parse(data)
    data = Object.entries(data)

    // Определяем количество элементов
    const pagesLength = data.flat()[1].length

    // Определяем id последнего элемента списка
    const lastId = data.flat()[1][pagesLength - 1].id

    // Добавляем id к новому элементу списка
    item = { ...item, ...{ id: lastId + 1 } }

    console.log('item', item)

    data.flat()[1].push(item)

    data = Object.fromEntries(data)

    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if (err) {
        console.log(`Error write: ${err}`)
      }
      res.send(data)
    })
  })
})

// Удаление элемента из списка
app.post('/removeItem', (req, res) => {
  const filePath = './dist/database/paymentListCopy.json'
  const item = req.body

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log(`Read file err: ${err}`)
    }

    data = JSON.parse(data)
    data = Object.entries(data)

    data = data.map(([key, value]) => [key, value.filter((el) => el.id !== item.id)])

    data = Object.fromEntries(data)

    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if (err) {
        console.log(`Error write: ${err}`)
      }
      res.send(data)
    })
  })
})

// Редактирование элемента массива
app.post('/editItem', (req, res) => {
  const filePath = './dist/database/paymentListCopy.json'
  const item = req.body

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log(`Read file err: ${err}`)
    }

    data = JSON.parse(data)
    data = Object.entries(data)

    data = data.map(([key, value]) => [key, value.map(el => {
      if (el.id === item.id) {
        el = { ...el, ...item }
        return el
      } else {
        return el
      }
    })
    ])

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
