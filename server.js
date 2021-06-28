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

// Получение эментов страницы с сортировкой
app.get('/getList', (req, res) => {
  const { sortBy, sortDesc, page, itemsPerPage } = req.query
  const filePath = './dist/database/paymentList.json'

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log(`Read file err: ${err}`)
    }

    data = JSON.parse(data)
    data = Object.entries(data)
    data = data.flat()[1]

    if (sortBy.length > 0 && sortDesc.length > 0) {
      data = data.sort((a, b) => {
        const sortA = a[sortBy]
        const sortB = b[sortBy]

        if (sortDesc === 'true') {
          if (sortA < sortB) return 1
          if (sortA > sortB) return -1
          return 0
        } else {
          if (sortA < sortB) return -1
          if (sortA > sortB) return 1
          return 0
        }
      })
    }

    if (itemsPerPage > 0) {
      data = data.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    }

    res.send(JSON.stringify(data))
  })
})

// Получение длины списка
app.get('/getLength', (req, res) => {
  fs.readFile('./dist/database/paymentList.json', 'utf8', (err, data) => {
    if (err) {
      console.log(`Get length err: ${err}`)
    }
    data = JSON.parse(data)
    data = Object.entries(data)
    data = data.flat()[1].length
    data = JSON.stringify(data)
    res.send(data)
  })
})

// Получение данных для графика
app.get('/getChartData', (req, res) => {
  fs.readFile('./dist/database/paymentList.json', 'utf8', (err, data) => {
    if (err) {
      console.log(`Get chart data err: ${err}`)
    }
    data = JSON.parse(data)
    data = Object.entries(data)
    data = data.flat()[1]

    const uniqueCategory = []

    let sumValue = 0

    const resData = []

    for (const current of data) {
      if (!uniqueCategory.includes(current.category)) {
        uniqueCategory.push(current.category)

        sumValue = data.filter(item => item.category === current.category).reduce((sum, cur) => {
          return sum + cur.value
        }, 0)

        resData.push({ labels: current.category, datasets: sumValue })
      }
    }

    res.send(resData)
  })
})

// Добавленеие элемента списка
app.post('/addItem', (req, res) => {
  const filePath = './dist/database/paymentList.json'
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
  const filePath = './dist/database/paymentList.json'
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

// Редактирование элемента списка
app.post('/editItem', (req, res) => {
  const filePath = './dist/database/paymentList.json'
  const item = req.body
  console.log(item)

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
