class Case{
	constructor(nom, num){
		this.img = "img/" + nom + "/" + nom + "_" + num + ".jpg";
		let elmtId = "photo" + num;
		this.elmt = document.getElementById(elmtId);
	}

	getImg(){
		return this.img;
	}

	getNum(){
		let res = this.img.split("_");
		
		let resFin = res[1].split(".");
		return 1*resFin[0];
	}

	setImg(nom, num){
		this.img = "img/" + nom + "/" + nom + "_" + num + ".jpg";

		return this;
	}

	setId(id){
		this.img = id; 
	}


	getElmt(){
		return this.elmt;
	}

	/*devientCliquable(x, y, nomTaquin){
		console.log("Cette case va bouger " + x+ "      " + y);
		console.log(this.elmt);
		this.elmt.setAttribute("onclick", nomTaquin + ".bouge(" + x + "," + y + ")");
	}


	devientPasCliquable(){
		console.log(this.elmt);
		this.elmt.removeAttribute("onclick");
	}*/
}