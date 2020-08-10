<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card>
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field
                    label="Email"
                    v-model="user.email"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    label="Senha"
                    v-model="user.password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" color="primary">Login</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import loginService from '@/services/loginService'
  import api from '../components/api'

  export default {
    name: 'Login',

    data: () => ({
      user: {}
    }),
    methods: {
      login() {
        loginService.login(this.user).then(res => {
        localStorage['token'] = JSON.stringify(res)
        api.interceptors.request.use(
          config => {
            const token = localStorage.getItem("token");
            console.log(token)
            if (token) {
              config.headers.common["Authorization"] = token.access_token;
            }
            return config;
          },
          error => {
            return Promise.reject(error);
          }
        );
        this.$router.push('/home')
      })
      }
    }
  }
</script>
