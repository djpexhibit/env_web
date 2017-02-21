
class ComplainsApi {
  
  static getComplains(){
  	console.log("BBBBBBBBBBBB")
  	return fetch('/loadComplains')
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
}

export default ComplainsApi;