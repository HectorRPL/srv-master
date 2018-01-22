/**
 * Created by Juan on 13/11/2017.
 */
import {_} from 'meteor/underscore';
import {Counters} from "../counters/collection";

// TODO definir con el cliente l tema del control simplificado ¿algunas tiendas están amparadas?
const COUNTS = ['VENTAS', 'COMPRAS', 'NOTAS_CREDITO', 'DEVOLUCIONES'];

const comprasEntregasHooks = {
    _insertCounters(doc) {
        COUNTS.forEach((item) => {
            Counters.insert({tiendaId: doc._id, nombre: item});
        });

    },

    afterInsertTienda(doc) {
        this._insertCounters(doc);
    }
};

export default comprasEntregasHooks;