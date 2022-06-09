<template>
    
    <div class="container">

        <div v-if="!isHideCQ" class="popup popup__createQuestions">

            <h2 class="popup__title">Добавьте свои вопросы</h2>
            
            <div>
                <div class="createQuestions__complexity">
                    <p>Вы добавили:</p>
                    <ul>
                        <li class="createQuestions__starsBox" v-for:="item in statisticTypeQuestions">
                            <cmp-stars :selected="item.type"></cmp-stars>
                            <p>{{item.done}}/{{item.all}}</p>
                        </li>
                    </ul>
                </div>
                <div></div>
            </div>

            <hr>

            <div class="popup__buttonsFX">
                <cmp-button class="button__1" inner="Добавить" :clickF="null" :hoverSW="true"></cmp-button>
                <cmp-button class="button__1" inner="Начать" :clickF="null" :hoverSW="true"></cmp-button>
            </div>

            <hr>

            <div>
                <h2 class="popup__title">Ваши вопросы:</h2>
            </div>

        </div>

        <div class="popup popup__makeQuestion">

            <div class="makeQuestion__warn"><p id="makeQuestionWarn">{{makeQ.warn}}</p></div>

            <div class="popup__inputBlock">
                <div class="inputBlock__descr">
                    <label for="inpQuestion">
                        <h3>Вопрос:</h3>
                    </label>
                    <div class="inputBlock__complexity">
                        <p>Сложность:</p>
                        <cmp-stars @clickStar="clickStarHendler" :isActive="true" :selected="questionResult.class"></cmp-stars>
                    </div>
                </div>
                <input @input="checkInput" id="inpQuestion" name="inpQuestion" class="popup__input" type="text" placeholder="Введите ваш вопрос">
            </div>

            <div v-for:="item in abcd" class="popup__inputBlock">
                <div class="inputBlock__descr">
                    <label :for="'inpAnsver' + item">
                        <h3>Ответ {{item}}:</h3>
                    </label>
                    <input :id="'radioAnsv' + item" class="popup__radio" name="questionRadio" type="radio">
                    <label :data-letter="item" @click="setRightQ" class="popup__radioLable" :for="'radioAnsv' + item"><div></div></label>
                </div>
                <input :id="'inpAnsver' + item" :name="'inpAnsver' + item" @input="checkInput"
                        class="popup__input" type="text" :placeholder="'Введите ответ ' + item" :data-letter="item">
            </div>

            <div class="makeQuestion__imgTitle" v-if="questionResult.img">
                <h3>Картинка:</h3>
                <p><b>{{questionResult.img}}</b></p>
            </div>

            <input id="addImgInput" type="file" @change="changeInputFile" title="Добавить картинку" value="">

            <div class="popup__buttonsFX">
                <cmp-button class="popup__button" inner="Добавить картинку" :clickF="addImgHendler" :hoverSW="true"></cmp-button>
                <cmp-button class="popup__button" inner="Готово" :clickF="sendForm" :hoverSW="true"></cmp-button>
            </div>
        </div>

    </div>



</template>

<script>
    export default {

        data () {
            return {
                abcd: ['A', 'B', 'C', 'D'],
                statisticTypeQuestions: [
                    {
                        type: 1,
                        done: 0,
                        all: 4
                    },
                    {
                        type: 2,
                        done: 0,
                        all: 3
                    },
                    {
                        type: 3,
                        done: 0,
                        all: 3
                    },
                    {
                        type: 4,
                        done: 0,
                        all: 3
                    },
                    {
                        type: 5,
                        done: 0,
                        all: 2
                    },
                ],
                isHideCQ: false,
                makeQ: {
                    warn: null,
                    maxInput: {
                        q: 200,
                        a: 50
                    },
                },

                questionResult: {
                    question: null,
                    answers: {
                        A: null,
                        B: null,
                        C: null,
                        D: null
                    },
                    img: null,
                    imgBuffer: null,
                    right: null,
                    class: 1,
                }, 

            }
        },

        methods: {

            clickStarHendler (box) {
                this.questionResult.class = box;
            },

            checkInput (ev) {

                if (ev.target.getAttribute('id') === 'inpQuestion') {

                    if (ev.target.value.split('').length > this.makeQ.maxInput.q) {
                        this.makeQ.warn = `Максимальная длинна вопроса ${this.makeQ.maxInput.q} символов!`;
                    } else this.makeQ.warn = null;

                    this.questionResult.question = ev.target.value.trim();

                } else {

                    if (ev.target.value.split('').length > this.makeQ.maxInput.a) {
                        this.makeQ.warn = `Максимальная длинна ответа ${this.makeQ.maxInput.a} символов!`;
                    } else this.makeQ.warn = null;

                    this.questionResult.answers[ev.target.dataset.letter] = ev.target.value.trim();

                }

                console.log(this.questionResult);

            },

            setRightQ (ev) {
                this.questionResult.right = ev.target.dataset.letter;
            },

            addImgHendler () {
                document.getElementById('addImgInput').click();
            },

            changeInputFile (input) {

                let file = input.target.files[0];
                let reader = new FileReader();
                reader.readAsArrayBuffer(file);

                this.questionResult.img = file.name;

                reader.onload = () => {
                    this.questionResult.imgBuffer = reader.result;
                }
            },

            checkForm () {

            },

            sendForm () {

            }
        }

    }
</script>