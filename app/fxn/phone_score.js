var calcScore = function(cpu, ram, year, batteryLife) {

  cpu = parseInt(cpu, 10);
  ram = parseInt(ram, 10);
  year = parseInt(year, 10);
  batteryLife = parseInt(batteryLife, 10);
  var score = ((cpu * 10) + (ram * 10) + year + (batteryLife * 1.4));
  return (score / 100);
};

module.exports = calcScore;
