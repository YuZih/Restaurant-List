// require packages used in the project
const express = require('express')
const app = express()
const port = 3000


// require express-handlebars here
const exphbs = require('express-handlebars')


// require json file here
const restaurantList = require('./restaurant.json')


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


// setting static files: Javascripts & CSS
app.use(express.static('public'))



// routes setting
// index page displaying
app.get('/', (req, res) => {
  // pass restaurants data into 'index' partial template
  res.render('index', {restaurants: restaurantList.results})
})

// show page displaying
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id //jason id type: number V.S id type past by route: string
  )
  res.render('show', { restaurant })
})

// search page displaying
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants, keyword: keyword })
})


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})