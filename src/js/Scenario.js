let t = new Taquin("nombres");
document.getElementById("themes").onchange = function(){
	t.changer_fond(this.value);
	t.mettreCoupAJour();
}

document.getElementById("melanger").onclick = function(){
	 t.melanger();
	 t.mettreCoupAJour();
}


document.getElementById("solution").onclick = function(){
	 t.faireSolution();
}
