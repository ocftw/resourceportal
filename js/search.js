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
		search_isanswer: false
	},
	computed: {
		searchresults: function () {
			return db.search(this.searchterm, {expand: true});
		}
	},
	methods: {
		showanswer: function() {
			this.search_isanswer = true;
			this.searchterm = 'blabla';
			$('#find_btn').click();
			var top = $('#find_cont').offset().top;
			$('html').stop().animate({scrollTop: top}, 600, 'swing');
		}
	}
});
