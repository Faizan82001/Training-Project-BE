/* eslint-disable guard-for-in */
const { similarity } = require('../utilFunctions');
const { getText, findValueBlock, getKeyValueMap } = require('./parser');

const calculateDistance = (title, element) => {
    const elementTop = element.Geometry.BoundingBox.Top;
    const titleTop = title.Geometry.BoundingBox.Top;
    return Math.abs(elementTop - titleTop);
};

const findNearestTitle = (titleBlock, keyBlock) => {
    let minDiffElement = titleBlock[0];
    let minDistance = calculateDistance(minDiffElement, keyBlock);

    for (const title of titleBlock) {
        const distance = calculateDistance(title, keyBlock);
        if (distance < minDistance) {
            minDistance = distance;
            minDiffElement = title;
        }
    }
    return minDiffElement.Text;
};

const getKeyValueRelationship = (keyMap, valueMap, blockMap, titleMap) => {
    const kvs = {};
    for (const keyBlock in keyMap) {
        if (Object.prototype.hasOwnProperty.call(keyMap, keyBlock)) {
            const valueBlock = findValueBlock(keyMap[keyBlock], valueMap);
            let key = getText(keyMap[keyBlock], blockMap);
            const val = getText(valueBlock, blockMap);
            if (key.indexOf('.') > -1) {
                key = key.split('.').join('');
            }
            if (similarity(key.replace(/ /g, ''), 'UNIT/ROOM#') >= 0.8) {
                const title = findNearestTitle(titleMap, keyMap[keyBlock]);
                key = `${title} ${key.replace(/ /g, '')}`;
                kvs[key] = val;
            } else {
                kvs[key] = val;
            }
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
    } = getKeyValueMap(data.Blocks, new Set(['PICKUP LOCATION', 'DESTINATION ADDRESS']));

    // Get Key Value relationship
    return getKeyValueRelationship(keyMap, valueMap, blockMap, titleMap);
};

const getBlock = (result, text) => {
    if (result.Blocks) {
        return result.Blocks.filter(block => {
            if (block.Text && similarity(text, block.Text) >= 0.8) {
                return true;
            }
            return false;
        });
    }
    return [];
};

exports.checkSignatures = (result) => {
    let signs = {};
    if (result.Blocks) {
        signs = result.Blocks.filter(block => {
            if (block.BlockType === 'SIGNATURE' && block.Confidence >= 50) {
                return block;
            }
            return null;
        });
    }

    const sectionThreeLine = getBlock(result, 'SECTION III - Signature of Physician or Healthcare Professional');
    const sectionFourLine = getBlock(result, 'SECTION IV - Patient Acknowledgement of Potential Financial Risk');
    const dateSigned = getBlock(result, 'Date Signed');
    const leftLine = getBlock(result, 'Advanced/Critical Life Support Services:');
    let physicianSignature = null;
    let patientSignature = null;
    const check = [sectionThreeLine[0], sectionFourLine[0], leftLine[0], dateSigned[0], dateSigned[1]];
    if (check.some(variable => !variable)) {
        return { physicianSignature, patientSignature };
    }
    const checkSignatures = (signs) => {
        for (const sign of signs) {
            const { Top: signTop, Left: signLeft } = sign.Geometry.BoundingBox;
            const sectionThreeTop = sectionThreeLine[0].Geometry.BoundingBox.Top;
            const sectionFourTop = sectionFourLine[0].Geometry.BoundingBox.Top;
            const leftLineLeft = leftLine[0].Geometry.BoundingBox.Left;
            const leftLineWidth = leftLine[0].Geometry.BoundingBox.Width;
            const dateSignedLeft0 = dateSigned[0].Geometry.BoundingBox.Left;
            const dateSignedLeft1 = dateSigned[1].Geometry.BoundingBox.Left;

            if (signTop > sectionThreeTop && signTop < sectionFourTop
             && (signLeft < dateSignedLeft0 && signLeft > (leftLineLeft + leftLineWidth))) {
                physicianSignature = true;
            } else if ((signTop > sectionThreeTop && signTop > sectionFourTop)
            && (signLeft < dateSignedLeft1 && signLeft > (leftLineLeft + leftLineWidth))) {
                patientSignature = true;
            } else {
                // nothing here
            }
        }
        return { physicianSignature, patientSignature };
    };

    return signs ? checkSignatures(signs) : { message: 'No signature found.' };
};
