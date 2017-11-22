var db = elasticlunr();
var keys = [];

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

var searchresults = new Vue({
	el: '#find_cont',
	data: {
		searchterm: ''
	},
	computed: {
		searchresults: function () {
			return db.search(this.searchterm);
		}
	}
});
