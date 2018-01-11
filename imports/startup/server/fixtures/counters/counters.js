/**
 * Created by jvltmtz on 15/11/17.
 */
import {Counters} from '../../../../api/catalogos/counters/collection'
import {Tiendas} from "../../../../api/catalogos/tiendas/collection";

if (Counters.find({nombre: 'DEVOLUCIONES'}).count() === 0) {

    Tiendas.find({}).forEach(
        (tienda) => {
            Counters.insert({tiendaId: tienda._id, nombre: 'DEVOLUCIONES'});
        });

}
