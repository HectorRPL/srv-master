import {Meteor} from "meteor/meteor";
import {Roles} from "meteor/alanning:roles";
import {name as Alertas} from '../comun/alertas/alertas';
import template from "./login.html";

class Login {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.credentials = {
            username: '',
            password: ''
        };
        this.msj = '';
        this.tipoMsj = '';
    }
    login() {
        this.tipoMsj = '';
        Meteor.loginWithPassword(this.credentials.username, this.credentials.password,
            this.$bindToContext((err) => {
                if (err) {
                    this.msj = 'Combinación de usuario y contraseña incorrectos.';
                    this.tipoMsj = 'danger';
                } else {
                    if (Roles.userIsInRole(Meteor.userId())) {
                        this.msj = 'Usuario no permitido';
                        this.tipoMsj = 'danger';
                    } else {
                        this.$state.go('app.tienda.lista');
                    }
                }
            })
        );
    }
}

const name = 'login';

export default angular.module(name, [
        Alertas
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: Login
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('login', {
            url: '/login',
            template: '<login></login>'
        });
}