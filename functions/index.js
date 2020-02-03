const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
var serviceAccount = require("./permissions.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://deeplink-f3597.firebaseio.com"
  });
var db = admin.firestore();



app.use(cors({ origin: true }));


//app.get('/device-id', (req,res) => {
    // (async () => {
    //     try {
    //         let query = db.collection('def_link');
    //         let response = [];
    //         await query.get().then(querySnapshot => {
    //         let docs = querySnapshot.docs;
    //         for (let doc of docs) {
    //             const selectedItem = {
    //                 id: doc.id,
    //                 item: doc.data().device_id
    //             };
    //             response.push(selectedItem);
    //             }
    //         });

           
    //         return res.status(200).send(response);
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).send(error);
    //     }
    //     })(); 


   
    // db.collection('def_link').get().then((snapshot) =>{
    //     let response = [];
    //     snapshot.docs.forEach(doc=>{
           
    //       const selectedItem = 
    //             {
    //                   id: doc.id,
    //                    item: doc.data().device_id
    //            }

    //      response.push(selectedItem)  ; 
    //     })

    //    return res.status(200).send(response); 
       
    // }).catch( (error) => {
    //     console.log(error);
    //     return res.status(500).send(error);
    // })
    


    app.get('/device-id', async (req,res) => {
         const deviceIds = await db.collection('def_link').get();
         const responses = [];

         //QuerySnapshot vs  QueryDocumentSnapshot
         //https://stackoverflow.com/questions/49859954/firestore-difference-between-documentsnapshot-and-querydocumentsnapshot
      
console.log(deviceIds);    
console.log(deviceIds.docs);

         deviceIds.docs.forEach(
            (doc) => {
                responses.push({
                    id: doc.id,
                    data: doc.data().device_id
                });
            }
        );
      
            
         return res.status(200).send(responses);


   // return res.status(200).send('Hello World');
  });
  
  exports.api  = functions.https.onRequest(app);