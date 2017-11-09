/**
 * Created by Héctor on 06/04/2017.
 */
import {buscarRfc} from "../../../../../api/datosFiscales/busquedas";
import {crearDatoFiscal} from "../../../../../api/datosFiscales/methods";
import {name as ElegirTipoSociedad} from "../../selects/elegirTipoSociedad/elegirTipoSociedad";
import template from "./formaDatosFiscales.html";

class FormaDatosFiscales {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.direccion = {};
        this.datos = {};
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
    guardarDatosFiscales() {
        let datosFinales = angular.copy(this.datos);
        delete datosFinales.colonias
        console.log('[datosFinales]', datosFinales);

        crearDatoFiscal.callPromise(datosFinales).then(this.$bindToContext((result) => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
        }));
    }
}

const name = 'formaDatosFiscales';

export default angular
    .module(name, [
        ElegirTipoSociedad
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: FormaDatosFiscales
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