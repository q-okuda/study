import ajax from "modules/ajax";
import extend from "modules/extend";

export default class InfiniteScroll {
	constructor(config) {
		this.config = {
			nextPageUrl: "", //apiのURLを指定(sample.com?page=${i}のように、イテレーションしたい部分を${i}にする)
			startPageNumber: 1, //2ページ目から読み込みたい場合は2にする
			wrapElementClass: "js-infiniteWrap", //更新する要素の親(wrapperを指定)
			targetElementClass: "js-infiniteWrap", //取得したDOMでレスポンスされたい要素(wrapperを指定)
			success: () => {}, //ロードが成功した時の処理
			faled: () => {}, //ロードが失敗した時の処理
			start: () => {}, //ロード開始の時の処理
		};
		if (config) {
			this.config = extend(this.config, config);
		}

		this.isLoading = false;
		this.iterator = Number(this.config.startPageNumber);
		this._execute = this._execute.bind(this);

		this._initialize();
	}

	_initialize() {
		window.addEventListener("scroll", this._execute);
	}

	_execute() {
		const Config = this.config;

		if (!this.isLoading) {
			const WindowOffset = innerHeight + window.pageYOffset;
			const WrapElement = document.getElementsByClassName(
				Config.wrapElementClass,
			)[0];
			const Offset = WrapElement.getBoundingClientRect().top + pageYOffset;
			const Height = WrapElement.offsetHeight;

			if (WindowOffset >= Offset + Height) {
				this.isLoading = true;

				const Url = Config.nextPageUrl.replace("${i}", this.iterator);

				Config.start();

				new ajax({
					method: "GET",
					relativepath: Url,
					asyncmode: true,
					success: (data) => {
						this.isLoading = false;

						let response = this._domParse(data, "text/html");
						response = response.getElementsByClassName(
							Config.targetElementClass,
						);
						++this.iterator;
						Config.success(response);
					},
					failed: () => {
						Configs.faled();
						this.dispose();
					},
				});
			}
		}
	}

	_domParse(markup, type) {
		const Doc = document.implementation.createHTMLDocument("");
		if (markup.toLowerCase().indexOf("<!doctype") > -1) {
			Doc.documentElement.innerHTML = markup;
		} else {
			Doc.body.innerHTML = markup;
		}
		return Doc;
	}

	dispose() {
		window.removeEventListener("scroll", this._execute);
	}
}
