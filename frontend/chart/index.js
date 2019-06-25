'use strict';

import React from 'react';
import PropTypes from 'prop-types';

class BadChart extends React.PureComponent {
    constructor(props) {
        super(props);

        this.inst = undefined;
    }

    componentDidMount() {
        this.renderChart();
    }

    componentDidUpdate() {
        this.updateChart();
    }

    componentWillUnmount() {
        this.inst.destroy();
    }

    updateChart() {
        if (!this.inst) return;

        if (!this.props.data) return;

        const colors1 = [
            //'#FFFF66',
            '#FFCC66',
            '#CC9933',
            '#FFCC99',
            '#FFCCCC',
            '#CC6666',
            '#FF99CC',
            '#FFCCFF',
            '#CC99CC',
            '#CC66FF',
            '#9966FF',
            '#CCCCFF',
        ];

        // function getRandomColor() {
        //     const letters = '0123456789ABCDEF';
        //     let color = '#';
        //     for (let i = 0; i < 6; i++ ) {
        //         color += letters[Math.floor(Math.random() * 16)];
        //     }
        //     return color;
        // }

        const result = this.props.data;
        const colors = result.stat.map((v, i) => { return colors1[i]; });

        const data = {
            labels: result.stat.map(function(x) { return x.category; }),
            datasets: [
                {
                    data: result.stat.map(function(x) { return x.sum; }),
                    backgroundColor: colors,
                    hoverBackgroundColor: colors
                }]
        };

        this.inst.data.labels = data.labels;
        this.inst.data.datasets = data.datasets;
        this.inst.update(0, false);
    }

    renderChart() {
        // eslint-disable-next-line no-undef
        this.inst = new Chart(this.node,{
            type: 'doughnut',
            //data: data
            //options: options
        });
    }

    render() {
        return(
            <canvas width="260" height="260" ref={ref => this.node = ref} />
        );
    }
}

BadChart.propTypes = {
    data: PropTypes.object
};

export default BadChart;
