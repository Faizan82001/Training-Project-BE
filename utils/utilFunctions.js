const editDistance = (s1, s2) => {
    const m = s1.length;
    const n = s2.length;

    const costs = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) {
        costs[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
        costs[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1.charAt(i - 1) === s2.charAt(j - 1)) {
                costs[i][j] = costs[i - 1][j - 1];
            } else {
                costs[i][j] = Math.min(
                    Math.min(costs[i - 1][j], costs[i][j - 1]),
                    costs[i - 1][j - 1]
                ) + 1;
            }
        }
    }

    return costs[m][n];
};

exports.similarity = (s1, s2) => {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength === 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
};
