class Cache{
    constructor(){
        this.store = {}
        this.set = this.set.bind(this)
        this.get = this.get.bind(this)
        this.post = this.post.bind(this)
    }
    set(req, val){
        const key = req.protocol + '://' + req.headers.host + req.originalUrl
        this.store[key] = val
        console.log('this is the current store', this.store)
    }

    get(req){
        const key = req.protocol + '://' + req.headers.host + req.originalUrl
        return this.store[key] || null
    }
    delete(req){
        const key = req.protocol + '://' + req.headers.host + req.originalUrl
        delete this.store[key]
    }
    post(req, val){
        const key = req.protocol + '://' + req.headers.host + req.originalUrl
        this.store[key].push(val)
        console.log(this.store[key], 'from the cache post method')
        return this.store[key]
    }
}

const cache = new Cache()

module.exports = cache