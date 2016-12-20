//***** About Us and Disclaimer functionality *****
var aboutpop = document.getElementById('aboutUs');
var aboutbtn = document.getElementById('aboutbtn');
var dispop = document.getElementById('disclaimer');
var disbtn = document.getElementById('disbtn');
var x = document.getElementsByClassName('close')[0];
var y = document.getElementsByClassName('close')[1];

aboutbtn.onclick = function() {aboutpop.style.display = 'block';}
disbtn.onclick = function() {dispop.style.display = 'block';}
x.onclick = function() {aboutpop.style.display = 'none';}
y.onclick = function() {dispop.style.display = 'none';}
window.onclick = function(event)
{
    if (event.target == aboutpop)
        aboutpop.style.display = 'none';
	else if (event.target == dispop)
		dispop.style.display = 'none';
}
//*************************************************