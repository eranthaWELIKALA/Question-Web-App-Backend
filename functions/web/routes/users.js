const express = require("express");
const router = express.Router();
const firebase = require('./../firebase/firebase');

var db = firebase.firestore();

var userRef = db.collection("users");

router.get("/", (req, res, next) =>{
    console.log("Mtute-Users");
    let users = [];
    userRef.get().then(snapshot =>{
        snapshot.forEach(doc =>{
            users.push({id: doc.id, data: doc.data()});
        });                        
        res.status(200).json(users);
    }).catch(err =>{
        console.log('Error getting user documents', err);
        res.status(500).json('Error getting user documents', err);
    });
});

router.get("/:id", (req, res, next) =>{
    let id = req.params.id;
    console.log("Mtute-User " + id);
    userRef.doc(id).get().then(doc =>{    
        if(doc.data()==undefined){
            console.log("Not available");
            const error = new Error("There is no user with " + id);
            error.status = 500;
            next(error);
        }
        else{
            res.status(200).json({id: doc.id, data: doc.data()});
        }     
    }).catch(err =>{
        res.status(500).json('Error getting user document: '+ err);
    });
});

router.delete("/:id", (req, res, next) =>{
    let id = req.params.id;
    console.log("Mtute-User " + id);
    userRef.doc(id).delete().then(onfulfilled =>{
        res.status(200).json({data: onfulfilled, status: true})
    },
    onRejected =>{
        res.status(500).json({data: onRejected, status: false})
    }).catch(err =>{
        res.status(500).json('Error getting user document: '+ err);
    });
});

router.post("/", (req, res, next) =>{
    userRef.add(req.body).then(onfulfilled => {
        console.log('Added user document with ID: ', onfulfilled.id);
        res.status(201).json(onfulfilled.id);
      },
      onRejected =>{
        const error = new Error(onRejected);
        error.status = 500;
        next(error);
      });
});

module.exports = router;