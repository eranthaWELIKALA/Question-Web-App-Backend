const express = require("express");
const router = express.Router();
const firebase = require('./../firebase/firebase');

var db = firebase.firestore();

var questionRef = db.collection("questions");

router.get("/", (req, res, next) =>{
    console.log("Mtute-Questions");
    let questions = [];
    questionRef.get().then(snapshot =>{
        snapshot.forEach(doc =>{
            questions.push({id: doc.id, data: doc.data()});
        });                        
        res.status(200).json(questions);
    }).catch(err =>{
        res.status(500).json('Error getting question documents by Paper Id: ', err);
    });
});

router.get("/paper/:paperId", (req, res, next) =>{    
    console.log("Mtute-Questions Filter By Paper Id");
    let paperId = req.params.paperId;
    let questions = [];
    questionRef.where('paper', "==", paperId).get().then(snapshot =>{
        snapshot.forEach(doc =>{
            questions.push({id: doc.id, data: doc.data()});
        });                        
        res.status(200).json(questions);   
    }).catch(err =>{
        res.status(500).json('Error getting question document by Paper Id: '+ err);
    });
});

router.get("/:id", (req, res, next) =>{
    let id = req.params.id;
    console.log("Mtute-Question " + id);
    questionRef.doc(id).get().then(doc =>{    
        if(doc.data()==undefined){
            console.log("Not available");
            const error = new Error("There is no question with " + id);
            error.status = 500;
            next(error);
        }
        else{
            res.status(200).json({id: doc.id, data: doc.data()});
        }     
    }).catch(err =>{
        res.status(500).json('Error getting question document: '+ err);
    });
});

router.delete("/:id", (req, res, next) =>{
    let id = req.params.id;
    console.log("Mtute-Question " + id);
    questionRef.doc(id).delete().then(onfulfilled =>{
        res.status(200).json({data: onfulfilled, status: true})
    },
    onRejected =>{
        res.status(500).json({data: onRejected, status: false})
    }).catch(err =>{
        res.status(500).json('Error getting question document: '+ err);
    });
});

router.post("/", (req, res, next) =>{
    questionRef.add(req.body).then(onfulfilled => {
        console.log('Added question document with ID: ', onfulfilled.id);
        res.status(201).json(onfulfilled.id);
      },
      onRejected =>{
        const error = new Error(onRejected);
        error.status = 500;
        next(error);
      });
});

module.exports = router;