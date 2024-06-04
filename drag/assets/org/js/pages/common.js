export const common = () => {
	((d, w) => {
		w.addEventListener("load", () => {
			const url = "ice.json";

			fetch(url)
				.then((response) => {
					return response.json();
				})
				.then((jsondata) => {
					const initialData = jsondata;

					// 加工データ初期化
					let data = initialData;

					// 配列シャッフル
					function shuffle([...array]) {
						for (let i = array.length - 1; i >= 0; i--) {
							const j = Math.floor(Math.random() * (i + 1));
							[array[i], array[j]] = [array[j], array[i]];
						}
						return array;
					}

					// カード生成
					function addCard() {
						data = shuffle(data);
						for (let i = 0; i <= data.length - 1; i++) {
							const card = d.querySelector(`.js-${i + 1}`);
							if (card) {
								card.innerHTML = `<a href="#${data[i].name}" class="link">${data[i].name}</a>`;
								card.children[0].style.backgroundColor = data[i].color;
								setTimeout(() => {
									card.children[0].style.opacity = "1";
									card.children[0].style.transform = "translateY(0)";
								}, 100);
							}
						}
					}
					addCard();

					// カード削除
					function deleteCard() {
						for (let i = 0; i <= data.length - 1; i++) {
							const card = d.querySelector(`.js-${i + 1}`);
							if (card) {
								card.innerHTML = "";
							}
						}
					}

					// 変数定義
					const container = d.getElementById("js-container");
					const cover = d.getElementById("js-cover");
					const item1 = d.querySelector(".js-1");
					const links = [].slice.call(d.getElementsByClassName("link"));
					let coverWidth;
					let coverHeight;

					// 移動可能範囲設定
					function getMax(a, b) {
						return Math.max(a, b);
					}
					function getMin(a, b) {
						return Math.min(a, b);
					}
					function getLinkPos(pos) {
						const links = [].slice.call(d.getElementsByClassName("link"));
						return links.map((link) => {
							if (pos === "top") {
								return link.getBoundingClientRect().top;
							}
							if (pos === "bottom") {
								return link.getBoundingClientRect().bottom;
							}
							if (pos === "left") {
								return link.getBoundingClientRect().left;
							}
							if (pos === "right") {
								return link.getBoundingClientRect().right;
							}
						});
					}
					function getCoverHeight() {
						const coverCenter = {
							x: item1.getBoundingClientRect().left + item1.offsetWidth / 2,
							y: item1.getBoundingClientRect().top + item1.offsetHeight / 2,
						};
						coverWidth =
							getMax(
								coverCenter.x - getLinkPos("left").reduce(getMin),
								getLinkPos("right").reduce(getMax) - coverCenter.x,
							) * 2;
						coverHeight =
							getMax(
								coverCenter.y - getLinkPos("top").reduce(getMin),
								getLinkPos("bottom").reduce(getMax) - coverCenter.y,
							) * 2;
					}
					getCoverHeight();

					const margin = 10;
					function setCoverSize() {
						const containerWidth = container.offsetWidth;
						const containerHeight = container.offsetHeight;
						if (coverHeight > containerHeight) {
							cover.style.setProperty(
								"--coverHeight",
								`${coverHeight + margin * 2}px`,
							);
						} else {
							cover.style.setProperty("--coverHeight", "100%");
						}
						if (coverWidth > containerWidth) {
							cover.style.setProperty(
								"--coverWidth",
								`${coverWidth + margin * 2}px`,
							);
						} else {
							cover.style.setProperty("--coverWidth", "100%");
						}
					}
					setCoverSize();
					w.addEventListener("resize", setCoverSize);

					// リスト中央配置
					function setCenter() {
						container.scrollLeft =
							cover.offsetWidth / 2 - container.offsetWidth / 2;
						container.scrollTop =
							cover.offsetHeight / 2 - container.offsetHeight / 2;
					}
					setCenter();

					// ドラッグ移動
					let startX;
					let startY;

					let moveX = 0;
					let moveY = 0;

					let drag = false;
					let move = false;

					let scrollX;
					let scrollY;

					links.forEach((link) => {
						link.onclick = () => {
							if (move) {
								move = false;
								return false;
							}
						};
					});

					w.addEventListener("mousedown", (e) => {
						drag = true;
						startX = e.pageX;
						startY = e.pageY;
						scrollX = container.scrollLeft;
						scrollY = container.scrollTop;
					});

					w.addEventListener("mouseup", (e) => {
						drag = false;
					});

					w.addEventListener("mousemove", (e) => {
						e.preventDefault();
						if (drag) {
							moveX = startX - e.pageX;
							moveY = startY - e.pageY;
							if (moveX !== 0 || moveY !== 0) move = true;
							container.scrollLeft = scrollX + moveX;
							container.scrollTop = scrollY + moveY;
						}
					});

					// ソート
					function sort(dataset) {
						data = initialData;
						data = data.filter((obj) => {
							if (dataset.color) {
								return obj.color === dataset.color;
							}
							if (dataset.age) {
								return obj.age === dataset.age;
							}
							if (dataset.flavor) {
								return obj.flavor === dataset.flavor;
							}
							if (dataset.category) {
								return obj.category === dataset.category;
							}
						});
					}

					const sortBtns = [].slice.call(d.querySelectorAll(".js-sort"));
					for (const sortBtn of sortBtns) {
						sortBtn.addEventListener("click", () => {
							deleteCard();
							sort(sortBtn.dataset);
							addCard();
							getCoverHeight();
							setCoverSize();
							setCenter();
						});
					}

					// ソート解除
					const resetBtn = d.getElementById("js-reset");
					resetBtn.addEventListener("click", () => {
						deleteCard();
						data = initialData;
						addCard();
						getCoverHeight();
						setCoverSize();
						setCenter();
					});
				});
		});
	})(document, window);
};
