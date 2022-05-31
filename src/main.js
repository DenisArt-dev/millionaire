import { createApp } from 'vue';
import App from './App.vue';
import './style/main.scss';

import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';

import cmpHeader from './components/cmpHeader.vue';
import cmpPopUp from './components/cmpPopUp.vue';
import pageGame from './components/pageGame.vue';
import pageStart from './components/pageStart.vue';

const router = createRouter({
    routes: [
        {
            path: '/game',
            component: pageGame,
            // children: [

            // ]
        },

        {
            path: '/',
            component: pageStart,
        }

    ],
    history: createWebHistory(),
});

const vuex = createStore({
    state() {
        return {
            name: null,
            category: null,
            balance: 0,
            questionNumber: 0
        }
    }
});

const app = createApp(App);

app.use(router);
app.use(vuex);

app.component('cmp-header', cmpHeader);
app.component('cmp-pop-up', cmpPopUp);

app.mount('#app');

