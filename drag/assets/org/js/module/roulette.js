import anime from "npms/animejs";
import extend from "./extend";

class Roulette {
	constructor(config) {
		this.config = {
			rouletteNode: document.querySelector("#roulette"),
			buttonNode: null,
			duration: 1000,
			rotationalAverage: 10,
			squares: 6,
			easing: "easeInOutBack",
			progressingDirection: true,
			after: (currentSquares) => {
				console.log(currentSquares);
			},
		};

		if (config) extend(this.config, config);
		this._initialize();
	}

	_initialize() {
		this.progressingDirection = this.config.progressingDirection ? "+=" : "+=-";
		this.currentSquares = 1;
		this.oneSquares = 360 / this.config.squares;
		this.rotationalAverage = 360 * this.config.rotationalAverage;
		this.inAnimationClassName = "in-animation";
		this.config.buttonNode = this.config.buttonNode || this.config.rouletteNode;

		this.config.buttonNode.addEventListener("click", () => {
			if (this.config.rouletteNode.className.match(this.inAnimationClassName))
				return false;
			this._rotationalExecute();
		});
	}

	_getRotationalResult(rotationalFrequency) {
		const Result =
			(rotationalFrequency - this.rotationalAverage) / this.oneSquares;

		if (this.config.progressingDirection) {
			this.currentSquares =
				this.currentSquares -
				Result +
				(this.currentSquares - Result <= 0 ? this.config.squares : 0);
		} else {
			this.currentSquares =
				this.currentSquares +
				Result -
				(this.currentSquares + Result > this.config.squares
					? this.config.squares
					: 0);
		}

		return this.currentSquares;
	}

	_rotationalExecute() {
		this.config.rouletteNode.classList.add(this.inAnimationClassName);
		const RotationalFrequency =
			this.rotationalAverage +
			this.oneSquares * Math.floor(Math.random() * this.config.squares + 1);

		anime({
			targets: this.config.rouletteNode,
			rotate: {
				duration: this.config.duration,
				value: this.progressingDirection + RotationalFrequency,
				easing: this.config.easing,
			},
			complete: () => {
				this.config.rouletteNode.classList.remove(this.inAnimationClassName);
				this.config.after(this._getRotationalResult(RotationalFrequency));
			},
		});
	}
}
