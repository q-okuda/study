import extend from "./extend";

export default class getScrollBetweenProgress {
	constructor(config) {
		this.config = {
			startOffset: 0,
			endOffset: document.body.offsetHeight - innerHeight,
			callback: () => {},
		};
		if (config) extend(this.config, config);

		this._requestAnimationFrame = this._requestAnimationFrame.bind(this);
		this.cancelFlg = false;

		this.execute();
	}

	execute() {
		this.cancelFlg = false;
		requestAnimationFrame(this._requestAnimationFrame);
	}

	_requestAnimationFrame() {
		this.config.callback(this._getOffsetProgress());

		this.cancelFlg
			? cancelAnimationFrame(this._requestAnimationFrame)
			: requestAnimationFrame(this._requestAnimationFrame);
	}

	_getOffsetProgress() {
		let progress =
			(pageYOffset - this.config.startOffset) /
			(this.config.endOffset - this.config.startOffset);
		if (progress > 1) {
			progress = 1;
		} else if (progress < 0) {
			progress = 0;
		}
		return progress;
	}

	updateConfig(config) {
		if (config) extend(this.config, config);
	}

	dispose() {
		this.cancelFlg = true;
	}
}
