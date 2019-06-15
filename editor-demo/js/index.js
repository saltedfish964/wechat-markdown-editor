// textarea 节点
var textarea = document.getElementById('textarea');

// paper 节点
var paper = document.getElementById('paper');

// 复制按钮
var copyBtn = document.getElementById('copy');

// 初始化 markdownit
var md = window.markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>';
      } catch (__) { }
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

textarea.onkeyup = function (e) {
  var value = e.target.value;
  value = md.render(value);
  paper.innerHTML = value;
}

copyBtn.onclick = function (e) {
  var clipboard = new ClipboardJS('#copy');

  clipboard.on('success', function () {
    alert('复制成功');
    e.clearSelection();
  });

  clipboard.on('error', function () {
    alert('复制失败');
  });
}

window.onload = function () {
  paper.innerHTML = md.render(textarea.value);
}