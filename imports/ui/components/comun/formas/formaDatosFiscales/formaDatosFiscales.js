/**
 * Created by Héctor on 06/04/2017.
 */
import {buscarRfc} from "../../../../../api/datosFiscales/busquedas";
import {crearDatoFiscal} from "../../../../../api/datosFiscales/methods";
import {name as Alertas} from "../../alertas/alertas";
import {name as FormaDireccion} from "../../formas/formaDireccion/formaDireccion";
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

        crearDatoFiscal.callPromise(datosFinales).then(this.$bindToContext((result) => {
            this.tipoMsj = 'success';

            const datoFiscalId = {
                event: result,
                item: result,
                label: result,
                model: result
            };

            this.respuesta(datoFiscalId);
        })).catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
        }));
    }
}

const name = 'formaDatosFiscales';

export default angular
    .module(name, [
        Alertas,
        FormaDireccion
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: FormaDatosFiscales,
        bindings: {
            respuesta: '&'
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
                        if (result.length > 0) {
                            return $q.reject('RFC encontrado');
                        }
                    }).catch(function (err) {
                        return $q.reject('Error encontrado');
                    });
                };
            }
        };
    }]);