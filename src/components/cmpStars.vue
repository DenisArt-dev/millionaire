<template>

    <div class="stars__wrapp">

        <svg v-for:="(item, i) in 5"
        @pointerover="hoverStar"
        @pointerout="hoverStar"
        @click="clickStar"
        :data-id="i + 1"
        :style="{cursor: setCursor}" class="svg__star"
        version="1.1" xmlns="http://www.w3.org/2000/svg"
        width="20" height="20" viewBox="0 0 32 32">
        <title>Сложность вопроса</title>
        <path :d="(i >= selected) ? svgPath.empty : svgPath.full"></path>

    </svg>

    </div>

</template>

<script>
    export default {

        props: ['isActive', 'selected'],

        data () {
            return {
                svgPath: {
                    full: 'M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z',
                    empty: 'M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798zM16 23.547l-6.983 3.671 1.334-7.776-5.65-5.507 7.808-1.134 3.492-7.075 3.492 7.075 7.807 1.134-5.65 5.507 1.334 7.776-6.983-3.671z'
                },
                colorPlus: this.$store.state.colors[2],
                colorMinus: this.$store.state.colors[3],
            }
        },

        methods: {

            hoverStar (ev) {

                if(!this.isActive) return null;

                if (ev.type === 'pointerover') {

                    let target = ev.target;
                    if (target.tagName != 'path') target = target.querySelector('path');

                    let allStars = target.closest('.stars__wrapp').children;

                    if (target.parentElement.dataset.id === this.selected) {
                        console.log('+');
                    } else if (target.parentElement.dataset.id < this.selected) {

                        // for (let i = 0; i < this.selected - target.parentElement.dataset.id; i++) {
                        //     allStars[target.parentElement.dataset.id  - i].style.fill = this.colorMinus;   
                        // }

                        for (let i = 0; i < allStars.length; i++) {
                            if (i >= target.parentElement.dataset.id && i < this.selected) {
                                allStars[i].style.fill = this.colorMinus;
                            }
                        }

                        // target.getAttribute('d') === this.svgPath.full && target.parentElement.style.fill !== this.colorPlus
                        
                    } else if (target.parentElement.dataset.id > this.selected) {
                        target.parentElement.style.fill = this.colorPlus;
                        // target.setAttribute('d', this.svgPath.full);

                        for (let i = 0; i < allStars.length; i++) {
                            if (i < target.parentElement.dataset.id && i >= this.selected) {
                                allStars[i].style.fill = this.colorPlus;
                            }
                        }
                    }

                } else if (ev.type === 'pointerout') {

                    let allStars = ev.target.closest('.stars__wrapp').children;

                    for (let i = 0; i < allStars.length; i++) {
                        allStars[i].style.fill = null;
                    }

                }

            },

            clickStar (ev) {

                let target = ev.target;
                if (target.tagName != 'path') target = target.querySelector('path');

                this.$emit('clickStar', target.parentElement.dataset.id);

            }

        },

        computed: {
            setCursor () {
                if(this.isActive) return 'pointer';
                else return null;
            }
        }

    }
</script>

<style>
    .svg__star {
        margin: 1px;
        /* fill: aquamarine; */
    }
</style>