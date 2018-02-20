const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//const cors = require('cors')({origin: true});

exports.answer = functions.https.onRequest((req, res) => {

  const original = req.query.text;

  return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
  	return res.status(200).send({status: "OK"})
  });
});


exports.game = functions.https.onRequest((req, res) => {
	//return cors(req, res, () => {
		var pid = req.params["0"]
		res.set('Access-Control-Allow-Origin', "*");
  		res.set('Access-Control-Allow-Methods', 'GET, POST');

		if (pid === "/") {
			return res.status(401).json({status: "Unauthorized"});
		}
		if (pid === "" ) {
			return res.status(404).json({status: "Not Found"});
		}
		pid = pid.split("/")[1]
		var gamesRef = admin.database().ref('games/' + pid);
		return gamesRef.once('value').then(function(snap) {
			if (snap.val() === null) {
				return res.status(404).json({status: "Not Found"});
			}
			return res.status(200).json({status: "OK", game: snap.val()});
	  	});
	//});

})
