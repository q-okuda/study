import dom from "modules/dom";
import extend from "modules/extend";

export default class PriceBar {
	/**
	 *   <div id="js-priceBar" class="plp-priceBarBox">
	 *      <span id="js-priceMinBtn" class="plp-priceBox_inline mod-min js-filterElement"></span>
	 *       <span id="js-priceMaxBtn" class="plp-priceBox_inline mod-max js-filterElement"></span>
	 *   </div>
	 *   <div class="plp-priceInputBox">
	 *       <div class="plp-priceInputInner">
	 *           <span id="js-priceMinBox" class="plp-priceInputBox_inline">0</span>~<span id="js-priceMaxBox" class="plp-priceInputBox_inline">100000</span>
	 *       </div>
	 *   </div>
	 */
	constructor(config) {
		this.config = {
			wrap: "#js-priceBar",
			cursorMin: "#js-priceMinBtn",
			cursorMax: "#js-priceMaxBtn",
			priceBoxMin: "#js-priceMinBox",
			priceBoxMax: "#js-priceMaxBox",
			priceMin: 500,
			priceMax: 100000,
			callBack: () => {},
		};
		if (config) extend(this.config, config);

		if (document.querySelector(this.config.wrap)) this.initialize();
	}

	initialize() {
		this.priceBar = new dom(this.config.wrap);
		this.priceMinBtn = new dom(this.config.cursorMin);
		this.priceMaxBtn = new dom(this.config.cursorMax);
		this.priceMinBox = new dom(this.config.priceBoxMin);
		this.priceMaxBox = new dom(this.config.priceBoxMax);
		this.startEvent = this.startEvent.bind(this);
		this.moveEvent = this.moveEvent.bind(this);
		this.endEvent = this.endEvent.bind(this);
		this.body = document.body;
		this.baseWidth = null;
		this.startPosition = null;
		this.targetCursor = null;
		this.targetBox = null;
		this.siblingCursorPosition = null;
		this.currentTarget = null;
		this.priceLength = this.config.priceMax / this.config.priceMin;
		this.oneStepPercent = 100 / this.priceLength;

		//値によってカーソルの初期位置を移動
		const currentMinPercent =
			Number.parseInt(this.priceMinBox.text()) / this.config.priceMax;
		const currentMaxPercent =
			Number.parseInt(this.priceMaxBox.text()) / this.config.priceMax;
		this.priceMinBtn.css(
			"left",
			(currentMinPercent ? currentMinPercent * 100 : 0) + "%",
		);
		this.priceMaxBtn.css(
			"left",
			(currentMaxPercent ? currentMaxPercent * 100 : 0) + "%",
		);

		this.execute();
	}

	execute() {
		this.priceBar.addEvent("mousedown", this.startEvent);
		this.priceBar.addEvent("touchstart", this.startEvent);
	}

	startEvent(e) {
		e.preventDefault();
		const clientX =
			e.type === "touchstart" ? e.changedTouches[0].clientX : e.clientX;

		this.startPosition =
			e.type === "touchstart" ? e.changedTouches[0].pageX : e.pageX;
		this.baseWidth = this.priceBar.dom[0].offsetWidth;
		this.barPosition = clientX - e.currentTarget.getBoundingClientRect().left;
		this.currentTarget = this.getTargetCursor(
			clientX - e.currentTarget.getBoundingClientRect().left,
			this.priceMinBtn.dom[0].offsetLeft,
			this.priceMaxBtn.dom[0].offsetLeft,
		);

		if (this.currentTarget === "min") {
			this.targetCursor = this.priceMinBtn;
			this.targetBox = this.priceMinBox;
			this.siblingCursorPosition = this.priceMaxBtn.css("left");
		} else {
			this.targetCursor = this.priceMaxBtn;
			this.targetBox = this.priceMaxBox;
			this.siblingCursorPosition = this.priceMinBtn.css("left");
		}

		this.targetCursor.css(
			"left",
			this.getCursorPosition(this.barPosition, this.baseWidth),
		);
		this.targetBox.text(
			String(this.getPriceValue(this.barPosition, this.baseWidth)),
		);

		this.body.addEventListener("mousemove", this.moveEvent);
		this.body.addEventListener("mouseup", this.endEvent);
		this.body.addEventListener("touchmove", this.moveEvent);
		this.body.addEventListener("touchend", this.endEvent);
	}
	moveEvent(e) {
		e.preventDefault();
		const pageX =
			e.type === "touchmove" ? Math.round(e.touches[0].pageX) : e.pageX;

		let left = this.getCursorPosition(
			pageX - this.startPosition + this.barPosition,
			this.baseWidth,
		);
		let value = String(
			this.getPriceValue(
				pageX - this.startPosition + this.barPosition,
				this.baseWidth,
			),
		);

		if (this.currentTarget === "min") {
			if (
				Number.parseInt(this.siblingCursorPosition.replace("%", "")) <
				Number.parseInt(left.replace("%", ""))
			) {
				left = this.siblingCursorPosition;
				value = this.priceMaxBox.text();
			}
		} else {
			if (
				Number.parseInt(this.siblingCursorPosition.replace("%", "")) >
				Number.parseInt(left.replace("%", ""))
			) {
				left = this.siblingCursorPosition;
				value = this.priceMinBox.text();
			}
		}
		this.targetCursor.css("left", left);
		this.targetBox.text(value);
	}
	endEvent() {
		this.body.removeEventListener("mousemove", this.moveEvent);
		this.body.removeEventListener("mouseup", this.endEvent);
		this.body.removeEventListener("touchmove", this.moveEvent);
		this.body.removeEventListener("touchend", this.endEvent);

		this.config.callBack({
			min: Number(this.priceMinBox.text()),
			max: Number(this.priceMaxBox.text()),
		});
	}

	getTargetCursor(barOffset, cursorMinOffset, cursorMaxOffset) {
		const cursorMin =
			barOffset - cursorMinOffset < 0
				? (barOffset - cursorMinOffset) * -1
				: barOffset - cursorMinOffset;
		const cursorMax =
			barOffset - cursorMaxOffset < 0
				? (barOffset - cursorMaxOffset) * -1
				: barOffset - cursorMaxOffset;

		if (cursorMin === cursorMax) {
			return barOffset >= cursorMinOffset ? "max" : "min";
		} else {
			return cursorMin < cursorMax ? "min" : "max";
		}
	}
	getCursorPosition(barOffset, barWidth) {
		let position = Math.floor((barOffset / barWidth) * 1000) / 10;

		if (position < 0) {
			position = 0;
		} else if (position > 100) {
			position = 100;
		}
		return position + "%";
	}
	getPriceValue(barOffset, barWidth) {
		const ceil = Math.ceil(
			Math.floor((barOffset / barWidth) * 1000) / 10 / this.oneStepPercent,
		);
		let price = this.config.priceMin * ceil;

		if (price < this.config.priceMin) {
			price = 0;
		} else if (price > this.config.priceMax) {
			price = this.config.priceMax;
		}

		return price;
	}
	setValue(min, max) {
		this.priceMinBox.text(min);
		this.priceMaxBox.text(max);
	}
}
