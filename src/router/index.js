import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Database from "../views/Database.vue";
import RiskAnalysis from "../views/RiskAnalysis.vue";
import AiDetection from "../views/AiDetection.vue";
import About from "../views/About.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/database", component: Database },
    { path: "/risk-analysis", component: RiskAnalysis },
    { path: "/ai-detection", component: AiDetection },
    { path: "/about", component: About },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;