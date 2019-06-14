function mdConfig () {
  var md = window.markdownit({
    typographer: true,

    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs">' +
            hljs.highlight(lang, str, true).value +
            '</pre>';
        } catch (__) {
          return __
        }
      }

      return '<pre class="hljs">' + md.utils.escapeHtml(str) + '</pre>';
    }
  });

  md.use(window.markdownitContainer, 'tips', {
    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^tips(.*)$/);

      if (tokens[idx].nesting === 1) {
        return '<section class="tips"><p class="tips-title">Tip</p>' + md.utils.escapeHtml(m[1]);
      } else {
        return '</section>\n';
      }
    }
  });

  md.use(window.markdownitEmoji);

  md.use(window.markdownitSup);

  md.use(window.markdownitSub);

  md.use(window.markdownitIns);

  md.use(window.markdownitMark);

  md.use(window.markdownitFootnote);

  md.use(window.markdownitDeflist);

  md.use(window.markdownitAbbr);

  console.log(md)

  return md;
}

function editor () {
  var md = mdConfig();

  var textareaEle = document.getElementById('textarea');
  var paperEle = document.getElementById('paper');

  var mdHtml = md.render(textareaEle.value);

  paperEle.innerHTML = mdHtml;

  textareaEle.onkeydown = function (e) {
    var value = md.render(e.target.value);
    paperEle.innerHTML = value;
  }

  textareaEle.onkeyup = function (e) {
    var value = md.render(e.target.value);
    paperEle.innerHTML = value;
  }
}

function copy () {
  var clipboard = new ClipboardJS('#copy');

  clipboard.on('success', function (e) {
    tata.success('复制成功', '可前往公众号粘贴了(￣▽￣)"', {
      position: 'tm',
      duration: 1500
    });

    e.clearSelection();
  });

  clipboard.on('error', function (e) {
    tata.text('复制失败', '请重新尝试复制。', {
      position: 'tm',
      duration: 1500
    });
  });
}

function main () {
  // 初始化高度
  var editorEle = document.getElementById('editor');

  editorEle.style.height = `${document.documentElement.clientHeight - 54}px`;

  editor();

  copy();
}

window.onload = function () {
  main();
}