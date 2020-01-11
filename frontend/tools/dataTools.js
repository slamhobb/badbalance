export function groupByX(array, key) {
    return array.reduce(function(group, obj) {
        const value = obj[key];
        group[value] = (group[value] || []).concat(obj);
        return group;
    }, {});
}

export function zip(rows) {
    return rows[0].map((_, i) => {
        return rows.map(row => row[i]);
    });
}