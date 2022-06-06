<template>

    <section class="game">

        <div v-if="pause" class="popup popup__continue">
            <h2 class="popup__title">Продолжить?</h2>
            <p>
                Ваш выигрыш: <b>{{$store.state.atStake[$store.state.questionNumber + 1] + currency}}</b>
            </p>
            <div class="popup__buttonsFX">
                <cmp-button inner="Продолжить" :clickF="buttonGoOnF" :hoverSW="true"></cmp-button>
                <cmp-button inner="Закончить" :clickF="buttonEndF" :hoverSW="true"></cmp-button>
            </div>
        </div>

        <div class="container">

            <div class="game__content">
                <div class="game__help">
                    <div @pointerover="overHexagon" @pointerout="outHexagon" @click="clickHexagon" data-type="call"
                        :class="{'game__helpItem': true, 'hic1': $store.state.help.call, 'hicX': !$store.state.help.call}">
                        <div>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 32">
                                <path d="M22 20c-2 2-2 4-4 4s-4-2-6-4-4-4-4-6 2-2 4-4-4-8-6-8-6 6-6 6c0 4 4.109 12.109 8 16s12 8 16 8c0 0 6-4 6-6s-6-8-8-6z"></path>
                            </svg>
                        </div>
                    </div>
                    <div @pointerover="overHexagon" @pointerout="outHexagon" @click="clickHexagon" data-type="mOpinion"
                        :class="{'game__helpItem': true, 'hic1': $store.state.help.mOpinion, 'hicX': !$store.state.help.mOpinion}">
                        <div>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 36 32">
                                <path d="M24 24.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z"></path>
                                <path d="M10.225 24.854c1.728-1.13 3.877-1.989 6.243-2.513-0.47-0.556-0.897-1.176-1.265-1.844-0.95-1.726-1.453-3.627-1.453-5.497 0-2.689 0-5.228 0.956-7.305 0.928-2.016 2.598-3.265 4.976-3.734-0.529-2.39-1.936-3.961-5.682-3.961-6 0-6 4.029-6 9 0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h8.719c0.454-0.403 0.956-0.787 1.506-1.146z"></path>
                            </svg>
                        </div>
                    </div>
                    <div @pointerover="overHexagon" @pointerout="outHexagon" @click="clickHexagon" data-type="fiftyFifty"
                        :class="{'game__helpItem': true, 'hic1': $store.state.help.fiftyFifty, 'hicX': !$store.state.help.fiftyFifty}">
                        <div><p class="whiteText">50:50</p></div>
                    </div>
                </div>
                <div v-if="setImg" class="game__picture">
                    <img :src="setImg" alt="">
                </div>
                <div class="game__info">
                    <div class="game__infoBlock">
                        <h3 class="whiteText">Играет:</h3>
                        <p class="whiteText game__infoName">{{$store.state.name}}</p>
                    </div>
                    <hr>
                    <div class="game__infoBlock">
                        <h3 class="whiteText">Баланс:</h3>
                        <p class="whiteText">{{$store.state.atStake[$store.state.questionNumber] + currency}}</p>
                    </div>
                    <hr>
                    <div class="game__infoBlock">
                        <h3 class="whiteText">Вопрос:</h3>
                        <p class="whiteText">{{$store.state.questionNumber + 1}}</p>
                    </div>
                    <hr>
                    <div class="game__infoBlock">
                        <h3 class="whiteText">На кону:</h3>
                        <p class="whiteText">{{$store.state.atStake[$store.state.questionNumber + 1] + currency}}</p>
                    </div>
                </div>
            </div>

            <div class="game__questions">

                <div class="game__question">
                    <cmp-button :inner="setQuestion"></cmp-button>
                </div>
                <div class="game__answers">
                    <cmp-button v-for:="(item, i) in setArrAnswers"
                                :inner="item"
                                :hoverSW="hoverSW"
                                :lable="abcd[i]"
                                :clickF="clickABCD"></cmp-button>
                </div>

            </div>

        </div>

    </section>

</template>

<script>

    export default {

        data() {
            return {
                abcd: ['A', 'B', 'C', 'D'],
                currency: '',
                hoverSW: true,
                delay: 1000,
                gameOver: false,
                pause: false,
                clickABCD: this.clickF,
            }
        },

        methods: {
            clickF (ev) {
                let answer = ev.target;
                let button;
                if (answer.tagName != 'H3') {

                    if (answer.tagName == 'P') {
                        button = answer.parentElement;
                        answer = answer.parentElement.firstElementChild.textContent;
                    }
                    else {
                        button = answer;
                        answer = answer.firstElementChild.textContent;
                    }

                } else {
                    button = answer.parentElement;
                    answer = ev.target.textContent;
                }

                this.hoverSW = false;
                this.clickABCD = null;

                setTimeout( () => {

                    if (answer === this.$store.state.parseDataBase[this.$store.state.questionNumber].right) {
                        this.setColorToButton(button, this.$store.state.colors[2]);
                    } else {
                        this.setColorToButton(button, this.$store.state.colors[3]);
                        this.gameOver = true;
                    }

                    setTimeout( () => {

                        if (this.gameOver) {
                            alert('Игра окончена!');
                        } else {

                            this.pause = true;

                        }

                    }, this.delay * 1.5 );

                }, this.delay );

            }, 

            setColorToButton (button, color) {
                button.style.backgroundColor = color;
                button.nextElementSibling.style.borderLeftColor = color;
                button.previousElementSibling.style.borderRightColor = color;
            },

            buttonGoOnF () {

                this.pause = false;

                this.$store.commit('nextQuestion');
                this.$store.commit('updateLSDB');

                let allButtons = document.querySelectorAll('.button button');

                for (let i = 0; i < allButtons.length; i++) {
                    this.setColorToButton(allButtons[i], this.$store.state.colors[0]);
                }

                this.hoverSW = true;
                this.clickABCD = this.clickF;

            },

            buttonEndF () {

                this.pause = false;
                //...

            },

            getTarget (target) {
                if (target.classList.contains('game__helpItem')) return target;
                else return this.getTarget(target.parentElement);
            },

            overHexagon (ev) {

                let target = this.getTarget(ev.target);

                if (target.classList.contains('hicX')) return;

                target.classList.remove('hic1');
                target.classList.add('hic2');

            },

            outHexagon (ev) {

                let target = this.getTarget(ev.target);

                if (target.classList.contains('hicX')) return;

                target.classList.remove('hic2');
                target.classList.add('hic1');
            },

            clickHexagon (ev) {

                let target = this.getTarget(ev.target);
                
                if (target.dataset.type === 'call') {
                    console.log(target.dataset.type);
                } else if (target.dataset.type === 'mOpinion') {
                    console.log(target.dataset.type);
                } else if (target.dataset.type === 'fiftyFifty') {
                    console.log(target.dataset.type);
                }

                this.$store.state.help[target.dataset.type] = false;
                this.$store.commit('updateLSDB');

            }

        },

        computed: {

            setQuestion() {
                return this.$store.state.parseDataBase[this.$store.state.questionNumber].question;
            },

            setArrAnswers () {

                let arr = [];

                for (let key in this.$store.state.parseDataBase[this.$store.state.questionNumber].answers) {
                    arr.push(this.$store.state.parseDataBase[this.$store.state.questionNumber].answers[key]);
                } 

                return arr;

            },

            setImg () {
                if (this.$store.state.parseDataBase[this.$store.state.questionNumber].img) {
                    return this.$store.state.parseDataBase[this.$store.state.questionNumber].img.default;
                } else return false;
            }

        },

        created () {
            this.$store.commit('getSaveData');
        },

    }

</script>