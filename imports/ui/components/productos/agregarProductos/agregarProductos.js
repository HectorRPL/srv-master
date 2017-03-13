/**
 * Created by Héctor on 11/03/2017.
 */
import {insertar}                           from "../../../../api/productos/methods";
import {name as ConstruyeNombre}            from "../construyeNombre/construyeNombre";
import {name as ClaveProductoProveedor}     from "../../comun/inputs/text/claveProductoProveedor/claveProductoProveedor";
import {name as ClaveProductoEmpresa}       from "../../comun/inputs/text/claveProductoEmpresa/claveProductoEmpresa";
import {name as NombreProducto}             from "../../comun/inputs/text/nombreProducto/nombreProducto";
import {name as ElegirTipoProducto}         from "../../comun/selects/elegirTipoProducto/elegirTipoProducto";
import {name as CentimetrosAncho}           from "../../comun/inputs/number/centimetrosAncho/centimetrosAncho";
import {name as CentimetrosLargo}           from "../../comun/inputs/number/centimetrosLargo/centimetrosLargo";
import {name as ElegirCalidad}              from "../../comun/selects/elegirCalidad/elegirCalidad";
import {name as ColorProducto}              from "../../comun/inputs/text/colorProducto/colorProducto";
import {name as RadioImportado}             from "../../comun/radio/radioImportado/radioImportado";
import {name as RadioRectificado}             from "../../comun/radio/radioRectificado/radioRectificado";
import {name as MetrosCuadrados}            from "../../comun/inputs/number/metrosCuadrados/metrosCuadrados";
import {name as Alertas}                    from "../../comun/alertas/alertas";
import {Marcas}                             from "../../../../api/catalogos/marcas/collection";
import "./agregarProductos.html";

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
        insertar.call(this.producto, this.$bindToContext((err)=> {
            if (err) {
                this.msj = err.reason;
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'Se agregó el producto exitosamente';
                this.tipoMsj = 'success';
            }
        }));
    }

    cerrar(){
        this.dismiss();
    }

}

const name = 'agregarProductos';

// Módulo
export default angular
    .module(name, [
        ConstruyeNombre,
        ClaveProductoProveedor,
        ClaveProductoEmpresa,
        NombreProducto,
        ElegirTipoProducto,
        CentimetrosAncho,
        CentimetrosLargo,
        ElegirCalidad,
        ColorProducto,
        RadioImportado,
        RadioRectificado,
        MetrosCuadrados,
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/productos/${name}/${name}.html`,
        controllerAs: name,
        controller: AgregarProductos,
        bindings: {
            resolve: '<',
            modalInstance: '<'
        }
    });
