<template>
    
    <div class="container">

        <div v-if="isCreateQ" class="popup popup__createQuestions">

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
                <cmp-button class="button__1" inner="Добавить" :clickF="makeQuestionStart" :hoverSW="true"></cmp-button>
                <cmp-button class="button__1" inner="Начать" :clickF="null" :hoverSW="true"></cmp-button>
            </div>

            <hr v-if="dataBase.content.length > 0">

            <div v-if="dataBase.content.length > 0" class="createQuestions__yourQbox">
                <h2 class="popup__title">Ваши вопросы:</h2>
                <table>
                    <tbody>
                        <tr v-for:="(item, index) in dataBase.content" class="createQuestions__yourQitem">
                            <td>
                                <div class="yourQitem__num yourQitem"><p>{{index + 1}}</p></div>
                            </td>
                            <td class="yourQitem__text yourQitem">{{item.question.slice(0, checkSizeScreenForQleng()) + '...'}}</td>
                            <td>
                                <cmp-stars class="yourQitem" :selected="item.class"></cmp-stars>
                            </td>
                            <td>
                                <cmp-button class="yourQitem" inner="Удалить" :clickF="deleteQitem(index)" :hoverSW="true"></cmp-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

        <div v-if="isMakeQ" class="popup popup__makeQuestion">

            <div class="popup__closeIcon" @click="isCreateQ = true; isMakeQ = false">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 32 32">
                    <title>отмена</title>
                    <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
                </svg>
            </div>

            <div class="makeQuestion__warn"><p id="makeQuestionWarn">{{makeQ.warn}}</p></div>

            <div class="popup__inputBlock">
                <div class="inputBlock__descrQ">
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
                <cmp-button class="popup__button" :inner="!questionResult.img ? 'Добавить картинку' : 'Удалить картинку'"
                            :clickF="addImgHendler" :hoverSW="true"></cmp-button>
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
                isCreateQ: true,
                isMakeQ: false,
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

                dataBase: {
                    title: 'Без категории',
                    content: [],
                }

            }
        },

        methods: {

            clickStarHendler (box) {
                this.questionResult.class = +box;
            },

            makeQuestionStart () {
                this.isCreateQ = false;
                this.isMakeQ = true;
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

            },

            setRightQ (ev) {
                this.questionResult.right = ev.target.dataset.letter;
            },

            addImgHendler () {
                if (this.questionResult.img) {
                    this.questionResult.img = null;
                    this.questionResult.imgBuffer = null;
                }
                else document.getElementById('addImgInput').click();
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

                // для проверки уровня сложности
                let statTypQues = this.statisticTypeQuestions[this.questionResult.class - 1];

                // для проверки ответов
                let isEmptyA = false;
                for (let key in this.questionResult.answers) {
                    if (!this.questionResult.answers[key]) isEmptyA = true;
                }

                if (!this.questionResult.question) {
                    return 'Пожалуйста, напишите свой вопрос!';
                } else if (statTypQues.all === statTypQues.done) {
                    return 'Пожалуйста, выберите другой уровень сложности!';
                } else if (isEmptyA) {
                    return 'Вы указали не все варианты ответов!';
                } else if (!this.questionResult.right) {
                    return 'Не указан правильный ответ!';
                }

                return null;
            },

            sendForm () {

                this.makeQ.warn = this.checkForm();
                if (this.makeQ.warn) return; 

                this.dataBase.content.push(this.questionResult);

                this.dataBase.content.sort( (a, b) => {return a.class - b.class} );

                for (let i = 0; i < this.statisticTypeQuestions.length; i++) {
                    if (this.statisticTypeQuestions[i].type === this.questionResult.class) {
                        this.statisticTypeQuestions[i].done++;
                    }
                }
                
                this.questionResult = {
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
                };

                this.isCreateQ = true;
                this.isMakeQ = false;

                console.log(this.dataBase);

            },

            deleteQitem (index) {
                return () => {
                    
                    let arr1 = this.dataBase.content.slice(0, index);
                    let arr2 = this.dataBase.content.slice(index + 1, this.dataBase.content.length);
                    this.statisticTypeQuestions[this.dataBase.content[index].class - 1].done--;
                    this.dataBase.content = arr1.concat(arr2);

                }
            },

            checkSizeScreenForQleng () {
                if (window.innerWidth < 460) {
                    return 10;
                } else return 30;
            }
        }

    }
</script>