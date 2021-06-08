const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '0b3e7b4c7e4c4e42b8a0c54b89660dc3'
});

const handleApiCall = (req, res) => {
	app.models
		.predict("f76196b43bbd45c99b4f3cd8e8b40a8a", req.body.input)	
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('Unable to work with API'))
}


const handleImage =  (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries => {
  		res.json((entries[0]))
  	})
  	.catch(err => res.status(400).json('Unable to retrieve entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}