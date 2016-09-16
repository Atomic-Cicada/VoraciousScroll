var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
  username: process.env.WATSON_TONE_API_USERNAME,
  password: process.env.WATSON_TONE_API_PASSWORD,
  version_date: '2016-05-19'
});

var analyzeTone = function(req, res) {
    var text = req.query.text;
    tone_analyzer.tone({ text: text },
    function(err, tone) {
      if (err)
        console.log(err);
      else{
        var result = JSON.stringify(tone, null, 2);
        res.status(200).send(result);
      }
  });
};

module.exports = {
  analyzeTone: analyzeTone
}
