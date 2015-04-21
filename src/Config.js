var Config = {
	debug: true,
	overallAlienSpeed:0.75,
	recipes: ['donut', 'cupcake', 'cake'],
	aliens:[
		{
			id:'alien1',
			size:24,
			speed:1,
			demands:1
		},
		{
			id:'alien2',
			size:32,
			speed:0.75,
			demands:2
		},
		{
			id:'alien3',
			size:42,
			speed:0.5,
			demands:3
		}
	],
	demandMaxLength: 3,
	layout:{
		screenSize: {w:700, h:400},
		worldSize: {w:700, h:400},
		scale:2
	}
}

module.exports = Config;
