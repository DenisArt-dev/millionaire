import { createApp } from 'vue';
import App from './App.vue';
import './style/main.scss';

import { createRouter, createWebHistory } from 'vue-router';

import cmpHeader from './components/cmpHeader.vue';
import cmpPopUp from './components/cmpPopUp.vue';
import cmpButton from './components/cmpButton.vue';
import cmpStars from './components/cmpStars.vue';
import pageGame from './components/pageGame.vue';
import pageStart from './components/pageStart.vue';
import pageNew from './components/pageNew.vue';
import pageCreateQuestions from './components/pageCreateQuestions.vue';

import vuex from './vuex.js';

const router = createRouter({
    routes: [
        {
            path: '/game',
            component: pageGame,
        },

        {
            path: '/',
            component: pageStart,
        },

        {
            path: '/new',
            component: pageNew,
        },

        {
            path: '/create',
            component: pageCreateQuestions
        }

    ],
    history: createWebHistory(),
});

const app = createApp(App);

app.use(router);
app.use(vuex);

app.component('cmp-header', cmpHeader);
app.component('cmp-pop-up', cmpPopUp);
app.component('cmp-button', cmpButton);
app.component('cmp-stars', cmpStars);

app.mount('#app');
