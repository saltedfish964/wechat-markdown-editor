let themeText = `::: time
阅读本文大概需要 1 分钟。
:::

狗熊把毛茸茸的手掌探进了蜂巢，一顿乱搅之后，沾着甜津津的蜜汁，往嘴里舔呀舔的。这还了得!蜂群像一团燃烧的烈火，愤怒地包围了贪婪的狗熊，螫得它鼻青脸肿，嗷嗷嚎叫，屁滚尿流地逃窜。

“对呀，狠狠教训它!”一个嗡嗡的声音响起，它飞一阵停一阵，一时落在蜂房门口，一时钻进了蜂巢里，忙得不亦乐乎。

“呔，苍蝇，你这是干什么?”几只蜜蜂在忙乱中发现了那只喊喊叫叫的苍蝇，便围上去质问。

苍蝇嚷得更加起劲了：“嗡嗡，快去追赶呀，还犹豫什么?瞧，那狗熊快溜掉了，它偷了你们多少宝贵的蜜啊，要狠狠地收拾它!”

“别装模作样了!”一只勇敢的蜜蜂冲上去揪住了苍蝇，愤慨地说道，“你的嘴巴、身上粘的蜜汁告诉我们，你不是患难相助的朋友，而是趁火打劫的凶贼!你同狗熊是一路货，只不过伪装得比它巧妙罢了!”`;

let themeDefaultText = `# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,, -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \`+ \`, \` - \`, or \` * \`
+ Sub-lists are made by indenting 2 spaces:
- Marker character change forces new list start:
* Ac tristique libero volutpat at
+ Facilisis in pretium nisl aliquet
- Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


## Code

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| data | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg "The Dojocat"

### Emojies

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

### Subscript / Superscript

- 19^th^
- H~2~O


### ins

++Inserted text++


### mark

==Marked text==


### Footnotes

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

and multiple paragraphs.

[^second]: Footnote text.


### Definition lists

Term 1

: Definition 1
with lazy continuation.

Term 2 with *inline markup*

: Definition 2

        { some code, part of Definition 2 }

      Third paragraph of definition 2.

_Compact style:_

Term 1
~ Definition 1

Term 2
~ Definition 2a
~ Definition 2b


### Abbreviations

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

### Custom containers

::: tips
*here be dragons*
:::`;

let defaultCss = `/*
  所有定制样式写在 .paper 选择器下
  .paper 类是包裹元素
  设置 code 标签需要用到 .paper .code-inline
*/
.paper {
  padding: 1.6rem;
  color: #333;
  font-size: 14px
}
.paper * {
  box-sizing: border-box
}
.paper hr {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee
}
.paper strong {
  font-weight: 700
}
.paper a {
  color: #428bca;
  text-decoration: none;
  background: 0 0
}
.paper p {
  margin: 10px 0;
  line-height: 1.7
}
.paper h1,
.paper h2,
.paper h3 {
  margin-top: 20px;
  margin-bottom: 10px
}
.paper h1,
.paper h2,
.paper h3,
.paper h4,
.paper h5,
.paper h6 {
  font-family: inherit;
  font-weight: 500;
  line-height: 1.1;
  color: inherit
}
.paper h1 {
  font-size: 36px
}
.paper h2 {
  font-size: 30px
}
.paper h3 {
  font-size: 24px
}
.paper h4 {
  font-size: 18px
}
.paper h5 {
  font-size: 14px
}
.paper h6 {
  font-size: 12px
}
.paper blockquote {
  padding: 10px 20px;
  margin: 0 0 20px;
  font-size: 17.5px;
  border-left: 5px solid #eee
}
.paper .code-inline {
  padding: 2px 4px;
  font-size: 90%;
  color: #c7254e;
  background-color: #f9f2f4;
  border-radius: 4px
}
.paper .code-block {
  display: block;
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #333;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px
}
.paper .hljs {
  border-radius: 4px
}
.paper table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
  border-spacing: 0
}
.paper table > thead:first-child > tr:first-child > th {
  border-top: 0
}
.paper th {
  vertical-align: bottom;
  border-bottom: 2px solid #ddd;
  padding: 8px;
  line-height: 1.42857143;
  text-align: left;
  word-break: normal
}
.paper tr:nth-child(odd) td {
  background-color: #f9f9f9
}
.paper td {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid #ddd
}
.paper img {
  max-width: 35%;
  vertical-align: middle
}
.paper mark {
  padding: .2em;
  background-color: #fcf8e3
}
.paper dt {
  font-weight: 700
}
.paper dd {
  margin-left: 0
}
.paper dd,
.paper dt {
  line-height: 1.42857143
}
.paper abbr[title] {
  cursor: help;
  border-bottom: 1px dotted #777
}
.paper .tips {
  background-color: #f3f5f7;
  border-color: #42b983;
  padding: .1rem 1.5rem;
  border-left-width: .5rem;
  border-left-style: solid;
  margin: 1rem 0
}
.paper .tips .tips-title {
  font-weight: 600;
  margin-bottom: -.4rem
}
.paper .footnotes {
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  -moz-column-count: 2;
  -webkit-column-count: 2;
  column-count: 2
}
.paper .footnotes-list {
  padding-left: 2em
}
.paper ol,
.paper ul {
  margin-top: -10px;
  margin-bottom: 10px
}`;