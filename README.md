This is a web application for helping workers to make meeting chance.  
직장인끼리의 미팅을 도와주는 웹 애플리케이션입니다.  

![mockup](https://github.com/HyunSangHan/MeetingTime/blob/master/docs/mockup.png)

---

### 기획의도

- 직장인들은 미팅을 하고자 하는 니즈가 있다해도 대학생들처럼 미팅 할 기회가 자주 주어지지 않습니다.
- 시중에 많은 매칭 서비스들이 있지만, 상대방의 신분이 보장되지 않는데다가 심지어 과금을 하지 않고서는 매칭 자체가 매우 제한적이라는 단점이 있습니다.
- 이 서비스는 이러한 단점들을 보완하여, 가입 시 재직중인 회사 인증을 통해 신분을 서로 확인할 수 있게 하고, 매주 최대한 많은 쌍의 미팅을 매칭해줍니다.

### 주요 서비스 플로우
1. 미팅을 하고자 하는 그룹의 대표자가 재직회사 이메일인증을 하여 회원가입을 합니다. (소셜계정 로그인 연동)
2. 오픈되어있는 미팅모집에 지원하면, 지원한 순서대로 `선착순` 번호표가 부여됩니다.
3. 남자 지원팀수와 여자 지원팀수를 비교하여, 더 적은 성별의 팀수가 `커트라인`이 됩니다.
(ex: 남자 80팀과 여자 50팀이 지원한 경우, 남자 50팀과 여자 50팀이 참여하여 최대 50쌍의 매칭이 가능)
4. 커트라인 안에 들어온 남자팀과 여자팀이 랜덤으로 매칭되고, 상대방의 기본정보를 확인한 뒤 미팅을 할 의향이 있다면 `그린라이트` 버튼을 누릅니다.
5. 서로 그린라이트를 누른 경우에는 해당 매칭은 성사되어, 서로 대화를 나눌 수 있는 카카오 오픈채팅방 URL이 제공됩니다.
6. 만약 한쪽이라도 그린라이트를 누르지 않았다면 그 매칭은 성사되지 않게 되고, 이렇게 매칭이 성사되지 않은 팀 사이에 셔플이 진행되어 새로운 상대와 매칭이 되게 됩니다. 이러한 셔플은 총 3회 진행되어 매칭 기회가 주어집니다.

   * 상대방의 그린라이트 ON을 유도하기 위해, `안주쏘기`라고 하는 일종의 자발적 favor를 제공할 수 있습니다.

---

### 기술스택
- Client : React.js, Redux, React-thunk, Scss 등  
- Server : Django(DRF), OAuth, sqlite 등

### 디렉토리 구조
- Client  
├─ public  
└─ src  
&nbsp; &nbsp; &nbsp; &nbsp; ├─ components  
&nbsp; &nbsp; &nbsp; &nbsp; ├─ css  
&nbsp; &nbsp; &nbsp; &nbsp; ├─ images  
&nbsp; &nbsp; &nbsp; &nbsp; └─ modules  

- Server  
├─ backend  
├─ meeting  
└─ images  

### Model
<img src="https://user-images.githubusercontent.com/44132406/73130398-05a26b80-403b-11ea-9bb4-2bb35b171475.png" alt="ERD">

### Controller(APIs, Serializers)
- CurrentMatching
- CurrentMeeting
- Join
- CounterProfile
- MyProfile
- Company
- Email, Validation
- success_matching
- KakaoLogin, logout

### View
- http://testbyhs.dothome.co.kr/
