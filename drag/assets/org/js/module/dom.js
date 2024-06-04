export default class Dom {
	constructor(dom) {
		if (!dom) return false;
		this.dom = typeof dom === "string" ? document.querySelectorAll(dom) : dom;
	}

	html(htmlDocument) {
		let innerHtml;

		this._each(this.dom, (thisNode) => {
			if (htmlDocument) {
				thisNode.innerHTML = htmlDocument;
			} else {
				innerHtml = thisNode.innerHTML;
			}
		});

		return innerHtml ? innerHtml : this;
	}

	outerHtml(htmlDocument) {
		let outerHtml;

		this._each(this.dom, (thisNode) => {
			if (htmlDocument) {
				thisNode.outerHTML = htmlDocument;
			} else {
				outerHtml = thisNode.outerHTML;
			}
		});

		return outerHtml ? outerHtml : this;
	}

	text(text) {
		let textContent;

		this._each(this.dom, (thisNode) => {
			if (text) {
				thisNode.textContent = text;
			} else {
				textContent = thisNode.textContent;
			}
		});

		return textContent ? textContent : this;
	}

	css(keys, property) {
		let styleProperty;

		this._each(this.dom, (thisNode) => {
			if (typeof keys === "object") {
				Object.keys(keys).forEach(function (key) {
					thisNode["style"][key] = this[key];
				}, keys);
			} else {
				if (!property) {
					let style =
						thisNode.currentStyle || window.getComputedStyle(thisNode);
					style = style[keys];
					if (style === "auto") {
						switch (keys) {
							case "width":
								style = String(thisNode.offsetWidth);
								break;
							case "height":
								style = String(thisNode.offsetHeight);
								break;
						}
					}
					styleProperty = thisNode["style"][keys] || style;
				} else {
					thisNode["style"][keys] = property;
				}
			}
		});

		return styleProperty ? styleProperty : this;
	}

	attr(attributename, value) {
		let valueProperty;

		this._each(this.dom, (thisNode) => {
			if (value) {
				thisNode.setAttribute(attributename, value);
			} else {
				valueProperty = thisNode.getAttribute(attributename);
			}
		});

		return valueProperty ? valueProperty : this;
	}

	val(value) {
		let valueProperty;

		this._each(this.dom, (thisNode) => {
			if (value) {
				thisNode.setAttribute("value", value);
			} else {
				valueProperty = thisNode.getAttribute("value");
			}
		});

		return valueProperty ? valueProperty : this;
	}

	addEvent(eventtype, callback, boolean) {
		this._each(this.dom, (thisNode) => {
			thisNode.addEventListener(eventtype, callback, boolean || false);
		});

		return this;
	}

	hasClass(classname) {
		let flag;

		this._each(this.dom, (thisNode) => {
			const classArray = thisNode.className.split(" ");
			flag = classArray.indexOf(classname) >= 0;
		});

		return flag;
	}

	addClass(classname) {
		this._each(this.dom, (thisNode) => {
			const classArray = thisNode.className.split(" ");
			const index = classArray.indexOf(classname);

			if (index === -1) {
				classArray.push(classname);
				thisNode.className = this._trim(classArray.join(" "));
			}
		});

		return this;
	}

	removeClass(classname) {
		this._each(this.dom, (thisNode) => {
			const classArray = thisNode.className.split(" ");
			const index = classArray.indexOf(classname);
			if (index >= 0) {
				classArray.splice(index, 1);
				thisNode.className = this._trim(classArray.join(" "));
			}
		});

		return this;
	}

	toggleClass(classname) {
		this._each(this.dom, (thisNode) => {
			const classArray = thisNode.className.split(" ");
			const index = classArray.indexOf(classname);

			if (index >= 0) {
				classArray.splice(index, 1);
			} else {
				classArray.push(classname);
			}

			thisNode.className = this._trim(classArray.join(" "));
		});

		return this;
	}

	append(appendNode) {
		this._each(this.dom, (thisNode) => {
			thisNode.appendChild(appendNode);
		});
		return this;
	}

	preppend(preppendNode) {
		this._each(this.dom, (thisNode) => {
			thisNode.insertBefore(preppendNode, thisNode.firstChild);
		});
		return this;
	}

	children() {
		let childNodes;

		this._each(this.dom, (thisNode) => {
			childNodes = thisNode.children.length ? thisNode.children : false;
		});
		return childNodes;
	}

	parent() {
		let parentNode;

		this._each(this.dom, (thisNode) => {
			parentNode = thisNode.parentNode;
		});
		return parentNode;
	}

	eq(index) {
		this.dom = this.dom.length ? this.dom[index] : this.dom;

		return this;
	}

	size() {
		const length = this.dom.length || 0;

		return length;
	}

	clones() {
		const cloneArray = [];

		this._each(this.dom, (thisNode) => {
			cloneArray.push(thisNode.cloneNode(true));
		});
		return cloneArray;
	}

	offset() {
		const positionObject = {};

		this._each(this.dom, (thisNode) => {
			positionObject.left = thisNode.getBoundingClientRect().left + pageXOffset;
			positionObject.top = thisNode.getBoundingClientRect().top + pageYOffset;
		});

		return positionObject;
	}

	each(callback) {
		if (this.dom.length) {
			for (let index = 0; index < this.dom.length; index++) {
				callback(this.dom[index], index);
			}
		} else {
			callback(this.dom, 0);
		}

		return this;
	}

	_each(dom, callback) {
		if (dom.length) {
			for (let index = 0; index < dom.length; index++) {
				callback(dom[index]);
			}
		} else {
			callback(dom);
		}
	}

	_trim(string) {
		return string.replace(/^\s+|\s+$/g, "");
	}
}
