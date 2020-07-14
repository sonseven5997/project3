const router = require('express').Router()
const path = require('path')
const Article = require('mongoose').model('articles')

router.get('/', (req, res, next)=> {
    Article.find().distinct('tagList').then(tags=> {
        return res.json({tags})
    }).catch(next)
})

router.get('/search',(req,res,next)=>{
    const {tag} = req.query
    Article.find({tagList: tag})
        .then(articles => {
            return res.json(articles)
        })
        .catch(next)
})

module.exports = router