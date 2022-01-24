var express = require('express')
var cors = require('cors')
var app = express()
const axios = require('axios')
const { request } = require('express')

app.use(cors())

const token = 'AAAAAAAAAAAAAAAAAAAAAI4OHgEAAAAAlbk0HSIAqcc3havrrU9j2NeAQ34%3DzJmzwHuQerd8JJ2TeuHfqwKgBt6bK4tk93w3ocBB2vPuKMF3cG';


app.get('/query/:searchTerm/:maxId?', function (req, res, next) {

    if(req.params.maxId){
        requestURL = 'https://api.twitter.com/1.1/search/tweets.json?q=' + escape(req.params.searchTerm) + '&max_id=' + req.params.maxId  + '&result_type=popular&count=5';
    } else {
        requestURL = 'https://api.twitter.com/1.1/search/tweets.json?q=' + escape(req.params.searchTerm) + '&result_type=popular&count=5'
    }

    axios
    .get(requestURL,
        { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(response => {
        res.json(response.data)
    })
    .catch(error => {
        res.send('error')
    })
  
})

app.listen(3001, function () {
  console.log('App listening on port 3001')
})