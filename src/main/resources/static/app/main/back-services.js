// CommonJS package manager support
if (typeof module !== 'undefined' && typeof exports !== 'undefined' &&
  module.exports === exports) {
  // Export the *name* of this Angular module
  // Sample usage:
  //
  //   import lbServices from './lb-services';
  //   angular.module('app', [lbServices]);
  //
  module.exports = "backServices";
}

(function(window, angular, undefined) {
  'use strict';

  //var urlBase = "http://enpahuthi-thillai.rhcloud.com/api";
  var urlBase = "/api";
  var authHeader = 'authorization';

  function getHost(url) {
    var m = url.match(/^(?:https?:)?\/\/([^\/]+)/);
    return m ? m[1] : null;
  }

  var urlBaseHost = getHost(urlBase) || location.host;

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the Back server via the REST API.
 *
 */
  var module = angular.module("backServices", ['ngResource']);

/**
 * @ngdoc object
 * @name lbServices.Expense
 * @header lbServices.Expense
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Expense` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  
/**
 * @ngdoc object
 * @name lbServices.PropertiesDO
 * @header lbServices.PropertiesDO
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `PropertiesDO` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  /*
  module.factory(
    "PropertiesDO",
    [
      'BackResource', 'BackAuth', '$injector',
      function(Resource, BackAuth, $injector) {
        var R = Resource(
        urlBase + "/PropertiesDOs/:id",
          { 'id': '@id' },
          {

            
            "create": {
              url: urlBase + "/PropertiesDOs",
              method: "POST",
            },

         
            "createMany": {
              isArray: true,
              url: urlBase + "/PropertiesDOs",
              method: "POST",
            },

            "upsert": {
              url: urlBase + "/PropertiesDOs",
              method: "PUT",
            },

            "exists": {
              url: urlBase + "/PropertiesDOs/:id/exists",
              method: "GET",
            },

            
            "findById": {
              url: urlBase + "/PropertiesDOs/:id",
              method: "GET",
            },

         
            "find": {
              isArray: true,
              url: urlBase + "/PropertiesDOs",
              method: "GET",
            },

            
            "findOne": {
              url: urlBase + "/PropertiesDOs/findOne",
              method: "GET",
            },

           
            "updateAll": {
              url: urlBase + "/PropertiesDOs/update",
              method: "POST",
            },

            
            "deleteById": {
              url: urlBase + "/PropertiesDOs/:id",
              method: "DELETE",
            },

           
            "count": {
              url: urlBase + "/PropertiesDOs/count",
              method: "GET",
            },

            
            "prototype$updateAttributes": {
              url: urlBase + "/PropertiesDOs/:id",
              method: "PUT",
            },

            
            "createChangeStream": {
              url: urlBase + "/PropertiesDOs/change-stream",
              method: "POST",
            },
          }
        );

        R["updateOrCreate"] = R["upsert"];
        R["update"] = R["updateAll"];
        R["destroyById"] = R["deleteById"];
        R["removeById"] = R["deleteById"];
        
        R.modelName = "PropertiesDO";
        return R;
      }]);

  module.factory(
		    "GeoFence",
		    [
		      'BackResource', 'BackAuth', '$injector',
		      function(Resource, BackAuth, $injector) {
		        var R = Resource(
		        urlBase + "/GeoFences/:id",
		          { 'id': '@id' },
		          {
		            
		            "create": {
		              url: urlBase + "/GeoFences",
		              method: "POST",
		            },
		            
		            "createMany": {
		              isArray: true,
		              url: urlBase + "/GeoFences",
		              method: "POST",
		            },
		            
		            "upsert": {
		              url: urlBase + "/GeoFences",
		              method: "PUT",
		            },
		            
		            "exists": {
		              url: urlBase + "/GeoFences/:id/exists",
		              method: "GET",
		            },
		           
		            "findById": {
		              url: urlBase + "/GeoFences/:id",
		              method: "GET",
		            },
		           
		            "find": {
		              isArray: true,
		              url: urlBase + "/GeoFences",
		              method: "GET",
		            },

		            "findByOwner": {
			              isArray: true,
			              url: urlBase + "/GeoFences/byOwner",
			              method: "POST",
			            },
		            "findOne": {
		              url: urlBase + "/GeoFences/findOne",
		              method: "GET",
		            },
		            
		            "updateAll": {
		              url: urlBase + "/GeoFences/update",
		              method: "POST",
		            },
		            
		            "deleteById": {
		              url: urlBase + "/GeoFences/:id",
		              method: "DELETE",
		            },
		            
		            "count": {
		              url: urlBase + "/GeoFences/count",
		              method: "POST",
		            },
		            
		            "prototype$updateAttributes": {
		              url: urlBase + "/GeoFences/:id",
		              method: "PUT",
		            },
		            
		            "createChangeStream": {
		              url: urlBase + "/GeoFences/change-stream",
		              method: "POST",
		            },
		          }
		        );

		        R["updateOrCreate"] = R["upsert"];
		           
		        R["update"] = R["updateAll"];
		       
		        R["destroyById"] = R["deleteById"];
		          
		        R["removeById"] = R["deleteById"];
		      
		        R.modelName = "GeoFence";
		        return R;
		      }]);

  module.factory(
		    "Notification",
		    [
		      'BackResource', 'BackAuth', '$injector',
		      function(Resource, BackAuth, $injector) {
		        var R = Resource(
		        urlBase + "/Notifications/:id",
		          { 'id': '@id' },
		          {
		            
		            "create": {
		              url: urlBase + "/Notifications",
		              method: "POST",
		            },
		            
		            "createMany": {
		              isArray: true,
		              url: urlBase + "/Notifications",
		              method: "POST",
		            },
		            
		            "upsert": {
		              url: urlBase + "/Notifications",
		              method: "PUT",
		            },
		            
		            "exists": {
		              url: urlBase + "/Notifications/:id/exists",
		              method: "GET",
		            },
		           
		            "findById": {
		              url: urlBase + "/Notifications/:id",
		              method: "GET",
		            },
		           
		            "find": {
		              isArray: true,
		              url: urlBase + "/Notifications",
		              method: "GET",
		            },

		           
		            "findOne": {
		              url: urlBase + "/Notifications/findOne",
		              method: "GET",
		            },
		            
		            "updateAll": {
		              url: urlBase + "/Notifications/update",
		              method: "POST",
		            },
		            
		            "deleteById": {
		              url: urlBase + "/Notifications/:id",
		              method: "DELETE",
		            },
		            
		            "findByOwner": {
			              isArray: true,
			              url: urlBase + "/Notifications/byOwner",
			              method: "POST",
			            },
			            
		            "count": {
		              url: urlBase + "/Notifications/count",
		              method: "POST",
		            },
		            
		            "prototype$updateAttributes": {
		              url: urlBase + "/Notifications/:id",
		              method: "PUT",
		            },
		            
		            "createChangeStream": {
		              url: urlBase + "/Notifications/change-stream",
		              method: "POST",
		            },
		          }
		        );

		        R["updateOrCreate"] = R["upsert"];
		           
		        R["update"] = R["updateAll"];
		       
		        R["destroyById"] = R["deleteById"];
		          
		        R["removeById"] = R["deleteById"];
		      
		        R.modelName = "Notification";
		        return R;
		      }]);
  */
  module.factory(
		    "Menu",
		    [
		      'BackResource', 'BackAuth', '$injector',
		      function(Resource, BackAuth, $injector) {
		        var R = Resource(
		        urlBase + "/Menus/:id",
		          { 'id': '@id' },
		          {
		            
		            "create": {
		              url: urlBase + "/Menus",
		              method: "POST",
		            },
		            
		            "createMany": {
		              isArray: true,
		              url: urlBase + "/Menus",
		              method: "POST",
		            },
		            
		            "upsert": {
		              url: urlBase + "/Menus",
		              method: "PUT",
		            },
		            
		            "exists": {
		              url: urlBase + "/Menus/:id/exists",
		              method: "GET",
		            },
		           
		            "findById": {
		              url: urlBase + "/Menus/:id",
		              method: "GET",
		            },
		           
		            "find": {
		              isArray: true,
		              url: urlBase + "/Menus",
		              method: "GET",
		            },

		           
		            "findOne": {
		              url: urlBase + "/Menus/findOne",
		              method: "POST",
		            },
		            
		            "updateAll": {
		              url: urlBase + "/Menus/update",
		              method: "POST",
		            },
		            
		            "deleteById": {
		              url: urlBase + "/Menus/:id",
		              method: "DELETE",
		            },
		            
		            "count": {
		              url: urlBase + "/Menus/count",
		              method: "GET",
		            },
		            
		            "prototype$updateAttributes": {
		              url: urlBase + "/Menus/:id",
		              method: "PUT",
		            },
		            
		            "createChangeStream": {
		              url: urlBase + "/Menus/change-stream",
		              method: "POST",
		            },
		          }
		        );

		        R["updateOrCreate"] = R["upsert"];
		           
		        R["update"] = R["updateAll"];
		       
		        R["destroyById"] = R["deleteById"];
		          
		        R["removeById"] = R["deleteById"];
		      
		        R.modelName = "Menu";
		        return R;
		      }]);
  /*
  module.factory(
		    "WhereAmI",
		    [
		      'BackResource', 'BackAuth', '$injector',
		      function(Resource, BackAuth, $injector) {
		        var R = Resource(
		        urlBase + "/WhereAmIs/:id",
		          { 'id': '@id' },
		          {
		            
		            "create": {
		              url: urlBase + "/WhereAmIs",
		              method: "POST",
		            },
		            
		            "createMany": {
		              isArray: true,
		              url: urlBase + "/WhereAmIs",
		              method: "POST",
		            },
		            
		            "upsert": {
		              url: urlBase + "/WhereAmIs",
		              method: "PUT",
		            },
		            
		            "exists": {
		              url: urlBase + "/WhereAmIs/:id/exists",
		              method: "GET",
		            },
		           
		            "findById": {
		              url: urlBase + "/WhereAmIs/:id",
		              method: "GET",
		            },
		           
		            "find": {
		              isArray: true,
		              url: urlBase + "/WhereAmIs",
		              method: "GET",
		            },

		           
		            "findOne": {
		              url: urlBase + "/WhereAmIs/findOne",
		              method: "GET",
		            },
		            
		            "findOneByEmailAndPhone": {
			              url: urlBase + "/WhereAmIs/findOneByEmailAndPhone",
			              method: "POST",
			        },
			            
		            "updateAll": {
		              url: urlBase + "/WhereAmIs/update",
		              method: "POST",
		            },
		            
		            "deleteById": {
		              url: urlBase + "/WhereAmIs/:id",
		              method: "DELETE",
		            },
		            
		            "count": {
		              url: urlBase + "/WhereAmIs/count",
		              method: "GET",
		            },
		            
		            "prototype$updateAttributes": {
		              url: urlBase + "/WhereAmIs/:id",
		              method: "PUT",
		            },
		            
		            "createChangeStream": {
		              url: urlBase + "/WhereAmIs/change-stream",
		              method: "POST",
		            },
		          }
		        );

		        R["updateOrCreate"] = R["upsert"];
		           
		        R["update"] = R["updateAll"];
		       
		        R["destroyById"] = R["deleteById"];
		          
		        R["removeById"] = R["deleteById"];
		      
		        R.modelName = "WhereAmI";
		        return R;
		      }]);
		      */
  module.factory(
		    "User",
		    [
		      'BackResource', 'BackAuth', '$injector', '$httpParamSerializer', '$rootScope',
		      function(Resource, BackAuth, $injector, $httpParamSerializer, $rootScope) {
		    	  
		        var R = Resource(
		        urlBase + "/users/:id",
		          { 'id': '@id' },
		          {
		            
		            "create": {
		              url: urlBase + "/users",
		              method: "POST",
		            },
		            
		            "createMany": {
		              isArray: true,
		              url: urlBase + "/users",
		              method: "POST",
		            },
		            
		            "upsert": {
		              url: urlBase + "/users/:userName",
		              method: "PUT",
		            },
		            
		            "exists": {
		              url: urlBase + "/users/:id/exists",
		              method: "GET",
		            },
		           
		            "findById": {
		              url: urlBase + "/users/:id",
		              method: "GET",
		            },
		           
		            "find": {
		              //isArray: true,
		              url: urlBase + "/users",
		              method: "GET",
		            },
		           
		            "findByUsername": {
		              url: urlBase + "/users/:userName",
		              method: "GET",		             
		            },
		            
		            "login": {
			              url: "/oauth/token",
			              method: "POST",
			              headers: {
          	                "Authorization": "Basic " + btoa("webui:webuisecret"),
          	                "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
          	              },
			        },
			            
		            "updateAll": {
		              url: urlBase + "/users/update",
		              method: "POST",
		            },
		            
		            "deleteById": {
		              url: urlBase + "/users/:id",
		              method: "DELETE",
		            },
		            
		            "deleteByUserName": {
			              url: urlBase + "/users/:userName",
			              method: "DELETE",
			            },
			            
		            "findByOwner": {
			              isArray: true,
			              url: urlBase + "/users/byOwner",
			              method: "POST",
			            },
			            
		            "count": {
		              url: urlBase + "/users/count",
		              method: "GET",
		            },
		            
		            "prototype$updateAttributes": {
		              url: urlBase + "/users/:id",
		              method: "PUT",
		            },
		            
		            "createChangeStream": {
		              url: urlBase + "/users/change-stream",
		              method: "POST",
		            },
		          }
		        );

		        R["updateOrCreate"] = R["upsert"];
		           
		        R["update"] = R["updateAll"];
		       
		        R["destroyById"] = R["deleteById"];
		          
		        R["removeById"] = R["deleteById"];
		      
		        R.modelName = "User";
		        return R;
		      }]);
  
  module
  .factory('BackAuth', function() {
    var props = ['accessTokenId', 'currentUserId', 'rememberMe'];
    var propsPrefix = '$Back$';

    function BackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.currentUserData = null;
    }

    BackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    BackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    };

    BackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    };

    BackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new BackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      try {
        var key = propsPrefix + name;
        if (value == null) value = '';
        storage[key] = value;
      } catch (err) {
        console.log('Cannot access local/session storage:', err);
      }
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('BackAuthRequestInterceptor');
  }])
  .factory('BackAuthRequestInterceptor', ['$q', 'BackAuth',
    function($q, BackAuth) {
      return {
        'request': function(config) {
          // filter out external requests
          var host = getHost(config.url);
          if (host && host !== urlBaseHost) {
            return config;
          }

          if (BackAuth.accessTokenId) {
            config.headers['Authorization'] = 'Bearer ' + BackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 }},
              status: 401,
              config: config,
              headers: function() { return undefined; },
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        },
      };
    }])

  /**
   * @ngdoc object
   * @name lbServices.BackResourceProvider
   * @header lbServices.BackResourceProvider
   * @description
   * Use `BackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(BackResourceProvider) {
   *     BackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('BackResource', function BackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.BackResourceProvider#setAuthHeader
     * @methodOf lbServices.BackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.BackResourceProvider#getAuthHeader
     * @methodOf lbServices.BackResourceProvider
     * @description
     * Get the header name that is used for sending the authentication token.
     */
    this.getAuthHeader = function() {
      return authHeader;
    };

    /**
     * @ngdoc method
     * @name lbServices.BackResourceProvider#setUrlBase
     * @methodOf lbServices.BackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-Back-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
      urlBaseHost = getHost(urlBase) || location.host;
    };

    /**
     * @ngdoc method
     * @name lbServices.BackResourceProvider#getUrlBase
     * @methodOf lbServices.BackResourceProvider
     * @description
     * Get the URL of the REST API server. The URL provided
     * to the code generator (`lb-ng` or `grunt-Back-sdk-angular`) is used.
     */
    this.getUrlBase = function() {
      return urlBase;
    };

    this.$get = ['$resource', function($resource) {
      var BackResource = function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, Back provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };

      BackResource.getUrlBase = function() {
        return urlBase;
      };

      BackResource.getAuthHeader = function() {
        return authHeader;
      };

      return BackResource;
    }];
  });
})(window, window.angular);
