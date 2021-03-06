import { createStore } from 'vuex';
import dataBase from './dataBase/dataBase.json';

export default createStore({

    state() {
        return {
            name: null, 
            nameIsSet: false, 
            category: [], 
            choseCategory: null, 
            questionNumber: 0, 
            colors: [],
            dataBase: dataBase,
            parseDataBase: null,
            atStake: [0, 100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 255000, 500000, 1000000],
            isSavedata: false,
            help: {
                call: true,
                mOpinion: true,
                fiftyFifty: true,
            },
            isGameOver: false,
            isWin: false,
        }
    },

    mutations: {

        parseDataBaseF (state) {

            if (state.parseDataBase && state.parseDataBase.length > 0) return;

            for (let i = 0; i < state.dataBase.blocks.length; i++) {

                if (state.dataBase.blocks[i].title == state.choseCategory) {
                    state.parseDataBase = state.dataBase.blocks[i].content;
                }
                
            }

        },

        setColors (state) {

            if (state.colors.length > 0) return;

            let colorsChild = document.querySelector('.colors').children;

            for(let i = 0; i < colorsChild.length; i++) {
                state.colors.push(getComputedStyle(colorsChild[i]).backgroundColor);
            }
            
        }, 

        setName(state, input) {
            if (state.name) return;
            state.nameIsSet = true;
            state.name = input.value.trim();
        },

        setCategory(state) {

            if (state.category.length > 0) return;

            for (let i = 0; i < state.dataBase.blocks.length; i++) {
                state.category.push(state.dataBase.blocks[i].title);
            }

        },

        resetAll(state) {
            localStorage.clear();
            state.name = null;
            state.choseCategory = null;
            state.nameIsSet = false;
            state.questionNumber = 0;
            state.help.call = true;
            state.help.mOpinion = true;
            state.help.fiftyFifty = true;
            state.isGameOver = false;
            state.isWin = false;
        },

        getSaveData(state) {

            if (localStorage.length > 0) {

                let obj = JSON.parse(localStorage.getItem('userData'));

                for(let key in obj) {
                    state[key] = obj[key];
                }

            } 

        },

        updateLSDB (state) {
            let obj = {};

            for (let key in state) {
                obj[key] = state[key];
            }

            localStorage.setItem('userData', JSON.stringify(obj));
        },

        nextQuestion (state) {
            state.questionNumber++;
        }

    }
});