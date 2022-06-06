<template>

    <div v-if="!$store.state.name" class="popup popup__setName">
        <h2 class="popup__title">Кто будет играть?</h2>
        <input id="inputSetName"
               :class="{'popup__input': true, 'popup__inputErr': (checkInputName) ? true : false}"
               type="text" placeholder="Ваше имя"
               @input="$store.state.nameIsSet = false">
        <div class="popup__buttonsFX">
            <cmp-button class="popup__button" inner="Начать" :clickF="clickFName" :hoverSW="true"></cmp-button>
        </div>
    </div>

    <div v-if="$store.state.name && $store.state.category.length > 0" class="popup">
        <h2 class="popup__title">Категория вопросов:</h2>
        <div class="popup__buttonsBL">
            <router-link v-for:="item in $store.state.category" to="/game">
                <cmp-button class="popup__button" :inner="item" :clickF="clickFCategory" :hoverSW="true"></cmp-button>
            </router-link>
        </div>
    </div>

</template>

<script>

    export default {

        data() {

        },

        methods: {

            clickFName () {
                this.$store.commit('setName', document.getElementById('inputSetName'));
            },

            clickFCategory (ev) {
                this.$store.state.choseCategory = ev.target.textContent;
                this.$store.state.isSavedata = true;
                this.$store.commit('parseDataBaseF');
                this.$store.commit('updateLSDB');
            }

        },

        computed: {
            checkInputName () {
                if (this.$store.state.nameIsSet && !this.$store.state.name) return true;
                else return false;
            }
        },

        created () {
            this.$store.commit('getSaveData');
        },

    }

</script>