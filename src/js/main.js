// Configs
const config = {
  membersUrl: "http://api.mestodteatr.kg/plays-service/members",
  playsUrl: "http://api.mestodteatr.kg/plays-service/plays",
};

(function ($) {
  // Document ready
  $(function () {
    // $.ajax({
    //   url:
    //     "http://api.mestodteatr.kg/file-manager/bp/file/2259b478-b7d2-4987-9d74-d37c993a3c33",
    //   type: "GET",
    //   dataType: null,
    //   success: function (data) {
    //     console.log(data);
    //   },
    //   error: function (data) {
    //     console.error(data);
    //   },
    // });

    // Load plays
    let plays = [];
    getPlays();

    function getPlays() {
      $.ajax({
        url: config.playsUrl,
        type: "GET",
        dataType: null,
        async: false,
        success: function (res) {
          if (!res.success) {
            return;
          }
          const data = res.data;

          plays = data.map((play) => {
            const {
              id,
              age_category,
              cost,
              create_date,
              duration_min,
              img_url,
              is_free,
              team_id,
            } = play;
            const {
              desc,
              file_size,
              lang,
              name,
              short_desc,
              track_url,
              video_url,
            } = play.content[0];
            return {
              // Main
              id,
              age_category,
              cost,
              duration_min,
              img_url,
              is_free,
              team_id,
              create_date,
              // Content
              desc,
              file_size,
              lang,
              name,
              short_desc,
              track_url, // E.g. "assets/sample.mp3"
              video_url,
              // Don't exist / rename accordingly later
              is_hot: true,
              director_name: null,
              route_from: null,
              route_to: null,
              map: null, // E.g. "assets/sample-map.png"
              members: [],
              // members: [
              //   {
              //     name: "name",
              //     position: "position",
              //   },
              // ]
              readers: [],
              // readers: [
              //   {
              //     name: "Нурбек Эген",
              //   },
              // ]
              route: [],
              // route: [
              //   {
              //     name: "Парк полифилова",
              //   },
              // ]
            };
          });
          console.log(plays);
        },
        error: function (data) {
          console.error(data);
        },
      });

      // Update cards DOM
      $(".plays-swiper .swiper-wrapper").each(function () {
        $(this).empty();

        plays.forEach((play) => {
          const {
            id,
            img_url,
            name,
            director_name,
            route_from,
            route_to,
            duration_min,
            file_size,
            age_category,
            is_free,
            is_hot,
          } = play;

          let durationString = `${duration_min} минут`;
          let sizeString = `${file_size} mb`;
          let labelsString = "";
          if (age_category) {
            labelsString += `<div class="play-card__image-label">${age_category}</div>`;
          }
          if (is_free) {
            labelsString += `<div class="play-card__image-label">Бесплатно</div>`;
          }
          if (is_hot) {
            labelsString += `<div class="play-card__image-label play-card__image-label--hot">
            Хит!
          </div>`;
          }

          $(this).append(`
          <div class="swiper-slide">
            <div class="play-card-wrap">
              <a class="open-play-popup" data-id="${id}">
                <div class="play-card">
                  <div class="play-card__image-wrap">
                    <img
                      src="${img_url}"
                      alt="play"
                      class="play-card__image"
                    />
                    <div class="play-card__image-labels">
                      ${labelsString}
                    </div>
                  </div>
                  <div class="play-card__body">
                    <div class="play-card__body-header">
                      <div class="play-card__body-meta-container">
                        <div class="play-card__body-meta">
                          <i class="icon-timer"></i>
                          <span>${durationString}</span>
                        </div>
                        <div class="play-card__body-meta">
                          <i class="icon-insert"></i>
                          <span>${sizeString}</span>
                        </div>
                      </div>
                      <div class="play-card__body-director">
                        <span class="play-card__body-director-position">
                          Режиссер:
                        </span>
                        <span class="play-card__body-director-name">
                          ${director_name}
                        </span>
                      </div>
                    </div>
                    <div class="play-card__body-title">
                      ${name}
                    </div>
                    <div class="play-card__body-route">
                      <div class="play-card__body-route-from">
                        <span class="play-card__body-route-title">
                          от
                        </span>
                        <span
                          class="play-card__body-route-name text-truncate"
                        >
                          ${route_from}
                        </span>
                      </div>
                      <div class="play-card__body-route-separator">
                        <i class="icon-arrow-right"></i>
                      </div>
                      <div class="play-card__body-route-to">
                        <span class="play-card__body-route-title">
                          до
                        </span>
                        <span
                          class="play-card__body-route-name text-truncate"
                        >
                          ${route_to}
                        </span>
                      </div>
                    </div>
                    <div class="play-card__body-controls">
                      <span class="play-card__btn">
                        Подробнее о спектакле
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        `);
        });
      });
    }

    // Load members
    let members = [];
    getMembers();

    function getMembers() {
      $.ajax({
        url: config.membersUrl,
        type: "GET",
        dataType: null,
        async: false,
        success: function (res) {
          if (!res.success) {
            return;
          }
          const data = res.data;
          members = data.map((member) => {
            const { avatar_url, id, role_id, team_id } = member;
            const {
              desc,
              first_name,
              lang,
              last_name,
              middle_name,
            } = member.member_info[0];
            const { name_ru: role_ru, name_en, name_kg } = member.member_role;

            return {
              // Main
              id,
              avatar_url,
              role_id,
              team_id,
              // Content
              desc,
              first_name,
              lang,
              last_name,
              middle_name,
              // Role
              role: role_ru,
              // Don't exist
              socials: [],
            };
          });
          console.log(members);
        },
        error: function (data) {
          console.error(data);
        },
      });

      let members_big = members; // Filter to get only "big" members?

      // Split into halfs
      // let members_small_1 = [];
      // let members_small_2 = [];

      // if (members.length > 1) {
      //   const halfList = Math.ceil(members.length / 2);
      //   members_small_1 = [...members].splice(0, halfList);
      //   members_small_2 = [...members].splice(-halfList);
      // } else {
      //   members_small_1 = [...members];
      // }

      $(".team-swiper .swiper-wrapper").each(function () {
        $(this).empty();

        members_big.forEach((member) => {
          const {
            first_name,
            last_name,
            middle_name,
            avatar_url,
            desc,
            role,
          } = member;

          let accoladesString = desc;
          // member.accolades.forEach((accolade) => {
          //   accoladesString += `${accolade}, `;
          // });
          let socialsString = "";
          member.socials.forEach((social) => {
            socialsString += `
              <div>
                <a
                  href="${social.value}"
                  class="team-member-card__body-social-link"
                  target="_blank"
                >
                  ${social.name}
                </a>
              </div>
            `;
          });

          $(this).append(`
          <div class="swiper-slide">
            <div class="team-member-card-wrap">
              <div class="team-member-card">
                <div class="team-member-card__image-wrap">
                  <img
                    src="${avatar_url}"
                    alt="member"
                    class="team-member-card__image"
                  />
                </div>
                <div class="team-member-card__body">
                  <div class="team-member-card__body-name">
                    ${last_name} ${first_name} ${middle_name}
                  </div>
                  <div class="team-member-card__body-position">
                    ${role}
                  </div>
                  <div class="team-member-card__body-accolades">
                    ${accoladesString}
                  </div>
                  <div class="team-member-card__body-socials">
                    ${socialsString}
                  </div>
                </div>
              </div>
            </div>
          </div>
        `);
        });
      });

      $(".team-row").each(function () {
        $(this).empty();
        members.forEach((member) => {
          const {
            first_name,
            last_name,
            middle_name,
            avatar_url,
            desc,
            role,
          } = member;

          $(this).append(`
            <div class="col-6 col-md-2">
              <div class="team-member">
                <p class="team-member__position">${role}:</p>
                <p class="team-member__name">${last_name} ${first_name} ${middle_name}</p>
              </div>
            </div>
          `);
        });
      });

      // Two cols layout ?

      // Split into halfs
      // let members_small_1 = [];
      // let members_small_2 = [];

      // if (members.length > 1) {
      //   const halfList = Math.ceil(members.length / 2);
      //   members_small_1 = [...members].splice(0, halfList);
      //   members_small_2 = [...members].splice(-halfList);
      // } else {
      //   members_small_1 = [...members];
      // }

      // $(".team-row-1").each(function () {
      //   $(this).empty();
      //   members_small_1.forEach((member) => {
      //     const {
      //       first_name,
      //       last_name,
      //       middle_name,
      //       avatar_url,
      //       desc,
      //       role,
      //     } = member;

      //     $(this).append(`
      //       <div class="col-6 col-md-4">
      //         <div class="team-member">
      //           <p class="team-member__position">${role}:</p>
      //           <p class="team-member__name">${last_name} ${first_name} ${middle_name}</p>
      //         </div>
      //       </div>
      //     `);
      //   });
      // });

      // $(".team-row-2").each(function () {
      //   $(this).empty();
      //   members_small_2.forEach((member) => {
      //     const {
      //       first_name,
      //       last_name,
      //       middle_name,
      //       avatar_url,
      //       desc,
      //       role,
      //     } = member;

      //     $(this).append(`
      //       <div class="col-6 col-md-4">
      //         <div class="team-member">
      //         <p class="team-member__position">${role}:</p>
      //         <p class="team-member__name">${last_name} ${first_name} ${middle_name}</p>
      //         </div>
      //       </div>
      //     `);
      //   });
      // });
    }

    // Load preview player file and data ?
    function getPreview() {}

    // Ajax form submit / Аякс форма настраивается тут
    $(".ajax-contact-form").on("submit", function (e) {
      e.preventDefault();
      const url = $(this).attr("action");
      const method = $(this).attr("method");
      const dataType = $(this).data("type") || null;
      const serializedArray = $(this).serializeArray();
      const self = $(this);

      let requestObj = {};
      serializedArray.forEach((item) => {
        requestObj[item.name] = item.value;
      });

      console.log(requestObj);

      $.ajax({
        url,
        type: method,
        dataType: dataType,
        data: {
          ...requestObj,
          // action: "ajaxForm",
          // serialized,
        },
        success: function (data) {
          // Clear inputs
          self.find("input, textarea").val("");

          // Open thanks popup
          $(".overlay-cdk").removeClass("active");
          openThanks();
        },
        error: function (data) {
          // Basic error handling
          alert("Ошибка, повторите позднее");
          console.error(data);
        },
      });
    });

    let isPreloaded = false;
    $("body")
      .imagesLoaded()
      .progress(function (instance, image) {
        if (instance.images) {
          let length = instance.images.length;
          let loadedImages = instance.images.filter((image) => image.isLoaded)
            .length;

          let percent = Math.floor((loadedImages / length) * 100);

          $(".preloader-section__bar-overlay").css("width", `${percent}%`);
        }
      })
      .always(function (instance) {
        if (!isPreloaded) {
          finishPreload();
        }
      });

    // Timeout just in case (Keep in mind it won't trigger after critical js error)
    setTimeout(() => {
      if (!isPreloaded) {
        finishPreload();
      }
    }, 60000);

    function finishPreload() {
      isPreloaded = true;
      setTimeout(() => {
        $("body").addClass("loaded");
        $(".preloader-section").addClass("loaded");

        $(".main-content").removeClass("d-none");
        $(".pipe-container-wrap").removeClass("d-none");

        setTimeout(() => {
          $(".preloader-section").addClass("d-none");

          $(".section-hero__composit-title-img-wrap").addClass(
            "fadeInUp animated",
          );
          $(".section-hero__composit-title-1").addClass("fadeInUp animated");
          $(".section-hero__composit-title-2").addClass("fadeInUp animated");
          $(".section-hero__composit-title-3").addClass("fadeInUp animated");
          $(".section-hero__subtitle").addClass("fadeInUp animated");
          $(".section-hero__content .store-btn").addClass("fadeInUp animated");
          $(".section-hero__phones-item-wrap").addClass("fadeInUp animated");

          $(".floating-circles").addClass("animated");

          // Init swipers here because content width before unavailable
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
                freeMode: true,
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
                freeMode: true,
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
          setTimeout(() => {
            // Trigger resize here after all content visible
            resize();

            // Svg pipe draw function
            $(".pipe-container-wrap").removeClass("opacity-0");
            var $doc = $(document),
              $win = $(window),
              $svg = $("svg").drawsvg(),
              max = $doc.height() - $win.height();
            var p = $win.scrollTop() / max;
            $svg.drawsvg("progress", p);

            $win.on("scroll", function () {
              var p = $win.scrollTop() / max;

              $svg.drawsvg("progress", p);
            });
          }, 200);
        }, 200);
      }, 400);
    }

    // Mobile header sidebar slide
    $(".navbar-toggler").on("click", function () {
      $("#mainHeaderNavbar").addClass("open");
      $("body").addClass("overflow-hidden");
      $("#mainHeaderNavbar")
        .find(".navbar-nav")
        .prepend(`<button class="navbar-collapse__close-btn">✖</button>`);

      $("#mainHeaderNavbar")
        .find(".navbar-nav")
        .css({ transition: 0, transform: "translateX(300px)" });
      setTimeout(() => {
        $("#mainHeaderNavbar")
          .find(".navbar-nav")
          .css({ transition: "400ms", transform: "translateX(0)" });
      }, 0);
    });
    $(document).on("click", ".navbar-collapse__close-btn", function (e) {
      closeNavbarOverlay();
    });
    $(".navbar-collapse").on("click", function (e) {
      if (e.target !== e.currentTarget) return;

      closeNavbarOverlay();
    });

    function closeNavbarOverlay() {
      $("#mainHeaderNavbar")
        .find(".navbar-nav")
        .css({ transition: "400ms", transform: "translateX(300px)" });

      setTimeout(() => {
        $(".navbar-collapse").removeClass("open");
        $("body").removeClass("overflow-hidden");
        $(".navbar-collapse__close-btn").remove();
      }, 400);
    }

    $(window).on("scroll", function () {
      if ($(".main-header").length) {
        let sticky = $(".section-hero").height();

        if (window.pageYOffset > sticky) {
          if ($(".main-header").hasClass("d-none")) {
            $(".main-header").removeClass("d-none").css("opacity", 0);
            $(".main-header").animate({ opacity: 1 }, 500);
          }
        } else {
          if (!$(".main-header").hasClass("d-none")) {
            $(".main-header").addClass("d-none");
            $(".main-header").css("opacity", 0);
          }
        }
      }
    });

    var isRellaxed = false;
    var rellax = null;
    var rellax2 = null;
    $(window).on("resize", function () {
      resize();
    });
    function resize() {
      const win = $(window); //this = window
      const width = win.outerWidth();

      if (width <= 990) {
        if (isRellaxed) {
          isRellaxed = false;

          if (rellax.destroy) {
            rellax.destroy();
            rellax = null;
          }
          if (rellax2.destroy) {
            rellax2.destroy();
            rellax2 = null;
          }
        }
      } else {
        $("#mainHeaderNavbar")
          .find(".navbar-nav")
          .css({ transition: "none", transform: "none" });

        if (!isRellaxed) {
          isRellaxed = true;

          rellax = new Rellax(".rellax", {
            speed: 1,
            center: true,
          });
          rellax2 = new Rellax(".rellax-2", {
            speed: 1,
            center: true,
          });
        }
      }
    }

    // Popups
    let popupSound = null;
    let popupProgressInterval = null;
    $(".open-play-popup").on("click", function (e) {
      e.preventDefault();
      $("body").addClass("overflow-hidden");
      $("#playPopup").addClass("active");
      $("#playPopup")
        .find(".overlay-cdk__content-wrap")
        .css({ transform: "translateY(100%)" });
      setTimeout(() => {
        $("#playPopup")
          .find(".overlay-cdk__content-wrap")
          .css({ transition: "600ms", transform: "translateY(0)" });
      }, 0);

      const id = $(this).data("id");

      const playObj = plays.find((play) => play.id === id);

      const {
        is_hot,
        is_free,
        age_category,
        img_url,
        name,
        short_desc,
        track_url,
        director_name,
        route_from,
        route_to,
        map,
        desc,
        members,
        readers,
        route,
      } = playObj;

      let labelsString = "";
      if (age_category) {
        labelsString += `<div class="play-card__image-label">${age_category}</div>`;
      }
      if (is_free) {
        labelsString += `<div class="play-card__image-label">Бесплатно</div>`;
      }
      if (is_hot) {
        labelsString += `<div class="play-card__image-label play-card__image-label--hot">
          Хит!
        </div>`;
      }

      let membersString = "";
      members.forEach((member) => {
        membersString += `
          <div class="col-6">
            <div class="team-member mbp-10">
              <p class="team-member__position">${member.position}:</p>
              <p class="team-member__name">${member.name}</p>
            </div>
          </div>
        `;
      });

      let readersString = "";
      readers.forEach((reader) => {
        readersString += `
          <div class="col-6">
            <div class="team-member mbp-10">
              <p class="team-member__name">${reader.name}</p>
            </div>
          </div>
        `;
      });

      let routeString = "";
      route.forEach((routeItem) => {
        routeString += `
          <li class="overlay-cdk__content-play-timeline-item">
            ${routeItem.name}
          </li>
        `;
      });

      let durationString = `${playObj.duration_min} минут`;
      let sizeString = `${playObj.file_size} mb`;
      let metaString = `
        <div class="overlay-cdk__content-play-body-meta">
          <i class="icon-timer"></i>
          <span>${durationString}</span>
        </div>
        <div class="overlay-cdk__content-play-body-meta">
          <i class="icon-insert"></i>
          <span>${sizeString}</span>
        </div>
      `;

      // Change popup content here
      $("#playPopup .overlay-cdk__content-play-image").attr("src", img_url);
      $("#playPopup .overlay-cdk__content-play-title").html(name);
      $("#playPopup .overlay-cdk__content-play-image-labels").html(
        labelsString,
      );
      $("#playPopup .overlay-cdk__content-play-body-meta-container").html(
        metaString,
      );
      $("#playPopup .overlay-cdk__content-play-body-director-name").html(
        director_name,
      );
      $("#playPopup .overlay-cdk__content-play-short-description").html(
        short_desc,
      );

      $("#playPopupPlayerSrc").val(track_url);

      $(
        "#playPopup .overlay-cdk__content-play-route-from .overlay-cdk__content-play-route-name",
      ).html(route_from);
      $(
        "#playPopup .overlay-cdk__content-play-route-to .overlay-cdk__content-play-route-name",
      ).html(route_to);

      $("#playPopup .overlay-cdk__content-play-timeline").html(routeString);

      $("#playPopup .overlay-cdk__content-play-team > .row").html(
        membersString,
      );

      $("#playPopup .overlay-cdk__content-play-readers > .row").html(
        readersString,
      );

      $("#playPopup .overlay-cdk__content-play-map").attr("src", map);

      $("#playPopup .overlay-cdk__content-play-description")
        .text(desc)
        .css("white-space", "break-spaces");

      // Rest goes here
      // Remove placeholders from popup

      // Popup mp3 player
      const popupPlayerVolVal = $("#playPopupPlayerVolume").val() / 100;
      const popupPlayerMediaSrc = $("#playPopupPlayerSrc").val();

      popupSound = new Howl({
        src: popupPlayerMediaSrc,
        loop: false,
        preload: false,
        volume: popupPlayerVolVal,
        // volume: 0.05,
      });

      let popupMusicLoaded = false;
      let popupMusicLoading = false;

      // Clear listener after first call.
      popupSound.on("load", function () {
        popupMusicLoaded = true;
        popupMusicLoading = false;

        let duration = Math.floor(popupSound.duration());
        let durationMin = String(Math.floor(duration / 60)).padStart(2, "0");
        let durationSec = String(duration - durationMin * 60).padStart(2, "0");

        if (!popupMusicLoaded) {
          $(this).addClass("active");
        }

        $("#playPopupPlayerMin").html(`${durationMin} мин`);
        $("#playPopupPlayerSec").html(`${durationSec} сек`);

        $("#playPopupPlayerPreloader").addClass("d-none");
        $("#playPopupPlayer").removeClass("d-none");
        $("#playPopupPlayerVolume").removeClass("d-none");
      });

      popupSound.on("play", function () {
        $("#playPopupPlayer").addClass("active");
        setTimeout(() => {
          $("#playPopupPlayerProgress").css("transition", "2000ms");
        }, 200);

        if (popupProgressInterval !== null) {
          clearInterval(popupProgressInterval);
          popupProgressInterval = null;
        }
        popupProgressInterval = setInterval(() => {
          if (popupSound.playing()) {
            let duration = Math.floor(popupSound.duration());
            let position = Math.floor(popupSound.seek());
            let percent = Math.round((position / duration) * 100);

            $("#playPopupPlayerProgress").css("width", `${percent}%`);
          }
        }, 500);
      });
      popupSound.on("stop", function () {
        $("#playPopupPlayer").removeClass("active");
        $("#playPopupPlayerProgress").css("transition", "");
        if (popupProgressInterval !== null) {
          clearInterval(popupProgressInterval);
          popupProgressInterval = null;
        }
      });
      popupSound.on("end", function () {
        $("#playPopupPlayer").removeClass("active");
        $("#playPopupPlayerProgress").css("transition", "");
        if (popupProgressInterval !== null) {
          clearInterval(popupProgressInterval);
          popupProgressInterval = null;
        }
      });
      popupSound.on("pause", function () {
        $("#playPopupPlayer").removeClass("active");
        $("#playPopupPlayerProgress").css("transition", "");
        if (popupProgressInterval !== null) {
          clearInterval(popupProgressInterval);
          popupProgressInterval = null;
        }
      });

      $("#playPopupPlayerVolume").on("input", function () {
        const vol = $(this).val() / 100;
        if (popupSound) {
          popupSound.volume(vol);
        }
      });

      $("#playPopupPlayer").on("click", function () {
        if (popupSound && popupSound.playing()) {
          // return popupSound.pause();
          return popupSound.stop();
        }
        popupSound.play();
      });

      if (!popupMusicLoaded) {
        popupMusicLoading = true;
        popupSound.load();
      }
    });

    $(".open-contact-popup").on("click", function (e) {
      e.preventDefault();
      $("body").addClass("overflow-hidden");
      $("#contactFormPopup").addClass("active");

      $("#contactFormPopup")
        .find(".overlay-cdk__content-wrap")
        .css({ transform: "translateY(100%)" });
      setTimeout(() => {
        $("#contactFormPopup")
          .find(".overlay-cdk__content-wrap")
          .css({ transition: "600ms", transform: "translateY(0)" });
      }, 0);
    });
    $(".open-thanks-popup").on("click", function (e) {
      e.preventDefault();
      openThanks();
    });
    function openThanks() {
      $("body").addClass("overflow-hidden");
      $("#thanksPopup").addClass("active");

      $("#thanksPopup")
        .find(".overlay-cdk__content-wrap")
        .css({ transform: "translateY(100%)" });
      setTimeout(() => {
        $("#thanksPopup")
          .find(".overlay-cdk__content-wrap")
          .css({ transition: "600ms", transform: "translateY(0)" });
      }, 0);
    }

    // Close overlay on outside click
    $(".overlay-cdk").on("click", function (e) {
      if (e.target !== e.currentTarget) return;

      if ($("#playPopup").hasClass("active")) {
        if (popupSound) {
          if (popupProgressInterval !== null) {
            clearInterval(popupProgressInterval);
            popupProgressInterval = null;
          }

          popupSound.off();
          popupSound.unload();
          popupSound = null;

          $("#playPopupPlayer").removeClass("active").addClass("d-none");
          $("#playPopupPlayerPreloader").removeClass("d-none");
          $("#playPopupPlayerVolume").addClass("d-none");
          $("#playPopupPlayerProgress").css("transition", "").css("width", "");

          $("#playPopupPlayerVolume").off("input");
          $("#playPopupPlayer").off("click");
        }
      }

      closeOverlay();
    });

    // Close overlay on button click
    $(".overlay-cdk__close-btn").on("click", function (e) {
      closeOverlay();
    });

    function closeOverlay() {
      $(".overlay-cdk").removeClass("active");
      $("body").removeClass("overflow-hidden");
    }

    // Preview mp3 player
    const previewPlayerVolVal = $("#previewPlayerVolume").val() / 100;
    const previewPlayerMediaSrc = $("#previewPlayerSrc").val();

    const previewSound = new Howl({
      src: previewPlayerMediaSrc,
      loop: false,
      preload: false,
      volume: previewPlayerVolVal,
      // volume: 0.05,
    });

    $("#previewPlayerVolume").on("input", function () {
      const vol = $(this).val() / 100;
      if (previewSound) {
        previewSound.volume(vol);
      }
    });

    let previewMusicLoaded = false;
    let previewMusicLoading = false;
    $("#playPreview").on("click", function () {
      if (previewMusicLoading) {
        return;
      }
      if (!previewMusicLoaded) {
        $(this).addClass("active");
        previewMusicLoading = true;
        return previewSound.load();
      }
      if (previewSound && previewSound.playing()) {
        // return previewSound.pause();
        return previewSound.stop();
      }
      previewSound.play();
    });
    // Clear listener after first call.
    previewSound.once("load", function () {
      previewSound.play();
      previewMusicLoaded = true;
      previewMusicLoading = false;
    });

    let previewProgressInterval = null;
    previewSound.on("play", function () {
      $("#playPreview").addClass("active");
      setTimeout(() => {
        $("#previewPlayerProgress").css("transition", "2000ms");
      }, 200);

      if (previewProgressInterval !== null) {
        clearInterval(previewProgressInterval);
        previewProgressInterval = null;
      }
      previewProgressInterval = setInterval(() => {
        if (previewSound.playing()) {
          let duration = Math.floor(previewSound.duration());
          let position = Math.floor(previewSound.seek());
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
    previewSound.on("stop", function () {
      $("#playPreview").removeClass("active");
      $("#previewPlayerProgress").css("transition", "");
      if (previewProgressInterval !== null) {
        clearInterval(previewProgressInterval);
        previewProgressInterval = null;
      }
    });
    previewSound.on("end", function () {
      $("#playPreview").removeClass("active");
      $("#previewPlayerProgress").css("transition", "");
      if (previewProgressInterval !== null) {
        clearInterval(previewProgressInterval);
        previewProgressInterval = null;
      }
    });
    previewSound.on("pause", function () {
      $("#playPreview").removeClass("active");
      $("#previewPlayerProgress").css("transition", "");
      if (previewProgressInterval !== null) {
        clearInterval(previewProgressInterval);
        previewProgressInterval = null;
      }
    });
  });
})(jQuery);

// plays dummy
// let plays = [
//   {
//     id: 1,
//     age_category: "18+",
//     is_free: true,
//     is_hot: true,
//     img_url: "assets/card-1.png",
//     name: "glossary 1",
//     desc:
//       "Добро пожаловать в Бишкек! \r\n\r\nМы с удовольствием познакомим вас с достопримечательностями нашего города, расположенными в его центральной части. Экскурсия начинается от курантов и проходит через три городские площади, старейший парк, вдоль театров, кинотеатров, памятников и монументов — в общей сложности гид покажет вам более 30-ти достопримечательностей. За те несколько часов, что длится экскурсия, вы узнаете о жизни Бишкека в периоды Кокандского ханства, Российской Империи, СССР и, наконец, Независимого Кыргызстана.\r\n    \r\nПрограмма экскурсии включает обзорное посещение двух музеев — Музея Изобразительных Искусств и Дома-музея Михаила Фрунзе. После того, как в Историческом музее будет закончена реставрация, мы с радостью включим его в наш маршрут!",
//     short_desc:
//       "Парк отличный, почему бы не прогуляться, и не вспомнить былое. Вечером приятно прогуляться, давайте сделаем это вместе!",
//     track_url:
//       "http://api.mestodteatr.kg/file-manager/bp/file/2259b478-b7d2-4987-9d74-d37c993a3c33",
//   },
// ];

// members dummy
// let members_big = [
//   {
//     avatar_url: "assets/member-1.png",
//     firstname: "FirstName",
//     lastname: "LastName",
//     middlename: "MiddleName",
//     member_role: "Role",
//     accolades: ["accolade 1", "accolade 2", "accolade 3"],
//     socials: [
//       {
//         name: "facebook",
//         value: "https://google.com",
//       },
//     ],
//   },
// ];
// let members_small_1 = [
//   {
//     avatar_url: "assets/member-1.png",
//     firstname: "Нурбек",
//     lastname: "Эген",
//     middlename: "",
//     member_role: "Role",
//     accolades: ["accolade 1", "accolade 2", "accolade 3"],
//     socials: [
//       {
//         name: "facebook",
//         value: "https://google.com",
//       },
//     ],
//   },
// ];
// let members_small_2 = [
//   {
//     avatar_url: "assets/member-1.png",
//     firstname: "Нурбек",
//     lastname: "Эген",
//     middlename: "",
//     member_role: "Role",
//     accolades: ["accolade 1", "accolade 2", "accolade 3"],
//     socials: [
//       {
//         name: "facebook",
//         value: "https://google.com",
//       },
//     ],
//   },
// ];
