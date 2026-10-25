# 김병욱 · 박소현 모바일 청첩장

별도 빌드 도구 없이 배포할 수 있는 정적 웹사이트입니다.

## 미리보기

`index.html`을 브라우저에서 열면 확인할 수 있습니다. 배경 음악 자동 재생은 브라우저 설정에 따라 차단될 수 있으며, 이 경우 화면의 음악 버튼을 눌러 재생할 수 있습니다.

## GitHub Pages 배포

1. 이 폴더의 파일을 GitHub 저장소에 올립니다.
2. 저장소의 **Settings → Pages**에서 배포할 브랜치와 폴더(`/ (root)`)를 선택합니다.
3. 저장 후 표시되는 Pages 주소에서 모바일과 데스크톱 화면을 확인합니다.

이 사이트는 상대 경로를 사용해 저장소 루트의 GitHub Pages 프로젝트 사이트에서도 작동하도록 구성했습니다.

## 자료와 추후 입력 항목

- 원본 사진은 `photos/1.jpg`부터 `photos/20.jpg`, 웹 표시용 압축본은 `assets/photos/1.jpg`부터 `assets/photos/20.jpg`에 있습니다. `photos/17.jpg`는 상단 대표 사진이며, 갤러리에는 나머지 19장이 표시됩니다.
- 배경 음악은 `musics/Birds_of_feather_acoustic.mp3`입니다.
- 신부 측 가족 전화번호와 양가 계좌번호는 확인 후 `index.html`에 반영하면 됩니다.
- 셔틀버스 운행 정보는 예식장 확인 후 `index.html`의 오시는 길 섹션에 추가하면 됩니다.
- 지도는 기본적으로 OpenStreetMap을 페이지 안에 표시합니다. 카카오 지도를 사용하려면 `map-config.js`에 카카오 JavaScript 키를 입력하고, Kakao Developers에서 GitHub Pages 도메인을 JavaScript SDK 도메인으로 등록하세요. 카카오 지도를 사용할 수 없을 때는 기본 지도가 계속 표시됩니다.
