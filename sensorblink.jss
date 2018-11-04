// Interaction with GPIO
var Gpio = require('onoff').Gpio;

// Interaction with Ethereum
var Web3 = require('web3');
var web3 = new Web3();

// Interaction with Big Numbers
var BigNumber = require('big-number');

// connect to the local node
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

// The contract that you are going to interact with

var contractAddress = '0x966a9afe565fb58ecb867eb6927958032039ec22'; // replace with your Contract Address from Remix, leaving single quotes

// Provide the ABI (Application Binary Interface), instantiate contract instance
/*var contract = web3.eth.contract([
// replace with your ABI from remix
]).at(contractAddress); */

// contract object
// replace with ABI from Remix, leaving opening and closing ([ ])
var contract = web3.eth.contract(
[
	{
		"constant": false,
		"inputs": [],
		"name": "buySensorData",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "claimBalance",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "currSensorId",
				"type": "uint256"
			},
			{
				"name": "newSensorValue",
				"type": "uint256"
			}
		],
		"name": "setSensorValue",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "newSensorId",
				"type": "uint256"
			},
			{
				"name": "newSensorName",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "sensorName",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "sensorValue",
				"type": "uint256"
			}
		],
		"name": "SensorValueSubmitted",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getSensorNameAndId",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "sensorId",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "sensorName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "sensorOwner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "showBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
).at(contractAddress);

// components connected to the RPi
var greenLed = new Gpio(14, 'out');
var redLed = new Gpio(15, 'out');
var button = new Gpio(18, 'in', 'rising');

// turn off both LEDs
initializeLEDs();

// watch event on the button, not working and not using today
button.watch(function (err, value) {
 if (err) {
 throw err
 } else {
	 console.log('button press');
 }

showSensorStatus()
})

// Create an event instance
var simpleEventInstance = contract.SensorValueSubmitted({}, {
	fromBlock: 0,
	toBlock: 'latest'
});
// Start watching for the event from the smart contract
simpleEventInstance.watch(function(error, result){
	console.log('result.args: ', result.args);
	showSensorStatus(result.args.sensorValue);
});

// power the LED according the value of the sensor
function showSensorStatus(sensorValue) {

	console.log('sensorValue: ', sensorValue);
  
	var sensorThreshold = new BigNumber(100); 
	//console.log('sensorThreshold:', sensorThreshold);
	
	const equalsThreshold = sensorValue.equals(sensorThreshold) ? true : false;
	//console.log('equals: ', equalsThreshold);

	const gtThreshold = sensorValue.gt(sensorThreshold) ? true : false;
	//console.log('gt: ', gtThreshold);

	const ltThreshold = sensorValue.lt(sensorThreshold) ? true : false;
	//console.log('lt: ', ltThreshold);
	
	// display the red LED if the sensor value is over the threshold, green LED if under the threshold
	if ( gtThreshold ) {
		// unsafe		
		//greenLed.writeSync(0)
		//redLed.writeSync(1)
		console.log('unsafe');
		var iv = setInterval(function(){
			redLed.writeSync(redLed.readSync() === 0 ? 1 : 0)
		}, 500);
		// Stop blinking the light after 5 seconds
		setTimeout(function() {
		    clearInterval(iv); // Stop blinking
		    redLed.writeSync(0); //Turn LED off
		}, 5000);
		
	} else {
		// safe
		//greenLed.writeSync(1)
		//redLed.writeSync(0)
		console.log('safe');
		var iv = setInterval(function(){
			greenLed.writeSync(greenLed.readSync() === 0 ? 1 : 0)
		}, 500);
		// Stop blinking the light after 5 seconds
		setTimeout(function() {
		    clearInterval(iv); // Stop blinking
		    greenLed.writeSync(0); //Turn LED off
		}, 5000);

	}

}

// set both LEDs to 0
function initializeLEDs() {
 
 greenLed.writeSync(0)
 redLed.writeSync(0)

}

// release process
process.on('SIGINT', function () {
 greenLed.unexport()
 redLed.unexport()
 button.unexport()
})