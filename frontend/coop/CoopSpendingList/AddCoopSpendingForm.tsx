import React, { useState } from 'react';

import ICoopUser from '../types/ICoopUser';
import ICoop from '../types/ICoop';

import { getDefaultAvatar, getNextAvatar, getPrevAvatar } from '../services/avatarSelector';

let counter = 0;
function getNextId() {
    counter += 1;
    return counter;
}

function AddCoopSpendingForm(props: {
    onAdd: (coop: ICoop) => void;
    onClose: () => void;
}) {
    const [coopName, setCoopName] = useState<string>('');
    const [newUserName, setNewUserName] = useState<string>('');

    const [users, setUsers] = useState<ICoopUser[]>([]);

    function handleAddUser() {
        if (newUserName.length === 0) {
            return;
        }

        let newUsers = users.slice();

        const newUser : ICoopUser = {
            id: getNextId(),
            name: newUserName,
            avatar: getDefaultAvatar()
        };
        newUsers.push(newUser);

        setUsers(newUsers);
        setNewUserName('')
    }

    function handleNextAvatar(userId: number) {
        const newUsers = users.slice();

        const user = newUsers.find(user => user.id === userId);
        user.avatar = getNextAvatar(user.avatar);

        setUsers(newUsers);
    }

    function handlePrevAvatar(userId: number) {
        const newUsers = users.slice();

        const user = newUsers.find(user => user.id === userId);
        user.avatar = getPrevAvatar(user.avatar);

        setUsers(newUsers);
    }

    function handleSaveCoop() {
        const coop : ICoop = {
            id: 0,
            name: coopName,
            users: users
        };

        props.onAdd(coop);
    }

    return (
        <React.Fragment>
            <div className="mt-4 d-flex justify-content-start align-items-center">
                <button className="btn btn-outline-secondary" onClick={props.onClose}>&lt;</button>
                <h2 className="mb-0">&nbsp;Новый кооперативный расход</h2>
            </div>

            <div className="row mt-3 pb-3">
                <div className="col-sm-4">

                    <input type="text" className="form-control" placeholder="Название кооператива"
                           value={coopName} onChange={e => setCoopName(e.target.value)}/>

                    <li className="list-unstyled">
                        {users.map((user: ICoopUser) => (
                            <li className="media mt-3" key={user.id}>
                                <img src={`/static/img/${user.avatar}.gif`} className="rounded mr-3" alt="avatar" />
                                <div className="media-body">
                                    <h5>{user.name}</h5>
                                    <div className="btn-group">
                                        <button className="btn btn-outline-secondary"
                                            onClick={() => handlePrevAvatar(user.id)}>
                                            &lt;
                                        </button>
                                        <button className="btn btn-outline-secondary"
                                                onClick={() => handleNextAvatar(user.id)}>
                                            &gt;
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </li>

                    <div className="d-flex mt-3">
                        <input type="text" className="form-control" placeholder="Имя пользователя"
                           value={newUserName} onChange={e => setNewUserName(e.target.value)}/>
                        <button className="btn btn-outline-secondary ml-2" onClick={handleAddUser}>+</button>
                    </div>

                    {coopName.length > 0 && users.length > 1 &&
                        <button className="btn btn-primary mt-3" onClick={handleSaveCoop}>
                            Сохранить кооператив
                        </button>
                    }
                </div>
            </div>
        </React.Fragment>
    );
}

export default AddCoopSpendingForm;
