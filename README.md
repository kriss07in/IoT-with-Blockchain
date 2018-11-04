# IoT---Solidity---Web3---Remix---Ganache---RasberryPI

Setup: <br>

Build Circuit (with RasberryPI)  <br>  <br>
Conect to rasberry pi on one terminal using ssh command as below  <br>
On Rasberry PI: run ganache blockchain  <br>
	ganache-cli --host 0.0.0.0 (to accept calls from any NIC) <br>
	 <br>

Front-End (Web3) <br>
	Point Remix to the “node” where your Ganache blockchain running with Smart Contract (Solidity) <br>
		Change environment to Web3 provider and point to RasberryPI Ip address <br>
	Deploy Contract: and run your node application <br>
	  node sensorblink.js <br>
 <br>
Testing sensor functionality from Blockchain Web3 UI interface (browser html file) <br>
Front-End (if node is installed) <br>
	Front-end needs to listen to a node <br>
	In-production (Infura) <br>
	Local dev environment, ganache - https://truffleframework.com/ganache <br>
		change settings on ganache to change port —port 8545 <br>
	Point Remix to the “node” <br>
		Change environment to Web3 Provider, localhost:8545 <br>
	Create “Application” <br>
		mkdir sensorrepodemo <br>
		cd sensorrepodemo <br>
		create node application and copy these 2 files into it <br>
		Open in web browser, submit sensor id & values <br>
 <br>
Testing sensor functionality from Blockchain Web3 UI interface (browser html file) <br>
	Test from Remix —> setSensorValue function with sensor value of 50 —> this should glow green light (100 is the limit checking in the code) <br>
	Test from Remix —> setSensorValue function with sensor value of 500 —> this should glow red light (100 is the max limit checking in the code) <br>
