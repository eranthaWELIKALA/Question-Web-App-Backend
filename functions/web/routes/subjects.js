const express = require("express");
const router = express.Router();
const firebase = require('./../firebase/firebase');

var db = firebase.firestore();

var subjectRef = db.collection("subjects");

router.get("/", (req, res, next) =>{
    console.log("Mtute-Subjects");
    let subjects = [];
    subjectRef.get().then(snapshot =>{
        snapshot.forEach(doc =>{
            subjects.push({id: doc.id, data: doc.data()});
        });                        
        res.status(200).json(subjects);
    }).catch(err =>{
        console.log('Error getting subject documents', err);
        res.status(500).json('Error getting subject documents', err);
    });
});

router.get("/:id", (req, res, next) =>{
    let id = req.params.id;
    console.log("Mtute-Subject " + id);
    subjectRef.doc(id).get().then(doc =>{    
        if(doc.data()==undefined){
            console.log("Not available");
            const error = new Error("There is no subject with " + id);
            error.status = 500;
            next(error);
        }
        else{
            res.status(200).json({id: doc.id, data: doc.data()});
        }     
    }).catch(err =>{
        res.status(500).json('Error getting subject document: '+ err);
    });
});

router.delete("/:id", (req, res, next) =>{
    let id = req.params.id;
    console.log("Mtute-Subject " + id);
    subjectRef.doc(id).delete().then(onfulfilled =>{
        res.status(200).json({data: onfulfilled, status: true})
    },
    onRejected =>{
        res.status(500).json({data: onRejected, status: false})
    }).catch(err =>{
        res.status(500).json('Error getting subject document: '+ err);
    });
});

router.post("/", (req, res, next) =>{
    subjectRef.add(req.body).then(onfulfilled => {
        console.log('Added subject document with ID: ', onfulfilled.id);
        res.status(201).json(onfulfilled.id);
      },
      onRejected =>{
        const error = new Error(onRejected);
        error.status = 500;
        next(error);
      });
});

module.exports = router;