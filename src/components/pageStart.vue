<template>

    <section class="startScreen">
        <div class="container">

          <div>
            <h1 class="title">{{title}}</h1>
          </div>

          <!-- <div class="startScreen__hexagon">
            <div class="hexagon"><p class="whiteText">Начать</p></div>
          </div> -->

        </div>
    </section>

</template>

<script>

    export default {
        data() {
          return {
            title: 'Хочешь стать миллионером?'
          }
        }
    }

</script>