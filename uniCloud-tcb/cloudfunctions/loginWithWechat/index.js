'use strict';
exports.main = async (event, context) => {
	const apiurl = 'https://api.weixin.qq.com/sns/jscode2session'
	const res = await uniCloud.httpclient.request(apiurl,{
		method:'GET',
		dataType:"json",
		data:{
			'grant_type' : 'authorization_code',
			'appid'	  : 'wxa0475b3f03c46ed0', //你自己小程序的appid
			'secret'  : 'e72a8762569ac0cb111b24f4fdc530a9', // 在小程序管理平台 -> 开发 -> 开发设置中
			'js_code' : event.js_code // wx.login 拿到的code
		}
	})
	return res
};
