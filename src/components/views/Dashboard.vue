<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <!-- <div class="alert alert-success alert-dismissible" v-if="alert_success">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="icon fa fa-check"></i> Success</h4>
        Click on icon to check it out on github.
      </div> -->
      <!-- /.col -->
      <!-- fix for small devices only -->
      <div class="clearfix visible-sm-block"></div>
      
      <!-- /.col -->
      
      <!-- /.col -->
    </div>
    <!-- /.row -->

    <!-- Main row -->
    <div class="row">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box bg-yellow">
          <span class="info-box-icon"><i class="">NM</i></span>

          <div class="info-box-content">
            <span class="info-box-text">NEW MEMBERS</span>
            <span class="info-box-number">{{cant_member.length}}</span>

            <div class="progress">
              <div class="progress-bar" style="width: 100%"></div>
            </div>
                
          </div>
          <!-- /.info-box-content -->
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box bg-green">
          <span class="info-box-icon"><i class="">A</i></span>

          <div class="info-box-content">
            <span class="info-box-text">ACTIVITIES</span>
            <span class="info-box-number">{{cant_activities.length}}</span>

            <div class="progress">
              <div class="progress-bar" style="width: 100%"></div>
            </div>
                
          </div>
          <!-- /.info-box-content -->
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box bg-red">
          <span class="info-box-icon"><i class="">W</i></span>

          <div class="info-box-content">
            <span class="info-box-text">WORKSHOPS</span>
            <span class="info-box-number">{{cant_workshops.length}}</span>

            <div class="progress">
              <div class="progress-bar" style="width: 100%"></div>
            </div>
                
          </div>
          <!-- /.info-box-content -->
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box bg-aqua">
          <span class="info-box-icon"><i class="">C</i></span>

          <div class="info-box-content">
            <span class="info-box-text">COURSES</span>
            <span class="info-box-number">{{cant_courses.length}}</span>

            <div class="progress">
              <div class="progress-bar" style="width: 100%"></div>
            </div>
                
          </div>
          <!-- /.info-box-content -->
        </div>
      </div>
    </div>
    <div class="row">
    <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box bg-gris">
          <span class="info-box-icon gris 1" style="background-color: #ecf0f5;"><i class=""></i></span>
<div class="info-box-content">
            <span class="info-box-text"></span>
            <span class="info-box-number"></span>
                
          </div>
          
          <!-- /.info-box-content -->
        </div>
      </div>
    </div>
    <div class="row">
    <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box bg-gris">
          <span class="info-box-icon gris"><i class="">R</i></span>
<div class="info-box-content">
            <span class="info-box-text">Reservations</span>
            <span class="info-box-number">{{reserva_actividad.length}}</span>
                
          </div>
          
          <!-- /.info-box-content -->
        </div>
      </div>
    </div>
    
    <!-- /.row -->
  </section>
  <!-- /.content -->
</template>

<script>
import axios from 'axios'
import {Urlmain, getHeader} from '../../config/index.js'
export default {
  data () {
    return {
      alert_success: true,
      cant_courses: '',
      cant_workshops: '',
      cant_activities: '',
      cant_member: '',
      reserva_actividad: ''

    }
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      let that = this
      axios.get(`${Urlmain}api/v1/curso_taller/?tipo=Curso`)
                .then(response => {
                  that.cant_courses = response.data.results
                  console.log(response.data.results.length)
                })
      axios.get(`${Urlmain}api/v1/curso_taller/?tipo=Taller`)
                .then(response => {
                  that.cant_workshops = response.data.results
                })
      axios.get(`${Urlmain}api/v1/reserva_actividad/`, {headers: getHeader()})
                .then(response => {
                  that.reserva_actividad = response.data.results
                })
      axios.get(`${Urlmain}api/v1/actividad/`, {headers: getHeader()})
                .then(response => {
                  that.cant_activities = response.data.results
                })
      axios.get(`${Urlmain}api/v1/usuario/`, {headers: getHeader()})
                .then(response => {
                  that.cant_member = response.data.results
                })
                /* .catch((error) => {
                  if (error.response.request.status === 403 || error.response.request.status === 500) {
                    window.localStorage.removeItem('authUser')
                    window.localStorage.removeItem('User')
                    this.$router.push({path: '/login'})
                  }
                }) */
    }
  },
  computed: {
    isMobile () {
      return (window.innerWidth <= 800 && window.innerHeight <= 600)
    }
  }
}
</script>
<style>
/* .info-box-icon.gris {
  background-color: #ecf0f5 !important;
} */
.bg-gris, .callout.callout-info, .alert-info, .label-info, .modal-info .modal-body {
  background-color: #ecf0f5 !important;
  box-shadow: 0 0px;
}

.info-box-content {
  text-align: center;
  vertical-align: middle;
  display: inherit;
  padding-top: 21px;
}
.fullCanvas {
  width: 100%;
}
</style>
