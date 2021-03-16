<template>
	<view style="padding-top: 40upx;">
		<view class="inputArea" style="text-align: center;">
			<image class="logo-img" src="/static/logo.png"></image>
		</view>
		<view class="text-xl padding text-center">
			<text class="text-black text-bold">记账簿</text>
		</view>
		<view class="text-s padding text-center">
			<text class="text-gray">不做月光一族</text>
		</view>

		<view class="inputArea">
			<button class="login-button bg-gradual-orange" open-type="getUserInfo" @getuserinfo="goLogin">翻开记数簿</button>
		</view>
	</view>
</template>

<script>
	import {
		callCloudFunction
	} from '../../utils/public_util.js';
	let _self
	export default {
		data() {
			return {
				
			};
		},
		onLoad(){
			_self = this
		},
		methods:{
			goLogin() {
				_self.getUserInfo();
			},
			getUserInfo: () => {
				uni.showLoading({
					title: '正在授权登录中........'
				});
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							withCredentials: true,
							success: (infoRes) => {
								console.log(infoRes)
								// uni.switchTab({
								// 	url: '/pages/index/pages/index'
								// });
								callCloudFunction('get_openid', {js_code: loginRes.code}, (res) => {
									console.log(res)
									// uni.hideLoading();
									//获取到openid
									let openid = res.data.openid;
									let userInfo = infoRes.userInfo;
									userInfo.openid = openid;
									uni.setStorageSync('userInfo', userInfo);
									callCloudFunction('user_add', userInfo, (res) => {
			
									});
									console.log('用户信息:' + JSON.stringify(userInfo));
									uni.switchTab({
										url: '/pages/index/pages/index'
									});
								});	
							},
							fail: (fail) => {
								uni.hideLoading();
								uni.showToast({
									icon: "none",
									title: '翻开记数簿要允许授权'
								});
							}
						});
					},
					fail: (fail) => {
						uni.hideLoading();
						console.log(JSON.stringify(fail));
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.inputArea {
		padding: 30upx 10%;
	}
	.inputClass {
		border: 2px solid #ccc;
		border-radius: 44upx;
		outline: 0;
		width: 90%;
		padding: 16upx 30upx;
		background-color: #FFFFFF;
	}

	.logo-img {
		width: 100%;
		height: 550upx;
	}

	.login-button {
		/* background: #2fc25b; */
		color: #FFFFFF;
		border-radius: 54upx;
		font-size: 36upx;
		text-align: center;
		padding: 20upx;
	}
</style>
