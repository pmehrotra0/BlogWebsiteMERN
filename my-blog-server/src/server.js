import express from 'express';
import audit from 'express-requests-logger'
import { db, connectToDB } from './db.js';

// const articlesInfo = [
//     {
//         name: 'Article 1',
//         upvotes: 0,
//         comments: []
//     },
//     {
//         name: 'Article 2',
//         upvotes: 0,
//         comments: []
//     },
//     {
//         name: 'Article 3',
//         upvotes: 0,
//         comments: []
//     },
//     {
//         name: 'Article 5',
//         upvotes: 0,
//         comments: []
//     }
// ]

const app = express();
app.use(express.json());
app.use(audit())
// console.log(articlesInfo);

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const article =await  db.collection('articles').findOne({name});

    if(article){
        res.json(article)
    }
    else{
        res.status(404).send('Article Name not found')
    }
})

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    await  db.collection('articles').updateOne({name}, {
        $inc: { upvotes: 1}
    })

    const article = await  db.collection('articles').findOne({name});

    if(article){
        res.json({upvotes: article.upvotes});
    }
    else{
        res.send('Article Not Found')
    }
    // const articleupdated = articlesInfo.map((item) => {
    //     console.log(item, item.upvotes +1 );
    //     if(item.name === name){
    //         return {
    //             ...item, upvotes: item.upvotes +1 
    //         }
    //     }
    //     else{
    //         return item
    //     }
    // })
    // console.log(articleupdated);
    
})

app.post('/api/articles/:name/comment', async(req, res) => {
    const { name } = req.params;
    const { comment, author } = req.body;
    await  db.collection('articles').updateOne({name}, {
        $push: { comments: {
            author: author,
            text: comment
        }}
    })

    const article = await  db.collection('articles').findOne({name});


    if(article){
        res.json(article.comments);
    }
    else{
        res.send('No Article Found!');
    }
})

app.get('/api/articles/:name/comments', (req, res) => {
    const { name } = req.params;
    const { comment, author } = req.body;
    const art = articlesInfo.find((item) => item.name === name);
    if(art){
        res.send(art);
    }
    else{
        res.send('No Article Found!');
    }
})

app.get('/hello', (req, res) => {
    res.send('hello!');
})

app.get('/hello/:name', (req, res) => {
    const { name } = req.params;
    res.send(`hello! ${name}`);
})

app.post('/hello', (req, res) =>{
    console.log(req.body);
    res.send(`hello! ${req.body.name}`);
})

connectToDB(() => {
    console.log('Connect to DB')
    app.listen('8000', () =>{
        console.log('server listening on port 8000');
    })
}) 
