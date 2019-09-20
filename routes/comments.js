const router = require('express').Router()
const Comments = require('../db/comments')


router.get('/', async (req, res, next) => {
    try{
        let comments = await Comments.findAll()
        comments = comments.map(c => c.dataValues)
        const replies = comments.filter(c => c.isReplyTo !== null)
        const rootComments = comments.filter(c => c.isReplyTo === null)
        const cache = {}
        replies.forEach(c => {
            if (!cache[c.isReplyTo]){
                cache[c.isReplyTo] = [c]
            }
            else {
                cache[c.isReplyTo].push(c)
            }
        })
        const response = rootComments.map(c => {
            if (cache[c.id]){
                c.replies = cache[c.id]
            }
            return c
        }).sort((a, b) => {
            return b.id - a.id;
        })
        console.log(response)
        res.send(response)
    } catch(error){
        console.log(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try{
        const comments = await Comments.destroy({where: {id: req.params.id}})
        res.send(comments)
    }catch(error){
        console.log(error)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const comments = await Comments.create(req.body)
        // console.log(comments)
        res.status(200).send(comments)
    } catch(error){
        console.log(error)
    }
})



module.exports = router