var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
  username: '54c0d796-0b27-49cf-8965-c84d276ac1ac',
  password: 'RVA7DgJDKWoo',
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
        // console.log(result);
        res.status(200).send(result);
      }
  });
};

module.exports = {
  analyzeTone: analyzeTone
}
