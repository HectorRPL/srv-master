import "./login.html";
import {name as Alertas} from '../comun/alertas/alertas';


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
                    this.$state.go('app.tiendas.lista');
                }
            })
        );
    }
}

const name = 'login';

// create a module
export default angular.module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/login/${name}.html`,
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
