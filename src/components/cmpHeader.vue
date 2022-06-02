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
            hederMenu: [
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
                    console.log(this.$store);
                  }
                },
                {
                  text: 'Создать свои вопросы',
                  link: '/',
                  hendler: null
                }
            ],
        }
    }
}

</script>