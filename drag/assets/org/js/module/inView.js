import extend from "./extend";
export default class InView {
	constructor(config) {
		this.config = {
			elemment: document.getElementsByClassName("js-inView"),
			reference: window,
			className: "add-inView",
			visibleType: "top", // String [ top , middle , bottom ] or Number
			responsive: false,
			reverse: false,
			callback: () => {},
		};
		this._execute = this._execute.bind(this);
		this.count = 0;
		if (config) extend(this.config, config);
		if (this.config.elemment) this._initialize();
	}
	_initialize() {
		this._execute();
		this.config.reference.addEventListener("scroll", this._execute);
		this.config.reference.addEventListener("resize", this._execute);
	}
	_dispose() {
		this.config.reference.removeEventListener("scroll", this._execute);
		this.config.reference.removeEventListener("resize", this._execute);
	}
	_execute() {
		for (let index = 0; index < this._getElemmentLength(); index++) {
			this._jadgeInView(this.config.elemment[index]);
		}
	}
	_getElemmentLength() {
		return this.config.elemment.length;
	}
	_hasClass(thisObject) {
		return (
			thisObject.className.split(" ").indexOf(this.config.className) !== -1
		);
	}
	_getReferenceOffset() {
		return this.config.reference === window
			? window.pageYOffset
			: this.config.reference.scrollTop;
	}
	_getThisOffset(thisObject, visibleType) {
		const Offset =
			thisObject.getBoundingClientRect().top + this._getReferenceOffset();
		let range = typeof visibleType === "number" ? visibleType : 0;
		if (visibleType === "middle") {
			range = thisObject.offsetHeight / 2;
		} else if (visibleType === "bottom") {
			range = thisObject.offsetHeight;
		}
		return Offset + range;
	}
	_jadgeInView(thisObject) {
		const Offset = this._getThisOffset(thisObject, this.config.visibleType);
		if (this._getReferenceOffset() + innerHeight >= Offset) {
			if (!this._hasClass(thisObject)) {
				thisObject.className += " " + this.config.className;
				thisObject.className = thisObject.className.replace(/^\s|\s$/g, "");
				this.config.callback(thisObject);
				if (!this.config.reverse) {
					this.count++;
					if (this._getElemmentLength() === this.count) this._dispose();
				}
			}
		} else {
			if (this.config.reverse) {
				if (this._hasClass(thisObject)) {
					const DeleteClass = " " + thisObject.className + " ";
					thisObject.className = DeleteClass.replace(
						" " + this.config.className + " ",
						"",
					).replace(/^\s|\s$/g, "");
					this.config.callback(thisObject);
				}
			}
		}
	}
}
