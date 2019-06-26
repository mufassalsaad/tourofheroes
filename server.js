
const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
// const path = require('path');
var ObjectID = require('mongodb').ObjectID;

const port = process.env.PORT || 3000;
const app = express();

bodyParser.urlencoded({extended: true});
app.use(cors());
app.use(bodyParser.json({extended: true}));

var dbase;

MongoClient.connect('mongodb+srv://mufassal:p%4055w0rd@tourofheroes-pbgix.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true }, (err, client) => {
  if (err) 
  return console.log(err)
  else{
    console.log("Connected to MongoDB");
    };
  dbase = client.db("tourofheroes");
});
 

  app.post('/hero/add',  (req, res, next) => {
    let idnum = 0;
    
    dbase.collection("heroes").count({}, function(error, numOfDocs){
        if (error) throw error;

        // console.dir("numOfDocs: " + numOfDocs);
        // count = numOfDocs;
        // console.log("count is : " + count);
        idnum=numOfDocs;
        // db.close();
        // console.log(idnum)
        if ( idnum >0 )
        {
            idnum+=1;
        }
        else {
            idnum = 1;
        }

    // });
    // console.log(idnum)
    let hero = {
        id: idnum,
        name: req.body.name
      };
    

    dbase.collection("heroes").insertOne(hero,function(err, result){
        if(err){
            console.log(err);
        }
        else{
            res.status(200).json({'Hero': 'hero added successfully'});
        }
      });
    });

  }
  );


  app.get('/hero', (req, res, next) => {
    //   console.log('/hero', req);
    dbase.collection('heroes').find().toArray( (err, results) => {
      res.send(results)
    // res.status(200).json({'Hero': hero});
    });
  });

  app.get('/hero/:id', (req, res, next) => {
   
    let id = ObjectID(req.params.id);
    dbase.collection('heroes').find(id).toArray( (err, result) => {
      if(err) {
        res.json(err);
      }
        //   res.send(result);
        res.json(result);
    });
  });

  app.put('/hero/update/:id', (req, res, next) => {
    var id = {
      _id: new ObjectID(req.params.id)
    };
    dbase.collection("heroes").updateOne(id, 
        {$set:{name: req.body.name}}, (err, result) => {
      if(err) {
        throw err;
      }
    //   res.send('hero updated sucessfully');
    res.json('Hero Updated');
    });
  });


  app.delete('/hero/delete/:id', (req, res, next) => {
    //   console.log('/hero/delete/:id',req)
    let id = ObjectID(req.params.id);
    console.log(`deleteing ${id}`);
    dbase.collection('heroes').deleteOne({_id: id}, (err, result) => {
      if(err) {
        res.json(err);
      }

      res.json('Hero Deleted');
    });
  });

  app.listen(port, () => {
    console.log('app working on 3000')
  });

// });