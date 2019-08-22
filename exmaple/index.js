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