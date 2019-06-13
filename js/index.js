function editor () {
  var md = window.markdownit({
    typographer: true,

    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>';
        } catch (__) {
          return __
        }
      }

      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  });

  var textareaEle = document.getElementById('textarea');
  var paperEle = document.getElementById('paper');

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