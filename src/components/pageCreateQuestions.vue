<template>
    
    <div class="container">

        <div class="popup popup__createQuestions">

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

    </div>



</template>

<script>
    export default {

        data () {
            return {
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
            }
        },

        methods: {
            clickStarHendler (box) {
                this.test = box;
            }
        }

    }
</script>