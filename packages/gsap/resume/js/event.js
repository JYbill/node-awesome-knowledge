$("#arrowBtn").on("mouseenter", (e) => {
  gsap.to(".arrow", {
    y: 10,
    duration: 0.8,
    ease: "back.inOut(3)",
    overwrite: "auto",
  });
});
$("#arrowBtn").on("mouseleave", (e) => {
  gsap.to(".arrow", {
    y: 0,
    duration: 0.5,
    ease: "power3.out",
    overwrite: "auto",
  });
});
$("#arrowBtn").on("click", (e) => {
  gsap.to(window, {
    scrollTo: 1000,
    duration: 1.5,
    ease: "power1.inOut",
  });
});
