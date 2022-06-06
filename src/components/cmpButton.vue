<template>
    <div class="button">
        <div class="button__left" :style="setStyleButtonLeft"></div>
        <button @pointerover="hover"
                @pointerout="hover"
                @click="clickFunction"
                :style="setStyleButton"
                class="button__center"> <h3 class="button__lable" v-if="lable">{{lable}}</h3> <p class="whiteText">{{inner}}</p></button>
        <div class="button__right" :style="setStyleButtonRight"></div>
    </div>
</template>

<script>

    export default {

        props: ['inner', 'clickF', 'hoverSW', 'lable', 'noActive'],

        data () {
            return {    

            }
        },

        methods: {
            hover(ev) {

                let target = ev.target;
                if (ev.target.tagName !== 'BUTTON' && ev.target.parentElement.tagName === 'BUTTON') target = ev.target.parentElement;

                if (!this.hoverSW || this.noActive) return null;

                if (ev.type === 'pointerover') {

                    target.style.backgroundColor = this.$store.state.colors[1];
                    target.nextElementSibling.style.borderLeftColor = this.$store.state.colors[1];
                    target.previousElementSibling.style.borderRightColor = this.$store.state.colors[1];

                } else if (ev.type === 'pointerout') {
                    target.style.backgroundColor = null;
                    target.nextElementSibling.style.borderLeftColor = null;
                    target.previousElementSibling.style.borderRightColor = null;
                }

            },

            setStyle (colorItem) {
                if (this.noActive) {
                    return {
                        cursor: 'no-drop',
                        [colorItem]: this.$store.state.colors[4],
                    }
                } else return null;
            }

        },
        computed: {
            clickFunction () {
                if (this.noActive) return null;
                else return this.clickF;
            },

            setStyleButton () {
                return this.setStyle('backgroundColor');
            },

            setStyleButtonLeft () {
                return this.setStyle('borderRightColor');
            },

            setStyleButtonRight () {
                return this.setStyle('borderLeftColor');
            }
        }
    }

</script>

<style scoped lang="scss">



</style>