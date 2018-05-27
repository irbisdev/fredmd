var app = new Vue({
		el: '#projects',
		data: {
			server: '//api.fred.md',

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
				this.$http.get(this.server + '/examples/').then((response) => {
					if (!!response.body) {
						this.projects = response.body.data;

						this.selectedProject = 0;
						this.selectedPage = this.getProject().pages[0];

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
				return this.server + '/projects/' + this.getProject().slug + '/' + this.selectedPage + '.html';
			},

			canRender: function () {
				return this.selectedProject >= 0;
			}
		}
	}); 