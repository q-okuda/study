import extend from "modules/extend";

export default class Progress {
	constructor(config) {
		this.config = {
			durationTime: 1000,
			update: (progress) => {},
		};
		if (config) this.config = extend(this.config, config);
		this.currentTime = 0;
		this._updateProgress = this._updateProgress.bind(this);
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.restart = this.restart.bind(this);
		this.counter;
	}
	_updateProgress() {
		this.currentTime += 10;
		const Progress =
			this.currentTime >= this.config.durationTime
				? 100
				: (this.currentTime / this.config.durationTime) * 100;
		this.config.update(Progress);
	}
	start() {
		this.counter = setInterval(this._updateProgress, 10);
	}
	stop() {
		clearInterval(this.counter);
	}
	restart() {
		this.currentTime = 0;
		this.stop();
		this.start();
	}
	updateOptions(config) {
		this.config = extend(this.config, config);
	}
}
