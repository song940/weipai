const http = require('http');

const get = url => 
  new Promise(done => http.get(url, done));

const readStream = stream => {
  const buffer = [];
  return new Promise((resolve, reject) => {
    stream
      .on('error', reject)
      .on('data', chunk => buffer.push(chunk))
      .on('end', () => resolve(Buffer.concat(buffer)))
  });
};
/**
 * copy from https://gist.github.com/song940/df79bb9eec2ef700b443
 */
class WeiPai {
  users(){
    return Promise
    .resolve()
    .then(() => get('http://w1.weipai.cn/top_user?&count=100000&type=top_day'))
    .then(readStream)
    .then(JSON.parse)
    .then(data => data.user_list.map(post => post.user_id))
  }
  user(userId){
    return Promise
    .resolve()
    .then(() => get(`http://w1.weipai.cn/home_user?&user_id=${userId}`))
    .then(readStream)
    .then(JSON.parse)
  }
  pictures(url){
    return [ '', '.1','.2','.3' ].map(x => `${url}${x}.jpg`);
  }
  m3u8(url){
    return Promise
      .resolve()
      .then(() => get(`${url}.m3u8`))
      .then(readStream)
      .then(x => x.toString())
      .then(x => x.split('\n'))
      .then(x => x.filter(y => /^http/.test(y)))
  }
}

module.exports = WeiPai;