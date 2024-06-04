import extend from "./extend";

export default class ZoomImage {
	constructor(config) {
		this.config = {
			boxClass: "js-zoomBox",
			imageClass: "js-zoomImage",
			clickStart: true,
			responsiveSettings: [
				{
					width: 999999, //  less than
					zoomType: "window", // inner or window or false
				},
				{
					width: 960,
					zoomType: "inner",
				},
				{
					width: 767,
					zoomType: "inner",
				},
			],
			initializeCallback: (element) => {},
		};
		if (config) extend(this.config, config);

		if (document.getElementsByClassName(this.config.boxClass))
			this._initialize();
	}

	_initialize() {
		this.boxes = document.getElementsByClassName(this.config.boxClass);
		this.zoomWindow = document.getElementsByClassName("js-zoomWindow")[0];
		this.zoomingClass = "add-zooming";
		this.loadingClass = "add-zoomloading";
		this.loadedClass = "add-zoomloaded";
		this.zoomableClass = "add-zoomable";
		this.hideLayerClass = "zoomHideLayer";
		this.zoomLensClass = "zoomLens";
		this.zoomFlg = false;
		this.zoomImgClass = "zoomImage";
		this.zoomImgSizes = [];
		this.zoomType = this._getZoomType();
		this._pointerOutEvent = this._pointerOutEvent.bind(this);
		this._zoomElements = this._zoomElements.bind(this);
		this._pointerInEvent = this._pointerInEvent.bind(this);
		this._setZoomElements();
		this._setEventListener();
	}
	_setEventListener() {
		this._each((box, index) => {
			const ThisElement = box;
			this._setPointerInEvent(ThisElement, index);
			this._setPointerOutEvent(ThisElement, index);
			this._setPointerMoveEvent(ThisElement, index);
		});
	}
	_setPointerMoveEvent(thisElement, index) {
		const ThisConfig = this.zoomImgSizes[index];

		thisElement.addEventListener("mousemove", (e) => {
			this._pointerMoveEvent(ThisConfig, thisElement, e);
		});
		thisElement.addEventListener("touchmove", (e) => {
			this._pointerMoveEvent(ThisConfig, thisElement, e);
		});
	}
	_pointerMoveEvent(thisConfig, thisElement, e) {
		if (
			thisConfig.isZoomable &&
			this.zoomFlg &&
			thisElement.className.split(" ").indexOf(this.zoomingClass) > -1
		) {
			e.stopPropagation();
			e.preventDefault();
			switch (this.zoomType) {
				case "inner":
					this._setInnerZoomImagePosition(thisElement, e, thisConfig);
					break;
				case "window":
					this._setWindowZoomImagePosition(thisElement, e, thisConfig);
					break;
			}
		}
	}
	_setPointerInEvent(thisElement, index) {
		const ThisConfig = this.zoomImgSizes[index];

		if (this.config.clickStart) {
			thisElement.addEventListener("click", (e) => {
				const Target = e.currentTarget;

				if (!ThisConfig.isZoomable || !this.zoomType) return false;
				if (
					thisElement.className.split(" ").indexOf(this.zoomingClass) === -1
				) {
					switch (this.zoomType) {
						case "inner":
							this._setInnerZoomImage(Target, index);
							this._setInnerZoomImagePosition(thisElement, e, ThisConfig);
							break;
						case "window":
							this._setWindowZoomImage(Target, index);
							this._setWindowZoomImagePosition(thisElement, e, ThisConfig);
							break;
					}

					thisElement.className += " " + this.zoomingClass;
					this.zoomFlg = true;
				} else {
					switch (this.zoomType) {
						case "inner":
							this._removeInnerZoomImage(Target);
							break;
						case "window":
							this._removeWindowZoomImage(Target);
							break;
					}

					thisElement.className = thisElement.className.replace(
						" " + this.zoomingClass,
						"",
					);
					this.zoomFlg = false;
				}
			});
		} else {
			thisElement.addEventListener(
				"mouseenter",
				this._pointerInEvent(thisElement, index, thisConfig),
			);
			thisElement.addEventListener(
				"touchstart",
				this._pointerInEvent(thisElement, index, thisConfig),
			);
		}
	}
	_pointerInEvent(thisElement, index, thisConfig) {
		return () => {
			if (!thisConfig.isZoomable || !this.zoomType) return false;
			switch (this.zoomType) {
				case "inner":
					this._setInnerZoomImage(thisElement, index);
					break;
				case "window":
					this._setWindowZoomImage(thisElement, index);
					break;
			}
			thisElement.className += " " + this.zoomingClass;
			this.zoomFlg = true;
		};
	}
	_setPointerOutEvent(thisElement) {
		thisElement.addEventListener(
			"mouseleave",
			this._pointerOutEvent(thisElement),
		);
		thisElement.addEventListener(
			"touchend",
			this._pointerOutEvent(thisElement),
		);
	}
	_pointerOutEvent(thisElement) {
		return () => {
			if (thisElement.className.split(" ").indexOf(this.zoomingClass) > -1) {
				switch (this.zoomType) {
					case "inner":
						this._removeInnerZoomImage(thisElement);
						break;
					case "window":
						this._removeWindowZoomImage(thisElement);
						break;
				}

				thisElement.className = thisElement.className.replace(
					" " + this.zoomingClass,
					"",
				);
				this.zoomFlg = false;
			}
		};
	}
	_setZoomElements() {
		this._each((box, index) => {
			const ThisImage = box.getElementsByClassName(this.config.imageClass)[0];
			const Config = (this.zoomImgSizes[index] = {
				imageSrc: ThisImage.getAttribute("src"),
				zoomSrc: ThisImage.getAttribute("data-zoomSrc"),
				width: null,
				height: null,
				zoomWidth: null,
				zoomHeight: null,
				isZoomable: false,
				isLoaded: false,
				magnification: null,
				aspectRatio: null,
			});

			const NormalImage = new Image();
			NormalImage.src = Config.imageSrc;
			NormalImage.addEventListener("load", () => {
				this._setImageSize(ThisImage, Config);
				this._setIsZoomable(Config, box);
			});

			ThisImage.addEventListener(
				"mouseenter",
				this._zoomElements(Config, box, false),
			);
			ThisImage.addEventListener(
				"touchstart",
				this._zoomElements(Config, box, false),
			);

			let resizeTimer = false;
			window.addEventListener("resize", () => {
				if (resizeTimer !== false) {
					clearTimeout(resizeTimer);
				}
				resizeTimer = setTimeout(() => {
					this._setImageSize(ThisImage, Config);
					this._setMagnification(Config);
					this.zoomType = this._getZoomType();
					resizeTimer = false;
				}, 200);
			});
		});
	}
	_zoomElements(thisConfig, box, zoomLoadFlg) {
		return () => {
			if (!this.zoomType) return false;
			if (!zoomLoadFlg) {
				const ZoomImage = new Image();
				ZoomImage.className = this.zoomImgClass;
				ZoomImage.src = thisConfig.zoomSrc;

				box.className += " " + this.loadingClass;

				ZoomImage.addEventListener("load", () => {
					this._setZoomImageSize(ZoomImage, thisConfig);
					this._setIsZoomable(thisConfig, box);
					box.className = box.className.replace(" " + this.loadingClass, "");
					box.className += " " + this.loadedClass;

					thisConfig.aspectRatio = ZoomImage.height / ZoomImage.width;
				});
				zoomLoadFlg = true;
			}
		};
	}

	_setInnerZoomImage(thisElement, index) {
		const ZoomImage = document.createElement("img");
		ZoomImage.className = this.zoomImgClass;
		ZoomImage.src = this.zoomImgSizes[index].zoomSrc;

		const styles = ZoomImage.style;
		styles.position = "absolute";
		styles.opacity = 1;

		thisElement.appendChild(ZoomImage);

		ZoomImage.style.opacity = 1;
	}

	_setWindowZoomImage(thisElement, index) {
		//zoomwindow
		this.zoomWindow.style.display = "block";
		this.zoomWindow.style.height =
			this.zoomWindow.offsetWidth * this.zoomImgSizes[index].aspectRatio + "px";
		this.zoomWindow.style.backgroundImage =
			"url(" + this.zoomImgSizes[index].zoomSrc + ")";

		//lens
		const ZoomLens = document.createElement("div");
		ZoomLens.className = this.zoomLensClass;

		const Styles = ZoomLens.style;
		Styles.position = "absolute";
		const LensWidth =
			thisElement.getElementsByClassName(this.config.imageClass)[0]
				.offsetWidth *
			(this.zoomWindow.offsetWidth / this.zoomImgSizes[index].zoomWidth);
		Styles.width = LensWidth + "px";
		Styles.height = LensWidth * this.zoomImgSizes[index].aspectRatio + "px";
		Styles.backgroundImage = "url(" + this.zoomImgSizes[index].imageSrc + ")";
		Styles.backgroundSize = this.zoomImgSizes[index].width + "px";
		Styles.top = 0;
		Styles.left = 0;
		Styles.zIndex = 2;

		thisElement.appendChild(ZoomLens);

		//masklayer
		const HideLayer = document.createElement("div");
		HideLayer.className = this.hideLayerClass;

		const Styles2 = HideLayer.style;
		Styles2.position = "absolute";
		Styles2.backgroundColor = "rgba(0,0,0,0.5)";
		Styles2.top = "0";
		Styles2.right = "0";
		Styles2.bottom = "0";
		Styles2.left = "0";

		thisElement.appendChild(HideLayer);
	}

	_removeInnerZoomImage(thisElement) {
		thisElement.removeChild(
			thisElement.getElementsByClassName(this.zoomImgClass)[0],
		);
	}

	_removeWindowZoomImage(thisElement) {
		this.zoomWindow.style.display = "none";
		thisElement.removeChild(
			thisElement.getElementsByClassName(this.hideLayerClass)[0],
		);
		thisElement.removeChild(
			thisElement.getElementsByClassName(this.zoomLensClass)[0],
		);
	}

	_setInnerZoomImagePosition(thisElement, event, thisConfig) {
		const Rect = thisElement.getBoundingClientRect();
		const Left =
			((typeof event.touches === "undefined"
				? event.clientX
				: event.touches[0].clientX) -
				Rect.left) *
			(thisConfig.magnification - 1) *
			-1;
		const Top =
			((typeof event.touches === "undefined"
				? event.clientY
				: event.touches[0].clientY) -
				Rect.top) *
			(thisConfig.magnification - 1) *
			-1;

		thisElement.getElementsByClassName(this.zoomImgClass)[0].style.left =
			Left + "px";
		thisElement.getElementsByClassName(this.zoomImgClass)[0].style.top =
			Top + "px";
	}

	_setWindowZoomImagePosition(thisElement, event, thisConfig) {
		const Lens = thisElement.getElementsByClassName(this.zoomLensClass)[0];

		const Rect = thisElement.getBoundingClientRect();
		const Left =
			(typeof event.touches === "undefined"
				? event.clientX
				: event.touches[0].clientX) -
			Rect.left -
			Lens.offsetWidth / 2;
		const Top =
			(typeof event.touches === "undefined"
				? event.clientY
				: event.touches[0].clientY) -
			Rect.top -
			Lens.offsetHeight / 2;
		//lens
		if (Left < 0) {
			Left = 0;
		} else if (Left > thisElement.offsetWidth - Lens.offsetWidth) {
			Left = thisElement.offsetWidth - Lens.offsetWidth;
		}
		if (Top < 0) {
			Top = 0;
		} else if (Top > thisElement.offsetHeight - Lens.offsetHeight) {
			Top = thisElement.offsetHeight - Lens.offsetHeight;
		}
		Lens.style.left = Left + "px";
		Lens.style.top = Top + "px";
		Lens.style.backgroundPosition = Left * -1 + "px" + " " + Top * -1 + "px";

		//window
		this.zoomWindow.style.backgroundPosition =
			Left * thisConfig.magnification * -1 +
			"px" +
			" " +
			Top * thisConfig.magnification * -1 +
			"px";
	}

	_setIsZoomable(thisConfig, element) {
		if (thisConfig.isLoaded) {
			thisConfig.isZoomable = true;
			this._setMagnification(thisConfig);

			element.className += " " + this.zoomableClass;
			this.config.initializeCallback(element);
		} else {
			thisConfig.isLoaded = true;
			return false;
		}
	}
	_setMagnification(thisConfig) {
		thisConfig.magnification = thisConfig.zoomWidth / thisConfig.width;
	}
	_setImageSize(thisImage, thisConfig) {
		thisConfig.width = thisImage.width;
		thisConfig.height = thisImage.height;
	}
	_setZoomImageSize(thisImage, thisConfig) {
		thisConfig.zoomWidth = thisImage.width;
		thisConfig.zoomHeight = thisImage.height;
	}
	_each(callback) {
		for (let index = 0; index < this.boxes.length; index++) {
			callback(this.boxes[index], index);
		}
	}
	_getZoomType() {
		const Width = document.documentElement.clientWidth;
		let type = null;

		for (
			let index = 0;
			index < this.config.responsiveSettings.length;
			index++
		) {
			if (this.config.responsiveSettings[index].width >= Width) {
				type = this.config.responsiveSettings[index].zoomType;
			}
		}
		return type === null ? "inner" : type;
	}

	destroy() {
		this.zoomImgSizes = [];
		this._each((box, index) => {
			box.className = box.className.replace(" " + this.zoomableClass, "");
			box.className = box.className.replace(" " + this.zoomingClass, "");
			box.className = box.className.replace(" " + this.loadedClass, "");
			box.className = box.className.replace(" " + this.loadingClass, "");

			box.outerHTML = box.outerHTML;
		});
	}
}
