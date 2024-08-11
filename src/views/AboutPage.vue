<!-- src/views/AboutPage.vue -->
<template>
  <div class="about">
    <AppHeader />
    <main>
      <h1>About Us</h1>
      <p>
        This is the about page. Here you can provide information about your
        application.
      </p>
      <router-link to="/">Go back to Home</router-link>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  name: 'AboutPage',
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style scoped>
/* About Page Styles */
.about {
  text-align: center;
  margin: 20px;
}

.about main {
  margin: 20px 0;
}

.about main h1 {
  font-size: 2em;
  margin-bottom: 10px;
}

.about main p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.about main a {
  color: #42b983;
  text-decoration: none;
}

.about main a:hover {
  text-decoration: underline;
}
</style>
