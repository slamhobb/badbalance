import React from 'react';

import './styles.css';

function CooperativeSpending() {
    return (
        <React.Fragment>
            <h2 className="mt-4">Кооперативные расходы</h2>

            <div className="row mt-3 pb-3">
                <div className="col-sm-5">

                    <div className="ava-card">
                        <div className="row no-gutters">
                            <div className="col text-right">
                                <img src="/static/img/blizzrep.gif" className="rounded" alt="avatar" />
                                <h5 className="">Дима</h5>
                                <h6 className="card-subtitle text-muted">Representative</h6>
                            </div>
                            <div className="col d-flex justify-content-center align-items-center">
                                vs
                            </div>
                            <div className="col">
                                <img src="/static/img/sysop.gif" className="rounded" alt="avatar" />
                                <h5 className="">Сергей</h5>
                                <h6 className="card-subtitle text-muted">System Administrator</h6>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h4 className="font-weight-bold text-center">1800</h4>
                                <h5 className="text-center">Обед на высоте </h5>
                                <div className="row no-gutters">
                                    <div className="col text-right">
                                        1200
                                    </div>
                                    <div className="col text-center ">
                                        <span className="badge badge-secondary">&lt; 600</span>
                                    </div>
                                    <div className="col ">

                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h4 className="font-weight-bold text-center">300</h4>
                                <h5 className="text-center">Хот-дог</h5>

                                <div className="row no-gutters">
                                    <div className="col text-right text-muted">
                                    </div>
                                    <div className="col text-center">
                                        <span className="badge badge-secondary">150 &gt;</span>
                                    </div>
                                    <div className="col">
                                        300
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h4 className="font-weight-bold text-center">2000</h4>
                                <h5 className="text-center">Скипасс</h5>
                                <div className="row no-gutters">
                                    <div className="col text-right">
                                        500
                                    </div>
                                    <div className="col text-center">
                                        <span className="badge badge-secondary">500 &gt;</span>
                                    </div>
                                    <div className="col">
                                        1500
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h4 className="font-weight-bold text-center">3000</h4>
                                <h5 className="text-center">Такси до Домбая</h5>

                                <div className="row no-gutters">
                                    <div className="col text-right">
                                        1500
                                    </div>
                                    <div className="col text-center">
                                        <span className="badge badge-secondary">=</span>
                                    </div>
                                    <div className="col">
                                        1500
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h4 className="font-weight-bold text-center">350</h4>
                                <h5 className="text-center">Чай на горе</h5>

                                <div className="row no-gutters">
                                    <div className="col text-right">
                                        100
                                    </div>
                                    <div className="col text-center">
                                        <span className="badge badge-secondary">=</span>
                                    </div>
                                    <div className="col">
                                        250
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h4 className="font-weight-bold text-center">120</h4>
                                <h5 className="text-center">Сушеный банан</h5>

                                <div className="row no-gutters">
                                    <div className="col text-right">
                                        120
                                    </div>
                                    <div className="col text-center">
                                        <span className="badge badge-secondary">1</span>
                                    </div>
                                    <div className="col">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h5 className="text-center">Одал за кафе</h5>

                                <div className="row no-gutters">
                                    <div className="col text-right">
                                        120
                                    </div>
                                    <div className="col text-center">
                                        <span className="badge badge-secondary">перевод &gt;</span>
                                    </div>
                                    <div className="col">
                                        +120
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h5 className="text-center">За орехи</h5>

                                <div className="row no-gutters">
                                    <div className="col text-right">
                                        +500
                                    </div>
                                    <div className="col text-center">
                                        <span className="badge badge-secondary">&lt; перевод</span>
                                    </div>
                                    <div className="col">
                                        500
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h5 className="text-center">За орехи</h5>

                                <div className="row no-gutters">
                                    <div className="col text-right">
                                    </div>
                                    <div className="col text-center">
                                        <span className="badge badge-secondary">&lt; перевод</span>
                                    </div>
                                    <div className="col">
                                        500
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        </React.Fragment>
    );
}

export default CooperativeSpending;