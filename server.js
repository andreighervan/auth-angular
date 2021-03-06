const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const PORT=process.env.PORT || 3000;

const api=require('./routes/api')
const app=express()
app.use(cors());
app.use(express.static(__dirname + '/ngApp/dist'));

app.use(bodyParser.json())

app.use('/api',api);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/ngApp/dist/index.html'))
})

 app.listen(PORT, ()=>{
     console.log('Server running on localhst '+PORT)
 })