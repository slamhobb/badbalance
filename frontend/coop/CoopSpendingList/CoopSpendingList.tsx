import React, {useEffect, useState} from 'react';

import ICoop from '../types/ICoop';
import AddCoopSpendingForm from './AddCoopSpendingForm';

import coopSpendingService from '../../services/coopSpendingService';

function CoopSpendingList() {
    const [coops, setCoops] = useState(new Map());
    const [isAdd, setIsAdd] = useState(false);

    useEffect(() => {
        coopSpendingService.getCoops()
            .then(result => {
                setCoops(getMap(result.coops));
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }, [])

    function getMap(array: ICoop[]) : Map<number, ICoop> {
        const map = new Map();
        array.forEach((x: ICoop) => map.set(x.id, x));
        return map;
    }

    function handleShowAddForm(e: any) {
        e.preventDefault();

        setIsAdd(true);
    }

    function handleHideAddForm() {
        setIsAdd(false);
    }

    function handleAddCoop(coop: ICoop) {
        return coopSpendingService.addCoop(coop)
            .then(result => {
                const coopId = result.id;

                coop.id = coopId;

                const newCoops = new Map(coops);
                newCoops.set(coop.id, coop);
                setCoops(newCoops);

                setIsAdd(false);

                return coopId;
            })
            .catch(error => alert('Произошла ошибка ' + error))
    }

    if (isAdd) {
        return <AddCoopSpendingForm onAdd={handleAddCoop} onClose={handleHideAddForm}/>;
    }

    const coopList = Array.from(coops.values());

    return (
        <React.Fragment>
            <h2 className="mt-4">Кооперативные расходы</h2>

           <div className="row mt-3">
               <div className="col-sm-4">
                   <a href="#" onClick={handleShowAddForm}>Добавить кооператив</a>
               </div>
           </div>

            <div className="row mt-3">
                <div className="col-sm-4">
                    <ul className="list-group">
                        {coopList.map((x: ICoop) =>
                            <a href={window.location.pathname + x.id} key={x.id}
                               className="list-group-item list-group-item-action">
                                {x.name}
                            </a>)
                        }
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CoopSpendingList;
