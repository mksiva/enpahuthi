angular
        .module('app')
        .factory('AuthService', ['User', '$q', 'Menu', '$rootScope', '$http', '$httpParamSerializer','BackAuth', function (User, $q, Menu,
                    $rootScope,$http, $httpParamSerializer, BackAuth) {
        	
                function login2(userName, password) {
                	console.log('userName:' + userName + '-- pwd : ' + password);
                	 var dataVar = {
                	        grant_type:"password", 
                	        username: userName, 
                	        password: password, 
                	        client_id: "webui",
                	        client_secret:"webuisecret"
                	    };
                	    var encoded = btoa("webui:webuisecret");
                	     
                	    var req = {
                	            method: 'POST',
                	            url: "https://localhost:8443/oauth/token",
                	            headers: {
                	                "Authorization": "Basic " + encoded,
                	                "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                	            },
                	            data: $httpParamSerializer(dataVar)
                	        }
                	    return $http(req).then(function(data){
                	            $http.defaults.headers.common.Authorization = 
                	              'Bearer ' + data.data.access_token;
                	           // $cookies.put("access_token", data.data.access_token);
                	            console.log(data);
                	            $rootScope.currentUser = {
                                       // id: response.id,
                                        access_token: data.data.access_token,
                                        expires_in: data.data.expires_in,
                                        refresh_token: data.data.refresh_token,
                                        token_type:data.data.token_type,
                                        username: userName,
                                        //email: response.email,
                                       // phone:response.phone,
                                       // name:response.name
                                    };  	
                	        });                	  
                }
                
                function getRoles(){
                	var roles = ['USER', 'ADMIN', 'GUEST'];
                	return roles;
                }
                
                function login(userName, password) {
                	
                	 var dataVar = {
                 	        grant_type:"password", 
                 	        username: userName, 
                 	        password: password, 
                 	        client_id: "webui",
                 	        client_secret:"webuisecret"
                 	    };
                	 
                    return User
                            .login($httpParamSerializer(dataVar))
                            .$promise
                            .then(function (response) {
                            //	console.log(response);
                            	if(response.error){
                            		$rootScope.currentUserNull = {
                            				error: true
                            		}
                            	} else{
                                $rootScope.currentUser = {                                  
                                	accessTokenId: response.access_token,
                                    expires_in: response.expires_in,
                                    refresh_token: response.refresh_token,
                                    token_type:response.token_type,
                                    currentUserId: userName,
                                };       
                                
                                BackAuth.setUser($rootScope.currentUser.accessTokenId,$rootScope.currentUser.currentUserId, null);
                                
                                // Retrieve other user information
                                User.findByUsername({
                					userName : $rootScope.currentUser.currentUserId				
                			
			                		})	.$promise
			                			.then(function(result) {
			                				//$scope.user = result;
			                				$rootScope.currentUser.email = result.email;
			                				$rootScope.currentUser.fullName = result.fullName;
			                				$rootScope.currentUser.phone = result.phone;
			                				$rootScope.currentUser.roles = result.roles;
			                				
			                				result.roles.forEach(function(role) {
			                				    console.log(role);
			                				    if(role === 'ADMIN'){
			                				    	console.log('User is an Admin.');
			                				    	$rootScope.currentUser.admin = true;
			                				    }
			                				});
			                		});
                                
                            	}
                            });
                }

                function logout() {
                	$rootScope.currentUser = null;
                	BackAuth.setUser(null, null, null);
                    /*return User
                            .logout()
                            .$promise
                            .then(function () {
                                $rootScope.currentUser = null;
                                //AccessToken.destroy();
                            });*/
                }

                function register(userName, password, email, fullname, phone, addressLine1, addressLine2, state, country, zip) {
                    return User
                            .create({
                                email: email,
                                userName: userName,
                                password: password,
                                fullName: fullname,
                                phone: phone,
                                addressLine1:addressLine1,
                                addressLine2:addressLine2,
                                state:state,
                                country:country,
                                zip:zip,
                                active: true
                            })
                            .$promise;
                }

                return {
                    login: login,                   
                    logout: logout,
                    register: register,
                    getRoles:getRoles
                };
            }]);
