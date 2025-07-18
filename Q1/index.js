const express=require('express');
const {nanoid}=require('nanoid');
const cors=require('cors');
const app=express();

app.use(cors());
app.use(express.json());

const db={};

app.post('/short',(req, res)=>{
  const {ourl}=req.body;

  if(!ourl){ 
    return res.status(400).json({ message:'Original URL is required'});
  }
  const sid=nanoid(6);
  db[sid]=ourl;
  res.json({sid});  
});

app.get('/:shortid',(req, res)=>{
  const {shortid} = req.params;  
  const ourl = db[shortid];

  if (ourl) {
    res.redirect(ourl);
  } else {
    res.status(404).json({message: 'Short URL not found'});
  }
});

app.listen(3000,()=>{
  console.log(`Running on http://localhost:3000`);
});
