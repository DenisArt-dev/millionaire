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

        <div v-if="answerFriend" class="popup">
            <h2 class="popup__title">Ваш друг ответил:</h2>
            <p>
                {{answerFriend}}
            </p>
            <div class="popup__buttonsFX">
                <cmp-button class="buttonDefault" inner="Спасибо" :clickF="clickOk" :hoverSW="true"></cmp-button>
            </div>
        </div>

        <div v-if="mOpinion" class="popup popup__mOpinion">
            <h2 class="popup__title">Опрос {{mOpinionInterviewed}} человек:</h2>

            <div class="popup__content">
                <div v-for:="(val, key) in mOpinion" class="mOpinion__item">
                    <p>{{((val / mOpinionInterviewed) * 100).toFixed()}}%</p>
                    <div :style="{height: ((val / mOpinionInterviewed) * 100).toFixed() + 'px'}" class="mOpinion__box"></div>
                    <h3>{{key}}</h3>
                </div>
            </div>

            <div class="popup__buttonsFX">
                <cmp-button class="buttonDefault" inner="Продолжить" :clickF="clickOk" :hoverSW="true"></cmp-button>
            </div>
        </div>

        <div v-if="isGameOver" class="popup popup__gameOver">
            <h2 class="popup__title">Очень жаль, но вы проиграли!</h2>
            <div class="popup__buttonsFX">
                <cmp-button inner="Заново" :clickF="restart" :hoverSW="true"></cmp-button>
                <cmp-button inner="На главную" :clickF="goAnotherPage('/')" :hoverSW="true"></cmp-button>
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
                <div v-if="img"  class="game__picture">
                    <img :src="img" alt="">
                </div>
                <div class="game__info">
                    <div class="game__infoBlock">
                        <h3 class="whiteText">Играет:</h3>
                        <p class="whiteText game__infoName">{{$store.state.name}}</p>
                    </div>
                    <hr>
                    <div class="game__infoBlock">
                        <h3 class="whiteText">Баланс:</h3>
                        <p class="whiteText">{{this.$store.state.atStake[$store.state.questionNumber] + currency}}</p>
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
                                :clickF="clickABCD"
                                :noActive="!abcdActive[i]"></cmp-button>
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
                pause: false,
                clickABCD: this.clickF,
                img: false,
                abcdActive: [true, true, true, true],
                answerFriend: null,
                answerFriendDB: [
                    'Я уверен, что ответ: ',
                    'Скорее всего, ответ: ',
                    'Наверное, ответ: ',
                    'Я не уверен, но кажеться ответ: ',
                    'Понятия не имею, извини дружище.',
                ],
                mOpinionInterviewed: 100,
                mOpinion: null,
                isGameOver: false,
            }
        },

        methods: {
            clickF (ev) {

                this.clickOk();
                
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
                        this.$store.state.isGameOver = true;
                        this.$store.commit('updateLSDB');
                    }

                    setTimeout( () => {

                        if (!this.$store.state.isGameOver) this.pause = true;
                        else {
                            this.gameOverF();
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

                for (let i = 0; i < this.abcdActive.length; i++) {
                    this.abcdActive[i] = true;
                }

                this.setImage();

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

                    if (!this.$store.state.help.call) return;

                    this.clickOk();
                    
                    this.answerFriend = this.answerFriendF();

                } else if (target.dataset.type === 'mOpinion') {
                    
                    if (!this.$store.state.help.mOpinion) return;

                    this.clickOk();

                    let obj = {
                        A: 0, 
                        B: 0,
                        C: 0,
                        D: 0,
                        '?': 0
                    };

                    for (let i = 0; i < this.mOpinionInterviewed; i++) {
                        let answ = this.answerFriendF().split(':');
                        if (answ.length <= 1) obj['?']++;
                        else obj[answ[1].trim()]++;
                    }

                    this.mOpinion = obj;

                } else if (target.dataset.type === 'fiftyFifty') {

                    if (!this.$store.state.help.fiftyFifty) return;

                    this.abcdActive[this.recurseFifty(this.abcd[this.getRandomMinMax(0, 3)])] = false;
                    this.abcdActive[this.recurseFifty(this.abcd[this.getRandomMinMax(0, 3)])] = false;

                }

                this.$store.state.help[target.dataset.type] = false;
                this.$store.commit('updateLSDB');

            },

            recurseFifty (item) {
                const r = this.$store.state.parseDataBase[this.$store.state.questionNumber].right;
                if (item != r && this.abcdActive[this.abcd.indexOf(item)]) {
                    return this.abcd.indexOf(item);
                } else return this.recurseFifty(this.abcd[this.getRandomMinMax(0, 3)]);
            },

            answerFriendF () {

                let arrR = [];
                let result;
                const q = this.$store.state.parseDataBase[this.$store.state.questionNumber];
                let x = (q.class === 1) ? 9 : (q.class === 2) ? 5 : (q.class === 3) ? 3 : (q.class === 4) ? 1 : 0;

                for (let i = 0; i < this.abcd.length; i++) {
                    this.answerFriendDB.push(this.answerFriendDB[q.class - 1]);
                    this.answerFriendDB.push(this.answerFriendDB[q.class - 1]);
                    arrR.push(this.abcd[i]);
                    if (x) {
                        arrR.push(q.right);
                        x--;
                    }
                }

                for (let y = 0; y < x; y++) {
                    arrR.push(q.right);
                }

                result = this.answerFriendDB[this.getRandomMinMax(0, this.answerFriendDB.length - 1)];
                if (result != this.answerFriendDB[4]) result = result + arrR[this.getRandomMinMax(0, arrR.length - 1)];
                return result;

            },

            clickOk () {
                this.answerFriend = null;
                this.mOpinion = null;
            },

            setImage () {

                let img = this.$store.state.parseDataBase[this.$store.state.questionNumber].img;

                if (img) {

                    import(`../dataBase/img/${this.$store.state.choseCategory}/${img}.jpg`).then( (result) => {
                        this.img = result.default;
                    } ).catch( (e) => {
                        console.log(e);
                    } );

                } else this.img = false;
            },

            getRandomMinMax(a, b) {
                return +(a + Math.random() * (b - a)).toFixed();
            },

            goAnotherPage (page) {
                return () => {
                    this.$router.push(page);
                }
            },

            gameOverF () {
                this.isGameOver = this.$store.state.isGameOver;
                for (let i = 0; i < this.abcdActive.length; i++) {
                    this.abcdActive[i] = false;
                }
                this.$store.state.help.call = false;
                this.$store.state.help.mOpinion = false;
                this.$store.state.help.fiftyFifty = false;
            },

            restart () {
                this.$store.commit('resetAll');
                this.$router.push('/new');
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

        },

        created () {
            this.$store.commit('getSaveData');
        },

        mounted () {

            if (this.$store.state.isGameOver) {
                this.gameOverF();
            }

            this.setImage();
        }

    }

</script>