// Timeline for the assemblage of the Audible logo
const logoAssemble = gsap.timeline().pause();
// Timeline for the text
const text = gsap.timeline().pause();
// Timeline for the fliping icons and text
const icons = gsap.timeline().pause();
// Timeline Audible logo
const audi = gsap.timeline().pause();
// Timeline CTA
const ctaTl = gsap.timeline().pause();
// Timeline swiper/slider gallery
const swipeGall = gsap.timeline().pause();

// 1. Audio wave animation
let z;
let yoff = 0.0;
let song;
let bgSong;
let switchSong = false;

function preload() {
  //soundFormats('ogg', 'mp3');
  song = loadSound("sound/whyAudible.mp3");
  //song = loadSound("sound/JarrodRadnich.ogg");
  bgSong = loadSound("sound/audibleAd.mp3");
  //bgSong = loadSound("sound/legendsOfAzeroth.ogg");
}
// create canvas
function setup() {
  createCanvas(900, 450);
  stroke(252, 243, 238);
  song.play();
  song.setVolume(0.02);
  song.loop();
  z = height;

  //console.log(song)
}
function draw() {
  background(248, 153, 28);
  fill(252, 243, 238);
  strokeWeight(3);
  beginShape();
  let xoff = 0;
  for (let x = 0; x <= width; x += 1) {
    let y = map(noise(yoff, xoff), 0, 0.1, z / 1.5, z);
    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.5;
  }
  // movement speed
  z = z - 0.7;
  yoff += 0.02;
  // hides canvas and begins TLs
  if (z <= 0 && !switchSong) {
    song.setVolume(0.006);
    canvas.style.zIndex = "-500";
    document.querySelector(".container").style.opacity = "1";
    logoAssemble.play();
    //bgSong.play();
    setTimeout(backSong, 15000);
    switchSong = true;
    bgSong.setVolume(0.05);
  }
  function backSong() {
    song.stop();
    bgSong.play();
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

// centers all the separate parts of the logo
gsap.set("#lo1,#lo2,#lo3,#lo4", {
  xPercent: -50,
  yPercent: -50,
  transformOrigin: "50% 50%",
});
// 2. begins the logo and text timeline
logoAssemble
  .to("#lo1", {
    duration: 2,
    delay: 1,
    immediateRender: true,
    motionPath: {
      path: [
        { x: 450, y: 450 },
        { x: 450, y: 255 },
      ],
      fromCurrent: false,
    },
    autoAlpha: 1,
  })
  .to("#lo2", {
    duration: 1.5,
    immediateRender: true,
    motionPath: {
      path: [
        { x: 450, y: 0 },
        { x: 450, y: 242 },
      ],
      fromCurrent: false,
    },
    autoAlpha: 1,
    ease: "bounce.out",
  })
  .to("#lo3", {
    duration: 1.5,
    immediateRender: true,
    motionPath: {
      path: [
        { x: 450, y: 0 },
        { x: 450, y: 225 },
      ],
      fromCurrent: false,
    },
    autoAlpha: 1,
    ease: "bounce.out",
  })
  .to("#lo4", {
    duration: 1.5,
    immediateRender: true,
    motionPath: {
      path: [
        { x: 450, y: 0 },
        { x: 450, y: 207 },
      ],
      fromCurrent: false,
    },
    autoAlpha: 1,
    ease: "bounce.out",
    onComplete: function () {
      text.play();
    },
  })
  .to("#lo1, #lo2, #lo3, #lo4", {
    duration: 1.5,
    ease: "elastic.in(1, 0.5)",
    scale: 0.5,
    autoAlpha: 0,
  })
  .to("#lo1, #lo2, #lo3, #lo4", {
    duration: 2,
    ease: "elastic.out(1, 0.5)",
    scale: 1,
    autoAlpha: 1,
  })
  .to("#lo1, #lo2, #lo3, #lo4", {
    duration: 3,
    delay: 1.5,
    autoAlpha: 0,
    onComplete: function () {
      audi.play();
    },
  });

// shows text
text
  .to(".texts", {
    text: `Hör die Welt <br> mit anderen Augen.`,
    duration: 3,
    ease: "linear",
  })
  .to(".texts", {
    autoAlpha: 0,
    delay: 1.5,
    duration: 3,
    onComplete: function () {
      icons.play();
    },
  });

// 3. begins icon timeline
icons.to(".icon", {
  autoAlpha: 1,
  delay: 2,
  duration: 2,
  stagger: 1.2,
  y: -450,
});

// flip icons and associated text
const flipOne = gsap.utils.toArray(".flip_1");
const flipTwo = gsap.utils.toArray(".flip_2");
const flipThree = gsap.utils.toArray(".flip_3");
const flipFour = gsap.utils.toArray(".flip_4");

function doFlip(x) {
  // Get the initial states
  const stateOne = Flip.getState(flipOne);
  const stateTwo = Flip.getState(flipTwo);
  const stateThree = Flip.getState(flipThree);
  const stateFour = Flip.getState(flipFour);

  // Switch Statement to perform different actions based on different elements clocked.
  switch (x) {
    case "flip_1":
      swap(flipOne);
      break;
    case "flip_2":
      swap(flipTwo);
      break;
    case "flip_3":
      swap(flipThree);
      break;
    case "flip_4":
      swap(flipFour);
      break;
    default:
      alert("error");
      break;
  }

  // Animate from the initial state to the end state
  Flip.from(stateOne, { duration: 2, ease: "power1.inOut" });
  Flip.from(stateTwo, { duration: 2, ease: "power1.inOut" });
  Flip.from(stateThree, { duration: 2, ease: "power1.inOut" });
  Flip.from(stateFour, { duration: 2, ease: "power1.inOut" });
}

// Given an Array of two siblings, append the one that's first so it's last (swap)
function swap([a, b]) {
  a.parentNode.children[0] === a
    ? a.parentNode.appendChild(a)
    : a.parentNode.appendChild(b);
}

// click on the icons to flip
let flipIcon = document.querySelectorAll(".flip_1, .flip_2, .flip_3, .flip_4");
// for statement to always choose the first class of each DOM element
for (let j = 0; j < flipIcon.length; j++) {
  flipIcon[j].addEventListener("click", function () {
    doFlip(flipIcon[j].classList[0]);
  });
}

// begins Audible text logo timeline
audi
  .to(".audible", {
    scale: 0.7,
  })
  .to(".audible", {
    scale: 1,
    autoAlpha: 1,
    duration: 1,
    onComplete: function () {
      swipeGall.play();
    },
  });
// begins swiper timeline
swipeGall
  .to(".swiper-container", {
    autoAlpha: 0,
    delay: 5,
  })
  .to(".swiper-container", {
    duration: 3,
    autoAlpha: 1,
    onComplete: function () {
      ctaTl.play();
    },
  });
// creates swipe and loop effect
let swiper = new Swiper(".swiper-container", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 20,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: true,
  },
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});
// begins cta timeline
ctaTl.to(".cta", {
  autoAlpha: 1,
  duration: 2,
  delay: 1,
});
