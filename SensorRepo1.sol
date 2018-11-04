pragma solidity ^0.4.18;

contract SensorRepo1 {
    
   uint public sensorId;
   string public sensorName;
   uint private sensorValue = 0;
   address public sensorOwner;
   
    modifier requireSensorOwner {
        require(msg.sender == sensorOwner);
        _;
    }
   
   function SensorRepo1 ( uint newSensorId, string newSensorName  ) {
       sensorId = newSensorId;
       sensorName = newSensorName;
       sensorOwner = msg.sender;
   }
   
   function getSensorNameAndId () public view returns(string, uint) {
       return(sensorName, sensorId);
   }
   
   event SensorValueSubmitted (
        uint sensorId,
        uint sensorValue
    );
    
    function buySensorData() payable returns(uint) {
        
        require(msg.value > .001 ether);
        return(sensorValue);
        
        // compare
        /*if (msg.value > .001 ether) {
            return(sensorValue);
        } */
    }
   
   function setSensorValue (uint currSensorId, uint newSensorValue) public {
       if (currSensorId == sensorId) {
        sensorValue = newSensorValue;
       }
    SensorValueSubmitted(currSensorId, newSensorValue);
   }
   
   function showBalance() requireSensorOwner view returns(uint) {
       return(this.balance);
   }
   
   function claimBalance() requireSensorOwner payable {
       if (this.balance > 0) {
        sensorOwner.transfer(this.balance);
       }
   }
    
}