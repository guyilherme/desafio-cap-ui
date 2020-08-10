<template>
    <v-card>
        <v-card-text>
            <v-container fluid>
                <v-form class="" @submit.prevent="busca" ref="form" lazy-validation>
                    <v-row>
                        <v-col cols="11">
                            <v-text-field
                                v-model="conta"
                                label="Conta"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="1">
                            <v-btn fab type="submit" color="primary">
                            <v-icon>search</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
            <v-data-table
            :headers="headers"
            :items="contas"
            no-data-text="Não há resultados"
            :loading="searchLoading">

            <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon small color="primary" slot="activator" v-bind="attrs" v-on="on" @click="saldo(item)">
                            <v-icon medium color="green darken-2">visibility</v-icon>
                        </v-btn>
                    </template>
                    <span>Saldo</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon small color="primary" slot="activator" v-bind="attrs" v-on="on" @click="deposito(item)">
                            <v-icon medium color="green darken-2">account_balance_wallet</v-icon>
                        </v-btn>
                    </template>
                    <span>Deposito</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon small color="primary" slot="activator" v-bind="attrs" v-on="on" @click="saque(item)">
                            <v-icon medium color="green darken-2">local_atm</v-icon>
                        </v-btn>
                    </template>
                    <span>Saque</span>
                </v-tooltip>
            </template>
            </v-data-table>
        </v-card-text>
            <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Saldo
        </v-card-title>

        <v-card-text>
            <v-text-field
                v-model="contaItem.nome"
                label="Nome"
                :rules="rule"
                readonly="true"
            ></v-text-field>
            <v-text-field
                v-model="contaItem.numero"
                label="Numero Conta"
                :rules="rule"
                readonly="true"
            ></v-text-field>
            <v-text-field
                v-model="contaItem.valor"
                label="Valor"
                :rules="rule"
                readonly="true"
            ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-card>
</template>

<script>
  import api from './api'

  export default {
    data: () => ({
      valid: true,
      dialog: false,
      conta: '',
      searchLoading: false,
      headers: [
        {
          text: 'Nome',
          align: 'left',
          sortable: false,
          value: 'user.name'
        },
        {
          text: 'Numero conta',
          align: 'left',
          sortable: false,
          value: 'numero'
        },
        {
          text: 'Valor',
          align: 'left',
          sortable: false,
          value: 'valor'
        },
        {
          text: 'Ações',
          sortable: false,
          align: 'center',
          value: 'actions'
        },
      ],
      contas: [],
      contaItem: {
          nome: '',
          numero: '',
          valor: ''
      }
    }),
    methods: {
        busca() {
            this.searchLoading = true
            let where = ''
            if(this.conta) {
                where = '?[numero]='+this.conta
            }
            api.get('/api/conta'+ where).then((response) => {
                this.contas = response.data.data
                this.searchLoading = false
            }).catch(()=>{
                this.searchLoading = false
            })
        },
        deposito(item) {
            this.$prompt({ 
                text : "Digite o valor a ser depositado", 
                title : "Deposito", 
                acceptText : "Ok", 
                cancelText : "Cancelar"
            }).then( valor => {
                let data = {
                    valor: valor
                }
                api.put('/api/conta/deposito/'+item.id, data).then(response => {
                    this.$inform({
                        text : "Deposito efetuado. Novo Saldo de "+response.data.valor, 
                        closeText : "Deposito Cancelado"
                    });
                    return response.data
                })
            })

        },
        saque(item) {
            this.$prompt({ 
                text : "Digite o valor a ser sacado", 
                title : "Saque", 
                acceptText : "Ok", 
                cancelText : "Cancelar"
            }).then( valor => {
                let data = {
                    valor: valor
                }
                api.put('/api/conta/saque/'+item.id, data).then(response => {
                    this.$inform({
                        text : "Saque efetuado. Novo Saldo de "+response.data.valor
                    });
                    return response.data
                }).catch(() => {
                    this.$inform("Saque não efetuado");
                })
            })

        },
        saldo(item) {
            this.contaItem.nome = item.user.name
            this.contaItem.numero = item.numero
            this.contaItem.valor = item.valor
            this.dialog = true
        }
    },
  }
</script>
