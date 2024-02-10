// 注册插件
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// 全局变量
const totalHeight = 12000; // html总高度
let scrubTime = 1; // 滚动延迟
const stagger = -0.6; // item延迟
const startTranslateTime = 2.3; // translateZ动画开始时间

// 不同设备做处理
const mobileReg =
  /(iphone|ipod|ipad|android|blackberry|nokia|webos|bada|symbian|palm|windows\s+ce|windows\s+phone|mobile|tablet)/i;
const isMobile = Boolean(navigator.userAgent.match(mobileReg));
if (!isMobile) {
  // PC端增加数据
  const imgGroupEl = document.querySelector("#imgGroup");
  const imgGroupHtml = `<img draggable="false" src="./images/forg1.png" data-x="-200" data-y="200" alt="xiaoqinvar一位全栈开发员">
  <img draggable="false" src="./images/passport.png" data-x="-60" data-y="-10" alt="Passport.js">
  <img draggable="false" src="./images/apple.png" data-x="-500" data-y="50" alt="Apple">
  ${imgGroupEl.innerHTML}<img draggable="false" src="./images/fullstack.png" data-x="300" data-y="-120" alt="Full Stack Developer">`;
  imgGroupEl.innerHTML = imgGroupHtml;

  // detail事件
  document.getElementById("detail").onclick = closeDetail;
}

// 加载动画
const loadingTween = gsap.to(".loading .wrapper", {
  y: 50,
  repeat: -1,
  yoyo: true,
  duration: 0.8,
  ease: "back.out(0.5)",
});

window.onload = () => {
  gsap.delayedCall(1.5, () => {
    loadingTween.kill();
    gsap.to("#app .loading", {
      y: "-100%",
      opacity: 0.2,
      duration: 1,
      onStart() {
        gsap.to(window, {
          scrollTo: 0,
          duration: 1,
          ease: "power1.inOut",
        });
      },
    });
  });

  gsap.set("#headerScroll", {
    width: "100%",
    height: totalHeight,
    backgroundColor: "#000",
    zIndex: -2,
  });
  gsap.set(".header", {
    position: "fixed",
    background: "#fff",
    width: "100%",
    maxWidth: "1200px",
    height: "100%",
    zIndex: 1, // debug
    top: 0,
    left: "50%",
    x: "-50%",
  });

  // 初始化imageGroup
  gsap.set("#app .main, #imgGroup, #app .info", {
    opacity: 1,
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    perspective: 300,
  });
  gsap.set("#app .main img", {
    position: "absolute",
    attr: {
      id: (index, el, _imgList) => {
        initImg(index, el);
        return "img" + index;
      },
    },
  });
  const tl = gsap.timeline({
    defaults: { duration: 1 },
    onUpdate: () => {
      if (gsap.getProperty("#cursorClose", "opacity") == 1) {
        closeDetail();
      }
    },
    scrollTrigger: {
      trigger: "#headerScroll",
      start: "top top",
      end: totalHeight - 1000,
      scrub: scrubTime,
    },
  });
  tl.fromTo(".sky", { y: 0 }, { y: -200 }, 0)
    .fromTo(".cloud1", { y: 100 }, { y: -800 }, 0)
    .fromTo(".cloud2", { y: -150 }, { y: -500 }, 0)
    .fromTo(".cloud3", { y: -50 }, { y: -650 }, 0)
    .fromTo(".mountBg", { y: -10 }, { y: -100 }, 0)
    .fromTo(".mountMg", { y: -30 }, { y: -250 }, 0)
    .fromTo(".mountFg", { y: -50 }, { y: -600 }, 0);
  tl.to(".header", { opacity: 0, duration: 1 });
  tl.set(".header", { display: "none" });
  tl.fromTo(
    "#txt1",
    { scale: 0.6, transformOrigin: "50%" },
    { duration: 0.3, scale: 1, ease: "power1.in" }
  )
    .to("#txt1 path", {
      duration: 0.3,
      opacity: 0,
      stagger: 0.05,
      ease: "power1.out",
    })

    // 图片元素
    // 从-5000 z轴移动到350的位置
    .fromTo(
      ".imgBox",
      {
        z: -5000,
      },
      {
        z: 350,
        stagger,
        ease: "none",
      },
      startTranslateTime
    )
    //   // 放大3倍 -> 1.15过渡
    .fromTo(
      ".imgBox img",
      { scale: 3 },
      { scale: 1.15, stagger, ease: "none" },
      startTranslateTime
    )
    // 从透明开始，且开始具有开始动画
    .from(
      ".imgBox img",
      {
        duration: 0.3,
        opacity: 0,
        stagger,
        ease: "power1.inOut",
      },
      startTranslateTime
    )
    // 到透明结束，结束时具有透明度动画
    .to(
      ".imgBox img",
      {
        duration: 0.1,
        opacity: 0,
        stagger,
        ease: "expo.inOut",
      },
      startTranslateTime + 0.9
    )

    // 结束
    .add("end")
    .fromTo(
      "#txt2",
      { scale: 0.1, transformOrigin: "50%" },
      { scale: 1, ease: "power3", duration: 0.3 },
      "end-=0.5"
    )
    .from(
      "#txt2 path",
      {
        duration: 0.3,
        opacity: 0,
        ease: "sine.inOut",
        stagger: 0.15,
      },
      "end-=0.5"
    );
  tl.set(".info", { zIndex: 1 }).fromTo(
    ".info",
    { opacity: 0 },
    { opacity: 1 }
  );
  tl.set(".main", {
    display: "none",
  });
  tl.set(".info", {
    display: "block",
  });

  setTimeout(() => {
    console.log(`isTouch: ${ScrollTrigger.isTouch}, scrubTime: ${scrubTime}`);
  }, 3000);
  if (ScrollTrigger.isTouch == 1) {
    // 移动端隐藏 #cursor鼠标跟随，且取消imgBox的x、y偏移
    gsap.set("#cursor", { opacity: 0 });
    gsap.set(".imgBox", { x: 0, y: 0 });
  } else {
    // svg跟随鼠标效果
    const cursorX = gsap.quickTo("#cursor", "x", {
      duration: 0.3,
      ease: "power2",
    });
    const cursorY = gsap.quickTo("#cursor", "y", {
      duration: 0.3,
      ease: "power2",
    });

    window.onmousemove = (e) => {
      gsap.to(".imgBox", {
        // imgBox偏移效果
        xPercent: (-e.clientX / innerWidth) * 100,
        yPercent: -25 - (e.clientY / innerHeight) * 50,
        rotateX: 8 - (e.clientY / innerHeight) * 16,
        rotateY: -8 + (e.clientX / innerWidth) * 16,
      });
      gsap.to(".imgBox img", {
        xPercent: (-e.clientX / innerWidth) * 10,
        yPercent: -5 - (e.clientY / innerHeight) * 10,
      });

      // mouse follower
      cursorX(e.clientX);
      cursorY(e.clientY);
    };
  }
};

/**
 * 初始化imgBox事件
 * @param {*} i
 * @param {*} t
 */
function initImg(i, t) {
  const box = document.createElement("div");
  box.appendChild(t);
  document.getElementById("imgGroup").appendChild(box);

  // 让img的父元素与内部的img元素位置保持一致
  gsap.set(box, {
    pointerEvents: "none",
    position: "absolute",
    attr: { id: "box" + i, class: "imgBox" },
    width: t.width,
    height: t.height,
    overflow: "hidden",
    borderRadius: "10%",
    top: "50%",
    left: "50%",
    x: t.dataset.x,
    y: t.dataset.y,
    xPercent: -50,
    yPercent: -50,
    perspective: 500,
  });

  // 鼠标在图片上时，鼠标上跟随的圆圈放大动画
  t.onmouseover = () => {
    gsap.to("#cursorCircle", {
      duration: 0.2,
      attr: { r: 30, "stroke-width": 4 },
    });
  };

  // 鼠标按下图片时，同时发生
  //  图片缩
  // 圆圈放大
  t.onmousedown = () => {
    gsap.to(t, { z: "+=200", ease: "power2" });
    gsap.to("#cursorCircle", { attr: { r: 40 }, ease: "power3" });
  };
  // 鼠标按下图片时，图片还原
  t.onmouseup = () => gsap.to(t, { z: "-=200", ease: "power1.inOut" });

  // 鼠标移出图片，圆圈恢复正常大小动画
  t.onmouseout = () =>
    gsap.to("#cursorCircle", {
      duration: 0.2,
      attr: { r: 11, "stroke-width": 3 },
    });

  // 点击图片事件：
  if (!isMobile) {
    t.onclick = () => showDetail(t);
  }
}

/**
 * 开启图片详情
 * @param {*} t
 */
function showDetail(t) {
  gsap
    .timeline()
    .set("#detailTxt", { textContent: t.alt }, 0)
    .set(
      "#detailImg",
      {
        "background-image": `url(${t.src})`,
      },
      0
    )
    .fromTo("#detail", { top: "100%" }, { top: 0, ease: "expo.inOut" }, 0)
    .fromTo(
      "#detailImg",
      { y: "100%" },
      { y: "0%", ease: "expo", duration: 0.7 },
      0.2
    )
    .fromTo(
      "#detailTxt",
      { opacity: 0 },
      { opacity: 1, ease: "power2.inOut" },
      0.4
    )
    .to("#cursorCircle", { duration: 0.2, opacity: 0 }, 0.2)
    .to("#cursorClose", { duration: 0.2, opacity: 1 }, 0.4);
}

/**
 * 关闭图片详情
 */
function closeDetail() {
  gsap
    .timeline()
    .to("#detailTxt", { duration: 0.3, opacity: 0 }, 0)
    .to("#detailImg", { duration: 0.3, y: "-100%", ease: "power1.in" }, 0)
    .to("#detail", { duration: 0.3, top: "-100%", ease: "expo.in" }, 0.1)
    .to("#cursorClose", { duration: 0.1, opacity: 0 }, 0)
    .to("#cursorCircle", { duration: 0.2, opacity: 1 }, 0.1);
}
