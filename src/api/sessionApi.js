
class SessionApi {
  
  static login(credentials){
    console.log(">>> 3333")
    const request = new Request('/loginAdmin', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }), 
      body: JSON.stringify({credentials: credentials})
    });

    return fetch(request).then(response => {
      console.log(">>>> 4444")
      let res = response.json();
      console.log(res)
      return res;
    }).catch(error => {
      return error;
    });
  } 
}

export default SessionApi;