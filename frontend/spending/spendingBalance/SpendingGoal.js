import React from 'react';
import PropTypes from 'prop-types';

function SpendingGoal({
    spendingGoal,
    spendingSum
}) {
    function renderProgressBar(percent) {
        return (
            <div className="progress" style={{ height: '2px' }}>
                <div className="progress-bar bg-success" role="progressbar"
                    style={{ width: `${percent}%` }}
                    aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">
                </div>
            </div>
        );
    }

    function renderWarningProgressBar(percent) {
        return (
            <div className="progress" style={{ height: '2px' }}>
                <div className="progress-bar bg-warning" role="progressbar"
                    style={{ width: `${percent}%` }}
                    aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">
                </div>
            </div>
        );
    }

    function renderOverProgressBar(percent) {
        const restPercent = 100 - percent;

        return (
            <div className="progress" style={{ height: '2px' }}>
                <div className="progress-bar bg-success" role="progressbar"
                    style={{ width: `${percent}%` }}
                    aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">
                </div>
                <div className="progress-bar bg-warning" role="progressbar"
                    style={{ width: `${restPercent}%` }}
                    aria-valuenow={restPercent} aria-valuemin="0" aria-valuemax="100">
                </div>
            </div>
        );
    }

    if (spendingGoal === 0) {
        return null;
    }

    if (spendingSum <= spendingGoal) {
        const percent = Math.round(spendingSum / spendingGoal * 100);
        return percent < 90
            ? renderProgressBar(percent)
            : renderWarningProgressBar(percent);
    }

    const percent = Math.round(spendingGoal / spendingSum * 100);
    return renderOverProgressBar(percent);
}

SpendingGoal.propTypes = {
    spendingGoal: PropTypes.number.isRequired,
    spendingSum: PropTypes.number.isRequired
};

export default SpendingGoal;