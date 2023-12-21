let container = null;
let iFrameYT = null;
const containerSize = { width: 0, height: 0 };
const cardSize = { width: 0, height: 0 };

const onWindowResize = (e) => {
  console.log(e);
  console.log(e.currentTarget);
};
const onTransitionStart = (e) => {
  const card = e.currentTarget;
  card.style.zIndex = 1;
};
const onTransitionEnd = (e) => {
  const card = e.currentTarget;
  if (!card.classList.contains("fullscreen")) {
    card.style.width = null;
    card.style.height = null;
    card.style.zIndex = null;
    container.style.maxHeight = null;
    const yt = card.querySelector(".yt");
    if (yt) {
      yt.style.width = null;
      yt.style.height = null;
    }
  }
};

const onClick = (e) => {
  const card = e.currentTarget;
  const title = card.querySelector(".title");
  if (card.classList.contains("fullscreen")) {
    card.style.transform = null;
    card.style.width = cardSize.width + "px";
    card.style.height = null;
    card.style.borderRadius = "1rem";
    title.style.backgroundColor = null;
    title.style.padding = null;
  } else {
    // title.style.backgroundColor = "cornflowerblue";
    title.style.padding = "1rem";
    container.style.maxHeight = containerSize.height + "px";
    card.style.width = cardSize.width + "px";
    const yt = card.querySelector(".yt");
    if (yt) {
      yt.style.width = window.innerWidth + "px";
      yt.style.height = window.innerHeight + "px";
    }
    //
    const coord = card.getBoundingClientRect();
    card.style.transform = `translate(-${Math.ceil(coord.x)}px, -${Math.ceil(
      coord.y
    )}px)`;
    card.style.width = window.innerWidth + "px";
    card.style.height = window.innerHeight + "px";
    card.style.borderRadius = 0;
    //
    // card.style.height = cardSize.height + "px";
    // const x = window.innerWidth / 2 - size.width / 2;
    // const y = window.innerHeight / 2 - size.height / 2;
    // card.style.transform = `translate(${x - coord.x}px, ${y - coord.y}px)`;
    // card.style.transformOrigin = 'left';
  }
  card.classList.toggle("fullscreen");
};

(function () {
  window.addEventListener("resize", onWindowResize);
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", onClick);
    card.addEventListener("transitionstart", onTransitionStart);
    card.addEventListener("transitionend", onTransitionEnd);
    if (!cardSize.width || !cardSize.height) {
      cardSize.width = card.clientWidth;
      cardSize.height = card.clientHeight;
      container = document.querySelector(".container");
      containerSize.height = container.clientHeight;
      iFrameYT = document.querySelector(".yt");
    }
  });
})();
