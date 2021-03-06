'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The price is updated from step 1 and 2
//The commission is updated from step 3
//The options is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'distance': 198,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];

function calculPrix(array, rentals, cars)
{
  for (var i = 0; i < rentals.length; i++)
  {
    var nombreJours = differenceDates(rentals[i].pickupDate, rentals[i].returnDate);
    var car = 0;
    for (var j = 0; j < cars.length; j++)
    {
      if (cars[j].id == rentals[i].carId) 
      {
        car = j;
      }
    }
    var prixJours = nombreJours*cars[car].pricePerDay;
    var prixDistance = cars[car].pricePerKm*rentals[i].distance;
    var total = prixJours + prixDistance;
    if (nombreJours >= 10) 
    {
      total = total * 0.5;
    }
    else if (nombreJours >= 4) 
    {
      total = total * 0.7
    }
    else if (nombreJours >= 1) 
    {
      total = total * 0.9
    }
    array.push(total);
  }
}

function differenceDates(date1, date2)
{
  var dayStart = parseInt(date1.split('-')[2], 10);
  var dayEnd = parseInt(date2.split('-')[2], 10);
  return dayEnd-dayStart+1;
}

function repartitionCom(arrayrep, array, rentals, cars){
	var repart = []
	for (var i = 0; i < array.length; i++){
		var rentalprice = array[i]
		var days = differenceDates(rentals[i].pickupDate,rentals[i].returnDate)
		var Com = rentalprice * 0.3;
		var insurance = Com / 2;
		var treasury = 1*days
		var Virtuo = Com - insurance-treasury
		if(rentals[i].options.deductibleReduction == true){
			Virtuo += 4*days
		}
		repart.push(insurance)
		repart.push(treasury)
		repart.push(Virtuo)
	}
	return repart
}

function paiementacteurs(arrayrep,actors,array,rentals){
	for (var i = 0; i < arrayrep.length; i+3) {
		for (var j = 0; j < actors.length; j++) {	
		actors[j].payment[1].amount=arrayrep[i]
		actors[j].payment[2].amount=arrayrep[i+1]
		actors[j].payment[3].amount=arrayrep[i+2]
	}
	}
	for (var i = 0; i < array.length; i++) {
		var rentalprice = array[i]
		var days = differenceDates(rentals[i].pickupDate,rentals[i].returnDate)
		if(rentals[i].options.deductibleReduction == true){

		actors[i].payment[0].amount = array[i]+4*days
	}
		else{
		actors[i].payment[0].amount = array[i]			
		}
	}
}

var array = []
calculPrix(array, rentals, cars)
var arrayrep = repartitionCom(arrayrep, array,rentals,cars)
paiementacteurs(arrayrep,actors,array)

console.log(array)
console.log(arrayrep)
console.log(cars);
console.log(rentals);
console.log(actors);