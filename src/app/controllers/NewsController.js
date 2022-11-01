class NewsController {

    //get /news
    index(req,res) {
        res.render('news')
    }

    //get /new/:slug :slug là những giá trị động sau /news
    show(req,res){
        res.send('NEWS DETAIL....')
    }
}

module.exports = new NewsController