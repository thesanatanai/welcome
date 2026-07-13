gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

// Set initial states to prevent FOUC (flash of unstyled content)
gsap.set(".bg-image", { scale: 0.6, opacity: 0 });
gsap.set(".logoTxt", { opacity: 0 });

// 1. Hero Zoom-Through and Parallax Scroll Animation
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".wrapper",
    start: "top top",
    end: "+=300%", // Smoother scroll duration
    pin: true,
    scrub: 1,
    markers: false,
  },
});

tl.to(".content", {
  scale: 4.5,
  opacity: 0,
  duration: 3,
  ease: "power1.inOut"
}, 0);

// Slide side text layers outwards to simulate camera fly-through
tl.to(".side-1", {
  x: -250,
  y: -100,
  duration: 3,
  ease: "power1.inOut"
}, 0);

tl.to(".side-2", {
  x: 250,
  y: 100,
  duration: 3,
  ease: "power1.inOut"
}, 0);

// Transition the logo elements from background to main focus
tl.to(".bg-image", {
  scale: 1,
  opacity: 1,
  duration: 2.5,
  ease: "power2.out"
}, 1.2);

tl.to(".logoTxt", {
  opacity: 1,
  duration: 2,
  ease: "power2.out"
}, 1.8);

// Animate letters of logo text as it is revealed
const logoSplit = new SplitText(".logoTxt", { type: "chars" });
tl.from(logoSplit.chars, {
  y: 40,
  opacity: 0,
  stagger: 0.08,
  duration: 1.5,
  ease: "back.out(1.5)"
}, 2.2);

// 2. Info Section (Section 2) Reveal
const sectionNext = document.querySelector(".section-next");
if (sectionNext) {
  const sectionNextH1 = sectionNext.querySelector("h1");
  const sectionNextP = sectionNext.querySelector("p");
  const sectionNextH1Split = new SplitText(sectionNextH1, { type: "chars" });

  const tlInfo = gsap.timeline({
    scrollTrigger: {
      trigger: sectionNext,
      start: "top 75%",
      toggleActions: "play none none reverse",
    }
  });

  tlInfo.from(sectionNextH1Split.chars, {
    y: 30,
    opacity: 0,
    stagger: 0.04,
    duration: 0.6,
    ease: "back.out(1.8)"
  })
    .from(sectionNextP, {
      y: 35,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3");
}

// 3. Features Section (Section 3) Reveal
const featureSection = document.querySelector(".section");
if (featureSection) {
  const sectionTitle = featureSection.querySelector(".section-title");
  const titleSplit = new SplitText(sectionTitle, { type: "chars" });

  const tlFeatures = gsap.timeline({
    scrollTrigger: {
      trigger: featureSection,
      start: "top 75%",
      toggleActions: "play none none reverse",
    }
  });

  tlFeatures.from(titleSplit.chars, {
    y: 30,
    opacity: 0,
    stagger: 0.04,
    duration: 0.6,
    ease: "back.out(1.8)"
  })
    .to(".feature-card", {
      y: -50,
      opacity: 1,
      scale: 1,
      stagger: 0.12,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
}

// 4. CTA and Footer Section (Section 4) Reveal
const sectionsList = document.querySelectorAll(".section-next");
if (sectionsList.length > 1) {
  const ctaSection = sectionsList[1];
  const ctaH3 = ctaSection.querySelector("h3");
  const ctaH1 = ctaSection.querySelector("h1");
  const ctaButton = ctaSection.querySelector(".visit");
  const ctaFooter = ctaSection.querySelector(".footer");

  const tlCTA = gsap.timeline({
    scrollTrigger: {
      trigger: ctaSection,
      start: "top 80%",
      toggleActions: "play none none reverse",
    }
  });

  tlCTA.from(ctaH3, {
    y: 20,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out"
  })
    .from(ctaH1, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.5)"
    }, "-=0.3")
    .to(ctaButton, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(2)"
    }, "-=0.2")
    .from(ctaFooter, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.2");
}

window.addEventListener("load", () => document.querySelector("div.loader-parent").classList.add("hide"));