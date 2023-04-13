import { createWebHistory, createRouter } from "vue-router";
import MyList from "./components/MyList.vue"
import MyHome from "./components/MyHome.vue"
import MyDetail from "./components/MyDetail.vue"
import MyAuthor from "./components/MyAuthor.vue"
import MyComment from "./components/MyComment.vue"


const routes = [
  {
    path: "/list",
    component: MyList,
  },
  {
    path: "/",
    component: MyHome,
  },
  {
    path: "/detail/:id", //숫자 여러개 /detail/:작명 url 파라미터 문법
    // 파라미터 문법 쓸때 정규식도 입력 가능하다. 
    // /detail/:id(정규표현식) 
    component: MyDetail,
    children: [ //상세의 상세 페이지 nested routes
        {
            path: "author",
            component: MyAuthor,
        },
        {
            path: "comment",
            component: MyComment,
        }
    ]
  },
  {
    path: "/:anything(.*)", //위에 먼저 읽고 오는거라 순서 밑에 두면 쓰고 있는거여도 상관없음. 아무거나 입력했을 때 홈으로 가게함.
    component: MyHome,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

//라우터 가져다 쓰는거다. 예제코드 걍 복붙 세부설정만 살짝 건드리면됨. path,component
