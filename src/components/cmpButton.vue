<template>
    <div class="button">
        <div class="button__left"></div>
        <button @pointerover="hover"
                @pointerout="hover"
                class="button__center"><p class="whiteText">{{inner}}</p></button>
        <div class="button__right"></div>
    </div>
</template>

<script>

    export default {

        props: ['inner'],

        data () {
            return {    

            }
        },

        methods: {
            hover(ev) {

                let target = ev.target;

                console.log(ev.target.tagName);

                if (ev.target.tagName !== 'BUTTON' && ev.target.parentElement.tagName === 'BUTTON') target = ev.target.parentElement;

                if (ev.type === 'pointerover') {
                    target.style.backgroundColor = this.$store.state.colors[1];
                    target.nextElementSibling.style.borderLeftColor = this.$store.state.colors[1];
                    target.previousElementSibling.style.borderRightColor = this.$store.state.colors[1];
                } else if (ev.type === 'pointerout') {
                    target.style.backgroundColor = null;
                    target.nextElementSibling.style.borderLeftColor = null;
                    target.previousElementSibling.style.borderRightColor = null;
                }

            }
        }
    }

</script>

<style scoped lang="scss">



</style>