let idx = 0;
let language;
let key = calcKey(document.location.hash.substr(1));

function calcKey(param) {
  if (param.startsWith('/home')) return 'home';
  if (param.startsWith('/blog/angular')) return 'angular';
  if (param.startsWith('/blog/nodejs')) return 'nodejs';
  if (param.startsWith('/blog/es6')) return 'es6';
  if (param.startsWith('/mutual/nine')) return 'nine';
  if (param.startsWith('/mutual/chat')) return 'chat';
  if (param.startsWith('/mutual/screen')) return 'screen';
}

function fetchLang() {
  return new Promise(resolve => {
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'assets/data/menu.json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        language = JSON.parse(xhr.responseText);
        resolve();
      }
    }
    xhr.send();
  });
}

function navigationVariable(engine) {
  engine.on('router-change', value => {
    key = calcKey(value);
  });
  return () => {
    return new Promise(resolve => {
      if (language) {
        if (idx >= language[key].length) {
          idx = 0;
        }
        resolve(language[key][idx++]);
      } else {
        resolve(fetchLang().then(() => language[key][idx++]));
      }
    });
  }
}

module.exports = {
  navigationVariable
};
