/*
  Level design config


  aliens:
    0 = alien 1
    1 = alien 1, alien 2
    2 = alien 1, alien 2, alien 3

  demandType: an array containts a demand per alien type [alien1, alien2, alien3]
    0 = donuts
    1 = donuts, cupcake
    2 = donuts, cupcake, cake

  deaths: a number of deaths required for next wave

  summonTime: define a fps rate of summon Aliens




*/



var Waves = [
  {
    aliens: 0,
    demandType: [0],
    score: 2,
    summonTime: 240
  },
  {
    aliens: 0,
    demandType: [1],
    score: 2,
    summonTime: 240
  },
  {
    aliens: 1,
    demandType: [1,0],
    score: 4,
    summonTime: 240
  },
  {
    aliens: 1,
    demandType: [2,1],
    score: 6,
    summonTime: 240
  },
  {
    aliens: 2,
    demandType: [2,2,0],
    score: 6,
    summonTime: 240
  },
  {
    aliens: 2,
    demandType: [2,2,1],
    score: 6,
    summonTime: 240
  },
  {
    aliens: 2,
    demandType: [2,2,2],
    score: 'infinity',
    summonTime: 240
  }
];

module.exports = Waves;