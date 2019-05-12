<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <!-- <div class="alert alert-success alert-dismissible" v-if="alert_success">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="icon fa fa-check"></i> Success</h4>
        Click on icon to check it out on github.
      </div> -->
      <!-- <div class="alert alert-error alert-dismissible" v-if="alert_error">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="icon fa fa-check"></i> Error</h4>
        Cleck yours item.
      </div> -->
          <div class="card mb-3">
            <div class="card-body">
              <form @submit.prevent="add(useradd)">
          <div class="box box-info">
            <div class="box-body">
              <div class="form-group">
                <label class="control-label" for="dateInput"><i class=""></i>Usuario</label>
                <input class="form-control" id="dateInput" v-model='useradd.user' placeholder="Enter ..." type="text" required>
              </div>
              <br />
              <div class="form-group">
                <label class="control-label" for="dateInput"><i class=""></i>Nombre</label>
                <input class="form-control" id="dateInput" v-model='useradd.names' placeholder="Enter ..." type="text" required>
              </div>
              <br />
              <div class="form-group">
                <label class="control-label" for="dateInput"><i class=""></i>Apellidos</label>
                <input class="form-control" id="dateInput" v-model='useradd.apellidos' placeholder="Enter ..." type="text" required>
              </div>
              <br />
              <div class="form-group">
                <label class="control-label" for="dateInput"><i class=""></i>Edad</label>
                <input class="form-control" id="dateInput" v-model='useradd.edad' placeholder="Enter ..." type="number" required>
              </div>
              <br />
              <div class="form-group">
                <label class="control-label" for="dateInput"><i class=""></i>Sexo</label>
                <input class="form-control" id="dateInput" v-model='useradd.sexo' placeholder="Enter ..." type="text" required>
              </div>
              <br />
              <div class="form-group">
                <label class="control-label" for="dateInput"><i class=""></i>Cant.Hijos</label>
                <input class="form-control" id="dateInput" v-model='useradd.chijos' placeholder="Enter ..." type="number" required>
              </div>
              <br />
              <div class="form-group">
                <label class="control-label" for="dateInput"><i class=""></i>Correo</label>
                <input class="form-control" id="dateInput" v-model='useradd.email' placeholder="Enter ..." type="email" required>
                <span v-if='email_error' class="help-block">This email has already been assigned</span>
              </div>
              <br />
              <div class="form-group">
                <label class="control-label" for="dateInput"><i class=""></i>Password</label>
                <input class="form-control" id="dateInput" v-model='useradd.pass' placeholder="Enter ..." type="password" required>
              </div>
              <br />
              <!-- <div class="form-group has-error">
                <label class="control-label" for="inputError"><i class=""></i> Name</label>
                <input class="form-control" id="inputError" placeholder="Enter ..." type="text">
                <span class="help-block">Help block with error</span>
              </div> -->
              <!-- <div class="form-group has-error">
                <label class="control-label" for="inputError"><i class=""></i>  Last Name</label>
                <textarea class="form-control" id="inputError" placeholder="Enter ..." type="text"></textarea>
                <span class="help-block">Help block with error</span>
              </div> -->
              
              <!-- <div class="form-group has-error">
                <label class="control-label" for="inputError"><i class=""></i>  E-mail</label>
                <input class="form-control" id="inputError" placeholder="Enter ..." type="email">
                <span class="help-block">Help block with error</span>
              </div> -->
              <!-- <div class="form-group">
                <label class="control-label" for="dateInput"><i class=""></i> Phone</label>
                <input class="form-control" id="dateInput" v-model='useradd.phone_number' placeholder="Enter ..." type="number" required>
                <span v-if="phone_number_error" class="help-block">This phone number has already been assigned or is incorrect (code country+number)</span>
              </div> -->
              <br />
              <!-- <div class="form-group has-error">
                <label class="control-label" for="inputError"><i class=""></i> Phone</label>
                <input class="form-control" id="inputError" placeholder="Enter ..." type="number">
                <span class="help-block">Help block with error</span>
              </div> -->
              <!-- <div class="form-group has-error" v-if="show">
                <label class="control-label" for="dateInput"><i class=""></i> TaxNumber</label>
                <input class="form-control" id="inputError" placeholder="Enter ..." type="text">
                <span class="help-block">Help block with success</span>
              </div> -->

              <!-- select examples -->
              <!-- <h4>Select Options</h4>
              <div class="form-group">
                <label>Select</label>
                <select class="form-control">
                  <option>option 1</option>
                  <option>option 2</option>
                  <option>option 3</option>
                  <option>option 4</option>
                  <option>option 5</option>
                </select>
              </div>
              <br /> -->
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
  name: 'Useradd',
  components: { datepicker },
  data () {
    return {
      phone_number_error: false,
      email_error: false,
      code_error: false,
      value2: '',
      data2: [],
      useradd: {
        name: '',
        apellidos: '',
        edad: '',
        sexo: '',
        chijos: '',
        mail: '',
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
    add (useradd) {
      const body = JSON.stringify({user: useradd.user, names: useradd.names, apellidos: useradd.apellidos, edad: useradd.edad, sexo: useradd.sexo, chijos: useradd.chijos, email: useradd.email, pass: useradd.pass
      })
      axios.post(`${Urlmain}user`, body, {headers: getHeader()})
                .then(response => {
                  if (response.status === 201) {
                    this.$Notice.success({
                      title: 'Confirmado',
                      desc: 'Se ha creado un usuario satisfactoriamente.'
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
