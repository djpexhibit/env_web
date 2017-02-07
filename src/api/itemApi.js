import delay from './delay';

class ItemApi {
  static getAllItems() {
        console.log(">>>>>>>>>>>>>>>>")
      return fetch('/getItems')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            let items = responseJson;
            return Object.assign([], items);
        })
        .catch((error) => {
            console.error(error);
        });
    }
}

export default ItemApi;