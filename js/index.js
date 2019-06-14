function WechatMarkdownEdit () {
  // init 参数
  this.editorEle = this.getElement('#editor');

  // renderMarkdown 参数
  // scrollAsync 参数
  this.textareaEle = this.getElement('#textarea');
  this.paperEle = this.getElement('#paper');

  // scrollAsync 参数
  this.textareaEleScrollHeight = 0;
  this.paperEleScrollHeight = 0;
  this.paperWrapEle = this.getElement('#paper-wrap');

  // 文档高度
  this.documentHeight = 0;

  // initMarkdownIt 参数
  this.md = this.initMarkdownIt();
}

WechatMarkdownEdit.prototype.init = function () {
  // 初始化整个页面的高度
  this.editorEle.style.height = `${document.documentElement.clientHeight - 54}px`;

  this.renderMarkdown();

  this.scrollAsync();

  this.selectList({
    listEleId: '#styles-list',
    triangleEleId: '#triangle',
    themeCssEleId: '#theme-css',
    btnEleId: '#code-btn',
    themeObj: themeObj,
    cssdir: 'styles',
  });

  this.selectList({
    listEleId: '#page-list',
    triangleEleId: '#page-triangle',
    themeCssEleId: '#page-theme-css',
    btnEleId: '#page-theme-btn',
    themeObj: pageThemeObj,
    cssdir: 'theme',
  });

  this.copy();
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

// 渲染
WechatMarkdownEdit.prototype.renderMarkdown = function () {
  var that = this;
  var mdHtml = that.md.render(that.textareaEle.value);
  that.paperEle.innerHTML = mdHtml;

  that.textareaEle.onkeydown = function (e) {
    var value = that.md.render(e.target.value);
    that.paperEle.innerHTML = value;
  }

  that.textareaEle.onkeyup = function (e) {
    var value = that.md.render(e.target.value);
    that.paperEle.innerHTML = value;
  }
}

// 滚动条同步滚动
WechatMarkdownEdit.prototype.scrollAsync = function () {
  var that = this;

  // 初始化文档高度
  that.documentHeight = document.documentElement.clientHeight;

  // 初始化滚动条高度
  that.textareaEleScrollHeight = that.textareaEle.scrollHeight - that.documentHeight;
  that.paperEleScrollHeight = that.paperWrapEle.scrollHeight - that.documentHeight;

  console.log(that.textareaEleScrollHeight, that.paperEleScrollHeight)

  window.onresize = function () {
    that.textareaEleScrollHeight = that.textareaEle.scrollHeight - that.documentHeight;
    that.paperEleScrollHeight = that.paperWrapEle.scrollHeight - that.documentHeight;

    that.editorEle.style.height = `${document.documentElement.clientHeight - 54}px`;
  }

  that.textareaEle.onmouseenter = function () {
    that.textareaEleScrollHeight = that.textareaEle.scrollHeight - that.documentHeight;
    that.paperEleScrollHeight = that.paperWrapEle.scrollHeight - that.documentHeight;

    that.textareaEle.onscroll = function () {
      var textareaEleScrollTop = that.textareaEle.scrollTop;
      var scale = textareaEleScrollTop / that.textareaEleScrollHeight;
      scale = scale.toFixed(4);

      that.paperWrapEle.scrollTop = that.paperEleScrollHeight * scale;
    }
  }

  that.textareaEle.onmouseleave = function () {
    that.textareaEle.onscroll = null;
  }

  that.paperWrapEle.onmouseenter = function () {
    that.textareaEleScrollHeight = that.textareaEle.scrollHeight - that.documentHeight;
    that.paperEleScrollHeight = that.paperWrapEle.scrollHeight - that.documentHeight;

    that.paperWrapEle.onscroll = function () {
      var paperEleScrollTop = that.paperWrapEle.scrollTop;
      var scale = paperEleScrollTop / that.paperEleScrollHeight;
      scale = scale.toFixed(4);

      that.textareaEle.scrollTop = that.textareaEleScrollHeight * scale;
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
*/
WechatMarkdownEdit.prototype.selectList = function (obj) {
  var that = this;

  var ListEle = that.getElement(obj.listEleId);
  var triangleEle = that.getElement(obj.triangleEleId);
  var themeCssEle = that.getElement(obj.themeCssEleId);
  var btnEle = that.getElement(obj.btnEleId);

  btnEle.onclick = function () {
    ListEle.style.display = 'block';
    triangleEle.style.display = 'block';
  }

  ListEle.onmouseleave = function () {
    ListEle.style.display = 'none';
    triangleEle.style.display = 'none';
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

      console.log(that.textareaEleScrollHeight, that.paperEleScrollHeight)
    }

    ListEle.appendChild(li);
  }

  ListEle.getElementsByClassName('code-item')[0].classList.add('active');
}

window.onload = function () {
  new WechatMarkdownEdit().init();
}