const nodes = [
  {
    id: 1,
    parentId: 2,
    text: 'text1',
  },
  {
    id: 2,
    parentId: 3,
    text: 'text2',
  },
  {
    id: 3,
    parentId: 0,
    text: 'text3',
  },
];

const transfor = nodes => {
  let idMap = {};
  nodes.forEach(node => {
    idMap[node.id] = node;
  });
  Object.keys(idMap).map(id => {
    const item = idMap[id];
    if (idMap[item.parentId]) {
      if (idMap[item.parentId].children) {
        idMap[item.parentId].children.push(item);
      } else {
        idMap[item.parentId].children = [item];
        delete idMap[id];
      }
    }
  });
  return Object.values(idMap);
};

const data = transfor(nodes);
console.log(data);
