<template>

    <section class="game">

        <div class="container">

            <div class="game__content">
                <div class="game__help">
                    <div class="game__helpItem">
                        <div>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 32">
                                <path d="M22 20c-2 2-2 4-4 4s-4-2-6-4-4-4-4-6 2-2 4-4-4-8-6-8-6 6-6 6c0 4 4.109 12.109 8 16s12 8 16 8c0 0 6-4 6-6s-6-8-8-6z"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="game__helpItem">
                        <div>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 36 32">
                                <path d="M24 24.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z"></path>
                                <path d="M10.225 24.854c1.728-1.13 3.877-1.989 6.243-2.513-0.47-0.556-0.897-1.176-1.265-1.844-0.95-1.726-1.453-3.627-1.453-5.497 0-2.689 0-5.228 0.956-7.305 0.928-2.016 2.598-3.265 4.976-3.734-0.529-2.39-1.936-3.961-5.682-3.961-6 0-6 4.029-6 9 0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h8.719c0.454-0.403 0.956-0.787 1.506-1.146z"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="game__helpItem">
                        <div><p class="whiteText">50:50</p></div>
                    </div>
                </div>
                <div class="game__picture">

                </div>
                <div class="game__info">
                    <div class="game__infoBlock">
                        <h3 class="whiteText">Играет:</h3>
                        <p class="whiteText game__infoName">{{$store.state.name}}</p>
                    </div>
                    <hr>
                    <div class="game__infoBlock">
                        <h3 class="whiteText">Баланс:</h3>
                        <p class="whiteText">{{$store.state.balance + currency}}</p>
                    </div>
                    <hr>
                    <div class="game__infoBlock">
                        <h3 class="whiteText">Вопрос:</h3>
                        <p class="whiteText">{{$store.state.questionNumber + 1}}</p>
                    </div>
                    <hr>
                    <div class="game__infoBlock">
                        <h3 class="whiteText">На кону:</h3>
                        <p class="whiteText">{{atStake[$store.state.questionNumber] + currency}}</p>
                    </div>
                </div>
            </div>

            <div class="game__questions">

                <div class="game__question">
                    <cmp-button :inner="setQuestion"></cmp-button>
                </div>
                <div class="game__answers">
                    <cmp-button v-for:="(item, i) in setArrAnswers" :inner="item" :hoverSW="true" :lable="abcd[i]"></cmp-button>
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
                atStake: [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 255000, 500000, 1000000],
            }
        },

        computed: {

            setQuestion() {
                console.log(this.$store.state.parseDataBase, '++');
                return this.$store.state.parseDataBase[this.$store.state.questionNumber].question;
            },

            setArrAnswers () {

                let arr = [];

                for (let key in this.$store.state.parseDataBase[this.$store.state.questionNumber].answers) {
                    arr.push(this.$store.state.parseDataBase[this.$store.state.questionNumber].answers[key]);
                } 

                return arr;

            }

        },

        created () {
            this.$store.commit('getSaveData');
        },

    }

</script>