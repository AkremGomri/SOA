var result;
var result;
const changer = async (msg, res) => {
  const gTTS = require('gtts');
  var gtts = new gTTS(msg, 'en');
  const change = await gtts.save('./voices/Recording3'+ new Date().getTime()+ '.mp3', function (err, result) {
    if(err) { throw new Error(err) }
    console.log("date ",new Date().getTime());
    console.log('Success! Open file /tmp/hello.mp3 to hear result.');
    result = {url: '../voices/Recording3'+ new Date().getTime()+ '.mp3'};
    console.log("rrr ",result);
    res.json(result)
  });
}

module.exports = {changer, result};