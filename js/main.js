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

  if ($(".portfolio__list").length > 0) {
    handleResizePortfolio();
  }

  if ($(".services-about__slider").length > 0) {
    const swiperServiceAbout = new Swiper(".services-about__slider", {
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: true,
      watchSlidesProgress: true,
      navigation: {
        prevEl: ".btn-prev",
        nextEl: ".btn-next",
      },
      on: {
        slideChange: function () {
          $(".services-about__item").removeClass("active");
          $(".services-about__item").eq(this.activeIndex).addClass("active");
        },
      },
    });

    $(".services-about__item").on("click", function () {
      if (!$(this).hasClass("active")) {
        let index = $(this).index();
        $(".services-about__item").removeClass("active");
        $(this).addClass("active");
        swiperServiceAbout.slideTo(index);
      }
    });
  }

  if ($(".price-block__slider").length > 0) {
    let swiperPriceBlock;
    let destroy = () => {};

    if ($(window).width() < 767) {
      initPricesSlider();
    }

    $(window).on("resize", function () {
      if ($(window).width() < 767) {
        initPricesSlider();
      } else {
        destroy();
      }
    });

    function initPricesSlider() {
      if (!$(".price-block__slider").hasClass("init")) {
        $(".price-block__slider").addClass("init");

        swiperPriceBlock = new Swiper(".price-block__slider", {
          slidesPerView: 1,
          spaceBetween: 0,
          watchSlidesProgress: true,
          navigation: {
            // prevEl: ".price-block .btn-prev",
            nextEl: ".price-block .btn-next",
          },
          breakpoints: {
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          },
        });

        destroy = () => {
          swiperPriceBlock.destroy(true, true);
          $(".price-block__slider").removeClass("init");
        };
      }
    }
  }

  if ($(".art-slider__slider").length > 0) {
    const swiper = new Swiper(".art-slider__slider", {
      slidesPerView: 3,
      spaceBetween: 45,
      autoHeight: true,
      watchSlidesProgress: true,
      navigation: {
        prevEl: ".btn-prev",
        nextEl: ".btn-next",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2.5,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 45,
        },
      },
    });
  }

  if ($(".design-slider__slider").length > 0) {
    const swiper = new Swiper(".design-slider__slider", {
      slidesPerView: 2.5,
      spaceBetween: 40,
      watchSlidesProgress: true,
      navigation: {
        // prevEl: ".btn-prev",
        nextEl: ".design-slider__right .btn-next",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2.2,
          spaceBetween: 22,
        },
        1024: {
          slidesPerView: 2.25,
          spaceBetween: 22,
        },
        1280: {
          slidesPerView: 2.5,
          spaceBetween: 40,
        },
      },
    });
  }
});

$(window).on("resize", function () {
  if ($(".portfolio__list").length > 0) {
    handleResizePortfolio();
  }
});

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

function handleResizePortfolio() {
  let list = $(".portfolio__list");
  let itemCount = $(".portfolio__item:not('.project-working')").length;
  const html = `<div class="portfolio__item project-working">
                        <picture class="picture">
                            <source type="image/webp" srcset="../../img/portfolio3.webp" />
                            <img src="../../img/portfolio3.jpg" alt="" />
                        </picture>
                        <span class="project-working__text">Проект в разработке</span>
                    </div>`;

  if ($(window).width() > 1024) {
    if (!$(".portfolio__list").hasClass("init")) {
      $(".portfolio__list").addClass("init");

      $(".project-working").remove();

      switch (itemCount % 3) {
        case 2:
          list.append(html);
          break;

        case 1 || 3: {
          list.append(html);
          list.append(html);
          break;
        }

        case 0: {
          break;
        }
      }
    }
  } else {
    $(".portfolio__list").removeClass("init");
  }

  if ($(window).width() < 1023 && $(window).width() > 640) {
    if (!$(".portfolio__list").hasClass("initTablet")) {
      $(".portfolio__list").addClass("initTablet");

      $(".project-working").remove();

      switch (itemCount % 2) {
        case 1:
          list.append(html);
          break;

        case 0: {
          break;
        }
      }
    }
  } else {
    $(".portfolio__list").removeClass("initTablet");
  }
}
