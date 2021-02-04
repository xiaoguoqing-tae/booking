<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "colorui/main.css"; 
	@import "colorui/icon.css";
	@import "colorui/animation.css";
	@import "static/iconfont.css";
	@import "uview-ui/index.scss";
</style>
