/**
 * Created by jvltmtz on 10/08/17.
 */
import {DatosFiscales} from "../../../../../api/datosFiscales/collection";
import {actualizarDatoFiscal} from "../../../../../api/datosFiscales/methods";
import {name as FormaDatosFiscales} from "../../../comun/formas/formaDatosFiscales/formaDatosFiscales";
import {name as FormaDireccion} from "../../../comun/formas/formaDireccion/formaDireccion";
import template from "./formaEditarDatosFiscales.html";

class FormaEditarDatosFiscales {
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
    esPersonaMoral() {
        this.datos.tipoPersona = 'PM';
    }
    esPersonaFisica() {
        this.datos.tipoPersona = 'PF';

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

const name = 'formaEditarDatosFiscales';

export default angular
    .module(name, [
        FormaDatosFiscales,
        FormaDireccion
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: FormaEditarDatosFiscales,
        bindings: {
            datoFiscalId: '='
        }
    });