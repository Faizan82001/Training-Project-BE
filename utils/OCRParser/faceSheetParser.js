/* eslint-disable guard-for-in */
const { getText, findValueBlock, getKeyValueMap } = require('./parser');

const getTitle = (arr, element) => {
    let minDiffElement = arr[0];

    arr.forEach(num => {
        if ((element.Geometry.BoundingBox.Top - num.Geometry.BoundingBox.Top) < 0) {
            return;
        }
        if ((element.Geometry.BoundingBox.Top - num.Geometry.BoundingBox.Top) <
            (element.Geometry.BoundingBox.Top - minDiffElement.Geometry.BoundingBox.Top)) {
            minDiffElement = num;
        }
    });
    return minDiffElement.Text;
};

const getKeyValueRelationship = (keyMap, valueMap, blockMap, titleMap) => {
    const kvs = {};
    for (const keyBlock in keyMap) {
        if (Object.prototype.hasOwnProperty.call(keyMap, keyBlock)) {
            const valueBlock = findValueBlock(keyMap[keyBlock], valueMap);
            const title = getTitle(titleMap, valueBlock);
            let key = getText(keyMap[keyBlock], blockMap);
            const val = getText(valueBlock, blockMap);
            if (key.indexOf('.') > -1) {
                key = key.split('.').join('');
            }
            kvs[title] = {
                ...kvs[title],
                [key]: val
            };
        }
    }
    return kvs;
};

exports.parseData = (data) => {
    const {
        keyMap,
        valueMap,
        blockMap,
        titleMap
    } = getKeyValueMap(data.Blocks, new Set(['PATIENT', 'EMERGENCY CONTACT', 'ENCOUNTER DETAIL',
        'REFERRING PHYSICIAN', 'PRIMARY PHYSICIAN', 'GUARANTOR', 'PRIMARY INSURANCE', 'SECONDARY INFORMATION']));

    // Get Key Value relationship
    return getKeyValueRelationship(keyMap, valueMap, blockMap, titleMap);
};
