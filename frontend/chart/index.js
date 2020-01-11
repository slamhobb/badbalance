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

        if (!this.props.datasets) return;

        this.inst.data.labels = this.props.labels;
        this.inst.data.datasets = this.props.datasets;

        this.inst.update(0, false);
    }

    renderChart() {
        // eslint-disable-next-line no-undef
        this.inst = new Chart(this.node, {
            type: this.props.type,
            options: this.props.options
        });
    }

    render() {
        return(
            <canvas width="260" height="260" ref={ref => this.node = ref} />
        );
    }
}

BadChart.propTypes = {
    type: PropTypes.string.isRequired,
    labels: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string).isRequired,
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
    ]),
    datasets: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number).isRequired
    })).isRequired,
    options: PropTypes.object
};

export default BadChart;
