/**
 * Created by Héctor on 23/06/2017.
 */
import {buscarCuentaContable} from "../../../../../api/catalogos/proveedores/busquedas";
import template from "./cuentaContable.html";

class CuentaContable {
    constructor($scope) {
        'ngInject';
        this.cuentaContable = {};
    }
}

const name = 'cuentaContable';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        bindings: {
            dato: '='
        },
        controller: CuentaContable
    })
    .directive('buscarCuentaContable', ['$q', function ($q) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.existecta = function (modelValue, viewValue) {
                    let cuentaContable = modelValue || viewValue;
                    return buscarCuentaContable.callPromise({
                        cc: cuentaContable
                    }).then(function (result) {
                        if (result.length != 0) {
                            console.log('Esta entrando a la linea 37');
                            return $q.reject('Encontrado');
                        } else {
                            // scope.proveedorDatosGenerales.datos.cuentaContable = '';
                        }
                    }).catch(function (err) {
                        return $q.reject('No encontrado');
                    });
                };
            }
        };
    }])
