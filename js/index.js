function WechatMarkdownEdit () {
  // init 参数
  this.editorEle = this.getElement('#editor');

  // renderMarkdown 参数
  // scrollAsync 参数
  this.textareaEle = this.getElement('#textarea');
  this.paperEle = this.getElement('#paper');

  // scrollAsync 参数
  this.editorScrollHeight = 0;
  this.paperEleScrollHeight = 0;
  this.paperWrapEle = this.getElement('#paper-wrap');

  this.editorScrollEle = null;

  // 文档高度
  this.documentHeight = 0;

  // initMarkdownIt 参数
  this.md = this.initMarkdownIt();

  this.editor = this.initEditor();
}

WechatMarkdownEdit.prototype.init = function () {
  var that = this;

  // 初始化整个页面的高度
  that.editorEle.style.height = `${document.documentElement.clientHeight - 54}px`;

  that.renderMarkdown();

  that.scrollAsync();

  that.initSelect();

  that.copy();
}

// 获取单个 dom
WechatMarkdownEdit.prototype.getElement = function (selector) {
  return document.querySelector(selector);
}

// 获取多个 dom
WechatMarkdownEdit.prototype.getElementAll = function (selector) {
  return document.querySelectorAll(selector);
}

// 初始化 Markdown-it
WechatMarkdownEdit.prototype.initMarkdownIt = function () {
  var md = window.markdownit({
    typographer: true,

    breaks: true,

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

  md.use(window.markdownitContainer, 'time', {
    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^time(.*)$/);

      if (tokens[idx].nesting === 1) {
        return '<section class="time">' + md.utils.escapeHtml(m[1]);
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

// 初始化 CodeMirror
WechatMarkdownEdit.prototype.initEditor = function () {
  var that = this;

  var editor = CodeMirror.fromTextArea(that.textareaEle, {
    lineNumbers: false,
    lineWrapping: true,
    styleActiveLine: true,
    scrollbarStyle: 'null',
    autofocus: true,
    theme: '3024-night',
    mode: 'text/x-markdown',
  });

  that.editorScrollEle = editor.display.scroller;

  return editor
}

// 渲染
WechatMarkdownEdit.prototype.renderMarkdown = function () {
  var that = this;

  var mdHtml = that.md.render(that.textareaEle.value);
  that.paperEle.innerHTML = mdHtml;

  that.editor.on('change', function () {
    var editorValue = that.editor.getValue();
    var value = that.md.render(editorValue);
    that.paperEle.innerHTML = value;
  })
}

// 滚动条同步滚动
WechatMarkdownEdit.prototype.scrollAsync = function () {
  var that = this;

  // 初始化文档高度
  that.documentHeight = document.documentElement.clientHeight;

  // 初始化滚动条高度
  that.editorScrollHeight = that.editorScrollEle.scrollHeight - that.documentHeight;
  that.paperEleScrollHeight = that.paperWrapEle.scrollHeight - that.documentHeight;

  window.onresize = function () {
    that.editorScrollHeight = that.editorScrollEle.scrollHeight - that.documentHeight;
    that.paperEleScrollHeight = that.paperWrapEle.scrollHeight - that.documentHeight;

    that.editorEle.style.height = `${document.documentElement.clientHeight - 54}px`;
  }

  that.editorScrollEle.onmouseenter = function () {
    that.editorScrollHeight = that.editorScrollEle.scrollHeight - that.documentHeight;
    that.paperEleScrollHeight = that.paperWrapEle.scrollHeight - that.documentHeight;

    that.editorScrollEle.onscroll = function () {
      var textareaEleScrollTop = that.editorScrollEle.scrollTop;
      var scale = textareaEleScrollTop / that.editorScrollHeight;
      scale = scale.toFixed(4);

      that.paperWrapEle.scrollTop = that.paperEleScrollHeight * scale;
    }
  }

  that.editorScrollEle.onmouseleave = function () {
    that.editorScrollEle.onscroll = null;
  }

  that.paperWrapEle.onmouseenter = function () {
    that.editorScrollHeight = that.editorScrollEle.scrollHeight - that.documentHeight;
    that.paperEleScrollHeight = that.paperWrapEle.scrollHeight - that.documentHeight;

    that.paperWrapEle.onscroll = function () {
      var paperEleScrollTop = that.paperWrapEle.scrollTop;
      var scale = paperEleScrollTop / that.paperEleScrollHeight;
      scale = scale.toFixed(4);

      that.editorScrollEle.scrollTop = that.editorScrollHeight * scale;
    }
  }

  that.paperWrapEle.onmouseleave = function () {
    that.paperWrapEle.onscroll = null;
  }
}

// 复制排版好的内容
WechatMarkdownEdit.prototype.copy = function () {
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

// 创建列表
/*
Obj:
  listEleId:String 列表 id
  triangleEleId:String 三角形 id
  themeCssEleId:String 样式 link 标签 id
  btnEleId:String 点击按钮
  themeObj:Object 样式对象
  cssdir:String CSS 文件夹下对应的文件夹
  active:Number 默认选中第几个，0 为第一个，默认为 0
*/
WechatMarkdownEdit.prototype.selectList = function (obj, callback) {
  var that = this;

  var active = obj.active || 0;

  var ListEle = that.getElement(obj.listEleId);
  var triangleEle = that.getElement(obj.triangleEleId);
  var themeCssEle = that.getElement(obj.themeCssEleId);
  var btnEle = that.getElement(obj.btnEleId);

  btnEle.onclick = function () {
    ListEle.style.display = 'block';
    triangleEle.style.display = 'block';
  }

  ListEle.onmouseleave = function () {
    ListEle.classList.remove('bounceInUp');
    ListEle.classList.add('bounceOutDown');

    triangleEle.classList.remove('bounceInUp');
    triangleEle.classList.add('bounceOutDown');

    var tempAnimation = function () {
      ListEle.style.display = 'none';
      triangleEle.style.display = 'none';

      ListEle.classList.add('bounceInUp');
      ListEle.classList.remove('bounceOutDown');

      triangleEle.classList.add('bounceInUp');
      triangleEle.classList.remove('bounceOutDown');

      ListEle.removeEventListener('animationend', tempAnimation, false);
    }

    if (ListEle.style.display === 'block') {
      ListEle.addEventListener('animationend', tempAnimation, false)
    }
  }

  for (var item in obj.themeObj) {
    var li = document.createElement('li');
    var text = document.createTextNode(item);

    li.classList.add('code-item');

    li.title = item;

    li.appendChild(text);

    li.onclick = function (e) {
      var href = `./css/${obj.cssdir}/${e.target.title}.css`;
      var allLi = ListEle.getElementsByClassName('code-item');

      for (var i = 0; i < allLi.length; i++) {
        allLi[i].classList.remove('active');
      }

      e.target.classList.add('active');
      themeCssEle.setAttribute('href', href);

      if (obj.themeCssEleId === '#editor-theme-css') {
        that.editor.setOption("theme", e.target.title);
      }

      if (typeof callback === 'function') {
        callback(e);
      }
    }

    ListEle.appendChild(li);
  }

  ListEle.getElementsByClassName('code-item')[active].classList.add('active');
}

// 创建样式列表
WechatMarkdownEdit.prototype.initSelect = function () {
  var that = this;

  that.selectList({
    listEleId: '#styles-list',
    triangleEleId: '#triangle',
    themeCssEleId: '#theme-css',
    btnEleId: '#code-btn',
    themeObj: themeObj,
    cssdir: 'styles',
  });

  that.selectList({
    listEleId: '#page-list',
    triangleEleId: '#page-triangle',
    themeCssEleId: '#page-theme-css',
    btnEleId: '#page-theme-btn',
    themeObj: pageThemeObj,
    cssdir: 'theme',
  }, function (e) {
    if (e.target.title === 'stormzhang') {
      that.editor.setValue(themeText);
    } else {
      that.editor.setValue(themeDefaultText);
    }
  });

  that.selectList({
    listEleId: '#editor-list',
    triangleEleId: '#editor-triangle',
    themeCssEleId: '#editor-theme-css',
    btnEleId: '#editor-theme-btn',
    themeObj: editorThemeObj,
    cssdir: 'codemirror/theme',
    active: 2,
  });
}

window.onload = function () {
  new WechatMarkdownEdit().init();
}

window.addEventListener('load', function () {
  this.document.getElementById('loading').style.display = 'none';
  this.document.getElementById('container').style.visibility = 'visible';
})