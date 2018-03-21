/* Generate Markdown table-of-contents links from document headings. No runtime dependencies. */
'use strict';
function analyze(text) {

var entries=[]; var used={};
String(text).split(/\r?\n/).forEach(function(line){
  var m=/^(#{1,6})\s+(.+?)\s*$/.exec(line);if(!m)return;
  var title=m[2].replace(/#+\s*$/,'').trim();
  var slug=title.toLowerCase().replace(/[^a-z0-9 -]/g,'').trim().replace(/\s+/g,'-');
  var number=used[slug]||0;used[slug]=number+1;
  entries.push({title:title,level:m[1].length,anchor:slug+(number?'-'+number:'')});
});return {headings:entries, markdown:entries.map(function(h){return '  '.repeat(h.level-1)+'- ['+h.title+'](#'+h.anchor+')';}).join('\n')};
}
module.exports = { analyze: analyze };
