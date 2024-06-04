import dom from "modules/dom";
import extend from "modules/extend";

/*
** html template **

* common *
<ul class="colorbox-thumList">
	<li>
		<a></a>
	</li>
</ul>

** popup **
<div class="colorbox-wrap">
	<div class="colorbox-inner">
		<ul class="colorbox-popList">
			<li>
				<div>
					<img data-image="{image url}">
				</div>
			</li>
		</ul>
	</div>
</div>
*/

export default class Colorbox {
	constructor(config, options) {
		this.config = {
			mode: "popup", // slideshow
			// click要素（サムネイル）のリスト
			thumbnailList: ".colorbox-thumbList",

			// popup領域
			popupWrapper: ".colorbox-wrap",
			popupInner: ".colorbox-inner",
			popupList: ".colorbox-popList",

			width: false,
			height: false,
			speed: 400, // resizeする時のloading時間(ms)
			slide: true, // Next, Prev機能を付ける場合はtrue
			loop: true, // 最後から先頭に移動する場合はtrue

			callbacks: {
				onOpen: () => {}, // 最初に開いた直後
				onChange: () => {}, // next prevで切り替えた直後
				onClosed: () => {}, // 閉じた直後
			},
		};

		this.options = {
			thumbnailItem: ".colorbox-thumbItem", // thumbnnailList直下のアイテムclass
			thumbnailLink: ".colorbox-thumbLink", // thumbnnailItem直下のリンクclass
			popupItem: ".colorbox-popItem", // popupアイテムに割り当てられるclass名
			popupBox: ".colorbox-contentBox", // slideshowの時にimgが入るboxのclass名
			background: ".colorbox-bg", // 背景に割り当てられるclass名
			datasetName: "itemindex", // サムネイルに割り当てられる連番のdataset名
			buttons: {
				buttonBox: ".colorbox-buttonBox", // buttonのwrapper
				closeBtn: ".colorbox_btn-close",
				prevBtn: ".colorbox_btn-prev",
				nextBtn: ".colorbox_btn-next",
			},
			classes: {
				open: "add-open",
				load: "add-loading",
				active: "add-active",
			},
			initialWidth: 100,
			initialHeight: 300,
		};

		if (config) extend(this.config, config);
		if (options) extend(this.options, options);

		this.popupHeight = "";
		this.popupWidth = "";
		this.index = "";
		this.wrap = "";
		this.popup = "";
		this.len = "";
		this.elements;
		this.currentImg;
		this.lastImage;

		this.wrapper;
		this.inner;
		this.box;

		switch (this.config.mode) {
			case "popup":
				this.initialize();
				this.setOptions();
				this.setInitialSize();
				this.setEvents();

				break;
			case "slideshow":
				this.initialize();
				this.setSlideIndex();
				this.setOptions();
				this.setEvents();

				break;
		}
	}

	initialize() {
		const regClass = new RegExp(/^\./);
		const regId = new RegExp(/^#/);
		const obj = new Object();

		let wrapper;

		if (this.config.mode === "slideshow") {
			this.wrapper = document.createElement("div");
			this.inner = document.createElement("div");
			this.box = document.createElement("div");

			this.wrapper.className = this.replaceInitial(this.config.popupWrapper);
			this.inner.className = this.replaceInitial(this.config.popupInner);
			this.box.className = "colorbox-contentBox";

			this.wrapper.appendChild(this.inner).appendChild(this.box);
			document
				.querySelectorAll(this.config.thumbnailList)[0]
				.parentNode.appendChild(this.wrapper);

			this.wrap = new dom(
				this.config.popupWrapper + " " + this.config.popupInner,
			);
		}

		// set wrapper status
		wrapper = document.querySelectorAll(this.config.popupWrapper)[0];
		wrapper.setAttribute("role", "dialog");
		wrapper.setAttribute("aria-hidden", "true");

		// set buttons
		obj["buttonBox"] = document.createElement("div");
		obj["closeBtn"] = document.createElement("button");
		obj["nextBtn"] = document.createElement("button");
		obj["prevBtn"] = document.createElement("button");

		const buttons = this.options.buttons;
		const result = Object.keys(buttons).filter((key) => {
			return key;
		});

		for (let i = 0; i < result.length; i++) {
			if (
				regClass.test(this.options.buttons[result[i]]) &&
				!regId.test(this.options.buttons[result[i]])
			) {
				obj[result[i]].className = this.replaceInitial(
					this.options.buttons[result[i]],
				);
			} else {
				obj[result[i]].id = this.replaceInitial(
					this.options.buttons[result[i]],
				);
			}
		}

		obj["buttonBox"].appendChild(obj["closeBtn"]);
		if (this.config.slide) {
			obj["buttonBox"].appendChild(obj["nextBtn"]);
			obj["buttonBox"].appendChild(obj["prevBtn"]);
		}

		new dom(this.config.popupWrapper + " " + this.config.popupInner).append(
			obj["buttonBox"],
		);

		//set background
		obj["background"] = document.createElement("div");
		if (
			regClass.test(this.options.background) &&
			!regId.test(this.options.background)
		) {
			obj["background"].className = this.replaceInitial(
				this.options.background,
			);
		} else {
			obj["background"].id = this.replaceInitial(this.options.background);
		}

		new dom(this.config.popupWrapper).preppend(obj["background"]);
	}

	setOptions() {
		const thumbEl = new dom(this.config.thumbnailList).dom;
		let thumbChild = "";
		const thumbItemClass = this.replaceInitial(this.options.thumbnailItem);
		const thumbLinkClass = this.replaceInitial(this.options.thumbnailLink);
		const innerEl = new dom(this.config.popupInner).dom;

		if (this.config.mode === "popup") {
			const popupEl = new dom(this.config.popupList).dom;
			let popupChild = "";
			const popItemClass = this.replaceInitial(this.options.popupItem);

			for (let j = 0; j < thumbEl.length; j++) {
				thumbEl[j].setAttribute("data-colorbox", j);
				innerEl[j].setAttribute("data-colorbox", j);
				thumbChild = thumbEl[j].children;
				popupChild = popupEl[j].children;

				for (let i = 0; i < thumbChild.length; i++) {
					const link = thumbChild[i].getElementsByTagName("a")[0];

					thumbChild[i].classList.add(thumbItemClass);
					link.classList.add(thumbLinkClass);
					link.setAttribute("data-" + this.options.datasetName, i);

					popupChild[i].classList.add(popItemClass);
				}
			}

			this.popup = document.querySelectorAll(this.options.popupItem);
		}

		if (this.config.mode === "slideshow") {
			for (let j = 0; j < thumbEl.length; j++) {
				thumbEl[j].setAttribute("data-colorbox", j);
				innerEl[j].setAttribute("data-colorbox", j);
				thumbChild = thumbEl[j].children;

				for (let i = 0; i < thumbChild.length; i++) {
					const link = thumbChild[i].getElementsByTagName("a")[0];

					thumbChild[i].classList.add(thumbItemClass);
					link.classList.add(thumbLinkClass);
					link.setAttribute("data-" + this.options.datasetName, i);
				}
			}
		}
		this.wrap = new dom(
			this.config.popupWrapper + " " + this.config.popupInner,
		);
		this.len = document.querySelectorAll(this.options.thumbnailItem).length;

		if (this.config.mode === "slideshow") {
			new dom(".colorbox-totalIndex").text(this.len);
		}
	}

	setInitialSize() {
		this.wrap.css("width", this.adjustSizeUnit(this.options.initialWidth));
		this.wrap.css("height", this.adjustSizeUnit(this.options.initialHeight));
	}

	setEvents() {
		const _t = this;

		_t.wrap.css("transition", _t.config.speed + "ms");

		// open
		new dom(_t.options.thumbnailLink).addEvent("click", function (e) {
			_t.index = Number(this.getAttribute("data-" + _t.options.datasetName));
			_t.wrap.addClass(_t.options.classes["load"]);

			_t.change();

			new dom(_t.config.popupWrapper).addClass(_t.options.classes["open"]);

			_t.config.callbacks["onOpen"]();
		});

		// close
		new dom(_t.options.buttons["closeBtn"]).addEvent("click", () => {
			_t.click_close();
		});
		new dom(_t.options.background).addEvent("click", () => {
			_t.click_close();
		});

		if (_t.config.slide) {
			// next
			new dom(_t.options.buttons["nextBtn"]).addEvent("click", (e) => {
				_t.click_next(e);
			});

			// prev
			new dom(_t.options.buttons["prevBtn"]).addEvent("click", (e) => {
				_t.click_prev(e);
			});
		}
	}

	setSlideIndex() {
		const boxHtml = document.createElement("div");
		boxHtml.className = "colorbox-indexBox";
		boxHtml.innerHTML =
			'image <span class="colorbox-currentIndex"></span> of <span class="colorbox-totalIndex"></span>';

		new dom(".colorbox-inner").append(boxHtml);
	}

	click_close() {
		new dom(this.config.popupWrapper).removeClass(this.options.classes["open"]);

		if (this.config.mode === "popup") {
			new dom(this.options.popupItem).removeClass(
				this.options.classes["active"],
			);
		}

		this.config.callbacks["onClosed"]();

		this.setInitialSize();
	}

	click_next() {
		if (this.config.loop) {
			this.clickFnc();

			this.index = ++this.index % this.len;

			this.change();
			this.config.callbacks["onChange"]();
		} else {
			if (this.index < this.len - 1) {
				this.clickFnc();
				// new dom( _t.options.buttons['prevBtn'] ).removeClass( 'disabled' );

				this.index++;

				this.change();
				this.config.callbacks["onChange"]();
				// if ( _t.index == _t.len - 1 ) {
				// 	new dom( _t.options.buttons['nextBtn'] ).addClass( 'disabled' );
				// }
			}
		}
	}

	click_prev() {
		if (this.config.loop) {
			this.clickFnc();

			if (this.index > 0) {
				this.index--;
			} else {
				this.index = this.len - 1;
			}

			this.change();
			this.config.callbacks["onChange"]();
		} else {
			if (this.index > 0) {
				this.clickFnc();
				// new dom( _t.options.buttons['nextBtn'] ).removeClass( 'disabled' );

				this.index--;

				this.change();
				this.config.callbacks["onChange"]();
				// if( _t.index === 0 ) {
				// 	new dom( _t.options.buttons['prevBtn'] ).addClass( 'disabled' );
				// }
			}
		}
	}

	clickFnc() {
		if (this.config.mode === "popup") {
			this.popup[this.index].classList.remove(this.options.classes["active"]);
		}
	}

	change(index) {
		this.index = index ? index : this.index;

		if (this.config.mode === "popup") {
			if (!this.popup[this.index].imgloaded) {
				this.wrap.addClass(this.options.classes["load"]);

				this.elements = this.popup[this.index].getElementsByTagName("img");

				for (let i = 0; i < this.elements.length; i++) {
					this.elements[i].src = this.elements[i].dataset.image;
				}

				this.popup[this.index].imgloaded = true;

				const callback = () => {
					setTimeout(() => {
						this.wrap.removeClass(this.options.classes["load"]);
					}, this.config.speed);

					this.resize();
				};

				this.imageLoadChecker(this.elements, callback);
			} else {
				setTimeout(() => {
					this.wrap.removeClass(this.options.classes["load"]);
				}, this.config.speed);
			}

			this.popup[this.index].classList.add(this.options.classes["active"]);

			this.resize();
		} else if (this.config.mode === "slideshow") {
			const elem = this.box.childNodes[0];
			const img = new Image();
			const targetThumb = document.querySelectorAll(this.options.thumbnailItem)[
				this.index
			];

			img.alt = "";
			img.src = targetThumb
				.querySelectorAll(this.options.thumbnailLink)[0]
				.getAttribute("data-itemimg");

			this.currentImg = img;

			this.resize();

			this.box.appendChild(img);
			if (elem) this.box.removeChild(elem);

			new dom(".colorbox-currentIndex").text(this.index + 1);
		}
	}

	imageLoadChecker(elem, callback) {
		const len = elem.length;
		const imgLoader = (num) => {
			let cnt = 0;
			return () => {
				if (++cnt >= num) {
					callback();
				}
			};
		};

		const loader = imgLoader(len);

		for (let i = 0; i < len; i++) {
			elem[i].onload = loader;
		}
	}

	resize() {
		if (this.config.mode === "popup") {
			if (
				this.popupHeight !== this.popup[this.index].children[0].clientHeight ||
				this.popupWidth !== this.popup[this.index].children[0].clientWidth
			) {
				this.wrap.addClass(this.options.classes["load"]);

				this.popupHeight = this.config.height
					? this.config.height
					: this.popup[this.index].children[0].clientHeight;
				this.popupWidth = this.config.width
					? this.config.width
					: this.popup[this.index].children[0].clientWidth;

				setTimeout(() => {
					this.wrap.removeClass(this.options.classes["load"]);
				}, this.config.speed);
			}
		} else if (this.config.mode === "slideshow") {
			const inner = document.querySelectorAll(".colorbox-inner")[0];
			if (
				inner.clientHeight !== this.currentImg.height ||
				inner.clientWidth !== this.currentImg.width
			) {
				this.wrap.addClass(this.options.classes["load"]);

				this.popupHeight = this.config.height
					? this.config.height
					: this.currentImg.height;
				this.popupWidth = this.config.width
					? this.config.width
					: this.currentImg.width;

				setTimeout(() => {
					this.wrap.removeClass(this.options.classes["load"]);
				}, this.config.speed);
			}
		}
		this.wrap.css("width", this.adjustSizeUnit(this.popupWidth));
		this.wrap.css("height", this.adjustSizeUnit(this.popupHeight));
	}

	reload() {
		const _t = this;

		// 再定義
		_t.wrap = new dom(_t.config.popupWrapper + " " + _t.config.popupInner);
		_t.len = document.querySelectorAll(_t.options.thumbnailItem).length;

		if (_t.config.mode === "popup") {
			_t.popup = document.querySelectorAll(_t.options.popupItem);
		}

		_t.setOptions();

		new dom(_t.options.thumbnailLink).addEvent("click", function () {
			_t.index = Number(this.getAttribute("data-" + _t.options.datasetName));
			_t.wrap.addClass(_t.options.classes["load"]);
			new dom(_t.config.popupWrapper).addClass(_t.options.classes["open"]);

			_t.change();
			_t.config.callbacks["onOpen"]();
		});
	}

	replaceInitial(elem) {
		return elem.replace(/^\.|#/g, "");
	}
	adjustSizeUnit(num) {
		return Number(num) ? num + "px" : num;
	}
}
