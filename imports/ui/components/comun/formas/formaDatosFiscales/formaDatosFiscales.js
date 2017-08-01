/**
 * Created by Héctor on 06/04/2017.
 */
import template from "./formaDatosFiscales.html";
import {buscarRfc} from "../../../../../api/datosFiscales/busquedas";
import {name as ElegirTipoSociedad} from "../../selects/elegirTipoSociedad/elegirTipoSociedad";

class FormaDatosFiscales {
    constructor($scope) {
        'ngInject';
        // this.datos.abreviacion = '';
    }

    esPersonaMoral() {
        delete this.datos.email;
        delete this.datos.nombres;
        delete this.datos.apellidos;
        delete this.datos._id;
        this.datos.tipoPersona = 'PM';
    }
    esPersonaFisica() {
        delete this.datos.email;
        delete this.datos.razonSocial;
        delete this.datos.tipoSociedad;
        delete this.datos._id;
        this.datos.tipoPersona = 'PF';

    }

}

const name = 'formaDatosFiscales';

export default angular
    .module(name, [
        ElegirTipoSociedad
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: FormaDatosFiscales,
        bindings: {
            datos: '='
        }
    })
    .directive('buscarRfc', ['$q', function ($q) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.existerfc = function (modelValue, viewValue) {
                    let rfc = modelValue || viewValue;
                    return buscarRfc.callPromise({
                        rfc: rfc
                    }).then(function (result) {
                        if (result) {
                            return $q.reject('RFC encontrado');
                        }
                    }).catch(function (err) {
                        return $q.reject('Error encontrado');
                    });
                };
            }
        };
    }]);