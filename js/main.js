$(document).ready(function () {
  if ($(".grettings").length > 0) {
    $(".grettings").addClass("load");

    $(".grettings__link").on("click", function () {
      $(".grettings").addClass("close");
      $(".main-section").addClass("visible");
    });
  }

  if ($(".burger").length > 0) {
    let menu = $(".header .menu");
    let burger = $(".burger");
    let burgerСlose = $(".menu .btn-close");

    burger.on("click", function () {
      if (menu.hasClass("opened")) {
        closeMenu();
      } else {
        burger.addClass("opened");
        menu.addClass("opened").slideDown();

        $(document).mouseup(function (e) {
          if (
            !menu.is(e.target) &&
            menu.has(e.target).length === 0 &&
            !burger.is(e.target)
          ) {
            closeMenu();
          }
        });
      }
    });

    burgerСlose.on("click", function () {
      closeMenu();
    });

    function closeMenu() {
      burger.removeClass("opened");
      menu.removeClass("opened").slideUp();
      $(document).off("mouseup");
    }
  }

  if ($(".slider-project").length > 0) {
    const swiper = new Swiper(".slider-project", {
      slidesPerView: 1,
      spaceBetween: 0,
      watchSlidesProgress: true,
      navigation: {
        nextEl: ".btn-swiper-next",
        prevEl: ".btn-swiper-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  if ($(".publications-slider__swiper").length > 0) {
    const swiper = new Swiper(".publications-slider__swiper", {
      slidesPerView: 3,
      spaceBetween: 51,
      watchSlidesProgress: true,
      breakpoints: {
        320: {
          slidesPerView: 1.2,
          spaceBetween: 20,
        },
        480: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 51,
        },
      },
    });
  }

  if ($(".slider-steps").length > 0) {
    const swiper = new Swiper(".slider-steps", {
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: true,
      watchSlidesProgress: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
    });

    swiper.on("slideChange", function (e) {
      let index = swiper.activeIndex;
      let pictures = $(".steps-picture .picture");
      let numbers = $(".step-number .num");

      pictures.removeClass("active");
      numbers.removeClass("active");

      $(pictures[index]).addClass("active");
      $(numbers[index]).addClass("active");
    });

    $(".slider-steps .link-site").on("click", function (event) {
      event.preventDefault();
      swiper.slideNext();
    });

    $(".step-number .num").on("click", function () {
      let index = $(this).index();
      swiper.slideTo(index);
    });
  }

  if ($(".design-item").length > 0) {
    $(".design-item").on("click", function () {
      $(".design-item").removeClass("active");
      $(this).addClass("active");
    });
  }

  if ($(".price-block__item").length > 0) {
    if ($(window).width() > 1280) {
      $(".price-block__item").hover(function () {
        $(".price-block__item").removeClass("hover");
        $(".price-block__info").stop().slideUp();

        $(this).addClass("hover");
        $(this).find(".price-block__info").stop().slideDown();
      });
    }
  }

  if ($(".staging__media").length > 0) {
    const container = document.querySelector(".staging__media");

    document.querySelector(".slider").addEventListener("input", (e) => {
      container.style.setProperty("--position", `${e.target.value}%`);
    });
  }

  if ($(".phone-input").length > 0) {
    $(".phone-input").map(function () {
      $(this).inputmask({
        mask: "+7(999) 999-99-99",
        placeholder: "*",
        showMaskOnHover: false,
        showMaskOnFocus: true,
        clearIncomplete: true,
      });
    });
  }

  if ($(".modal").length > 0) {
    MicroModal.init({
      openTrigger: "data-modal",
      onShow: () => {
        $("body").addClass("modal-open");
      },
      onClose: () => {
        $("body").removeClass("modal-open");
      },
    });
    $("[data-modal]").map(function () {
      $(this).click((e) => {
        e.preventDefault();
        $("body").addClass("modal-open");
      });
    });
    $("[data-micromodal-close]").map(function () {
      $(this).click((e) => {
        e.preventDefault();
        if ($(this).attr("data-modal")) {
          setTimeout(() => {
            $("body").addClass("modal-open");
          }, 0.1);
        }
      });
    });
  }

  if ($(".menu-sub").length > 0) {
    $(".menu-sub a").on("click", function (event) {
      event.preventDefault();

      let href = $(this).attr("href");
      let offset_top = href === "#" ? 0 : $(href).offset().top;

      if ($(".menu").hasClass("opened")) {
        $(".burger").removeClass("opened");
        $(".menu").removeClass("opened").slideUp();
        $(document).off("mouseup");
      }

      $("html, body").stop().animate(
        {
          scrollTop: offset_top,
        },
        300
      );
    });
  }

  if ($(".map").length > 0) {
    // initMap();
  }
});

$(window).on("resize", function () {});

// yandex map

async function initMap() {
  await ymaps3.ready;

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    ymaps3;

  const map = new YMap(
    document.getElementById("map"),
    {
      location: {
        center: [37.623082, 55.75254],
        zoom: 10,
        behaviors: ["drag", "pinchZoom", "mouseTilt"],
      },
    },
    [new YMapDefaultSchemeLayer({}), new YMapDefaultFeaturesLayer({})]
  );

  const markerElement = document.createElement("span");
  const child = document.createElement("span");
  markerElement.className = "icon-marker";

  child.className = "icon-marker__text";
  child.textContent = getArrItem[i].NAME;

  markerElement.appendChild(child);

  map.addChild(
    new YMapMarker(
      {
        coordinates: [Number(lng), Number(lat)],
      },
      markerElement
    )
  );

  setTimeout(() => {
    $(".map").addClass("load");
  }, 2000);
}

// /yandex map
