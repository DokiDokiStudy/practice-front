배포용 커맨드(docker-compose.yml 기준)
```
docker-compose up -d --build
```

개발용 커맨드(docker-compose.dev 기준)
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```
: http://localhost:5173/
-- override 명칭으로 쓰면 자동 오버라이드 반영되기 때문에 dev로 분리

### 2025-06-05 정리
1. 이메일 중복 체크 말고도 이메일 찾기 시 사용하는 별도의 API 필요하지 않을까요?
    - 별도 API는 나중에 이메일 또는 기타 등등을 해당 이메일로 전송하는 API로 고도화 가능할 것으로 보여서 그렇습니다.
    - 현재는 이메일 중복 체크 가지고 이메일 찾기에 사용 중

2. 아이디(닉네임) 중복 체크 API 필요
3. 로그인 성공 시 사용자 정보 자세한 내용 필요합니다.
    - role은 있어야 할 것 같아요!

4. 일단 아이디 찾기 대신 이메일 찾기 API만 있어서 이메일 찾기로 변경해놨는데 이 부분은 다시 한 번 얘기해보시죠

5. 비밀번호 찾기 - 암호화된 비밀번호 응답하면 안됩니다..!
    - 1) password 평문 반환
    - 2) 추후 리팩토링 사항
        - 임시 password 및 인증 토큰 이메일로 반환

6. 회원 정보 수정은 있는데 회원 정보 조회가 없어요 마이 페이지 제작하려면 필요하다고 생각합니다!
    - 비밀번호는 따로 수정 API 만드시는거쥬?


### 2025-06-15 정리
1. 로그인 API에서 이메일을 반환하지 않고 있어서 이메일로 아이디 표기 불가능

2. category 구분 어떻게 해야 하나요?
    EX) Docker(대) - 1장(중) - 1.1장(소)
    쉽게 하는 방법은 (대)를 구분하는 기준을 groupId라는 컬럼같을 걸 추가해서 카테고리분류가 가능하면 좋겠네요.
    저희는 상세한 카테고리분류는 필요없으니 컬럼레벨에서 해소할 수 있겠습니다.

3. 게시글 가져올 때 댓글, 좋아요 카운트도 한번에 조회할 수 있는 API 없을까요?

4. 좋아요 눌러서 좋아요 id가 생성되면 반환되어야 함
    해당 id가지고 유저 액션 연속성 유지 가능


### 2025-07-13 정리
1. 로그인, 일반 게시글 관련하여 리액트 쿼리 적용
    1.1) src/api/* : 각 도메인(기능)에 대한 레파지토리 역할 수행
        -> 조건(필터)에 맞게 데이터를 요청하고 그대로 내어주는 것이 좋다고 생각함.
    1.2) src/hooks/* : 
        -> 응답에 대해 가공도 이루어지는 곳
        -> 추후 convertData 같은 패턴들은 여기서 다뤄지면 좋겠다는 생각
    1.3) 흐름 정리 (게시글 기준)
        로직단위 호출 -> hooks/usePost.ts(쿼리 조합) -> api/Posts.ts(기능에 대한 호출 책임부) -> lib/api(공통 통신부)
    
    2.1) 로그인 시 user 객체 안에 담아서 사용하도록 수정함
        => 나중에는 sessionStorage를 쓰도록 해봐야겠습니다.

    3.1) useQuery와 useMutation 동작이 달라서 hooks도 분리해서 관리하는게 좋다길래 나눠봤는데 보통 어떻게 관리하시나요?
        => 나눈 기준은 일단 조회 Or DML입니다.

2. BoardLayout 좀 답답한 감이 있어서 조금 변경함

3. isError와 error의 차이
    1.1) isError는 쿼리가 실패한 경우 true 변경되는 옵션
    1.2) error는 에러 객체임 (에러가 없는 경우 null을 가지고 있음)
    1.3) 따라서 isError가 true인 경우만 error가 실제 에러 내용을 가지고 있기 때문에 에러 여부만 따질 때는 간편하게 isError사용, 그렇지 않고 error의 내용도 반환이 필요하다면 error를 직접 꺼내서 사용하면 됩니다.

4. 여전히 CORS 나고 있습니다 ㅠㅠ (참고이미지->게시글작성CORS.png 스샷 첨부..)

### 2025-07-23 정리

#### 프론트 작업
1. TopNav를 MainLayout으로 분리하여 전체 페이지에 일괄 적용
2. 리액트 쿼리 패턴을 전체적으로 적용
   - 게시글, 카테고리, 좋아요, 댓글 등 각 도메인별로 api/hook 분리
   - useQuery/useMutation을 활용한 데이터 요청 및 상태 관리
3. Board 페이지에서 isLoading, isError 상태를 return 분기로 리팩터링하여 UI 가독성 개선
4. 카테고리, 게시글, 좋아요, 댓글 등 API 타입을 백엔드 응답 구조에 맞게 개선
5. 프론트와 백엔드 통신 시 엔드포인트 및 응답 구조 일치화 작업 진행


# 백엔드 코드 리팩토링 및 보완점 정리
## 1. 엔드포인트 네이밍 일관성
- RESTful하게 복수형(`/categories`, `/posts`, `/comments`, `/likes`)으로 통일을 하는게 어떠신가요.

## 2. 응답 구조 통일
- 모든 API에서 `{ message, statusCode, data }`와 같이 일관된 응답 구조 반환 권장드립니디

## 3. 인증/인가 처리
- GET요청에는 인증이 필요없어도 되지 않는가에 대해서 생각해보면 좋겠습니다.

## 4. 쿼리 최적화
  - TypeORM에서 트리 구조를 효율적으로 조회하는 예시
    - QueryBuilder를 활용한 CTE(재귀 쿼리) 예시:
      ```typescript
      // src/categories/category.service.ts
      import { DataSource } from 'typeorm';
      // ...existing code...
      async getCategoryTree(): Promise<CategoryEntity[]> {
        const query = `
          WITH RECURSIVE category_path (id, name, parentId, depth) AS (
            SELECT id, name, parentId, 1
            FROM category
            WHERE parentId IS NULL
            UNION ALL
            SELECT c.id, c.name, c.parentId, cp.depth + 1
            FROM category c
            JOIN category_path cp ON c.parentId = cp.id
          )
          SELECT * FROM category_path;
        `;
        return await this.dataSource.query(query);
      }
      ```
    - Entity 내에서 트리 구조 반환하는 방법(관계 설정 및 재귀 함수):
      ```typescript
      // src/categories/entities/category.entity.ts
      import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
      @Entity('category')
      export class CategoryEntity {
        @PrimaryGeneratedColumn()
        id: number;
        @Column()
        name: string;
        @Column({ nullable: true })
        parentId: number;
        @ManyToOne(() => CategoryEntity, category => category.children)
        parent: CategoryEntity;
        @OneToMany(() => CategoryEntity, category => category.parent)
        children: CategoryEntity[];
      }
      // 서비스에서 재귀적으로 트리 반환
      async getCategoryTreeRecursive(parentId: number = null): Promise<CategoryEntity[]> {
        return this.categoryRepository.find({
          where: { parentId },
          relations: ['children'],
        });
      }
      ```
    - N+1 문제 방지 팁: relations 옵션 최소화, select로 필요한 필드만 조회, 페이징 적용

### 2025-07-29 정리

- 인증관련 페이지에 도커 이미지와 유사한 디자인으로 변경
  - 해당 페이지 디자인 괜찮으면 도커 카테고리는 도커 이미지
  - 다른 주제의 카테고리는 해당 주제에 맞도록 디자인-컬러 수정할 수 있도록 하겠습니다.
    - 이를 구현하기 위해 테마(Theme) 정의 추가

#### 테마
1. **URL 기반 테마 감지**: 현재 경로를 기준으로 자동으로 테마가 결정됨
2. **CSS 변수 주입**: 선택된 테마의 색상이 CSS 변수로 루트 요소에 주입
3. **컴포넌트 스타일 적용**: 각 컴포넌트는 테마 클래스를 통해 동적 스타일 적용

- **themes.ts**: 
  - 카테고리별 색상 팔레트 정의 (Docker=파랑, JavaScript=노랑 등)
  - URL 경로를 분석하여 적절한 테마 반환
  
- **ThemeProvider.tsx**: 
  - React Context로 전역 테마 상태 관리
  - 경로 변경 시 자동으로 테마 업데이트
  - CSS 변수(--theme-primary 등)를 document에 주입
  
- **useTheme.ts**: 
  - 컴포넌트에서 사용할 테일윈드 클래스 생성
  - 네비게이션, 폼, 버튼 등 요소별 스타일 클래스 제공

1. 페이지 로드 시 useLocation으로 현재 경로 찾기
2. getCurrentTheme 호출
3. 기본 테마 설정
4. 이후 사용자가 다른 페이지 이동하면 location.pathname가 변경되기 때문에 useEffect 트리거 발동
5. getCurrentTheme 호출 -> 바뀐 로케이션 정보 기준
6. 새로운 테마 실행

### 2025-08-06 정리

#### Thread 시스템 대규모 리팩토링
1. **카테고리 평면화 로직 수정**
   - 3단계 카테고리 구조: 대분류→ 중분류 → 소분류
   - useDockerCategories 훅으로 Docker 전용 카테고리 관리
      - 추후에는 대분류 카테고리 전용으로 확장 필요
   - 도커 카테고리는 name으로 검색

2. **좋아요/싫어요 추가**
   - 백엔드 API 구조 분석 및 호환: `POST /likes/post/{id}` with `{ reactionType: "like" | "disLike" }`
   - usePostReaction 공통 훅 생성으로 ThreadCard와 ThreadDetail 코드 중복 제거
   - 낙관적 업데이트 처리: UI 즉시 반영 후 API 호출, 실패시 이전 상태로 롤백

3. **쓰레드 댓글 추가**
   - CommentWrite 컴포넌트: 로그인 상태 확인, 키보드 단축키 지원 (Enter 전송, Shift+Enter 줄바꿈)
   - Thread 조회 시 댓글 포함 구조로 변경: 별도 댓글 API 대신 `/posts/{id}` 응답의 comments 활용
      - 근데.. 이거 500떨어지네요 흠..

