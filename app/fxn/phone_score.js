var calcScore = function(cpu, ram, year, batteryLife) {
	// cpu weight = 10
	// ram weight = 10
	// year weight = 1, 
	// battery life = 3
	// cast to int
	cpu = parseInt(cpu, 10);	
	ram = parseInt(ram, 10);
	year = parseInt(year, 10);
	batteryLife = parseInt(batteryLife, 10);
	var score = ((cpu * 10) + (ram * 10) + year + (batteryLife * 3));
	return (score/100); 
};

module.exports = calcScore;