var app = new Vue({
		el: '#app',
		data: {
			server: 'https://api.fred.md',

			dataLoaded: false,
			projects: null,
			selectedProject: null,
			selectedPage: null
		},

		created: function () {
			this.init();
		},

		methods: {
			init: function () {
				this.loadProjects();
			},

			loadProjects: function () {
				this.$http.get(this.server + '/projects').then((response) => {
					if (!!response.body) {
						this.projects = response.body.data;

						this.selectedProject = -1;

						this.dataLoaded = true;
					}
				});
			},

			selectPage: function () {
				this.selectedPage = this.getProject().pages[0];
			},

			getProject: function () {
				return this.projects[this.selectedProject];
			},

			getPage: function () {
				return this.server + '/examples/' + this.getProject().slug + '/' + this.selectedPage;
			},

			canRender: function () {
				return this.selectedProject >= 0;
			}
		}
	}); 