"use strict";!function(){let e=prompt("Comment t'appelles tu?");const t=(e,t,n=1)=>{t||(t=e,e=0);const l=[];let r=0;for(let c=e;c<t;c+=n)l[r]=c,r++;return l};let n=!1;const l=["white","red","green","orange","purple","pink","blue","grey"],r=new Array(4).fill(!1);let c=0;const a=[];for(let e in t(4))a[e]=l[Math.floor(8*Math.random())];class o extends React.Component{constructor(e){super(e);const t=this.props.bg?this.props.bg:"white";this.state={type:this.props.type,value:this.props.value,clicked:!1,border:"black",bg:t}}render(){const e=this.state.type+this.state.value;return React.createElement("div",{className:"Square",id:e,value:this.state.value,onClick:()=>{"input"===this.state.type?this.inputHandleClick():"choice"===this.state.type&&this.choiceHandleClick()},style:{borderColor:this.state.border,backgroundColor:this.state.bg}})}inputHandleClick(){const e=!this.state.clicked,t=e?"red":"black";this.setState({clicked:e,border:t}),r[this.state.value]=e,document.getElementById("choicePanel").style.visibility=-1===r.indexOf(!0)?"hidden":"visible"}choiceHandleClick(){for(let e in r)r[e]&&(document.getElementById("input"+e).style.backgroundColor=this.state.bg)}}function i(e){return React.createElement("div",{id:`${e.type}${e.row}`,className:"Square",style:{backgroundColor:"black"}},t(4).map(t=>React.createElement("div",{className:"sub",key:t,id:`${e.type}${e.row}${t}`})))}function s(){return React.createElement("div",{id:"player"},React.createElement("div",{id:"inputPanel"},React.createElement("p",{id:"EndText"},"Votre choix"),t(4).map(e=>React.createElement(o,{value:e,key:e,type:"input"}))),React.createElement("div",{id:"button"},React.createElement("button",{onClick:()=>{if(c<=12){c++,document.getElementById("round").innerHTML="Round "+c;const l=[];for(let e in t(4)){const t=document.getElementById("input"+e).style.backgroundColor;document.getElementById(`row${c}${e}`).style.backgroundColor=t,l[e]=t}!function(l){const r=[...a];let o=0,i=0;for(let e=0;e<r.length;e++)l[e]===r[e]&&(l.splice(e,1),r.splice(e,1),i++,e--);for(let e in t(i))document.getElementById(`perfect${c}${e}`).style.backgroundColor="red";if(4!==i){for(let e=0;e<r.length;e++){r.filter(t=>t===l[e]).length&&(l.splice(e,1),r.splice(r.indexOf(l[e]),1),o++)}for(let e in t(o))document.getElementById(`good${c}${e}`).style.backgroundColor="white"}if(4===i||12===c){n=!0,document.getElementById("Replay").style.display="block",document.getElementById("nice").innerHTML=12===c?`Desole ${e}, mais tu as perdu... :(`:`Bravo ${e}, tu as gagne!`,document.querySelector("#EndText").innerHTML="La bonne réponse etait:";for(let e in t(4))document.querySelector("#input"+e).style.backgroundColor=a[e]}}(l),document.getElementById("try"+c).style.display="block"}else alert(`Desole ${e}, mais le jeu est termine. si vous voulez rejouer, veuillez cliquer sur "Rejouer"`)}},"Valider")))}function d(e){return React.createElement("div",{id:"try"+e.row,style:{display:"none"}},React.createElement(i,{row:e.row,key:1,type:"perfect"}),t(4).map(t=>React.createElement(o,{value:t,key:t,type:"row"+e.row})),React.createElement(i,{row:e.row,key:2,type:"good"}))}function u(){return React.createElement("div",{id:"choicePanel"},React.createElement("p",null,"Choisissez des couleurs"),t(8).map(e=>React.createElement(o,{value:e,key:e,type:"choice",bg:l[e]})))}function m(){return React.createElement("div",null,React.createElement("div",null,React.createElement("p",{id:"nice"},"matteo"===e.toLowerCase()?"Bienvenue, cher beta-testeur!":"Salut, "+e),React.createElement("h3",{id:"round"}),React.createElement("h3",{id:"Replay",onClick:()=>window.location.reload(!1)},React.createElement("a",{href:"#"},"Rejouer")),React.createElement(s,null)),React.createElement(u,null),React.createElement("div",{id:"tries"},React.createElement("p",null,"Vos essais"),t(1,13).map(e=>React.createElement(d,{key:e,row:e}))))}ReactDOM.render(React.createElement(m,null),document.getElementById("root"))}();