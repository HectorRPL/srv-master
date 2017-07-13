/**
 * Created by Héctor on 11/07/2017.
 */
import template from "./editarPersonal.html";
import ngAnimate from "angular-animate";
import {name as EditarPersonalGenerales} from "./editarPersonalGenerales/editarPersonalGenerales";
import {name as EditarPersonalDireccion} from "./editarPersonalDireccion/editarPersonalDireccion";

class EditarPersonal {
    constructor($scope, $state, $stateParams) {
        'ngInject';
        this.$state = $state;

        this.personalId = $stateParams.personalId;
        this.tiendaId = $stateParams.tiendaId;

        $scope.oneAtATime = true;

        this.acordeon = [
            {titulo: "Datos Generales", estado: ".generales", icono: 'fa fa-book'},
            {titulo: "Dirección", estado: ".direccion", icono: 'fa fa-map-marker'}
        ];
    }
}

const name = 'editarPersonal';

export default angular
    .module(name, [
        ngAnimate,
        EditarPersonalGenerales,
        EditarPersonalDireccion
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarPersonal
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.empleados.editar', {
            url: '/editar',
            template: '<editar-personal></editar-personal>',
            abstract: true
        });
}
