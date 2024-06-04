import extend from "modules/extend";

export default class CountDown {
	constructor(config) {
		this.config = {
			date: new Date(2020, 0, 1, 0, 0, 0).getTime(), // [ 年 , 月(0始まり) , 日 , 時 , 分 , 秒 ]
			updateCallback: () => {
				//この中で第一引数をとれば残り時間( 日 , 時 , 分 , 秒 )の入ったオブジェクトが取得できる
			},
			endCallback: () => {
				//カウントダウン終わった後の処理
			},
		};
		if (config) extend(this.config, config);

		//時差を計算し、加算代入
		this.config.date += new Date().getTimezoneOffset() * 60000;

		this._execute();
	}

	_execute() {
		this.timer = setInterval(() => {
			if (this.config.date < this._getCurrentTime()) {
				this.destroy();
				return;
			}
			this.config.updateCallback(this._getDifferenceTime());
		}, 1000);
	}

	_getCurrentTime() {
		return new Date().getTime() + new Date().getTimezoneOffset() * 60000;
	}

	_getDifferenceTime() {
		const Dates = {};

		const DifferenceSecond = (this.config.date - this._getCurrentTime()) / 1000;

		Dates.day = this._getDefferenceDay(DifferenceSecond);
		Dates.hour = this._getDefferenceHour(DifferenceSecond, Dates.day);
		Dates.minute = this._getDefferenceMinute(DifferenceSecond);
		Dates.second = this._getDefferenceSecond(DifferenceSecond);

		return Dates;
	}

	_getDefferenceDay(differenceSecond) {
		return Math.floor(differenceSecond / 86400);
	}
	_getDefferenceDaySecond(day) {
		return day !== 0 ? day * 86400 : 0;
	}
	_getDefferenceHour(differenceSecond, differenceDay) {
		return Math.floor(
			(differenceSecond - this._getDefferenceDaySecond(differenceDay)) / 3600,
		);
	}
	_getDefferenceMinute(differenceSecond) {
		return Math.floor(differenceSecond / 60) % 60;
	}
	_getDefferenceSecond(differenceSecond) {
		return (Math.floor(differenceSecond) % 60) % 60;
	}

	destroy() {
		clearInterval(this.timer);
		this.config.endCallback();
	}
}
