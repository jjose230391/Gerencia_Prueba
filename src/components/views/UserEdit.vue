<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <!-- <div class="alert alert-success alert-dismissible" v-if="alert_success">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="icon fa fa-check"></i> Success</h4>
        Click on icon to check it out on github.
      </div>
      <div class="alert alert-error alert-dismissible" v-if="alert_error">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="icon fa fa-check"></i> Error</h4>
        Cleck yours item.
      </div> -->
          <div class="card mb-3">
            <div class="card-body">
              <form @submit.prevent="edit(useredit)">
          <div class="box box-info">
            <div class="box-body">
              <div class="form-group">
                <label class="control-label" for="dateInput"><i class=""></i>Nombre</label>
                <input class="form-control" id="dateInput" v-model='useredit[0].names' placeholder="Enter ..." type="text" required>
              </div>
              <br />
              <div class="form-group">
                <label class="control-label" for="dateInput"><i class=""></i>Usuario</label>
                <input class="form-control" id="dateInput" v-model='useredit[0].user' placeholder="Enter ..." type="text" required>
              </div>
              <br />
              <div class="form-group">
                <label class="control-label" for="dateInput"><i class=""></i>Apellidos</label>
                <input class="form-control" id="dateInput" v-model='useredit[0].apellidos' placeholder="Enter ..." type="text" required>
              </div>
              <br />
              <div class="form-group">
                <label class="control-label" for="dateInput"><i class=""></i>Edad</label>
                <input class="form-control" id="dateInput" v-model='useredit[0].edad' placeholder="Enter ..." type="number" required>
              </div>
              <br />
              <div class="form-group">
                <label class="control-label" for="dateInput"><i class=""></i>Sexo</label>
                <input class="form-control" id="dateInput" v-model='useredit[0].sexo' placeholder="Enter ..." type="text" required>
              </div>
              <br />
              <div class="form-group">
                <label class="control-label" for="dateInput"><i class=""></i>Cant.Hijos</label>
                <input class="form-control" id="dateInput" v-model='useredit[0].chijos' placeholder="Enter ..." type="number" required>
              </div>
              <br />
              <div class="form-group">
                <label class="control-label" for="dateInput"><i class=""></i>Correo</label>
                <input class="form-control" id="dateInput" v-model='useredit[0].email' placeholder="Enter ..." type="email" required>
                <span v-if='email_error' class="help-block">This email has already been assigned</span>
              </div>
              <br />
              <div class="form-group">
                <label class="control-label" for="dateInput"><i class=""></i>Password</label>
                <input class="form-control" id="dateInput" v-model='pass' placeholder="Enter ..." type="password">
                <!-- <span><i class="fa fa-plus"></i></span> -->
              </div>
              <br />
              <div class="form-group text-right m-b-0">
                <button class="btn btn-primary" type="submit">Save</button>
                <router-link :to="{name: 'User'}"><button class="btn btn-secondary m-l-5" type="reset">Cancel</button></router-link>
              </div>

              <!-- /input-group -->
            </div>
            <!-- /.box-body -->
          </div>
              </form>
            </div>
        </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
require('moment')
import datepicker from 'vue-date-picker'
import axios from 'axios'
import {Urlmain, getHeader} from '../../config/index'
export default {
  name: 'UserEdit',
  props: ['id'],
  components: { datepicker },
  created: function () {
    this.DataEdit()
  },
  data () {
    return {
      phone_number_error: false,
      email_error: false,
      code_error: false,
      pass: '',
      useredit: {
        user: '',
        names: '',
        email: '',
        apellidos: '',
        edad: '',
        sexo: '',
        chijos: '',
        pass: ''
      }
    }
  },
  computed: {
    datetime () {
      return new Date()
    }
  },
  methods: {
    clearInput (vueModel) {
      vueModel = ''
    },
    DataEdit () {
      let that = this
      axios.get(`${Urlmain}user/${that.id}`, { headers: getHeader() })
                .then(response => {
                  that.useredit = response.data.results
                })
    },
    edit (useredit) {
      let that = this
      const body = JSON.stringify({user: useredit[0].user, names: useredit[0].names, apellidos: useredit[0].apellidos, edad: useredit[0].edad, sexo: useredit[0].sexo, chijos: useredit[0].chijos, email: useredit[0].email, pass: that.pass
      })
      axios.put(`${Urlmain}user/${that.id}`, body, {headers: getHeader()})
                .then(response => {
                  if (response.status === 200) {
                    this.$Notice.success({
                      title: 'Confirmado',
                      desc: 'Se ha modificado este elemento.'
                    })
                    this.$router.push({name: 'User'})
                  }
                })
                .catch((error) => {
                  if (error.response.request.status === 400) {
                    this.$Notice.error({
                      title: 'Error',
                      desc: 'Verify item.'
                    })
                  }
                })
    }
  },
  watch: {
  }
}
</script>

<style>
.datetime-picker input {
  height: 4em !important;
}
</style>
