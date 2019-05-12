<template>
  <section class="content">
    <div class="row center-block">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">Usuarios</h3>
            <br>
            <Tooltip content="ADD"><router-link to="/user_add"><Button type="primary"><span><i class="fa fa-plus"></i></span></Button></router-link></Tooltip>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="example1_length" class="dataTables_length">

                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table v-if="user.length > 0" aria-describedby="example1_info" role="grid" id="example1" class="table table-bordered table-striped dataTable">
                    <thead>
                      <Tooltip content="Delete Select" v-if="select.length > 0"><a href="#"><i class="fa" @click="delet()">Delete</i></a></Tooltip>
                      <tr role="row">
                        <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" style="width: 167px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Select</th>
                        <th aria-label="Platform(s): activate to sort column ascending" style="width: 182px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting"> Usuario</th>
                        <th aria-label="Platform(s): activate to sort column ascending" style="width: 182px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting"> Nombre</th>
                        <th aria-label="Platform(s): activate to sort column ascending" style="width: 182px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting"> Apellidos</th>
                        <th aria-label="Platform(s): activate to sort column ascending" style="width: 182px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting"> Edad</th>
                        <th aria-label="Platform(s): activate to sort column ascending" style="width: 182px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting"> Sexo</th>
                        <th aria-label="Platform(s): activate to sort column ascending" style="width: 182px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting"> Cant.Hijos</th>
                        <th aria-label="Platform(s): activate to sort column ascending" style="width: 182px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting"> Correo</th>
                        <th aria-label="CSS grade: activate to sort column ascending" style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Options</th>                      
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="even" role="row" v-for='(item, index) in user' :key='index'>
                        <td class="sorting_1"><input type="checkbox" :value='item.id' v-model='select'></td>
                        <td>{{item.user}}</td>
                        <td>{{item.names}}</td>
                        <td>{{item.apellidos}}</td>
                        <td>{{item.edad}}</td>
                        <td>{{item.sexo}}</td>
                        <td>{{item.chijos}}</td>
                        <td>{{item.email}}</td>
                        <td><router-link :to="{name: 'User edit', params: {id: item.id}}"><i class="fa fa-edit"></i></router-link>
                          <a href="#"><i class="fa fa-remove" @click="del(item.id)"></i></a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from 'jquery'
// Require needed datatables modules
import axios from 'axios'
import {Urlmain, getHeader} from '../../config/index'
require('datatables.net')
require('datatables.net-bs')

export default {
  name: 'Courses',
  created: function () {
    this.fetchData()
  },
  data () {
    return {
      user: '',
      select: [],
      count: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      $('#example1').DataTable()
    })
  },
  methods: {
    fetchData () {
      let that = this
      that.select = []
      axios.get(`${Urlmain}users`, {headers: getHeader()})
                .then(response => {
                  that.user = response.data.results
                  this.$nextTick(() => {
                    $('#example1').DataTable()
                  })
                })
    },
    del (id) {
      this.$Modal.confirm({
        title: 'Delete',
        closable: true,
        okText: 'OK',
        content: '<p>Desea eliminar este elemento?</p>',
        onOk: () => {
          axios.delete(`${Urlmain}user/${id}`, {headers: getHeader()})
          .then(response => {
            this.$Notice.success({
              title: 'Confirmado',
              desc: 'Se ha eliminado un elemento.'
            })
            this.fetchData()
          })
        }
      })
    },
    delet () {
      this.$Modal.confirm({
        title: 'DeleteSelect',
        closable: true,
        okText: 'OK',
        content: '<p>Desea eliminar estos elemento?</p>',
        onOk: () => {
          for (let i = 0; i < this.select.length; i++) {
            axios.delete(`${Urlmain}user/${this.select[i]}`, {headers: getHeader()})
          .then(response => {
            this.count++
            if (this.count === this.select.length) {
              this.fetchData()
            }
          })
          }
        }
      })
    }
  },
  watch: {
    'select': function () {
    }
  }
}
</script>

<style>

@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_desc:after {
  font-family: 'FontAwesome';
}

table.dataTable thead .sorting:after {
  content: '\f0dc';
}

table.dataTable thead .sorting_asc:after {
  content: '\f0dd';
}

table.dataTable thead .sorting_desc:after {
  content: '\f0de';
}
</style>
