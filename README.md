# fry

내 머리는 나빠서 문서와 주석만이 살길이다.

## Turborepo

### 특정 워크스페이스에 의존성 추가

```sh
pnpm add {name} --filter {workspace}
```

### turbo.json

> https://turbo.build/repo/docs/reference/configuration

`persistent`: 이 옵션은 작업이 계속 실행되는 프로세스임을 Turborepo에 알립니다.

- 왜 사용하나요?

  1. 작업 특성 표시: 일부 작업(예: 개발 서버, 파일 감시)은 계속 실행되어야 합니다.
  2. 의존성 관리: Turborepo가 이 작업이 끝나기를 기다리지 않도록 합니다.
  3. 오류 방지: 다른 작업이 이 작업에 잘못 의존하는 것을 막아, 무한 대기 상태를 예방합니다.

- 사용 방법:

  - true : 작업이 종료되지 않고 계속 실행됨을 의미합니다 (예: 개발 서버, 파일 변경 감지).
  - false(기본값): 작업이 완료되면 종료됨을 의미합니다.

- 주로 dev, watch 등의 장기 실행 작업에 사용됩니다.

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    // 빌드 작업: 의존성 빌드 후 실행, 환경 변수 고려, 결과물 지정
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**", "storybook-static/**"]
    },
    // 린트 작업: 의존성 린트 후 실행
    "lint": {
      "dependsOn": ["^lint"]
    },
    // 테스트 작업: 매번 새로 실행, 백그라운드에서 계속 동작 (예: 파일 변경 감지)
    "test": {
      "cache": false,
      "persistent": true
    },
    // CI 테스트 작업: 결과 재사용, 한 번 실행 후 종료, 결과 파일 생성
    "test:ci": {
      "cache": true,
      "persistent": false,
      "outputs": ["test-results.json"]
    },
    // 개발 서버 작업: 매번 새로 시작, 종료 전까지 계속 실행
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```
