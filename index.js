const express = require("express")
const cors = require("cors")
require("dotenv").config()


const app = express()
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.status(200).json({
        "message": "Welcome to the API"
    })
})

async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/google/tapas-base-finetuned-wtq",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

app.post('/interference-call-shelljar', (req, res) =>  {
	// console.log({"inputs": {
	// 	"query": req.body["question"],
	// 	"table": req.body["table"]
	// }});
    query({"inputs": {
		"query": req.body["question"],
		"table": JSON.parse(req.body["table"])
	}}).then((response) => {
		// console.log(response);
    res.status(200).json(response)
});
    
})


app.listen(process.env.PORT, (err) => {
    console.log(`server listening to PORT https://localhost:3000`)
})