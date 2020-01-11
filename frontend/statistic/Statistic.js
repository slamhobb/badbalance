import React from 'react';
import PropTypes from 'prop-types';

import PeriodSelector from '../spending/PeriodSelector';

import DetailStatistic from './DetailStatistic';

import BadChart from '../chart';

import spendingService from '../services/spendingService';

import { generateDataForChart } from './chartDataGenerator';

const colors = [
    '#1f77b4',
    '#e377c2',
    '#ff7f0e',
    '#2ca02c',
    '#bcbd22',
    '#d62728',
    '#17becf',
    '#9467bd',
    '#7f7f7f',
    '#8c564b',
    '#3366cc'
];

class Statistic extends React.Component {
    constructor(props) {
        super(props);

        this.loadData = this.loadData.bind(this);
        this.handleChangePeriod = this.handleChangePeriod.bind(this);

        const { year, month } = this.getYearMonth(this.props.curDate);

        this.state = {
            year: year,
            month: month,

            items: [],
            incomingItems: [],
            categories: new Map()
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        spendingService.getSpending(this.state.year, this.state.month)
            .then(result => {
                const cats = this.getMap(result.categories);

                this.setState({
                    items: result.spending,
                    categories: cats
                });
            })
            .catch(error => alert('Произошла ошибка ' + error));

        spendingService.getIncoming(this.state.year, this.state.month)
            .then(result => {
                this.setState({
                    incomingItems: result.incoming
                });
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    getMap(array) {
        return array.reduce((map, x) => map.set(parseInt(x.id), x), new Map());
    }

    getYearMonth(date) {
        date = new Date(date);

        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1
        };
    }

    handleChangePeriod(period) {
        this.setState({
            year: period.year,
            month: period.month
        }, () => {
            this.loadData();
        });
    }

    renderHorizontalBar(labels, dataSets) {
        const data = [{
            label: 'Расходы',
            data: dataSets,
            backgroundColor: colors
        }];

        const options = {
            legend: {
                display: false
            }
        };

        return <BadChart type='horizontalBar' labels={labels} datasets={data} options={options} />;
    }

    render() {
        const allSpending = this.state.items.reduce((sum, item) => sum + item.sum, 0);
        const allIncoming = this.state.incomingItems.reduce((sum, item) => sum + item.sum, 0);
        const balance = allIncoming - allSpending;

        const data = generateDataForChart(this.state.items, 'category_id');

        const categories = data.map(x => ({
            id: x.category_id,
            name: this.state.categories.get(x.category_id).name
        }));

        const labels = data.map(x => [this.state.categories.get(x.category_id).name, x.sum.toString()]);
        const dataSets = data.map(x => x.sum);

        return (
            <React.Fragment>
                <h2 className="mt-4">
                    Статистика
                </h2>
                <div className="row mt-3">
                    <div className="col">
                        <PeriodSelector year={this.state.year} month={this.state.month}
                            onChange={this.handleChangePeriod} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <span className="mr-2">Всего раходов: <strong>{allSpending}</strong></span>
                        <span>Всего доходов: <strong>{allIncoming}</strong></span>
                        <div>Балланс: <strong>{balance}</strong></div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-sm-6">
                        {this.renderHorizontalBar(labels, dataSets)}
                    </div>
                    <div className="col-sm-6">
                        <DetailStatistic items={this.state.items}
                            categories={categories} colors={colors} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Statistic.propTypes = {
    curDate: PropTypes.instanceOf(Date).isRequired
};

export default Statistic;
