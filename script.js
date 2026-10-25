const photoGallery = [
  { src: "assets/photos/_B__0053_1.jpg", alt: "나무 그늘 아래 나란히 앉은 두 사람" },
  { src: "assets/photos/_B__0134_1.jpg", alt: "꽃이 핀 담장 앞에 나란히 선 두 사람" },
  { src: "assets/photos/_B__0136_1.jpg", alt: "초록 담장과 꽃을 배경으로 함께한 순간" },
  { src: "assets/photos/_B__0471_1.jpg", alt: "햇살이 비치는 바닷가를 걷는 두 사람" },
  { src: "assets/photos/_B__0484_1.jpg", alt: "바닷가에서 마주 보는 두 사람" },
  { src: "assets/photos/_B__0508_1.jpg", alt: "파란 바다를 배경으로 마주 선 두 사람" },
  { src: "assets/photos/_B__0815_1.jpg", alt: "나무 아래에서 손을 맞잡은 두 사람" },
  { src: "assets/photos/_B__0946_1.jpg", alt: "노을이 지는 바다 앞에 선 두 사람" },
  { src: "assets/photos/_B__0963_1.jpg", alt: "노을이 물든 바닷가에서 손을 잡고 걷는 두 사람" },
  { src: "assets/photos/_B__1012_1.jpg", alt: "저녁 바다를 향해 함께 걸어가는 두 사람" },
  { src: "assets/photos/_B__1162_1.jpg", alt: "해 질 무렵 바닷가에서 서로를 바라보는 두 사람" },
  { src: "assets/photos/_B__1240_1.jpg", alt: "야자수 사이로 노을을 바라보는 두 사람의 실루엣" }
];

const galleryGrid = document.getElementById("gallery-grid");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");
const toast = document.getElementById("toast");
let activePhotoIndex = 0;
let lastGalleryTrigger = null;
let toastTimer = null;

photoGallery.forEach(function (photo, index) {
  const button = document.createElement("button");
  button.className = "gallery-item";
  button.type = "button";
  button.setAttribute("aria-label", (index + 1) + "번째 사진 크게 보기: " + photo.alt);
  button.dataset.photoIndex = String(index);

  const image = document.createElement("img");
  image.src = photo.src;
  image.alt = photo.alt;
  image.loading = "lazy";
  image.decoding = "async";

  const count = document.createElement("span");
  count.className = "gallery-count";
  count.textContent = String(index + 1).padStart(2, "0");
  count.setAttribute("aria-hidden", "true");

  button.append(image, count);
  button.addEventListener("click", function () {
    openLightbox(index, button);
  });
  galleryGrid.append(button);
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(function () {
    toast.classList.remove("is-visible");
  }, 3600);
}

function updateLightboxImage() {
  const photo = photoGallery[activePhotoIndex];
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightboxCaption.textContent = String(activePhotoIndex + 1).padStart(2, "0") + " / " + String(photoGallery.length).padStart(2, "0");
}

function openLightbox(index, trigger) {
  activePhotoIndex = index;
  lastGalleryTrigger = trigger;
  updateLightboxImage();
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastGalleryTrigger) lastGalleryTrigger.focus();
}

function moveLightbox(direction) {
  activePhotoIndex = (activePhotoIndex + direction + photoGallery.length) % photoGallery.length;
  updateLightboxImage();
}

lightboxClose.addEventListener("click", closeLightbox);
document.getElementById("lightbox-prev").addEventListener("click", function () { moveLightbox(-1); });
document.getElementById("lightbox-next").addEventListener("click", function () { moveLightbox(1); });
lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", function (event) {
  if (!lightbox.classList.contains("is-open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});

let touchStartX = null;
lightbox.addEventListener("touchstart", function (event) {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });
lightbox.addEventListener("touchend", function (event) {
  if (touchStartX === null) return;
  const delta = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) > 55) moveLightbox(delta > 0 ? -1 : 1);
  touchStartX = null;
}, { passive: true });

const weddingDate = new Date("2027-03-27T12:30:00+09:00");
const countdown = document.getElementById("countdown");

function updateCountdown() {
  const remaining = weddingDate.getTime() - Date.now();
  if (remaining <= 0) {
    countdown.innerHTML = "오늘, 저희의 결혼식이 열립니다 <strong>♥</strong>";
    return;
  }
  const days = Math.ceil(remaining / 86400000);
  countdown.innerHTML = "예식일까지 <strong>D-" + days + "</strong>";
}

updateCountdown();
window.setInterval(updateCountdown, 60000);

const music = document.getElementById("site-music");
const musicButton = document.getElementById("music-button");
const musicLabel = musicButton.querySelector(".music-label");

function setMusicState(playing) {
  musicButton.classList.toggle("is-playing", playing);
  musicButton.classList.remove("is-blocked");
  musicButton.setAttribute("aria-pressed", String(playing));
  musicButton.setAttribute("aria-label", playing ? "배경 음악 끄기" : "배경 음악 켜기");
  musicLabel.textContent = playing ? "음악 끄기" : "음악 켜기";
}

music.addEventListener("play", function () { setMusicState(true); });
music.addEventListener("pause", function () { setMusicState(false); });

musicButton.addEventListener("click", async function () {
  if (!music.paused) {
    music.pause();
    return;
  }
  try {
    await music.play();
    setMusicState(true);
  } catch (error) {
    setMusicState(false);
    showToast("음악을 재생할 수 없습니다. 브라우저의 소리 설정을 확인해 주세요.");
  }
});

window.addEventListener("load", async function () {
  try {
    music.volume = 0.42;
    await music.play();
    setMusicState(true);
  } catch (error) {
    setMusicState(false);
    musicButton.classList.add("is-blocked");
    showToast("자동 재생이 차단됐어요. 오른쪽 아래 음악 버튼을 눌러주세요.");
  }
}, { once: true });

document.getElementById("guestbook-form").addEventListener("submit", function (event) {
  event.preventDefault();
  showToast("방명록은 추후 저장 기능을 연결한 뒤 이용하실 수 있어요. 입력 내용은 저장되지 않았습니다.");
});

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMessage);
  } catch (error) {
    const temporary = document.createElement("textarea");
    temporary.value = text;
    temporary.setAttribute("readonly", "");
    temporary.style.position = "fixed";
    temporary.style.opacity = "0";
    document.body.append(temporary);
    temporary.select();
    const copied = document.execCommand("copy");
    temporary.remove();
    showToast(copied ? successMessage : "복사할 수 없습니다. 주소를 길게 눌러 복사해 주세요.");
  }
}

document.querySelectorAll("[data-copy-text]").forEach(function (button) {
  button.addEventListener("click", function () {
    copyText(button.dataset.copyText, "예식장 주소를 복사했어요.");
  });
});

const invitationMessage = "김병욱과 박소현이 결혼합니다.\n2027년 3월 27일 토요일 오후 12시 30분\n영통 SY컨벤션 9층 플레르홀\n\n저희의 새로운 시작을 따뜻한 마음으로 축복해 주세요.\n";

document.getElementById("share-button").addEventListener("click", async function () {
  const text = invitationMessage + window.location.href;
  if (navigator.share) {
    try {
      await navigator.share({ title: "김병욱 · 박소현 결혼합니다", text: invitationMessage, url: window.location.href });
    } catch (error) {
      if (error.name !== "AbortError") showToast("초대장을 공유하지 못했습니다.");
    }
    return;
  }
  copyText(text, "초대장 문구와 링크를 복사했어요.");
});

document.getElementById("copy-link-button").addEventListener("click", function () {
  copyText(window.location.href, "초대장 링크를 복사했어요.");
});

document.getElementById("calendar-button").addEventListener("click", function () {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Byeonguk and Sohyeon//Wedding Invitation//KO",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:20270327T123000-wedding@invitation.local",
    "DTSTAMP:" + stamp,
    "DTSTART:20270327T033000Z",
    "DTEND:20270327T043000Z",
    "SUMMARY:김병욱 ♥ 박소현 결혼식",
    "LOCATION:영통 SY컨벤션 9층 플레르홀\\, 경기 수원시 영통구 봉영로 1612",
    "DESCRIPTION:김병욱과 박소현의 결혼식에 초대합니다.",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob(["\uFEFF" + ics], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "byeonguk-sohyeon-wedding.ics";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("예식 일정을 캘린더 파일로 저장했어요.");
});

function loadKakaoMap() {
  const config = window.INVITATION_CONFIG || {};
  const appKey = typeof config.kakaoMapJavaScriptKey === "string" ? config.kakaoMapJavaScriptKey.trim() : "";
  const fallback = document.getElementById("venue-map-fallback");
  const mapContainer = document.getElementById("kakao-map");
  const mapCenter = { lat: 37.2544858, lng: 127.0750136 };

  if (!appKey) return;

  const sdk = document.createElement("script");
  sdk.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=" + encodeURIComponent(appKey) + "&autoload=false&libraries=services";
  sdk.async = true;
  sdk.onerror = function () {
    showToast("카카오 지도를 불러오지 못해 기본 지도를 표시합니다.");
  };
  sdk.onload = function () {
    if (!window.kakao || !window.kakao.maps || typeof window.kakao.maps.load !== "function") {
      showToast("카카오 지도 키와 등록 도메인을 확인해 주세요.");
      return;
    }

    window.kakao.maps.load(function () {
      const kakao = window.kakao;
      mapContainer.classList.add("is-visible");
      fallback.hidden = true;
      const center = new kakao.maps.LatLng(mapCenter.lat, mapCenter.lng);
      const map = new kakao.maps.Map(mapContainer, { center: center, level: 4 });
      const marker = new kakao.maps.Marker({ position: center });
      const info = new kakao.maps.InfoWindow({
        content: '<div class="kakao-map-label"><strong>영통 SY컨벤션</strong><span>9층 플레르홀</span></div>'
      });

      marker.setMap(map);
      info.open(map, marker);
      window.requestAnimationFrame(function () {
        map.relayout();
        map.setCenter(marker.getPosition());
      });

      if (kakao.maps.services && kakao.maps.services.Places) {
        const places = new kakao.maps.services.Places();
        places.keywordSearch("SY컨벤션웨딩홀", function (results, status) {
          if (status !== kakao.maps.services.Status.OK || !results.length) return;
          const venue = results.find(function (place) {
            return (place.address_name || "").indexOf("봉영로 1612") !== -1 || (place.road_address_name || "").indexOf("봉영로 1612") !== -1;
          }) || results[0];
          const venuePosition = new kakao.maps.LatLng(Number(venue.y), Number(venue.x));
          map.setCenter(venuePosition);
          marker.setPosition(venuePosition);
          info.open(map, marker);
        }, { location: center, radius: 1000 });
      }

      window.addEventListener("resize", function () {
        map.relayout();
        map.setCenter(marker.getPosition());
      });
    });
  };
  document.head.append(sdk);
}

loadKakaoMap();
