import extend from "./extend";

export default class visibleCover {
	constructor(dom, config) {
		this.config = {
			aspect: 0.5625,
			positionType: "fixed",
			topPosition: "0",
			centering: false,
		};

		if (config) extend(this.config, config);

		this.dom = dom;
		this.aspect = this.config.aspect;
		this.dom.style.position = this.config.positionType;

		if (this.config.centering) {
			this.dom.style.top = "50%";
			this.dom.style.left = "50%";
			this.dom.style.transform = "translateX( -50% ) translateY( -50% )";
		} else {
			this.dom.style.top = this.config.topPosition + "px";
			this.dom.style.top = "0px";
		}

		this._initialize();
	}

	_getJudgmentDirection() {
		if (innerWidth * this.aspect > innerHeight) {
			return "widthChange";
		} else {
			return "heightChange";
		}
	}

	_setSize(changeType) {
		switch (changeType) {
			case "heightChange":
				this.dom.style.width = innerWidth + "px";
				this.dom.style.height = innerWidth * this.aspect + "px";
				break;

			case "widthChange":
				this.dom.style.width = innerHeight / this.aspect + "px";
				this.dom.style.height = innerHeight + "px";
				break;
		}
	}

	_initialize() {
		this._setSize(this._getJudgmentDirection());

		window.addEventListener("resize", () => {
			this._setSize(this._getJudgmentDirection());
		});
	}
}
