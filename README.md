## weipai

> weipai

[![weipai](https://img.shields.io/npm/v/weipai.svg)](https://npmjs.org/weipai)

### Installation

```bash
$ npm install weipai
```

### Example

```js
const WeiPai = require('weipai');

(async () => {

  const weipai = new WeiPai();
  
  const users = await weipai.users();

  for (const userId of users) {
    const user = await weipai.user(userId);
    
    console.log('user', user);

    const posts = user.diary_list.reduce((result, diary) => {
      result = result.concat(diary.video_list);
      return result;
    }, []);
    
    for(const post of posts) {
      const { video_screenshot } = post;
      const url = video_screenshot.replace(/(\.\d)?\.jpg$/, '');
      const pictures = weipai.pictures(url);
      const playlist = weipai.m3u8(url);
      console.log(pictures, playlist);
    }
  }

})();
```

### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### MIT

This work is licensed under the [MIT license](./LICENSE).

---