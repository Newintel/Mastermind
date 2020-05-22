/*
	Voilà le fichier source: j'ai appellé une fonction
	qui s'invoque seule parce que sinon ça ne s'affiche
	pas dans la page web.
	Pour l'instant c'est très simpliste mais on pourrait
	améliorer ça avec des constantes et des fonctions
	fléchées, mais balek.
	Ah oui et pour intégrer à la page web, je l'ai
	"transpiled" en babel avec le logiciel Prepros,
	mais tu peux aussi copier-coller le fichier une fois
	compilé sur babeljs.io .
*/
(function() {
	'use strict';
	let name = prompt("Comment t'appelles tu?");
	const range = (start, end = start, step = 1) =>{
		(end === start) && (() => start = 0)();
		const range = [];
		let index = 0;
		for (let i = start; i < end; i += step) range[index++] = i;
		return range;
	}

	let done = false;
	const colors = ["white", "red", "green", "orange", "purple", "pink", "blue", "grey"];
	const clickedInput = new Array(4).fill(false);
	let round = 0;
	const find = [];
	for (let i in range(4)){
		find[i] = colors[Math.floor(Math.random()*8)];
	}
	const inputSquares = new Array(4);

	function Verify(ar){
		const find2 = [...find];
		let [good, perfect] = [0, 0];
		for (let i = 0; i < find2.length; i++){
			if (ar[i] === find2[i]){
				ar.splice(i, 1);
				find2.splice(i, 1);
				perfect ++;
				i--;
			}
		}

		for (let i in range(perfect)){
			document.getElementById(`perfect${round}${i}`).style.backgroundColor = "red";
		}

		if (perfect !== 4){
			for (let i = 0; i < find2.length; i++){
				const ver = find2.filter(val => val === ar[i]);
				if (ver.length){
					ar.splice(i, 1);
					find2.splice(find2.indexOf(ar[i]), 1);
					good ++;
				}
			}
		
			for (let i in range(good)){
				document.getElementById(`good${round}${i}`).style.backgroundColor = "white";
			}
		}
		if (perfect === 4 || round === 12){
			done = true;
			document.getElementById("Replay").style.display = "block";
			document.getElementById("nice").innerHTML = (round === 12) ? `Desole ${name}, mais tu as perdu... :(` : `Bravo ${name}, tu as gagne!`;
			document.querySelector("#EndText").innerHTML = "La bonne réponse etait:";
			for (let i in range(4)){
				document.querySelector("#input" + i).style.backgroundColor = find[i];
			}
		}
	}

	//Player input squares
	class Square extends React.Component{
		constructor(props){
			super(props);
			const bg = this.props.bg ? this.props.bg : "white";
			this.state = {
				type: this.props.type,
				value:this.props.value,
				clicked: false,
				border: "black",
				bg: bg
			};
			(this.state.type === 'input') && (() => inputSquares[this.state.value] = this)();
		}

		render(){
			const id = this.state.type + this.state.value;
			return (
				<div
					className="Square"
					id={id}
					onClick={() =>
						this.state.type === "input" && this.inputHandleClick() 
						|| 
						this.state.type === "choice" && this.choiceHandleClick()
					}
					style={{borderColor:this.state.border, backgroundColor:this.state.bg}}
				>
				</div>
			);
		}

		inputHandleClick(){
			if (clickedInput.indexOf(true) === -1 || this.state.clicked){
				const clicked = !this.state.clicked;
				const color = clicked ? "red" : "black";
				this.setState({clicked: clicked, border:color});
				clickedInput[this.state.value] = clicked;
				document.getElementById("choicePanel").style.visibility = (clickedInput.indexOf(true) === -1) ? "hidden" : "visible";
			}
		}

		choiceHandleClick(){
			const clickedOne = clickedInput.indexOf(true);
			document.getElementById("input" + clickedOne).style.backgroundColor = this.state.bg;
			inputSquares[clickedOne].inputHandleClick();
		}
	}

	function Result(props){
		return(
			<div
				id={`${props.type}${props.row}`}
				className="Square"
				style={{backgroundColor:"black"}}
			>
				{range(4).map(i => <div className="sub" key={i} id={`${props.type}${props.row}${i}`}></div>)}
			</div>
		);
	}

	function PlayerPanel(){
		return (
			<div id="player">
				<div id="inputPanel">
					<p id="EndText">Votre choix</p>
					{range(4).map(i => <Square value={i} key={i} type="input"/>)}
				</div>
				<div id="button">
					<button
						onClick={() =>{
							if (round <= 12){
								document.getElementById("round").innerHTML = `Round ${++round}`;
								const choice = [];
								for (let i in range(4)){
									const col = document.getElementById(`input${i}`).style.backgroundColor;
									document.getElementById(`row${round}${i}`).style.backgroundColor = col;
									choice[i] = col;
								}
								Verify(choice);
								document.getElementById(`try${round}`).style.display = "block";
							} else {
								alert(`Desole ${name}, mais le jeu est termine. si vous voulez rejouer, veuillez cliquer sur "Rejouer"`);
							}
						}}
					>
						Valider
					</button>
				</div>
			</div>
		);
	}

	function Tries(props){
		return(
			<div id={`try${props.row}`} style={{display:"none"}} >
				<Result row={props.row} key={1} type="perfect"/>
				{range(4).map(i => <Square value={i} key={i} type={`row${props.row}`} />)}
				<Result row={props.row} key={2} type="good"/>
			</div>
		);
	}

	function ChoicePanel(){
		return (
			<div id="choicePanel">
				<p>Choisissez une couleur</p>
				{range(8).map((i) => <Square value={i} key={i} type="choice" bg={colors[i]} />)}
			</div>
		)
	}

	function Final(){
		return (
			<div>
				<div>
					<p id="nice">{name.toLowerCase() === "matteo" ? "Bienvenue, cher beta-testeur!" : `Salut, ${name}`}</p>
					<h3 id="round"></h3>
					<h3 id="Replay" onClick={()=>window.location.reload(false)}><a href="#">Rejouer</a></h3>
					<PlayerPanel />
				</div>
				<ChoicePanel />
				<div id="tries">
					<p>Vos essais</p>
					{range(1, 13).map(i => <Tries key={i} row={i} />)}
				</div>
			</div>
		);
	}

	ReactDOM.render(<Final />,document.getElementById('root'));
})()