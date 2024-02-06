gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

window.onload = () => {
  gsap.set("#scrollDist", {
    width: "100%",
    height: gsap.getProperty("#app", "height"),
    onComplete: () => {
      gsap.set("#app, #imgGroup", {
        opacity: 1,
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        perspective: 300,
      });
      gsap.set("#app img", {
        position: "absolute",
        attr: {
          id: (index, el, _imgList) => {
            //use GSAP's built-in loop to setup each image
            initImg(index, el);
            return "img" + index;
          },
        },
      });

      gsap
        .timeline({
          defaults: { duration: 1 },
          onUpdate: () => {
            if (gsap.getProperty("#cursorClose", "opacity") == 1) closeDetail();
          }, //close detail view on scroll
          scrollTrigger: {
            trigger: "#scrollDist",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        })

        // 开头文本放大 + 透明
        .fromTo(
          "#txt1",
          { scale: 0.6, transformOrigin: "50%" },
          { scale: 2, ease: "power1.in" },
          0
        )
        .to(
          "#txt1 path",
          { duration: 0.3, opacity: 0, stagger: 0.05, ease: "power1.in" },
          0
        )

        // 图片元素
        // 从-5000 z轴移动到350的位置
        .fromTo(
          ".imgBox",
          { z: -5000 },
          { z: 350, stagger: -0.3, ease: "none" },
          0.3
        )
        // 放大3倍 -> 1.15过渡
        .fromTo(
          ".imgBox img",
          { scale: 3 },
          { scale: 1.15, stagger: -0.3, ease: "none" },
          0.3
        )
        .to(
          ".imgBox",
          { duration: 0, pointerEvents: "auto", stagger: -0.3 },
          0.5
        )
        // 从透明开始，且开始具有开始动画
        .from(
          ".imgBox img",
          {
            duration: 0.3,
            opacity: 0,
            stagger: -0.3,
            ease: "power1.inOut",
          },
          0.3
        )
        // 到透明结束，结束时具有透明度动画
        .to(
          ".imgBox img",
          { duration: 0.1, opacity: 0, stagger: -0.3, ease: "expo.inOut" },
          1.2
        )
        .to(
          ".imgBox",
          { duration: 0, pointerEvents: "none", stagger: -0.3 },
          1.27
        )

        // 结束文本从透明0.1倍 -> 不透明且0.6倍
        .add("end")
        .fromTo(
          "#txt2",
          { scale: 0.1, transformOrigin: "50%" },
          { scale: 0.6, ease: "power3" },
          "end-=0.2"
        )
        .from(
          "#txt2 path",
          { duration: 0.4, opacity: 0, ease: "sine.inOut", stagger: 0.15 },
          "end-=0.2"
        );

      // intro animation
      gsap.from(window, {
        duration: 1.4,
        scrollTo: 0,
        ease: "power2.in",
      });
      gsap.from(".imgBox", {
        duration: 0.2,
        opacity: 0,
        stagger: 0.06,
        ease: "power1.inOut",
      });
    },
  });

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
    t.onmouseover = () =>
      gsap.to("#cursorCircle", {
        duration: 0.2,
        attr: { r: 30, "stroke-width": 4 },
      });

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
    t.onclick = () => showDetail(t);
  }

  function showDetail(t) {
    gsap
      .timeline()
      .set("#detailTxt", { textContent: t.alt }, 0)
      .set(
        "#detailImg",
        { background: "url(" + t.src + ") center no-repeat" },
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

  function closeDetail() {
    gsap
      .timeline()
      .to("#detailTxt", { duration: 0.3, opacity: 0 }, 0)
      .to("#detailImg", { duration: 0.3, y: "-100%", ease: "power1.in" }, 0)
      .to("#detail", { duration: 0.3, top: "-100%", ease: "expo.in" }, 0.1)
      .to("#cursorClose", { duration: 0.1, opacity: 0 }, 0)
      .to("#cursorCircle", { duration: 0.2, opacity: 1 }, 0.1);
  }
  document.getElementById("detail").onclick = closeDetail;

  if (ScrollTrigger.isTouch == 1) {
    // on mobile, hide mouse follower + remove the x/y positioning from the images
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
