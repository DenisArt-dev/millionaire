<template>
    <header class="header">
        <div class="container">
          <nav>
            <ul>
              <router-link v-for:="item in hederMenu" to="/game">
                <li><p class="whiteText">{{item}}</p></li>
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
                'Новая игра',
                'Создать свои вопросы',
            ],
        }
    }
}

</script>