/**
 * Created by Héctor on 01/08/2017.
 */
import {buscarCuentaContableTiendas} from "../../../../../api/catalogos/tiendas/busquedas";
import uiMask from "angular-ui-mask";
import template from "./cuentaContableTiendas.html";

class CuentaContableTiendas {
    constructor($scope) {
        'ngInject';
        // this.cuentaContable = {};
    }
}

const name = 'cuentaContableTiendas';

export default angular
    .module(name, [
        uiMask
    ])
    .component(name, {
        template,
        controllerAs: name,
        bindings: {
            dato: '='
        },
        controller: CuentaContableTiendas
    })
    .directive('buscarCuentaContableTiendas', ['$q', function ($q) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.existecta = function (modelValue, viewValue) {
                    let cuentaContable = modelValue || viewValue;
                    return buscarCuentaContableTiendas.callPromise({
                        cc: cuentaContable
                    }).then(function (result) {
                        if (result.length != 0) {
                            return $q.reject('Encontrado');
                        } else {
                            // scope.tiendaDatosGenerales.datos.cuentaContableTiendas = '';
                        }
                    }).catch(function (err) {
                        return $q.reject('No encontrado');
                    });
                };
            }
        };
    }])
