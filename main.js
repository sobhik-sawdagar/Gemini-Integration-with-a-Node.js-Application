const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.json());


const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//const prompt = "How can I remove any package installed using npm in Nodejs?";

const generate = async (input) => {
    try{
        const result = await model.generateContent(input);
        return result.response.text();
    }catch(err){
        console.error(err);
    }
};


app.get('/api/content', async (req,res) => { // Route to get the content
    try{
        const data = req.body.question; // Get the question from the request body
        const result = await generate(data); // Generate the content
        res.send({ // Send the response
            "Result": result // Send the result
        });
    }catch(err){
        console.error(err);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});
