
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


  static loadEvents(){
    return fetch('/loadEvents',{
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
        let events = responseJson;
        return Object.assign([], events);
      })
      .catch((error) => {
        console.error(error);
      });
    }


    static deleteEvent(id){
      return fetch('/deleteEvent',{
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({id: id})
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(">>>>>>>>>")
          console.log(responseJson);
          let events = responseJson;
          return Object.assign([], events);
        })
        .catch((error) => {
          console.error(error);
        });
      }
}

export default EventApi;
