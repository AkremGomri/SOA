const changer = (msg, res) => {
  console.log("msg ", msg);
  const gTTS = require('gtts');
  var gtts = new gTTS(msg, 'en');

  const change =  gtts.save('./voices/Recording3.mp3', function (err, result) {
    if(err) { throw new Error(err) }
    console.log('Success! Open file /tmp/hello.mp3 to hear result.');
    
  });
}

module.exports = changer;