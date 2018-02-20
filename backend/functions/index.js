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

cors = (res) => {
	res.set('Access-Control-Allow-Origin', "*");
	res.set('Access-Control-Allow-Methods', 'GET, POST');
}

exports.stats  = functions.https.onRequest((req, res) => {
	cors(res);

	var params = req.params["0"].split("/")
	var pin = params[1];

	var questionRef = admin.database().ref('games/' + pin + "/questions");

	return questionRef.once('value').then(function(snap) {
		if (snap.val() === null) {
			return res.status(404).json({status: "Not Found"});
		}
		
		var resp = {};

		for (var q in snap.val()){
			var question = snap.val()[q];
			var correctAnswer = question.correctAnswerIdx;
			for (var ua in question.user_answers){
				var userAnswer = question.user_answers[ua];
				var user = userAnswer.user.email;

				if (!resp[user]){
					resp[user] = 0;
				}

				if(userAnswer.answer === correctAnswer){
					resp[user]++;
				}
			}
		}

		return res.status(200).send({status: "OK", results: resp})
  	});


	
});

exports.answer = functions.https.onRequest((req, res) => {
	cors(res);

	var pin = req.body.pin;
	var qid = req.body.qid;
	var aid = req.body.aid;
	var user = req.body.user;

	var questionRef = admin.database().ref('games/' + pin + "/questions/" + qid);

	return questionRef.once('value').then(function(snap) {
		if (snap.val() === null) {
			return res.status(404).json({status: "Not Found"});
		}
		var answer = {user:user, answer: aid};
		return admin.database().ref('games/' + pin + "/questions/" + qid + "/user_answers").push(answer).then((snapshot) => {
		  	return res.status(200).send({status: "OK"})
		});

		//return res.status(200).json({status: "OK", question: snap.val()});
  	});


});

exports.game = functions.https.onRequest((req, res) => {
	cors(res);

	var pid = req.params["0"]
	

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

});
