/**
 * 公共模块
 */
module.exports = {
	/**
	 * 调用云函数
	 */
	callCloudFunction: (name, data, successFun, failFun) => {
		uni.showLoading({
			title: '加载中...'
		});
		uniCloud.callFunction({
			name: name,
			data: data,
			success: (res) => {
				console.log('云函数:' + name + '参数:' + JSON.stringify(data) + '调用成功返回:' + JSON.stringify(res.result))
				uni.hideLoading();
				console.log(res)
				if (res) {
					if (successFun != null)
						successFun(res.result);
				} else {
					if (failFun != null)
						failFun(res.result);
				}

			},
			fail: (fail) => {
				uni.showToast({
					icon: "none",
					title: '云函数调用失败',
					duration: 3000
				});
				console.log('云函数:' + name + '参数:' + JSON.stringify(data) + '调用失败返回:' + JSON.stringify(fail))

				uni.hideLoading();
				if (failFun != null)
					failFun(fail);
			}
		});
	},
	/**
	 * 获取当前用户信息
	 */
	getUserInfo: () => {
		let userInfo = uni.getStorageSync('userInfo');
		return userInfo;
	},
	/**
	 * 获取当前用户唯一标志
	 */
	getUserOpenid: () => {
		let userInfo = uni.getStorageSync('userInfo');
		if (userInfo != null)
			return userInfo.openid;
		return '';
	},
	change(data){
		var res=[]
		var newarr=[]
		var newarr1=[]
		for(var i=0;i<data.length;i++){
			var v=data[i].date1
			var n=res.indexOf(v);
			if(n==-1){
				res.push(v)
				newarr.push({
					'date':data[i].date1,
					data:[
						{
							'_id':data[i]._id,
							'mark':data[i].mark,
							'money':data[i].money,
							'text':data[i].text,
							'type':data[i].type,
							'url':data[i].url,
							'date':data[i].date1,
						}
					]				
				})
			}else{
				newarr[n].data.push({
					'_id':data[i]._id,
					'mark':data[i].mark,
					'money':data[i].money,
					'text':data[i].text,
					'type':data[i].type,
					'url':data[i].url,
					'date':data[i].date1,
				})
			}
		}
		return newarr
	},
	change1(data){
		var res=[]
		var newarr=[]
		var newarr1=[]
		for(var i=0;i<data.length;i++){
			var v=data[i].type
			var n=res.indexOf(v);
			if(n==-1){
				res.push(v)
				newarr.push({
					'type':data[i].type,
					data:[
						{
							'mark':data[i].mark,
							'money':data[i].money,
							'text':data[i].text,
							'url':data[i].url
						}
					]				
				})
			}else{
				newarr[n].data.push({
					'mark':data[i].mark,
					'money':data[i].money,
					'text':data[i].text,
					'url':data[i].url
				})
			}
		}
		return newarr
	}
}
