<template>
<div class="container">
  <div class="row">{{error}}
    <div class="alert alert-error alert-dismissible" v-if="error">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="icon fa fa-check"></i> Error</h4>
        Cleck yours item.
      </div>
  <div id="login">
    <img src="/static/img/logo.png" class="center-block logo">
    <div class="text-center col-sm-12">
      <!-- login form -->
      <form @submit.prevent="login()">
        <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-user"></i></span>
          <input class="form-control" id="username" name="username" placeholder="Email" type="text" v-model="username">
        </div>

        <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-lock"></i></span>
          <input class="form-control" id="password" name="password" placeholder="Password" type="password" v-model="password">
        </div>
        <button type="submit" v-bind:class="'btn btn-primary btn-lg '">Submit</button>
      </form>
      <!-- errors -->
      <div class="text-red"><p class="vertical-5p lead"></p></div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import {Urlmain} from '../config/index'
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      error: false
    }
  },
  methods: {
    /* getHeader () {
      const headers = {
        'Authorization': '3d524a53c110e4c22463b10ed32cef9d'
      }
      return headers
    }, */
    login () {
      const authUser = {}
      // let body = new FormData()
      // body.append('grant_type', 'password')
      // body.append('client_id', 'nHbdqJqJFFRhtmz3CFEJaQJ6EwZxgIteuiFjuy3k')
      // const auth = '3d524a53c110e4c22463b10ed32cef9d'
      // const content = 'application/x-www-form-urlencoded'
      const header = {
        'Authorization': '3d524a53c110e4c22463b10ed32cef9d',
        /* 'Content-Type': 'application/x-www-form-urlencoded' */
        'user': this.username,
        'pass': this.password
      }
      /* body.append('user', this.username)
      body.append('pass', this.password) */
      // body.append('Authorization', '3d524a53c110e4c22463b10ed32cef9d')
      // axios.get(`${Urlmain}search`)
      // this.$router.push({path: '/home'})
      /* const body = JSON.stringify({user: this.username,
        pass: this.password
      }) */
      axios.get(`${Urlmain}login`, {headers: header})
          .then(response => {
            if (response.status === 200) {
              authUser.access_token = response.data.token
              authUser.user = response.data.result[0].user
              window.localStorage.setItem('authUser', JSON.stringify(authUser))
              this.$router.push({path: '/'})
              /* axios.get(`${Urlmain}user/{}`, {headers: getHeader()})
                    .then(response => {
                      if (response.data[0].is_superuser === true) {
                        window.localStorage.setItem('User', JSON.stringify(response.data[0].email))
                        this.$router.push({path: '/home'})
                      } else {
                        this.$Notice.error({
                          title: 'Not Authentication',
                          desc: 'You have not authorization.'
                        })
                      }
                    }) */
            }
          })
          .catch(function (e) {
            if (e.response.request.status === 401) {
              alert('Usuario o Contrasenna incorrecta')
              document.getElementById('username').reset()
              document.getElementById('password').reset()
              this.username = ''
              this.password = ''
              this.error = true
              this.$Notice.error({
                title: 'Not Authentication',
                desc: 'ser or Password incorrect.'
              })
              this.error = 'Usuario no Autenticado'
            }
          })
    }
  }
}
</script>

<style>
#login {
  padding: 3em 22em 3em 22em;
}

html,
body,
.container-table {
  height: 100%;
  background-color: #282b30 !important;
}
.container-table {
  display: table;
  color: white;
}
.vertical-center-row {
  display: table-cell;
  vertical-align: middle;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-10p {
  padding-top: 10%;
}
.vertical-5p {
  padding-top: 5%;
}
.logo {
  width: 15em;
  padding: 3em;
}

.input-group {
  padding-bottom: 2em;
  height: 4em;
  width: 100%;
}

.input-group span.input-group-addon {
  width: 2em;
  height: 4em;
}

@media (max-width: 1241px) {
  .input-group input {
    height: 4em;
  }
}
@media (min-width: 1242px) {
  form {
    padding-left: 20em;
    padding-right: 20em;
  }

  .input-group input {
    height: 6em;
  }
}

.input-group-addon i {
  height: 15px;
  width: 15px;
}
</style>
