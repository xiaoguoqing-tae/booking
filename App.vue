<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.setNavigationBarColor({
			    frontColor: '#ffffff',
			    backgroundColor: this.themeColor.color,
			    animation: {
				duration: 400,
				timingFunc: 'easeIn'
			    }
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css"; 
	@import "colorui/icon.css";
	@import "colorui/animation.css";
</style>
