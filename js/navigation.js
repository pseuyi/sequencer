function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("chevron-right").style.display ='none';
  document.getElementById("navigation").style.width = "250px";
  
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("chevron-right").style.display ='block';
  document.getElementById("navigation").style.width = "2.7%";
}

var a = new Interface.Panel({ 
  container:document.querySelector("#xyPanel") 
});
var xy = new Interface.XY({
  childWidth: 25,
  numChildren: 6,
  background:"#111",
  fill: "rgba(127,127,127,.2)",
  bounds:[0,0,.6,1],
  oninit: function() { this.rainbow() },  
});
var c = new Interface.Slider({ 
  bounds:[.65,0,.15,1], 
  min:.0, max:.25,
  value:.125,
  fill:'#333', background:'#111',
  onvaluechange: function() { xy.friction = 1 - this.value; },
  label:'friction',
});
var d = new Interface.Slider({ 
  bounds:[.825,0,.15,1],
  target:xy, key:'maxVelocity',
  min:.5, max:20,
  value:15,
  fill:'#333', background:'#111',       
  label:'velocity',
});
      
a.background = 'black';
a.add(xy, c, d);