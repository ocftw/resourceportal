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
var vm = new Vue({
	el: 'main',
	data: {
		searchterm: '',
		search_isanswer: false,
		questions: questions,
		active_question: 0,
		active_module: '',
		materials: materials
	},
	computed: {
		searchresults: function () {
			return db.search(this.searchterm, {expand: true});
		}
	},
	methods: {
		showanswer: function(question, answer) {
			this.search_isanswer = true;
			this.searchterm = question;
			$('#find_btn').click();
			this.$refs.main_conts.scrollIntoView({block:'nearest',behavior: 'smooth'})
		},
		clearsearch: function() {
			if ( this.search_isanswer ) {
				this.searchterm = '';
				this.search_isanswer = false;
			}
		},
		format_icon: function(format_str) {
			var iconstr = {
				"Article": 'article',
				"Article with pictures": 'pic',
				"Video": 'video'
			}
			return iconstr[format_str] || 'article';
		}
	}
});
