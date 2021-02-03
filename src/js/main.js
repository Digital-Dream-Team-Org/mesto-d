(function ($) {
  // Document ready
  $(function () {
    console.log("ready");

    if ($(".plays-swiper").length) {
      $(".plays-swiper").each(function () {
        const arrowPrev = $(this)
          .closest(".plays-swiper-wrap")
          .find(".swiper-button-prev")[0];

        const arrowNext = $(this)
          .closest(".plays-swiper-wrap")
          .find(".swiper-button-next")[0];

        new Swiper($(this)[0], {
          // navigation: {
          //   nextEl: arrowNext,
          //   prevEl: arrowPrev,
          // },
          slidesPerView: 1,
          spaceBetween: 30,
          breakpoints: {
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
          },
        });
      });
    }
  });
})(jQuery);
