# DAENAMU PROJECT

<hr>



Next.js를 활요하여 개발한 커뮤니티 서비스 "대나무 숲"입니다.<br>
기본 익명 설정으로 되어있고 해제하여 닉네임 공개로 게시글을 올릴 수 있습니다.

### 기술 스택

- **프론트엔드**
    - Next.js
    - TypeScript
    - SCSS (Sass)
    - Redux
    - styled-components

- **백엔드**:
    - Supabase

### 필요 조건

- Node.js (버전 18 이상 권장)
- npm

### 설치 단계

1. **프로젝트 클론하기**
2. 의존성 설치하기

```sh
npm install
```

3.eslint, prettier 설치 및 적용

```sh
npm install eslint --save-dev
npm install --save-dev prettier
```

### 파일 구조

```
src/
├── assets/           # 이이콘, 더미 이미지 
├── components/       # 재사용 가능한 React 컴포넌트
├── hooks/            # 커스텀 훅
├── pages/            # 페이지 컴포넌트
├── services/         # API 호출 로직
├── styles/           # SCSS 스타일 파일
├── types/            # 공통 타입 및 db 타입 파일
├── utils/            # 유틸리티 함수
└── App.tsx           # 애플리케이션 진입점
```

### css 파일구조

- 언더스코어(_)는 이 파일이 부분 파일임을 나타내먀 부분 파일은 다른 SCSS 파일로 import 해서 사용

```
styles/
  |- abstracts/
      |- _mixins.scss     // 반복 스타일 재사용 가능하도록 정의
      |- _variables.scss  // 전역 사용 변수
  |- base/
      |- _common.scss      // 공통 scss
      |- _typography.scss // 폰트 변수
  |- main.scss            // 메인 SCSS 파일 ,rest.scss와 common.scss 포함
  |- _global.scss          // 부분 파일을 모아놓은 파일
```
