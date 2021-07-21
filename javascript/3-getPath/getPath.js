const getChildNumber = (el) => {
  return Array.from(el.parentNode.children).indexOf(el) + 1
}

const getPath = (el) => {
  if (el.id) {
    return '#' + el.id;
  }

  let path = [];
  let parent = el.parentNode;
  let currentEl = el;

  while (currentEl.parentNode) {
    if (currentEl.parentNode.children.length === 1 || currentEl.tagName === 'BODY') {
      path.unshift(`${currentEl.tagName}`)
    } else {
      path.unshift(`${currentEl.tagName}:nth-child(${getChildNumber(currentEl)})`);
    }

    currentEl = parent;
    parent = currentEl.parentNode;
  }

  return path.join(' > ').toLowerCase();
}

module.exports = getPath;
