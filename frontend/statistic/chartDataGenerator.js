import { groupByX } from '../tools/dataTools';

export function generateDataForChart(items, groupKey) {
    // group by key
    const groupData = groupByX(items, groupKey);
    // get key values array
    const keys = Object.values(groupData).map(([firstEl]) => firstEl[groupKey]);

    const dataSets = keys.map(k => {
        const fk = items.filter(x => x[groupKey] === k);

        const value = fk.reduce((acc, x) => acc + x.sum, 0);

        return {
            [groupKey]: k,
            sum: value
        };
    });

    return dataSets;
}