<template>
  <div id="notFound">
    <img src="/static/img/logo.png" class="center-block logo">

    <div class="text-center col-sm-12">
      <h1>No encontrado.</h1>
      <h4>Esta pagina no existe.</h4>
      <router-link to="/" class="vertical-5p lead">No encontrado.</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NotFound'
}
</script>

<style>
#notFound {
  padding: 10em;
  color: white;
}
</style>
