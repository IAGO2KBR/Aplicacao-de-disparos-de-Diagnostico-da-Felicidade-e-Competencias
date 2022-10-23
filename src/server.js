const axios = require('axios');

const express = require("express");

const app = express()

const instance = axios.create({
    baseURL:"https://rest.cleverreach.com", 
    headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IjIwMTYifQ.eyJpc3MiOiJyZXN0LmNsZXZlcnJlYWNoLmNvbSIsImlhdCI6MTY2NTg4MDA0NCwiZXhwIjoxNjY4NDcyMDQ0LCJjbGllbnRfaWQiOjMxNjAzOSwic2hhcmQiOiJzaGFyZDE0Iiwiem9uZSI6NCwidXNlcl9pZCI6MCwibG9naW4iOiJvYXV0aC1sUEZxekgzY1ZKIiwicm9sZSI6InVzZXIiLCJzY29wZXMiOiJvYV9iYXNpYyBvYV9yZWNlaXZlcnMgb2FfcmVwb3J0cyBvYV9mb3JtcyBvYV9tYWlsaW5ncyBvYV9zc2wiLCJpbmRlbnRpZmllciI6InN5c3RlbSIsImNhbGxlciI6NX0.SqrZ7fFfJWmQ4ehLdLYJnFT29JE24_dsmugurq00uJg'
}})

app.use(express.json())
app.get('/', async (req, res)=>{

    const listasDeEmails = req.body.emails

    await listasDeEmails.map(email => {
        
        instance.get(`/v3/groups.json/519014/receivers/${email}`)
        .then(async response=>{
            response.data.tags.push(req.body.tag)
             
            try{
            await instance.put(`/v3/groups.json/519014/receivers/${response.data.id}`,response.data)
            } catch(error){
                console.log(error.response.data)
                
               
            }

        })
        .catch(error=>{
            console.log(error.response.data,email)
            
            }
        )
    })

    return res.status(200).json()  
})



app.listen(3000,()=>console.log("Server is running"));
