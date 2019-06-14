function init () {
  // 初始化高度
  var editorEle = document.getElementById('editor');

  editorEle.style.height = `${document.documentElement.clientHeight - 54}px`;
}

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

function scrollAsync () {
  var textareaEle = document.getElementById('textarea');
  var paperEle = document.getElementById('paper-wrap');

  var textareaEleScrollHeight = textareaEle.scrollHeight;
  var paperEleScrollHeight = paperEle.scrollHeight;

  textareaEle.onmouseenter = function () {
    var textareaEleScrollTopInit = textareaEle.scrollTop;

    var scaleInit = textareaEleScrollTopInit / textareaEleScrollHeight;
    scaleInit = scaleInit.toFixed(2);

    console.log(scaleInit)

    paperEle.scrollTop = paperEleScrollHeight * scaleInit;

    textareaEle.onscroll = function () {
      var textareaEleScrollTop = textareaEle.scrollTop;
      var scale = textareaEleScrollTop / textareaEleScrollHeight;
      scale = scale.toFixed(2);

      paperEle.scrollTop = paperEleScrollHeight * scale;
    }
  }

  textareaEle.onmouseleave = function () {
    textareaEle.onscroll = null;
  }

  paperEle.onmouseenter = function () {
    var paperEleScrollTopInit = paperEle.scrollTop;
    var scaleInit = paperEleScrollTopInit / paperEleScrollHeight;
    scaleInit = scaleInit.toFixed(2);

    textareaEle.scrollTop = textareaEleScrollHeight * scaleInit;

    console.log(scaleInit)

    paperEle.onscroll = function () {
      var paperEleScrollTop = paperEle.scrollTop;
      var scale = paperEleScrollTop / paperEleScrollHeight;
      scale = scale.toFixed(2);

      textareaEle.scrollTop = textareaEleScrollHeight * scale;
    }
  }

  paperEle.onmouseleave = function () {
    paperEle.onscroll = null;
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

function velocityAnimation () {
}

function main () {
  init();

  editor();

  scrollAsync();

  velocityAnimation();

  copy();
}

window.onload = function () {
  main();
}