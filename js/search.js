var db = elasticlunr();
var keys = [];

/*
$.getJSON("https://spreadsheets.google.com/feeds/list/132YgRM71k6R00rForD-uQuGL3j7pE5mqayQzvdynY3M/od6/public/values?alt=json", function(data) {
	keys = Object.keys(data.feed.entry[0]);
	keys.forEach(function (k) {
		db.addField(k);
	});
	data.feed.entry.forEach(function(row, index, arr) {
		var newdoc = {};
		keys.filter( key => key.startsWith('gsx')).forEach(function(k) {
			newdoc[k] = (typeof row[k]['$t'] !== 'undefined') ? row[k]['$t'] : '';
			newdoc['id'] = index;
		});
		db.addDoc(newdoc);
	});
});
*/

/*
$.getJSON('data/materials.json', function(data) {
	console.log(data);
});*/

keys = Object.keys(materials[0]);
keys.forEach(function (k) {
	db.addField(k);
});
materials.forEach(function(row, index, arr) {
	row['id'] = index;
	db.addDoc(row);
});

Vue.component('find-cont', {
	template: '#find-template',
	data: function() {
		return {
			search_isanswer: false,
			searchresults: [],
			searchterm: '',
			search_rows: 1,
		}
	},
	methods: {
		clearsearch: function() {
			if ( this.search_isanswer ) {
				this.searchterm = '';
				this.search_isanswer = false;
		    	this.search_rows = 1;
			}
		},
		format_icon: function(format_str) {
			var iconstr = {
				"Article": 'article',
				"Guides": 'pic',
				"Video": 'video'
			}
			return iconstr[format_str] || 'article';
		},
		feedback_popup: function(doc) {
			this.$root.feedback_popup(doc);
		}
	},
	watch: {
		searchterm: function(val, oldval) {
			this.searchresults = db.search(val, {expand: true});
			if (val) {
				var textArea = this.$refs.search;
				var baseHeight = 74, rows;
				var self = this;
				setTimeout(function () {
				    rows = Math.ceil((textArea.scrollHeight - baseHeight) / 47);
			 		if (rows > 0) {
				        self.search_rows = rows;
				    }
				}, 10);
			}else {
				this.search_rows = 1;
			}
		}
	}
});
Vue.component('wizard-cont', {
	template: '#wizard-template',
	data: function () {
		return {
			asd: true
		}
	}
});
Vue.component('library-cont', {
	template: '#library-template',
	methods: {
		format_icon: function(format_str) {//FIXME remove duplicate in component
			var iconstr = {
				"Article": 'article',
				"Guides": 'pic',
				"Video": 'video'
			}
			return iconstr[format_str] || 'article';
		},
	},
	data: function () {
		return {
			materials: materials,
		}
	}
});

const router = new VueRouter({
	routes: [
		{ path: '/', component: { template: '' } },
		//{ path: '/find/:q/:item', component: 'find-cont', props: true},
		{ path: '/find/', component: 'find-cont'},
		{ path: '/wizard', component: 'wizard-cont' },
		{ path: '/library', component: 'library-cont' },
	]
})

//var url_searchterm = (new URL(location)).searchParams.get('q');
var vm = new Vue({
	router,
	el: 'main',
	data: {
		search_isanswer: false,
		questions: questions,
		active_question: 0,
		active_module: location.hash.slice(1),
		materials: materials,
		question_submitted: false,
		feedbackActive: false,
		popup_doc: {},
	},
	methods: {
		showanswer: function(question, answer) {
			this.search_isanswer = true;
			this.searchterm = question;
			$('#find_cont').find('p.answer:first').html(this.questions[this.active_question].answer);
			$('#find_btn').click();
			window.scroll({
	          top: $('.main_conts:first').offset().top + 60, 
	          left: 0, 
	          behavior: 'smooth' 
	        });
		},
		format_icon: function(format_str) {//FIXME remove duplicate in component
			var iconstr = {
				"Article": 'article',
				"Guides": 'pic',
				"Video": 'video'
			}
			return iconstr[format_str] || 'article';
		},
		question_submit: function() {
			this.question_submitted = true;
		},
		tag_click: function(tag_name) {
			this.searchterm = tag_name;
			if ( this.search_isanswer ) {
				this.search_isanswer = false;
			}
			$('#find_btn').click();
			window.scroll({
	          top: $('.main_conts:first').offset().top - 50, 
	          left: 0, 
	          behavior: 'smooth' 
	        });
		},
		feedback_popup: function(doc) {
			this.feedbackActive = !this.feedbackActive;
			this.popup_doc = doc;
		}
	},
});
