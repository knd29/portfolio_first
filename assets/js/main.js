"use strict";

$(function () {
  //ローダー
  //logoの表示
  $(window).on("load", function () {
    $("#splash").delay(2500).fadeOut("slow"); //ローディング画面を待機してからフェードアウト
    $("#splash_logo").delay(2200).fadeOut("slow"); //ロゴを待機してからフェードアウト
  });

  // マウスストーカー
  const mouseStalker = "#stkr";
  const mouseTarget = ".stkr-target";
  const stkrSize = parseInt($(mouseStalker).css("width").replace(/px/, ""));
  const stkrPosX = parseInt($(mouseStalker).css("left").replace(/px/, ""));
  const stkrPosY = parseInt($(mouseStalker).css("top").replace(/px/, ""));
  const cssPosAjust = stkrPosX + stkrSize / 2;
  let stkrFix = false;
  let scale = 1;
  let scroll = 0;

  function random() {
    return Math.floor(Math.random() * 100);
  }

  setInterval(() => {
    $(mouseStalker).css({
      borderRadius: `${random()}% ${random()}% ${random()}% ${random()}% / ${random()}% ${random()}% ${random()}% ${random()}%`,
    });
  }, 3000);

  $(window).scroll(function () {
    scroll = $(window).scrollTop();
  });

  // 追従用の処理
  $("body").mousemove(function (e) {
    if (stkrFix == false) {
      let x = e.clientX - cssPosAjust;
      let y = e.clientY + scroll - cssPosAjust;
      $(mouseStalker).css({
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
      });
    }
  });

  // リンクホバーの処理
  $(mouseTarget).hover(
    function (e) {
      stkrFix = true;
      scale = 0;
      let _width = parseInt($(this).css("width").replace(/px/, ""));
      let _top = $(this).position().top;
      let _left = $(this).position().left;
      let x = _left - stkrPosX - stkrSize / 2 + _width / 2;
      let y = _top - stkrPosY;
      $(mouseStalker).css({
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
      });
      $(this).addClass("hover");
    },
    function () {
      stkrFix = false;
      scale = 1;
      $(this).removeClass("hover");
    }
  );

  // ハンバーガーメニュー
  // ハンバーガーメニューのトリガー
  const triggers = document.querySelectorAll(".trigger");

  // クリックされたトリガーのdata属性の値を返す
  function getSection(event) {
    const element = event.target; //clickイベントのtarget -> clickした要素
    return element.dataset.target; // data属性を返す
  }

  // data属性に応じてトグルする要素をスイッチ
  function toggleIsActive(target) {
    switch (target) {
      case "header":
        $(".header__hamburger__trigger, .header__menu__mask, .menu").toggleClass("is-active");
        break;
      case "js":
        $(".sample__hamburger__trigger, .sample__hamburger").toggleClass("is-active");
        break;
      case "css-style":
        $(
          ".border-vartical, .border-horizon, .css__sample__title, .css__sample__text, .css__sample__image"
        ).toggleClass("is-active");
        break;
      case "css-lyout":
        $(".css__sample__container").toggleClass("is-active");
        break;
    }
  }

  function removeIsActive() {
    $(".header__hamburger__trigger, .header__menu__mask, .menu").removeClass("is-active");
  }

  // メニュー開閉
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", function (event) {
      toggleIsActive(getSection(event));
    });
  });

  // スムーススクロール
  $('a[href^="#"]').click(function () {
    // スクロールの速度
    let speed = 400;
    // スクロールタイプ
    let type = "swing";
    // href属性の取得
    let href = $(this).attr("href");
    // 移動先の取得（hrefが#indexならトップ$(html)に、）
    let target = $(href == "#index" ? "html" : href);
    // 移動先のポジション取得
    let position = target.offset().top;
    // animateでスムーススクロール
    $("body,html").animate({ scrollTop: position }, speed, type);

    removeIsActive();
    return false;
  });

  // ワイプイン
  $(window).scroll(function () {
    $(".before-enter").each(function () {
      let trigger_point = $(this).offset().top - $(window).height() / 1.5;

      if (scroll > trigger_point) {
        $(this).removeClass("before-enter");
      }
    });
  });

  // slick
  const carousel = $("#carousel");

  carousel.slick({
    prevArrow: '<button id="btn-prev" class="carousel__btn carousel__btn--prev"></button>',
    nextArrow: '<button id="btn-next" class="carousel__btn carousel-btn--next"></button>',

    centerMode: true,
    centerPadding: "19%",

    autoplay: true,
    infinite: true,

    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,

    speed: 1500,
    // autoplaySpeed: 1500,

    responsive: [
      {
        breakpoint: 798,
        settings: {
          centerMode: false,
          centerPadding: "0",
          slidesToShow: 1,

          fade: true,
          cssEase: "linear",
        },
      },
    ],
  });
});
