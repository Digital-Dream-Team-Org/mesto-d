(function ($) {
  // Document ready
  $(function () {
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
          spaceBetween: 20,
          breakpoints: {
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
          },
          on: {
            init: function () {
              // do something
              const $el = this.$el;
              $el.css("padding-left", "40%");
            },
          },
        });
      });
    }
    if ($(".team-swiper").length) {
      $(".team-swiper").each(function () {
        const arrowPrev = $(this)
          .closest(".team-swiper-wrap")
          .find(".swiper-button-prev")[0];

        const arrowNext = $(this)
          .closest(".team-swiper-wrap")
          .find(".swiper-button-next")[0];

        new Swiper($(this)[0], {
          // navigation: {
          //   nextEl: arrowNext,
          //   prevEl: arrowPrev,
          // },
          slidesPerView: 1,
          spaceBetween: 20,
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

    // Popups
    $(".open-contact-popup").on("click", function (e) {
      e.preventDefault();
      $("body").addClass("overflow-hidden");
      $("#contactFormPopup").addClass("active");
    });

    // Close overlay on outside click
    $(".overlay-cdk").on("click", function (e) {
      if (e.target !== e.currentTarget) return;

      $(this).removeClass("active");
      $("body").removeClass("overflow-hidden");
    });

    // Close overlay on button click
    $(".overlay-cdk__close-btn").on("click", function (e) {
      $(".overlay-cdk").removeClass("active");
      $("body").removeClass("overflow-hidden");
    });

    // Preview mp3 player
    const playerVolVal = $("#previewPlayerVolume").val() / 100;
    const playerSrc = $("#previewPlayerSrc").val();

    const sound = new Howl({
      src: playerSrc,
      loop: false,
      preload: false,
      volume: playerVolVal,
      // volume: 0.05,
    });

    $("#previewPlayerVolume").on("input", function () {
      const vol = $(this).val() / 100;
      if (sound) {
        sound.volume(vol);
      }
    });

    let musicLoaded = false;
    let musicLoading = false;
    $("#playPreview").on("click", function () {
      if (musicLoading) {
        return;
      }
      if (!musicLoaded) {
        musicLoading = true;
        return sound.load();
      }
      if (sound && sound.playing()) {
        // return sound.pause();
        return sound.stop();
      }
      sound.play();
    });
    // Clear listener after first call.
    sound.once("load", function () {
      sound.play();
      musicLoaded = true;
      musicLoading = false;
    });

    var progressInterval = null;
    sound.on("play", function () {
      if (progressInterval !== null) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
      progressInterval = setInterval(() => {
        if (sound.playing()) {
          let duration = Math.round(sound.duration());
          let position = Math.round(sound.seek());
          let percent = Math.round((position / duration) * 100);

          console.log({
            position,
            duration,
            percent,
          });
        }
      }, 1000);
    });
    sound.on("stop", function () {
      if (progressInterval !== null) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
    });
    sound.on("end", function () {
      if (progressInterval !== null) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
    });
    sound.on("pause", function () {
      if (progressInterval !== null) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
    });
  });
})(jQuery);
