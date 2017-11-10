/**
 * Created by Héctor on 09/11/2017.
 */
import {DatosFiscales}                    from "../../../../api/datosFiscales/collection";
import {actualizarDatoFiscal}             from "../../../../api/datosFiscales/methods";
import {name as Alertas}                  from "../../comun/alertas/alertas";
import {name as FormaEditarDatosFiscales} from "../../comun/formas/formaEditarDatosFiscales/formaEditarDatosFiscales";
import template                           from "./editarDatosFiscales.html";

class EditarDatosFiscales {
    constructor($scope, $reactive) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.subscribe('datosFiscales.lista', () => [{_id: this.getReactively('datoFiscalId')}]);
        this.helpers({
            datos(){
                return DatosFiscales.findOne({_id: this.getReactively('datoFiscalId')});
            }
        });
    }

    actualizarDatosFiscales() {
        delete this.datos.colonias;
        delete this.datos.fechaCreacion;
        actualizarDatoFiscal.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            console.log(err);
            this.tipoMsj = 'danger';
        }));
    }
}

const name = 'editarDatosFiscales';

export default angular
    .module(name, [
        Alertas,
        FormaEditarDatosFiscales
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: EditarDatosFiscales,
        bindings: {
            datoFiscalId: '='
        }
    });