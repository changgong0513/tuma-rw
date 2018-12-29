const API_URL = 'https://api.weixin.qq.com/sns/jscode2session'
const WECHAT_APPID = 'wxd38025d97750683f'
const WECHAT_APP_SECRET = 'cfe2a279682f347e2ce516bb8cdbf7ed'
const request = require('request')
const querystring = require('querystring')

// 云函数入口函数
exports.main = async (event, context) => {
  let { code } = event
  const data = {
    appid: WECHAT_APPID,
    secret: WECHAT_APP_SECRET,
    js_code: code,
    grant_type: 'authorization_code'
  }

  let url = API_URL + '?' + querystring.stringify(data);

  return new Promise((resolve, reject) => {
    request.get(url, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        reject(error)
      } else {
        try {
          const r = JSON.parse(body)
          resolve(r)
        } catch (e) {
          reject(e)
        }
      }
    })
  });
}