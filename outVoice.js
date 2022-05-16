var result;
const changer = async (msg, res) => {
  const gTTS = require('gtts');
  var gtts = new gTTS(msg, 'en');
  const now = new Date().getTime();
  const change = await gtts.save(`./voices/${now}.mp3`, function (err, result) {
    if(err) { throw new Error(err) }
    console.log("date ",new Date().getTime());
    console.log('Success! Open file /tmp/hello.mp3 to hear result.');
    result = {url: `../voices/${now}.mp3`};
    console.log("rrr ",result);
    res.json(result)
  });
}

module.exports = {changer, result};