import extend from "modules/extend";

export default class OverflowMenu {
	constructor(config) {
		this.config = {
			box: document.getElementById("js-box"),
			menu: document.getElementById("js-menu"),
			menuItem: document.getElementsByClassName("js-menuItem"),
			activeClass: "add-active",
			endTransitionTime: ".5s",
			mode: "center", // smooth or center or left or right
			items: "110px", // @string px or number( 表示したい個数 , centerの時に偶数だと-1される )
			centerPadding: 50, //px指定の時は無効 , 奇数でcenterだとあんまり意味ない
			initialize: () => {},
			beforeSlideChange: () => {},
			afterSlideChange: () => {},
		};
		if (config) extend(this.config, config);

		this.body = document.body;
		this._setBasePosition = this._setBasePosition.bind(this);
		this._setCurrentPosition = this._setCurrentPosition.bind(this);
		this._dispose = this._dispose.bind(this);
		this._setEachSize = this._setEachSize.bind(this);
		this._setActivePosition = this._setActivePosition.bind(this);
		this._setResizeEvent = this._setResizeEvent.bind(this);
		this.basePosition = 0;
		this.currentPositionIndex = 0;
		this.resizeTimer = false;
		this.clickTime = 100;

		this._initialize();
	}

	_initialize() {
		//iosの対策で空イベントをadd
		document.addEventListener("touchstart", () => {});

		this._setEachSize();
		this._setDisableDefaultAnchor();

		window.addEventListener("resize", this._setResizeEvent);

		this.config.box.addEventListener("mousedown", this._setBasePosition);
		this.config.box.addEventListener("touchstart", this._setBasePosition);

		this.config.box.style.position = "relative";
		this.config.box.style.overflowX = "hidden";
		this.config.menu.style.position = "absolute";
		this.config.menu.style.left = "0px";
		this.config.menu.style.overflowX = "hidden";
		this.config.menu.style.top = "0px";

		this._setActivePosition();

		this.config._initialize(this._getFirstActiveIndex());
	}

	_setResizeEvent() {
		if (this.resizeTimer !== false) {
			clearTimeout(this.resizeTimer);
		}
		this.resizeTimer = setTimeout(() => {
			this._setEachSize();
			this._setActivePosition(this.currentPositionIndex);
		}, 300);
	}

	_setEachSize() {
		this.clientCenter = this.config.box.offsetWidth / 2;
		if (
			typeof this.config.items === "string" &&
			this.config.items.match("px")
		) {
			this.menuWidth = Number(this.config.items.replace("px", ""));
		} else {
			this.menuWidth = Math.round(
				(this.config.box.offsetWidth - this.config.centerPadding * 2) /
					this.config.items,
			);
		}

		if (
			!this.config.responsive ||
			(this.config.responsive && innerWidth < this.config.switchWidth)
		) {
			this.offsetCapacityMin = this.clientCenter - this.menuWidth / 2;
			this.offsetCapacityMax = this.clientCenter + this.menuWidth / 2;

			for (let index = 0; index < this.config.menuItem.length; index++) {
				this.config.menuItem[index].style.width = this.menuWidth + "px";
				this.config.menuItem[index].style.float = "left";

				if (index === this.config.menuItem.length - 1) {
					this.config.menu.style.width =
						this.config.menuItem[0].offsetWidth * this.config.menuItem.length +
						"px";
				}
			}
		} else {
			this.offsetCapacityMin = "";
			this.offsetCapacityMax = "";
		}
	}

	_setDisableDefaultAnchor() {
		//chrome対策でリンクを無効に

		if (!this.config.box.getElementsByTagName("a").length) return false;

		const ChildLink = this.config.box.getElementsByTagName("a");

		for (let index = 0; index < ChildLink.length; index++) {
			let startTime = 0;
			let endTime = 0;
			let startPosition = 0;

			ChildLink[index].addEventListener("click", (e) => {
				e.preventDefault();
			});
			ChildLink[index].addEventListener("mousedown", (e) => {
				e.preventDefault();
				startTime = Math.floor(Date.now());
				startPosition = this._getCurrentMenuPosition();
			});
			ChildLink[index].addEventListener("mouseup", (e) => {
				e.preventDefault();
				endTime = Math.floor(Date.now());
				const Difference = startPosition - this._getCurrentMenuPosition();

				if (
					endTime - startTime <= this.clickTime &&
					Difference <= 50 &&
					Difference >= -50
				) {
					location.href = e.currentTarget.href;
				}
			});
			ChildLink[index].addEventListener("touchstart", (e) => {
				e.preventDefault();
				startTime = Math.floor(Date.now());
				startPosition = this._getCurrentMenuPosition();
			});
			ChildLink[index].addEventListener("touchend", (e) => {
				e.preventDefault();
				endTime = Math.floor(Date.now());
				const Difference = startPosition - this._getCurrentMenuPosition();

				if (
					endTime - startTime <= this.clickTime &&
					Difference <= 50 &&
					Difference >= -50
				) {
					location.href = e.currentTarget.href;
				}
			});
		}
	}

	_setActivePosition(index, boolean) {
		this.config.beforeSlideChange(this.currentPositionIndex);

		this.currentPositionIndex =
			typeof index !== "undefined" ? index : this._getFirstActiveIndex();
		if (
			this.currentPositionIndex === 0 ||
			innerWidth > this.menuWidth * this.config.menuItem.length
		) {
			this.config.menu.style.left = "0px";
		} else {
			let adjustment = 0;
			if (this.config.mode === "right") {
				adjustment = (this.menuWidth / 2) * -1;
			} else if (this.config.mode === "left") {
				adjustment = this.menuWidth / 2;
			}

			const EndPosition =
				(this.menuWidth * this.currentPositionIndex -
					this.offsetCapacityMin +
					adjustment) *
				-1;
			const MaxPosition =
				(this.menuWidth * this.config.menuItem.length -
					this.config.box.clientWidth) *
				-1;
			if (EndPosition < MaxPosition) {
				this.config.menu.style.left = MaxPosition + "px";
			} else if (EndPosition > 0) {
				this.config.menu.style.left = "0px";
			} else {
				if (
					typeof index === "undefined" ||
					this.config.mode !== "smooth" ||
					boolean
				)
					this.config.menu.style.left = EndPosition + "px";
			}
		}

		this.config.afterSlideChange(this.currentPositionIndex);
	}

	_getFirstActiveIndex() {
		for (let index = 0; index < this.config.menuItem.length; index++) {
			if (
				this.config.menuItem[index].className
					.split(" ")
					.indexOf(this.config.activeClass) > 0
			)
				return index;
		}
		return 0;
	}

	_setBasePosition(e) {
		this.basePosition = Math.round(
			e.type === "touchstart" ? e.touches[0].clientX : e.clientX,
		);
		this.mousedownFlag = true;
		this.config.menu.style.webkitTransition = "";
		this.config.menu.style.transition = "";

		this.body.addEventListener("touchmove", this._setCurrentPosition);
		this.body.addEventListener("touchend", this._dispose);
		this.body.addEventListener("mousemove", this._setCurrentPosition);
		this.body.addEventListener("mouseup", this._dispose);
	}
	_setCurrentPosition(e) {
		this.body.classList.add(this.movingClass);

		this.config.menu.style.left = this._getMathPosition(e);
		this.basePosition = Math.round(
			e.type === "touchmove" ? e.touches[0].clientX : e.clientX,
		);
	}

	_getCurrentMenuPosition() {
		return Number(this.config.menu.style.left.replace("px", ""));
	}
	_getMathPosition(e) {
		return (
			this._getCurrentMenuPosition() -
			(this.basePosition -
				Math.round(e.type === "touchmove" ? e.touches[0].clientX : e.clientX)) +
			"px"
		);
	}
	_getActiveIndex() {
		let activeIndex = 0;

		this.config.menu.style.WebkitTransition = this.config.endTransitionTime;
		this.config.menu.style.transition = this.config.endTransitionTime;

		if (this._getCurrentMenuPosition() < 0) {
			for (let index = 1; index < this.config.menuItem.length; index++) {
				const currentMenuOffset =
					this.config.menuItem[index].getBoundingClientRect().left +
					pageXOffset +
					this.menuWidth / 2;
				if (
					currentMenuOffset <= this.offsetCapacityMax &&
					currentMenuOffset >= this.offsetCapacityMin
				) {
					activeIndex = index;
					break;
				} else if (this.config.menuItem.length - 1 === index) {
					activeIndex = index;
				}
			}
		}
		return activeIndex;
	}

	_dispose() {
		this._setActivePosition(this._getActiveIndex());

		setTimeout(() => {
			this.body.classList.remove(this.movingClass);
		}, this.clickTime + 1);

		this.body.removeEventListener("touchmove", this._setCurrentPosition);
		this.body.removeEventListener("touchend", this._dispose);
		this.body.removeEventListener("mousemove", this._setCurrentPosition);
		this.body.removeEventListener("mouseup", this._dispose);
	}

	setAnyPosition(index) {
		this.config.menu.style.WebkitTransition = this.config.endTransitionTime;
		this.config.menu.style.transition = this.config.endTransitionTime;

		this._setActivePosition(index, true);
	}
	destroy() {
		this.config.box.removeEventListener("mousedown", this._setBasePosition);
		this.config.box.removeEventListener("touchstart", this._setBasePosition);
		window.removeEventListener("resize", this._setResizeEvent);
		this.config.box.style = {};
		this.config.menu.style = {};
		this.config.menuItem.style = {};
		for (let index = 0; index < this.config.menuItem.length; index++) {
			this.config.menuItem[index].style = {};
		}
	}
}
