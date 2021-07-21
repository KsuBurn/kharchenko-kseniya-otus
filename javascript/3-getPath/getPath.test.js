const getPath = require('./getPath');

document.body.innerHTML = '<div class="first-class"></div>\n' +
  '<div>\n' +
  '  <h1 id="title">Title 1</h1>\n' +
  '  <ul>\n' +
  '    <li class="item">Item 1</li>\n' +
  '    <li class="item">Item 2</li>\n' +
  '  </ul>\n' +
  '  <h1>Title 2</h1>\n' +
  '  <ul>\n' +
  '    <li class="item">Item 3</li>\n' +
  '    <li class="item">Item 4</li>\n' +
  '  </ul>\n' +
  '</div>'

test('If the element has an id, then immediately return it as a unique selector', () => {
  const el = document.getElementById('title');
  const uniqueSelector = getPath(el);

  expect(document.querySelectorAll(uniqueSelector)).toHaveLength(1);
  expect(document.querySelector(uniqueSelector)).toBe(el);
})

test('Get a unique selector for element with a repeating class', () => {
  const el = document.querySelectorAll('.item')[1];
  const uniqueSelector = getPath(el);

  expect(document.querySelectorAll(uniqueSelector)).toHaveLength(1)
  expect(document.querySelector(uniqueSelector)).toBe(el)
})
