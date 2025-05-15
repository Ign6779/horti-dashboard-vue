import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.mount('#app')

app.directive('intersect', {
  mounted(el) {
    el.classList.add(
      'opacity-0',
      'translate-y-8',
      'scale-[0.98]',
      'transition-all',
      'duration-700',
      'ease-out'
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('opacity-0', 'translate-y-8', 'scale-[0.98]');
          el.classList.add('opacity-100', 'translate-y-0', 'scale-100');
        } else {
          el.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
          el.classList.add('opacity-0', 'translate-y-8', 'scale-[0.98]');
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
  }
})