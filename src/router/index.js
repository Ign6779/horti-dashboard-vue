import { createRouter, createWebHistory } from "vue-router";
import { useAuth0 } from "@auth0/auth0-vue";
import Home from "../views/Home.vue";
import Database from "../views/Database.vue";
import CropDetail from "../views/CropDetail.vue";
import DiseaseDetail from "../views/DiseaseDetail.vue";
import PestDetail from "../views/PestDetail.vue";
import RiskAnalysis from "../views/RiskAnalysis.vue";
import AiDetection from "../views/AiDetection.vue";
import About from "../views/About.vue";
import PredatorDetail from "../views/PredatorDetail.vue";


const routes = [
    { path: "/", component: Home },
    { path: "/database", component: Database },
    { path: "/crop/:id", component: CropDetail },
    { path: "/disease/:id", component: DiseaseDetail },
    { path: "/pest/:id", component: PestDetail },
    { path: "/predator/:id", component: PredatorDetail },
    { path: "/risk-analysis", component: RiskAnalysis, meta: { requiresAuth: true } },
    { path: "/ai-detection", component: AiDetection, meta: { requiresAuth: true } },
    { path: "/about", component: About },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (!requiresAuth) {
    return true // allow navigation
  }

  const auth = useAuth0()

  const isAuthenticated = await auth.isAuthenticated.value

  if (isAuthenticated) {
    return true // allow navigation
  }

  await auth.loginWithRedirect({
    appState: { target: to.fullPath }
  })

  return false // cancel navigation
})

export default router;