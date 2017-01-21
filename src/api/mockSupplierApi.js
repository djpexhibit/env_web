import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const suppliers = [
  {
    id: 'cory-house',
    firstName: 'Cory',
    lastName: 'House'
  },
  {
    id: 'scott-allen',
    firstName: 'Scott',
    lastName: 'Allen'
  },
  {
    id: 'dan-wahlin',
    firstName: 'Dan',
    lastName: 'Wahlin'
  }
];



class SupplierApi {
  static getAllSuppliers() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], suppliers));
      }, delay);
    });
  }

  

 
}

export default SupplierApi;