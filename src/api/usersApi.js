
class UsersApi {

  static getUsers(){
  	console.log("BBBBBBBBBBBB")
  	return fetch('/loadUsers',{
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({user_id: 0})
    })
  		.then((response) => response.json())
  		.then((responseJson) => {
  			console.log(">>>>>>>>>")
  			console.log(responseJson);
  			let users = responseJson;
  			return Object.assign([], users);
  		})
  		.catch((error) => {
  			console.error(error);
  		});
  	}

    static loadProfUsers(){
    	return fetch('/loadProfUsers',{
        method: 'GET',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        }
      })
    		.then((response) => response.json())
    		.then((responseJson) => {
    			console.log(">>>>>>>>>")
    			console.log(responseJson);
    			let users = responseJson;
    			return Object.assign([], users);
    		})
    		.catch((error) => {
    			console.error(error);
    		});
    	}


    static getUserById(id) {

      return fetch('/loadUser',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: id
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            let users = responseJson;
            return Object.assign([], users);
        })
        .catch((error) => {
            console.error(error);
        });
    }


    static getCommentsById(id) {


      return fetch('/loadComments',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comp_id: id
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            let comments = responseJson;
            return Object.assign([], comments);
        })
        .catch((error) => {
            console.error(error);
        });
    }


    static addComment(comment){
        return fetch('/addComment',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                details: comment
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }


    static removeUser(user){
      return fetch('/removeUser',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comp_id: user.id
            })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        let status = responseJson;
        if(status){
          console.log("TREEEEEEEEEEEEE")
          return this.getUsers();
        }
      })
      .catch((error) => {
            console.log(error);
      })
    }


}

export default UsersApi;
