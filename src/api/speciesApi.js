
class SpeciesApi {

  static getSpecies(){
  	console.log("BBBBBBBBBBBB")
  	return fetch('/loadSpecies',{
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
  			let species = responseJson;
  			return Object.assign([], species);
  		})
  		.catch((error) => {
  			console.error(error);
  		});
  	}


    static getSpecieById(id) {

      return fetch('/loadSpecie',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                spec_id: id
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            let species = responseJson;
            return Object.assign([], species);
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


    static removeSpecie(specie){
      return fetch('/removeSpecie',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comp_id: specie.id
            })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        let status = responseJson;
        if(status){
          console.log("TREEEEEEEEEEEEE")
          return this.getSpecies();
        }
      })
      .catch((error) => {
            console.log(error);
      })
    }


}

export default SpeciesApi;
