/**
 * Created by Héctor on 11/03/2017.
 */
import {altaProducto} from "../../../../api/catalogos/productos/methods";
import {name as ConstruyeNombre} from "../construyeNombre/construyeNombre";

import {name as ElegirTipoProducto} from "../../comun/selects/elegirTipoProducto/elegirTipoProducto";
import {name as ElegirCalidad} from "../../comun/selects/elegirCalidad/elegirCalidad";
import {name as RadioImportado} from "../../comun/radio/radioImportado/radioImportado";
import {name as RadioRectificado} from "../../comun/radio/radioRectificado/radioRectificado";
import {name as Alertas} from "../../comun/alertas/alertas";
import {Marcas} from "../../../../api/catalogos/marcas/collection";
import template from "./agregarProductos.html";

class AgregarProductos {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.subscribe('marcas.todas');

        this.helpers({
            marcas(){
                return Marcas.find();
            }
        });

        this.producto = {
            importado: false,
            rectificado: false,
            activo: true,
            calidad: '1A'
        };


    }

    agregarProducto() {
        this.tipoMsj = '';
        altaProducto.call(this.producto, this.$bindToContext((err)=> {
            if (err) {
                this.msj = err.reason;
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'Se agregó el producto exitosamente';
                this.tipoMsj = 'success';
            }
        }));
    }

    // CIERRA O CANCELA EL MODAL
    cancelar() {
        this.modalInstance.dismiss('cerrado');
    }
}

const name = 'agregarProductos';

// Módulo
export default angular
    .module(name, [
        ConstruyeNombre,
        ElegirTipoProducto,
        ElegirCalidad,
        RadioImportado,
        RadioRectificado,
        Alertas
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AgregarProductos,
        bindings: {
            resolve: '<',
            modalInstance: '<'
        }
    });
