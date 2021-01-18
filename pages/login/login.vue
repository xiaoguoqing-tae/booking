<template>
	<view>
		<button @tap="loginWithWechat">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		async onLoad(){
			await this.$uniCloud('user',{name:'tayeon'})
		},
		methods:{
			loginWithWechat(){
				 let _this = this
				    uni.login({
				      async success(res) {
				        let result = await _this.$uniCloud('loginWithWechat', {
				            js_code: res.code
				          })
						console.log(result)
				        // _this.form.openid = result.result.data.openid
				        // _this.login()
				      }
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
