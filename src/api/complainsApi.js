
class ComplainsApi {

  static getComplains(){
  	console.log("BBBBBBBBBBBB")
  	return fetch('/loadComplains',{
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
  			let complains = responseJson;
  			return Object.assign([], complains);
  		})
  		.catch((error) => {
  			console.error(error);
  		});
  	}


    static getComplainById(id) {


      return fetch('/loadComplain',{
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
            let complains = responseJson;
            return Object.assign([], complains);
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


    static removeComplain(complain){
      return fetch('/removeComplain',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comp_id: complain.id
            })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        let status = responseJson;
        if(status){
          console.log("TREEEEEEEEEEEEE")
          return this.getComplains();
        }
      })
      .catch((error) => {
            console.log(error);
      })
    }

    static updateAuthority(complanId,authId){
        return fetch('/updateAuthority',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                complainId: complanId,
                authId: authId
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    static resolved(complanId){
        return fetch('/resolved',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                complainId: complanId
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    static toggleHidePost(complanId, hide){
        return fetch('/toggleHidePost',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                complainId: complanId,
                hide: hide
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    static deletePost(complanId){
        return fetch('/deletePost',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                complainId: complanId
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }


}

export default ComplainsApi;
