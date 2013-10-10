/*
* Option function for routing
* {site} : String
* {section} : String
* {page} : String
*/

var options = function (option) {
	// check params is defined
	option = option || {};
	option.site = option.site || 'public';
	option.section = option.section || 'product';
	option.page = option.page || 'main';

	return {
		'site' : option.site,
		'section' : option.section,
		'page' : option.page
	};
};

exports.options = options;