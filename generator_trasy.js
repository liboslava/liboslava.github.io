class GeneratorNahody{
	constructor(seed){
		this.state = seed;
	}

	dej_nahodny_bit(){
		this.state = (this.state * this.state) % (1181 * 1187)
		return this.state % 2;
	}

	dej_nahodu(){
		let vysledek = 0;
		let pozice = 0.5
		for (let i = 0; i < 10; i++) {
			vysledek += pozice * this.dej_nahodny_bit();
			pozice *= 0.5;
		}
		return vysledek;
	}
}

function plus(a, b){
	return [a[0] + b[0], a[1] + b[1]];
}

function krat(a, b){
	return [a * b[0], a * b[1]];
}

function dej_beziera(body, param){
	const temp = new Array(body.length);
	for(let i = 0; i < body.length; i++){
		temp[i] = body[i];
	}
	for(let i = 1; i < body.length; i++){
		for(let j = 0; j < body.length - i; j++){
			temp[j] = plus(krat((1 - param), temp[j]), krat(param, temp[j+1]));
		}
	}
	return temp[0];
}

function dej_trasu(pozice, vratit_se, seed, pocet_ridicich_bodu, rozliseni, velikost){
	const nahoda = new GeneratorNahody(seed);
	const ridici_body = [[0,0]];
	for(let i = 0; i < pocet_ridicich_bodu - 1; i++){
		ridici_body.push([2 * nahoda.dej_nahodu() - 1, 2 * nahoda.dej_nahodu() - 1]);
	}

	if(vratit_se == 1){
		ridici_body.push(ridici_body[0]);
	}

	const trasa = new Array(0);

	for(let i = 0; i <= rozliseni; i++){
		trasa.push(dej_beziera(ridici_body, i / rozliseni));
	}

	for(let i = 0; i < trasa.length; i++){
		trasa[i] = plus(krat(velikost, trasa[i]), [lng, lat]);
	}
	return trasa;
}
