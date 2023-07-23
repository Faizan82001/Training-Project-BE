exports.getText = (result, blocksMap) => {
    return (result.Relationships || [])
        .flatMap(relationship => relationship.Type === 'CHILD' ? relationship.Ids : [])
        .flatMap(childId => {
            const word = blocksMap[childId];
            if (word) {
                if (word.BlockType === 'WORD') {
                    return word.Text;
                } else if (word.BlockType === 'SELECTION_ELEMENT' && word.SelectionStatus === 'SELECTED') {
                    return 'X';
                } else {
                    // nothing here
                }
            }
            return [];
        })
        .join(' ');
};

exports.findValueBlock = (keyBlock, valueMap) => {
    let valueBlock = null;
    for (const relationship of keyBlock.Relationships) {
        if (relationship.Type === 'VALUE') {
            for (const valueId of relationship.Ids) {
                valueBlock = valueMap[valueId];
            }
        }
    }
    return valueBlock;
};

exports.getKeyValueMap = (blocks, title) => {
    // get key and value maps
    const keyMap = {};
    const valueMap = {};
    const blockMap = {};
    const titleMap = [];
    for (const block of blocks) {
        const blockId = block.Id;
        blockMap[blockId] = block;
        if (block.BlockType === 'KEY_VALUE_SET') {
            if (block.EntityTypes.includes('KEY')) {
                keyMap[blockId] = block;
            } else {
                valueMap[blockId] = block;
            }
        }
        if (block.BlockType === 'LINE' && title.has(block.Text)) {
            titleMap.push(block);
        }
    }
    return {
        keyMap,
        valueMap,
        blockMap,
        titleMap
    };
};
