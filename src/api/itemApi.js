import delay from './delay';

class ItemApi {
  static getAllItems() {
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

    static searchItems(key){
        return fetch('/searchItems?key='+key)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                let items = responseJson;
                return Object.assign([],items);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    static getAllItemsByType(type) {
      return fetch('/getItemsByType?type='+type)
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


    static getLimitedItems() {
      return fetch('/getLimitedItems')
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


    static getItemById(id) {
      return fetch('/getItemById?id='+id)
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

    static buyItems(checkout){
        return fetch('/buyItems',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                checkout: checkout
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

export default ItemApi;