<template>
  <div :class="['wrapper', classes]">
    <header class="main-header">
	<!-- <span class="logo-mini">
		<div class="img-responsive center-block logo"><i class="fa fa-fw fa-bars"></i>Dashboard</div>
	</span> -->
      <!-- Header Navbar -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- Messages-->
            <li class="dropdown messages-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                {{user | mayuscula}}
              </a>
              <ul class="dropdown-menu">
                <li>
                  <!-- inner menu: contains the messages -->
                  <ul class="menu">
                    <li>
                      <!-- start message -->
                      <a href="" @click="close">
                        <!-- Message title and timestamp -->
                        <h4>
                          Salir
                          
                        </h4>
                      </a>
                    </li>
                    <!-- end message -->
                  </ul>
                  <!-- /.menu -->
                </li>
              </ul>
            </li>
            <!-- /.messages-menu -->
          </ul>
        </div>
      </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <sidebar/>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          {{$route.name.toUpperCase() }}
          <small>{{ $route.meta.description }}</small>
        </h1>
        
        <ol class="breadcrumb">
          <li>
            <router-link to="/">
              <i class="fa fa-home"></i>Home</router-link>
          </li>
          <li class="active">{{$route.name.toUpperCase()}}</li>
        </ol>
        
      </section>
      <router-view></router-view>
    </div>
    <!-- /.content-wrapper -->

    <!-- Main Footer -->
    <footer class="main-footer">
    </footer>
  </div>
  <!-- ./wrapper -->
</template>

<script>
import axios from 'axios'
import faker from 'faker'
// import { mapState } from 'vuex'
import Sidebar from './Sidebar'
// import 'hideseek'
import {Urlmain, getToken} from '../config/index'
export default {
  name: 'Dash',
  components: {
    Sidebar
  },
  data: function () {
    return {
      // section: 'Dash',
      year: new Date().getFullYear(),
      user: ''
    }
  },
  filters: {
    mayuscula: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  created: function () {
    this.fetchData()
  },
  computed: {
    demo () {
      return {
        displayName: faker.name.findName(),
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
        randomCard: faker.helpers.createCard()
      }
    }
  },
  methods: {
    fetchData () {
      let authUser = JSON.parse(window.localStorage.getItem('authUser'))
      this.user = authUser.user
      /* let that = this
      axios.get(`${Urlmain}api/v1/usuario/me/`, {headers: getHeader()})
                    .then(response => {
                      // that.user = response.data[0].email
                      let user = response.data[0].email.split('@', 2)
                      that.user = user[0]
                      // window.localStorage.setItem('User', JSON.stringify(response.data.results))
                    })
                    .catch((error) => {
                      if (error.response.request.status === 403 || error.response.request.status === 500) {
                        window.localStorage.removeItem('authUser')
                        window.localStorage.removeItem('User')
                        this.$router.push({path: '/login'})
                      }
                    }) */
    },
    close () {
      axios.get(`${Urlmain}logout`, {headers: getToken()})
      window.localStorage.removeItem('authUser')
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style>
.wrapper.fixed_layout .main-header {
  position: fixed;
  width: 100%;
}
.help-block {
  color: red;
}
.wrapper.fixed_layout .content-wrapper {
  padding-top: 50px;
}
.wrapper.fixed_layout .main-sidebar {
  position: fixed;
  height: 100vh;
}

@media (max-width: 767px) {
  .wrapper.hide_logo .main-header .logo {
    display: none;
  }
}

.logo-mini,
.logo-lg {
  text-align: left;
}
.logo-mini img,
.logo-lg img {
  padding: 0.4em !important;
}

.logo-lg img {
  display: -webkit-inline-box;
  width: 25%;
}

.user-panel {
  height: 4em;
}

hr.visible-xs-block {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.17);
  height: 1px;
  border-color: transparent;
}
.language {
  color: #444;
  font-size: 18px;
}
</style>
