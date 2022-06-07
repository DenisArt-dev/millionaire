<template>
    <header class="header">
        <div class="container">
          <nav>
            <ul>
              <router-link v-for:="item in hederMenu" :to="item.link" @click="item.hendler">
                <li><p class="whiteText">{{item.text}}</p></li>
              </router-link>
            </ul>
          </nav>
        </div>
    </header>
</template>

<script>

export default {

    data() {
        return {
            hederMenu: this.setMenu(),
        }
    },

    methods: {
      
      setMenu () {

        let arr = [
          {
            text: 'Главная',
            link: '/',
            hendler: null
          },
          {
            text: 'Новая игра',
            link: '/new',
            hendler: () => {
              this.$store.commit('resetAll');
            }
          },
          {
            text: 'Создать свои вопросы',
            link: '/',
            hendler: null
          }
        ];

        if (localStorage.length > 0) {
          arr.push({
            text: 'Продолжить игру',
            link: '/game',
            hendler: null
          });
        }

        return arr;

      },

    }
}

</script>