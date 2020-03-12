function trier(a){
	var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

let coupJoue = 0;

class Taquin{
	
	constructor(nom){
		this.tabTaquin = new Array();
		
		for(let i = 0; i<4; i++){
			let colonneTaquin = new Array();
			for(let j = 0; j<4; j++){
				colonneTaquin[j] = new Case(nom, 4*i+j);
			}
			this.tabTaquin.push(colonneTaquin);
		}

		this.validerLesMouv();
	}


	changer_fond(nom){

		for(let i = 0; i<4; i++){
			for(let j = 0; j<4; j++){
				this.tabTaquin[i][j] = this.tabTaquin[i][j].setImg(nom, 4*i+j);
			}
		}
		let elmt_16 = document.getElementById("photo16");
		elmt_16.src = "img/" + nom + "/" + nom + "_" + 16 + ".jpg";
		this.afficher();
		this.validerLesMouv();
	}

	melanger(){
		let plateauUneD = new Array();

		for(let i = 0; i<4; i++){
			for(let j = 0; j<4; j++){
				plateauUneD.push(this.tabTaquin[i][j]);
			}
			//trier(this.tabTaquin[i]);
		}
		plateauUneD = trier(plateauUneD);
		/*for(let p =0; p<16; p++){
				console.log(plateauUneD[p]);
			}*/
		let m = 0;
		for(let x=0; x<4; x++){
			for(let z=0; z<4; z++){
				this.tabTaquin[x][z] = plateauUneD[m];
				m++;
			}
		}

		this.afficher();
		this.validerLesMouv();		
	}

	afficher(){
		let m = 0;
		for(let x=0; x<4; x++){
			for(let z=0; z<4; z++){
				let img_id = "photo" + m;
				let img = document.getElementById(img_id);
				img.src = this.tabTaquin[x][z].getImg();

				m++;
			}
		}
		
		document.getElementById("message").innerHTML = "Pièce(s) juste(s) : " + this.nbCoupBienplace() + "     " + "Coups déjà fait : " + coupJoue;
		if(this.nbCoupBienplace() == 16){
			alert('Partie terminée !');
		}
	}

	validerLesMouv(){
		for(let i =0; i<4; i++){
			for(let j = 0; j<4; j++){
				//Si la case (i,j) peut se mouvoir elle doit devenir cliquable et bouger là où il y a un emplacement
				if(this.peutSeMouvoir(i, j)){
					
					this.devientCliquable(i, j, "t");
				}
				else{
					//Si il ne peut pas se mouvoir on pense à lui enlever le onclick
					this.devientPasCliquable(i, j);
				}

				
			}
		}
	}

	peutSeMouvoir(x, y){
		
		if(x>0){
			//Si x est au dessus de 0 on teste si la case au dessus est vide
			if(this.tabTaquin[x-1][y].getNum() == 15){
				return true;
			}
		}
		if(x<3){
			if(this.tabTaquin[x+1][y].getNum() == 15){
				
				return true;
			}
		}
		if(y>0){
			//Si x est au dessus de 0 on teste si la case au dessus est vide
			if(this.tabTaquin[x][y-1].getNum() == 15){
				
				return true;
			}
		}
		if(y<3){
			//Si x est au dessus de 0 on teste si la case au dessus est vide
			if(this.tabTaquin[x][y+1].getNum() == 15){
				
				return true;
			}
		}
		return false;
	}

	bouge(x, y){

		if(x>0){
			//Si x est au dessus de 0 on teste si la case au dessus est vide
			if(this.tabTaquin[x-1][y].getNum() == 15){
				let temp = this.tabTaquin[x-1][y];
				this.tabTaquin[x-1][y] = this.tabTaquin[x][y];
				this.tabTaquin[x][y] = temp;
				
			}
		}
		if(x<3){
			if(this.tabTaquin[x+1][y].getNum() == 15){
				let temp = this.tabTaquin[x+1][y];
				this.tabTaquin[x+1][y] = this.tabTaquin[x][y];
				this.tabTaquin[x][y] = temp;
				
			}
		}
		if(y>0){
			//Si x est au dessus de 0 on teste si la case au dessus est vide
			if(this.tabTaquin[x][y-1].getNum() == 15){
				let temp = this.tabTaquin[x][y-1];
				this.tabTaquin[x][y-1] = this.tabTaquin[x][y];
				this.tabTaquin[x][y] = temp;
				
			}
		}
		if(y<3){
			//Si x est au dessus de 0 on teste si la case au dessus est vide
			if(this.tabTaquin[x][y+1].getNum() == 15){
				let temp = this.tabTaquin[x][y+1];
				this.tabTaquin[x][y+1] = this.tabTaquin[x][y];
				this.tabTaquin[x][y] = temp;
				
			}
		}
		coupJoue++;
		
		this.afficher();
		this.validerLesMouv();
	}

	devientCliquable(x, y, nomTaquin){
		
		let elmt = document.getElementById("photo" + (4*x+y));
		elmt.setAttribute("class", "img_puzzle cliquable");
		elmt.setAttribute("onclick", nomTaquin + ".bouge(" + x + "," + y + ")");
	}


	devientPasCliquable(i, j){
		
		let elmt = document.getElementById("photo" + (4*i+j));
		elmt.setAttribute("class", "img_puzzle PasCliquable");
		elmt.removeAttribute("onclick");
	}

	faireSolution(){
		let elmt = document.getElementById("solution");
		elmt.value = "puzzle";
		document.getElementById("jeu").style.display = "none";
		document.getElementById("modele").style.display = "flex";
		elmt.removeAttribute("onclick");
		elmt.setAttribute("onclick", "t.fairePuzzle()");
		let melanger = document.getElementById("melanger");
		melanger.setAttribute("disabled", "");
		
		
	}
	
	fairePuzzle(){
		document.getElementById("jeu").style.display = "flex";
		document.getElementById("modele").style.display = "none";
		let elmt = document.getElementById("solution");
		elmt.value = "solution";
		elmt.removeAttribute("onclick");
		elmt.setAttribute("onclick", "t.faireSolution()");
		let melanger = document.getElementById("melanger");
		melanger.removeAttribute("disabled", "");
	}


	nbCoupBienplace(){
		let n=0;
		for(let i = 0; i<4; i++){
			for(let j=0; j<4; j++){
				if(this.tabTaquin[i][j].getNum() == 4*i+j){
				n++;
			}
			}
		}

		return n;
	}

	mettreCoupAJour(){
		coupJoue = 0;
	}

}