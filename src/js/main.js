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
    $(".open-play-popup").on("click", function (e) {
      e.preventDefault();
      $("body").addClass("overflow-hidden");
      $("#playPopup").addClass("active");
    });
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
        $(this).addClass("active");
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
      $("#playPreview").addClass("active");
      setTimeout(() => {
        $("#previewPlayerProgress").css("transition", "2000ms");
      }, 200);

      if (progressInterval !== null) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
      progressInterval = setInterval(() => {
        if (sound.playing()) {
          let duration = Math.floor(sound.duration());
          let position = Math.floor(sound.seek());
          let percent = Math.round((position / duration) * 100);

          let durationMin = String(Math.floor(duration / 60)).padStart(2, "0");
          let durationSec = String(duration - durationMin * 60).padStart(
            2,
            "0",
          );

          let positionMin = String(Math.floor(position / 60)).padStart(2, "0");
          let positionSec = String(position - positionMin * 60).padStart(
            2,
            "0",
          );

          $("#previewPlayerPosition").html(`${positionMin}:${positionSec}`);
          $("#previewPlayerDuration").html(`${durationMin}:${durationSec}`);

          $("#previewPlayerProgress").css("width", `${percent}%`);
        }
      }, 500);
    });
    sound.on("stop", function () {
      $("#playPreview").removeClass("active");
      $("#previewPlayerProgress").css("transition", "");
      if (progressInterval !== null) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
    });
    sound.on("end", function () {
      $("#playPreview").removeClass("active");
      $("#previewPlayerProgress").css("transition", "");
      if (progressInterval !== null) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
    });
    sound.on("pause", function () {
      $("#playPreview").removeClass("active");
      $("#previewPlayerProgress").css("transition", "");
      if (progressInterval !== null) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
    });
  });
})(jQuery);
