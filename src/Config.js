var Config = {
	debug: true,
	overallAlienSpeed:0.75,
	recipes: [
		{
			id: 'donut',
			powerRatio: 0.1
		},
		{
			id: 'cupcake',
			powerRatio: 0.5
		},
		{
			id: 'cake',
			powerRatio: 0.9
		}
	],
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
		worldSize: {w:400, h:300},
		scale:2
	},

	getRecipeByPower: function(power){
	  var i = this.recipes.length;
	  while (i--) {
	    var recipe = this.recipes[i];
	    if (power >= recipe.powerRatio) return recipe;
	  }
	  return null;
	}
}

module.exports = Config;
