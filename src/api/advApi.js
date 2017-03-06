
class AdvApi {



  static addAdv(adv){

    var data = new FormData()
    data.append('file', adv)

    return fetch('/addAdv',{
      method: 'POST',
      body: data
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

export default AdvApi;