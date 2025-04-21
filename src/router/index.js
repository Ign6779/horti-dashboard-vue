import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Database from "../views/Database.vue";
import CropDetail from "../views/CropDetail.vue";
import DiseaseDetail from "../views/DiseaseDetail.vue";
import PestDetail from "../views/PestDetail.vue";
import RiskAnalysis from "../views/RiskAnalysis.vue";
import AiDetection from "../views/AiDetection.vue";
import About from "../views/About.vue";


const routes = [
    { path: "/", component: Home },
    { path: "/database", component: Database },
    { path: "/crop/:id", component: CropDetail },
    { path: "/disease/:id", component: DiseaseDetail },
    { path: "/pest/:id", component: PestDetail },
    { path: "/risk-analysis", component: RiskAnalysis },
    { path: "/ai-detection", component: AiDetection },
    { path: "/about", component: About },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;