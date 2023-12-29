/* parallax effect */
const parallax_els = document.querySelectorAll('.parallax');
let xValue = 0, yValue = 0;
window.addEventListener('mousemove', (e) => {
  xValue = e.clientX - window.innerWidth/2;
  yValue = e.clientY - window.innerHeight/2;

  parallax_els.forEach((el)=>{
    const speed = el.dataset.speed;
    el.style.transform = `translateX(calc(-50% + ${-xValue * speed}px)) translateY(calc(-50% + ${yValue * speed}px))`;
  })
});


let container = null;
const containerSize = { width: 0, height: 0 };
const cardSize = { width: 0, height: 0 };

const onWindowResize = (e) => {
  console.log(e);
  console.log(e.currentTarget);
  parallax_els.forEach((el)=>{
    el.style.transform = null;
  })
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
    title.style.backgroundColor = null;
    title.style.padding = null;
  } else {
    console.log('go fullscreen:')
    // title.style.backgroundColor = "cornflowerblue";
    // title.style.padding = "1rem";
    container.style.maxHeight = containerSize.height + "px";
    card.style.width = cardSize.width + "px";
    const yt = card.querySelector(".yt");
    if (yt) {
      yt.style.width = window.innerWidth + "px";
      yt.style.height = window.innerHeight + "px";
    }
    //
    const coord = card.getBoundingClientRect();
    console.log('coord',coord)
    // card.style.transform = `translate(-${Math.ceil(coord.x)}px, -${Math.ceil(
    //   coord.y
    // )}px)`;
    card.style.transform = `translate(0px, -${Math.ceil(
      coord.y
    )}px)`;
    card.style.width = window.innerWidth + "px";
    card.style.height = window.innerHeight + "px";
    card.style.borderRadius = 0;
    console.log('width',window.innerWidth,'height',window.innerHeight)
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
      console.log('cardSize',cardSize)

      container = document.querySelector(".container");
      containerSize.height = container.clientHeight;
      console.log('containerSize',containerSize)      
    }
  });
})();
