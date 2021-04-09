new Vue({
	el: '#app',
	data() {
		return {
			form: {
				username: '',
				password: '',
				min: '',
				max: '',
				return: ''
			}
		}
	},
	methods: {
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (!this.form.username) {
					this.openCenter("手机号不能为空", "warning")
					return false
				}
				if (!this.form.password) {
					this.openCenter("密码不能为空", "warning")
					return false
				}
				if (!this.form.min) {
					this.openCenter("最小步数不能为空", "warning")
					return false
				}
				if (!this.form.max) {
					this.openCenter("最大步数不能为空", "warning")
					return false
				}
				let formData = new FormData();
				formData.append('mob', this.form.username);
				formData.append('pas', this.form.password);
				formData.append('min', this.form.min);
				formData.append('max', this.form.max);
				let config = {
					headers: { 'Content-Type': 'multipart/form-data' }
				};
				axios.post("./yundong.php", formData, config).then(ret => {
					if (ret.data.code == 200) {
						this.openCenter(ret.data.message, "success")
					} else {
						this.openCenter(ret.data.message, "warning")
					}
				})
					.catch(error => {
						this.openCenter("保存失败", "warning")
					});
			});
		},
		openCenter(text, type) {
			this.$message({
				message: text,
				center: true,
				type: type
			})
		},
	}
})