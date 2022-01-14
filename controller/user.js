const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('../basicapi-567f7-268f006dafe7.json');
const sendMail = require('../email');


initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();



getAllUser = async (req,res)=>{
    const snapshot = await db.collection('users').get();
    let data = []

    snapshot.forEach((doc) => {
    //   console.log(doc.id, '=>', doc.data());
      data.push(doc.data()) 
    });

    res.send(data)
 
}

createUser = async (req,res)=>{
    const mydata = await db.collection('users').doc(req.body.id);
    mydata.set({
        'first': req.body.first,
        'middle': req.body.middle,
        'last': req.body.last,
        'born': req.body.born,
        'email':req.body.email
    })
    await sendMail(req.body.email)
    res.send("Data created Successfull just check you mail ..!")
   
}


getUserById = async (req,res)=>{
    
    const oneData = await db.collection('users').doc(req.params.id).get();

    res.send(oneData.data())
}


updateUserById = async (req,res)=>{

    await db.collection('users').doc(req.params.id).update({
        'first': req.body.first,
        'middle': req.body.middle,
        'last': req.body.last,
        'born': req.body.born,
        'email':req.body.email || ""
    });

    res.send("Data Updated Successfully ..!")
} 


deleteUserById = async (req,res)=>{

    await db.collection('users').doc(req.params.id).delete(); 
    res.send("Delete Successfully...")
}


module.exports = {
    getAllUser,
    createUser,
    getUserById,
    deleteUserById,
    updateUserById
}