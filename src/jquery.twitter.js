/*
It's a Twitter Search Library implemented using jQuery
This library was implemented based in Twitter Official Search API documentation
http://apiwiki.twitter.com/w/page/22554756/Twitter-Search-API-Method:-search

@pablocantero
http://pablocantero.com
https://github.com/phstc/jquery-twitter/
*/
var Twitter = {	
	tweets: function(){
		var query = '';
		var from = '';
		var limit = 100; /*rpp: Optional. The number of tweets to return per page, up to a max of 100*/
		var page = 1; /*page: Optional. The page number (starting at 1) to return, up to a max of roughly 1500 results*/
		var searchUrl = 'http://search.twitter.com/search.json?q=';
		var instance = this;
		var sanitize = function(value){
			var sanitized = value;
			// sanitized = sanitized.replace(/#/g, '%23');
			// sanitized = sanitized.replace(/@/g, '%40');
			// sanitized = sanitized.replace(/ /g, '%20');
			// sanitized = sanitized.replace(/\//g, '%2F');
			// sanitized = sanitized.replace(/\\/g, '%5C');
			// sanitized = sanitized.replace(/\:/g, '%3A');
			return sanitized;
		};
		var publicMethods =  {
			containing: function(_query){
				query = sanitize(_query);
				return this;
			}, 
			and: function(_query){
				query += '%20' + sanitize(_query);
				return this;
			},
			or: function(_query){
				query += '+OR+' + sanitize(_query);
				return this;			
			},
			from: function(_from){
				from = '+from:' + _from.replace('@', ' ');
				return this;
			},
			limit: function(_limit){
				limit = _limit;
				return this;
			},
			page: function(_page){
				page = _page
			},
			toQuery: function(){
				return query + from + '&rpp=' + limit + '&page=' + page;
			},
			all: function(succees, error){
				if(error == null){
					error = function(errorMessage){
						alert(errorMessage);
					}
				}
				$.ajax({
				  url: searchUrl + publicMethods.toQuery(),
				  success: function(data){
					if(data.error){
						error(data.error, instance);
					}
					succees(data);
				  },
				  error: function(request, textStatus, errorThrown){
					error(textStatus, instance);
				  },
				  dataType: 'jsonp',
				  async: false
				});
			}
		};
		return publicMethods;
	}
}