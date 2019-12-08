const express = require("express");
const router = express.Router();
const firebase = require('./../firebase/firebase');

var db = firebase.firestore();

var paperRef = db.collection("papers");

router.get("/", (req, res, next) =>{
    console.log("Mtute-Papers");
    let papers = [];
    paperRef.get().then(snapshot =>{
        snapshot.forEach(doc =>{
            papers.push({id: doc.id, data: doc.data()});
        });                        
        res.status(200).json(papers);
    }).catch(err =>{
        console.log('Error getting paper documents', err);
        res.status(500).json('Error getting paper documents', err);
    });
});

router.get("/subject/:subjectId", (req, res, next) =>{
    console.log("Mtute-Papers");    
    res.status(200).json("Filter by Subject");
});

router.get("/instructor/:intructorId", (req, res, next) =>{
    console.log("Mtute-Papers");    
    res.status(200).json("Filter by Instructor");
});

router.get("/:id", (req, res, next) =>{
    let id = req.params.id;
    console.log("Mtute-Paper " + id);
    paperRef.doc(id).get().then(doc =>{    
        if(doc.data()==undefined){
            console.log("Not available");
            const error = new Error("There is no paper with " + id);
            error.status = 500;
            next(error);
        }
        else{
            res.status(200).json({id: doc.id, data: doc.data()});
        }     
    }).catch(err =>{
        res.status(500).json('Error getting paper document: '+ err);
    });
});

router.delete("/:id", (req, res, next) =>{
    let id = req.params.id;
    console.log("Mtute-Paper " + id);
    paperRef.doc(id).delete().then(onfulfilled =>{
        res.status(200).json({data: onfulfilled, status: true})
    },
    onRejected =>{
        res.status(500).json({data: onRejected, status: false})
    }).catch(err =>{
        res.status(500).json('Error getting paper document: '+ err);
    });
});

router.post("/", (req, res, next) =>{
    paperRef.add(req.body).then(onfulfilled => {
        console.log('Added paper document with ID: ', onfulfilled.id);
        res.status(201).json(onfulfilled.id);
      },
      onRejected =>{
        const error = new Error(onRejected);
        error.status = 500;
        next(error);
      });
});

module.exports = router;