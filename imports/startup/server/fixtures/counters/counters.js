/**
 * Created by jvltmtz on 15/11/17.
 */
import {Counters} from '../../../../api/catalogos/counters/collection'

if (Counters.find({tiendaId: 'iJMyg7kDMLF7GW2Qt', nombre:'CREDITOVENTA'}).count() === 0) {

    Counters.insert({tiendaId: 'iJMyg7kDMLF7GW2Qt', nombre:'CREDITOVENTA'});

}
