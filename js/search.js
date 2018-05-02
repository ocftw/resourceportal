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
	props: ['searchterm', 'search_rows'],
	computed: {
		searchresults: function () {
			return db.search(this.searchterm, {expand: true});
		}
	},
	data: function() {
		return {search_isanswer: false}
	}
});
const router = new VueRouter({
	routes: [
	{ path: '/find', component: 'find-cont' }]
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
		question_submitted: false
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
		main_btn_click: function(mod) {
			this.active_module = mod;
			window.history.pushState(null, '', '#'+mod);
		}
	},
	watch: {
		searchterm: function (val) {
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
