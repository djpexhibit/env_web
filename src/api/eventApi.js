
class EventApi {

  static addEvent(event){
    const request = new Request('/addEvent', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({event: event})
    });

    return fetch(request).then(response => {
      let res = response.json();
      console.log(res)
      return res;
    }).catch(error => {
      return error;
    });
  }
}

export default EventApi;
