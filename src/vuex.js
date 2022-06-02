import { createStore } from 'vuex';
import dataBase from './dataBase.json';

export default createStore({

    state() {
        return {
            name: null,
            nameIsSet: false,
            category: [],
            choseCategory: null,
            balance: 0,
            questionNumber: 0,
            colors: [],
            dataBase: dataBase,
        }
    },

    mutations: {
        setColors (state) {

            let colorsChild = document.querySelector('.colors').children;

            for(let i = 0; i < colorsChild.length; i++) {
                state.colors.push(getComputedStyle(colorsChild[i]).backgroundColor);
            }
            
        }, 
        setName(state, input) {
            state.nameIsSet = true;
            state.name = input.value.trim();
        },
        setCategory(state) {

            for(let i = 0; i < state.dataBase.blocks.length; i++) {
                state.category.push(state.dataBase.blocks[i].title);
            }

        },
        resetAll(state) {
            state.name = null;
            state.choseCategory = null;
            state.nameIsSet = false;
            state.balance = 0;
            state.questionNumber = 0;
        }
    }
});