// ==UserScript==
// @name         Reddit Compact CPR
// @namespace    http://tampermonkey.net/
// @version      0.4
// @downloadURL  https://raw.githubusercontent.com/grantmulholland/mobilecompact/refs/heads/main/mobilecompact.user.js
// @description  reddit compact with tweaks, based on https://github.com/dlmarquis/reddit-compact-tm/blob/main/main.js
// @author       palenerd, grantmulholland
// @match        https://*.reddit.com/*
// @grant        none
// ==/UserScript==

// This zooms the page to a reasonable viewing window
var metaTag = document.createElement("meta");
metaTag.name = "viewport";
metaTag.content = "width=device-width, initial-scale=1";
document.head.appendChild(metaTag);

// Grab Reddit's instance of jQuery
var $ = window.jQuery;
var jQuery = window.jQuery;

$('ul.tabmenu:not(.formtab)').wrap('<div class="subtoolbar" />');
$('#header-img, .pagename').wrapAll('<div id="topbar" />');
$('#header-img').wrap('<div class="left" />');
$('.pagename').wrap('<h1 />');
$('#header-bottom-left').html($('#header-bottom-left').html().replace(/&nbsp;/g,''));
$('#topbar').append('<div class="right"><a class="topbar-options" href="javascript:void(0)" id="topmenu_toggle"></a></div>');

$('#header-bottom-right').attr('id', 'top_menu');

$("#topmenu_toggle").click(function() {
    $(this).toggleClass("active");
    $("#top_menu").toggle();
});

$('#top_menu .separator').remove();
var mail = $('#top_menu #mail').detach();
$('#topmenu_toggle').before(mail);

//const url = window.location.href;
const searchUrl = $('#search').attr('action');
const submitUrl = $('.submit-text a').attr('href');
let searchLink = '<a href="' + searchUrl + '">search</a>';
let submitLink = '<a href="' + submitUrl + '">submit</a>';

$('#chat').after(searchLink);
$('#chat').after(submitLink);

$('#top_menu > *').wrap('<div class="menuitem" />');


// Post/comment options shoved into expando to fatfinger-proof them
let expandoGear = '<a href="javascript:void(0)" class="options_link"></a>';
$('.search-result').addClass('link');
$('.comment > .entry > .tagline, .link .tagline').after(expandoGear);

$('.flat-list').addClass('clear options_expando hidden');
$('.flat-list').removeClass('buttons');
$('.flat-list li a').unwrap();
$('.flat-list .embed-comment').remove();
$('.flat-list .give-gold').remove();
$('.flat-list a[data-event-action="permalink"]').prepend('<div class="permalink-icon"></div>');
$('.flat-list a[data-event-action="parent"]').prepend('<div class="parent-icon"></div>');
$('.flat-list a:contains("save")').prepend('<div class="save-icon"></div>');
$('.flat-list a[data-event-action="edit"]').prepend('<div class="edit-icon"></div>');
$('.flat-list a[data-event-action="comment"]').prepend('<div class="reply-icon"></div>');
$('.flat-list a[data-event-action="report"]').prepend('<div class="report-icon"></div>');
$('.flat-list a[data-event-action="hide"]').prepend('<div class="hide-icon"></div>');
$('.flat-list a[data-event-action="unhide"]').prepend('<div class="unhide-icon"></div>');
$('.flat-list a.post-sharing-button').prepend('<div class="email-icon"></div>');
var mainExpando = $('.top-matter').siblings('.options_expando').detach();
$('.top-matter').find('.options_link').after(mainExpando);

$(document).on('click', '.options_link', function() {
    $(this).siblings('.options_expando').toggleClass('expanded');
    $(this).toggleClass('active');
});

$('.link').each(function() {
    var comments = $(this).find('.flat-list a.comments').detach();
    if (comments.text() == "comment") {
        comments.text('0');
    } else {
        comments.text(comments.text().split(' ')[0]);
    }
    $(this).find('.midcol').after('<div class="commentcount"></div>');
    $(this).find('.commentcount').prepend(comments);

    var stamps = $(this).find('.flat-list .stamp').detach();
    $(this).find('.flat-list').before(stamps);

    var score = $(this).find('.midcol .score').detach();
    score.text(score.attr('title') + ' points ');
    $(this).find('.tagline').prepend(score);

    var flair = $(this).find('.linkflairlabel').detach();
    $(this).find('p.title').before(flair);
});

$('.search-expando-button').addClass('button');

/* Load up the stylesheet now */

var element = document.createElement('style'),
    sheet;

// Append style element to head
document.head.appendChild(element);
element.type = "text/css";

  var style =
'.content {' +
'  margin: revert !important;' +
'}' +
'' +
'.linkflair {' +
'  max-width: unset !important;' +
'  margin-top: revert !important;' +
'  margin-right: revert !important;' +
'  display: block !important;' +
'  white-space: normal !important;' +
'}' +
'' +
'.link {' +
'  margin-bottom: revert !important;' +
'  padding-left: revert !important;' +
'  border-left: 0 !important;' +
'  border-right: 0 !important;' +
'  -webkit-box-shadow: none !important;' +
'  box-shadow: none !important;' +
'}' +
'' +
'.link .title {' +
'  font-weight: bold !important;' +
'  font-size: 14px !important;' +
'}' +
'' +
'.link .tagline .score {' +
'  color: black;' +
'}' +
'' +
'.entry {' +
'  margin-right: 0 !important;' +
'  overflow: visible !important;' +
'}' +
'' +
'.comment .entry, .message .entry {' +
'  margin-left: 0 !important;' +
'  padding-right: 0 !important;' +
'}' +
'' +
'.commentarea > .usertext {' +
'  width: calc(100vw - 20px);' +
'}' +
'' +
'.side, .footer-parent, .thumbnail.self, #sr-header-area, .beta-hint {' +
'  display: none;' +
'}' +
'' +
'.tabmenu {' +
'  display: block !important;' +
'  overflow-x: scroll;' +
'}' +
'' +
'.tabmenu li:not(.selected) a {' +
'  background: transparent !important;' +
'}' +
'' +
'.tabmenu li.selected a {' +
'  color: #4c566c !important;' +
'}' +
'' +
'.tabmenu li {' +
'  margin: 0 !important' +
'}' +
'' +
'#newlink .tabmenu li {' +
'  display: inline-block !important;' +
'}' +
'' +
'.formtabs-content {' +
'  width: unset !important;' +
'}' +
'' +
'#newlink-flair-dropdown {' +
'  position: fixed !important;' +
'  top: 0 !important;' +
'  left: 0 !important;' +
'}' +
'' +
'.roundfield {' +
'  width: unset !important;' +
'}' +
'' +
'.tabmenu.formtab .selected a {' +
'  font-size: 100% !important;' +
'}' +
'' +
'.search-result-group {' +
'  max-width: unset !important;' +
'  min-width: unset !important;' +
'  padding-left: 0 !important;' +
'  padding-right: 0 !important;' +
'}' +
'' +
'.searchpane {' +
' margin-right: 5px !important;' +
'}' +
'' +
'.combined-search-page #search input[type="text"] {' +
'  max-width: unset !important;' +
'  min-width: unset !important;' +
'}' +
'' +
'.md ol, .md ul {' +
'  margin: 10px 1em !important;' +
'  padding-left: 0 !important;' +
'}' +
'' +
'#header-img {' +
'  height: 40px !important;' +
'  width: 120px !important;' +
'  scale: 80%;' +
'}' +
'' +
'#header-bottom-right {' +
'  position: revert !important;' +
'}' +
'' +
'#top_menu {' +
'  font-size: 14px !important;' +
'}' +
'' +
'#chat, #mail {' +
'  top: 0 !important;' +
'}' +
'' +
'#chat {' +
'  height: unset !important;' +
'  width: unset !important;' +
'  text-indent: 0 !important;' +
'  background: transparent !important;' +
'}' +
'' +
'.infobar {' +
'  margin: 0 !important;' +
'}' +
'' +
'.comment .midcol {' +
'  width: unset !important;' +
'}' +
'' +
'.comment .child, .comment .showreplies {' +
'  margin-left: 0 !important;' +
'  border-left: none !important;' +
'}' +
'' +
'.comment.noncollapsed .usertext {' +
'  min-height: 51px !important;' +
'}' +
'' +
'.comment.noncollapsed .usertext, .comment.noncollapsed .tagline {' +
'  padding-right: 38px;' +
'}' +
'' +
'.link .options_expando.expanded, .comment .options_expando.expanded, .message .options_expando.expanded {' +
'  display: inline-block !important;' +
'  height: min-content !important;' +
'}' +
'' +
'.link .options_expando.expanded, .message .options_expando.expanded {' +
'  width: 100vw !important;' +
'}' +
'' +
'.comment .options_expando.expanded {' +
'  width: calc(100% + 16px) !important;' +
'  position: relative;' +
'  left: -8px;' +
'}' +
'' +
'.no-constraints-when-pinned {' +
'  max-width: unset !important;' +
'  min-width: unset !important;' +
'  max-height: unset !important;' +
'  min-height: unset !important;' +
'}' +
'' +
'.reddit-video-player-root::after {' +
'  padding-top: 0 !important;' +
'}' +
'' +
'.reddit-video-player-root > video, .reddit-video-player-root > img {' +
'  position: revert !important;' +
'  transform: unset !important;' +
'}' +
'' +
'.morecomments .gray {' +
'  color: white !important;' +
'  font-size: smaller;' +
'}' +
'' +
'.morecomments a {' +
'  font-size: small !important;' +
'}' +
'' +
'.panestack-title {' +
'  margin: 10px 10px 0 10px !important' +
'}' +
'' +
'.usertext-edit, .usertext-edit .md > textarea {' +
'  width: 100% !important;' +
'}' +
'' +
'.usertext .bottom-area {' +
'  width: revert !important;' +
'}' +
'' +
'.comment.noncollapsed .usertext.cloneable, .comment.noncollapsed {' +
'  padding-right: 0px !important;' +
'}' +
'' +
'.link .options_expando a, .comment .options_expando a, .message .options_expando a {' +
'  vertical-align: bottom;' +
'}' +
'' +
'.comment {' +
'  overflow: hidden;' +
'}' +
'' +
'.nav-buttons {' +
'  flex: max-content;' +
'}' +
'' +
'.prev-button a {' +
'  float: left;' +
'}' +
'' +
'.next-button a {' +
'  float: right;' +
'}' +
'' +
'.nav-buttons a {' +
'  border: 8px solid transparent;' +
'  border-image: url("https://www.redditstatic.com/compact/border-button.png") 8 fill;' +
'  font-weight: bold;' +
'  color: white;' +
'  text-shadow: 0px 1px 1px rgba(255,255,255,0.1),0px -1px 1px rgba(0,0,0,0.4);' +
'}' +
'' +
'.nav-buttons a:hover, .nav-buttons a:active, .nav-buttons a[selected] {' +
'  border: 8px solid transparent;' +
'  border-image: url("https://www.redditstatic.com/compact/border-button-active.png") 8 fill;' +
'  font-weight: bold;' +
'  color: white;' +
'  text-shadow: 0px 1px 1px rgba(255,255,255,0.1),0px -1px 1px rgba(0,0,0,0.4);' +
'}' +
'' +
'.pagename {' +
'  font-size: 18px !important;' +
'  font-variant: unset !important;' +
'  margin-right: 0 !important;' +
'}' +
'' +
'.wiki-page-content {' +
'  margin-right: 15px !important;' +
'}' +
'' +
'.wiki-page .wiki-page-content .wiki > .toc > ul {' +
'  float: unset !important;' +
'}' +
'' +
'.markdownEditor {' +
'  white-space: break-spaces !important;' +
'}' +
'' +
'/* Original .compact CSS */' +
'' +
'body {' +
' background:#c5ccd3;' +
' font-family:Helvetica,"Helvetica Neue",Arial,sans-serif;' +
' margin:0;' +
' width:100%;' +
' height:100%;' +
' -webkit-font-smoothing:antialiased' +
'}' +
'p {' +
' margin:0;' +
' padding:0' +
'}' +
'a {' +
' color:#517191' +
'}' +
'a:visited {' +
' color:#4F565B' +
'}' +
'textarea {' +
' font-family:inherit' +
'}' +
'#preload {' +
' position:absolute;' +
' top:-1000px;' +
' left:-1000px' +
'}' +
'.newbutton {' +
' -moz-appearance:none;' +
' -webkit-appearance:none;' +
' border:8px solid transparent;' +
' -moz-border-image:url("https://www.redditstatic.com/compact/border-button.png") 8 fill;' +
' -o-border-image:url("https://www.redditstatic.com/compact/border-button.png") 8 fill;' +
' -webkit-border-image:url("https://www.redditstatic.com/compact/border-button.png") 8 fill;' +
' border-image:url("https://www.redditstatic.com/compact/border-button.png") 8 fill;' +
' color:white;' +
' font-family:inherit;' +
' font-size:12px;' +
' font-weight:bold;' +
' text-decoration:none;' +
' text-shadow:0px 1px 1px rgba(255,255,255,0.1),0px -1px 1px rgba(0,0,0,0.4);' +
' background:none' +
'}' +
'.newbutton:active,' +
'.newbutton:hover,' +
'.newbutton[selected],' +
'.newbutton.expanded,' +
'.newbutton.active {' +
' -moz-border-image:url("https://www.redditstatic.com/compact/border-button-active.png") 8 fill;' +
' -o-border-image:url("https://www.redditstatic.com/compact/border-button-active.png") 8 fill;' +
' -webkit-border-image:url("https://www.redditstatic.com/compact/border-button-active.png") 8 fill;' +
' border-image:url("https://www.redditstatic.com/compact/border-button-active.png") 8 fill;' +
' color:white' +
'}' +
'.button,' +
'.button:visited {' +
' -moz-border-radius:6px;' +
' -webkit-border-radius:6px;' +
' border-radius:6px;' +
' background:url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2JmZDBlMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzgwYTJjNCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==\');' +
' background:-webkit-gradient(linear,50% 0%,50% 100%,color-stop(0%,#bfd0e0),color-stop(100%,#80a2c4));' +
' background:-moz-linear-gradient(top,#bfd0e0,#80a2c4);' +
' background:-webkit-linear-gradient(top,#bfd0e0,#80a2c4);' +
' background:linear-gradient(to bottom,#bfd0e0,#80a2c4);' +
' background-color:#a0b9d2;' +
' height:30px;' +
' line-height:30px;' +
' color:white;' +
' font-family:inherit;' +
' font-size:12px;' +
' font-weight:bold;' +
' margin:0px;' +
' padding:5px;' +
' text-decoration:none;' +
' text-overflow:ellipsis;' +
' white-space:nowrap;' +
' width:auto;' +
' text-shadow:0px 1px 1px rgba(255,255,255,0.1),0px -1px 1px rgba(0,0,0,0.4);' +
' border:1px solid #517191;' +
' -moz-box-shadow:inset 0px 1px 0px rgba(255,255,255,0.75),0px 1px 1px rgba(255,255,255,0.6),0px -1px 1px rgba(0,0,0,0.1);' +
' -webkit-box-shadow:inset 0px 1px 0px rgba(255,255,255,0.75),0px 1px 1px rgba(255,255,255,0.6),0px -1px 1px rgba(0,0,0,0.1);' +
' box-shadow:inset 0px 1px 0px rgba(255,255,255,0.75),0px 1px 1px rgba(255,255,255,0.6),0px -1px 1px rgba(0,0,0,0.1)' +
'}' +
'.button:active,' +
'.button[selected],' +
'.button.active,' +
'.button.upmod,' +
'.button.downmod {' +
' background:url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzdlODk5NCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzgwYTJjNCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==\');' +
' background:-webkit-gradient(linear,50% 0%,50% 100%,color-stop(0%,#7e8994),color-stop(100%,#80a2c4));' +
' background:-moz-linear-gradient(top,#7e8994,#80a2c4);' +
' background:-webkit-linear-gradient(top,#7e8994,#80a2c4);' +
' background:linear-gradient(to bottom,#7e8994,#80a2c4);' +
' background-color:#7f96ac' +
'}' +
'button.button {' +
' padding:0 5px' +
'}' +
'.secondary_button {' +
' background:url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2FiYmJjOSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzgzOTNhMyIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==\');' +
' background:-webkit-gradient(linear,50% 0%,50% 100%,color-stop(0%,#abbbc9),color-stop(100%,#8393a3));' +
' background:-moz-linear-gradient(top,#abbbc9,#8393a3);' +
' background:-webkit-linear-gradient(top,#abbbc9,#8393a3);' +
' background:linear-gradient(to bottom,#abbbc9,#8393a3);' +
' background-color:#97a7b6;' +
' border:1px solid #626D78' +
'}' +
'.secondary_button:active,' +
'.second_button[selected],' +
'.second_button.active {' +
' background-color:#ABBBC9;' +
' background:url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzgzOTNhMyIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2FiYmJjOSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==\');' +
' background:-webkit-gradient(linear,50% 0%,50% 100%,color-stop(0%,#8393a3),color-stop(100%,#abbbc9));' +
' background:-moz-linear-gradient(top,#8393a3,#abbbc9);' +
' background:-webkit-linear-gradient(top,#8393a3,#abbbc9);' +
' background:linear-gradient(to bottom,#8393a3,#abbbc9);' +
' background-color:#97a7b6' +
'}' +
'.small_button,' +
'.small_button:visited {' +
' -moz-border-radius:6px;' +
' -webkit-border-radius:6px;' +
' border-radius:6px;' +
' background:url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2JmZDBlMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzgwYTJjNCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==\');' +
' background:-webkit-gradient(linear,50% 0%,50% 100%,color-stop(0%,#bfd0e0),color-stop(100%,#80a2c4));' +
' background:-moz-linear-gradient(top,#bfd0e0,#80a2c4);' +
' background:-webkit-linear-gradient(top,#bfd0e0,#80a2c4);' +
' background:linear-gradient(to bottom,#bfd0e0,#80a2c4);' +
' background-color:#a0b9d2;' +
' line-height:20px;' +
' color:white;' +
' font-family:inherit;' +
' font-size:12px;' +
' font-weight:bold;' +
' margin:0px;' +
' padding:1px;' +
' text-decoration:none;' +
' text-overflow:ellipsis;' +
' white-space:nowrap;' +
' width:auto;' +
' text-shadow:0px 1px 1px rgba(255,255,255,0.1),0px -1px 1px rgba(0,0,0,0.4);' +
' border:1px solid #517191;' +
' -moz-box-shadow:"0px 1px 1px rgba(255,255,255,.6), 0px -1px 1px rgba(0,0,0,.1) ";' +
' -webkit-box-shadow:"0px 1px 1px rgba(255,255,255,.6), 0px -1px 1px rgba(0,0,0,.1) ";' +
' box-shadow:"0px 1px 1px rgba(255,255,255,.6), 0px -1px 1px rgba(0,0,0,.1) "' +
'}' +
'.small_button:active,' +
'.small_button[selected],' +
'.small_button.active {' +
' background:url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzdlODk5NCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzgwYTJjNCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==\');' +
' background:-webkit-gradient(linear,50% 0%,50% 100%,color-stop(0%,#7e8994),color-stop(100%,#80a2c4));' +
' background:-moz-linear-gradient(top,#7e8994,#80a2c4);' +
' background:-webkit-linear-gradient(top,#7e8994,#80a2c4);' +
' background:linear-gradient(to bottom,#7e8994,#80a2c4);' +
' background-color:#7f96ac' +
'}' +
'.group_button {' +
' -moz-border-radius:0;' +
' -webkit-border-radius:0;' +
' border-radius:0;' +
' border-left:1px solid #a6bed9;' +
' border-right:1px solid #445d79' +
'}' +
'.group_button:first-child {' +
' -moz-border-radius-topleft:6px;' +
' -moz-border-radius-bottomleft:6px;' +
' border-top-left-radius:6px;' +
' border-bottom-left-radius:6px;' +
' -webkit-border-top-left-radius:6px;' +
' -webkit-border-bottom-left-radius:6px;' +
' border-left:1px solid #517090' +
'}' +
'.group_button:last-child {' +
' -webkit-border-top-left-radius:0px;' +
' -moz-border-radius-topleft:0px;' +
' -webkit-border-bottom-left-radius:0px;' +
' -moz-border-radius-bottomleft:0px;' +
' -webkit-border-top-right-radius:6px;' +
' -moz-border-radius-topright:6px;' +
' -webkit-border-bottom-right-radius:6px;' +
' -moz-border-radius-bottomright:6px;' +
' border-right:1px solid #517090' +
'}' +
'.options_link {' +
' font-size:x-small;' +
' clear:left;' +
' margin:2px 0px 0px 10px;' +
' display:inline-block;' +
' width:30px;' +
' height:30px;' +
' position:absolute;' +
' top:35px;' +
' right:10px;' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -396px;' +
' background-repeat:no-repeat' +
'}' +
'.options_link.active {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -360px;' +
' background-repeat:no-repeat' +
'}' +
'.comment .options_link {' +
' top:10px' +
'}' +
'.link .options_expando,' +
'.comment .options_expando,' +
'.message .options_expando {' +
' background:#213345;' +
' margin:35px -5px -1px;' +
' border-top:1px solid #111a22;' +
' display:none;' +
' -moz-box-shadow:inset 0px 3px 8px rgba(0,0,0,0.8);' +
' -webkit-box-shadow:inset 0px 3px 8px rgba(0,0,0,0.8);' +
' box-shadow:inset 0px 3px 8px rgba(0,0,0,0.8);' +
' text-shadow:0px -1px 0px rgba(0,0,0,0.8);' +
' text-align:center;' +
' height:60px;' +
' overflow:hidden' +
'}' +
'.link .options_expando a,' +
'.comment .options_expando a,' +
'.message .options_expando a {' +
' display:inline-block;' +
' color:white;' +
' text-decoration:none;' +
' font-size:11px;' +
' padding:10px;' +
' width:50px;' +
' height:40px;' +
' text-align:center;' +
' border-right:1px solid #111a22;' +
' border-left:1px solid #324d67;' +
' -moz-transition:all 100ms ease-in;' +
' -o-transition:all 100ms ease-in;' +
' -webkit-transition:all 100ms ease-in;' +
' transition:all 100ms ease-in' +
'}' +
'.link .options_expando a:active,' +
'.comment .options_expando a:active,' +
'.message .options_expando a:active {' +
' background-color:#324d67;' +
' border-left:1px solid #42668a' +
'}' +
'.link .options_expando a:hover,' +
'.comment .options_expando a:hover,' +
'.message .options_expando a:hover {' +
' background-color:#263340;' +
' -moz-box-shadow:inset 0px 3px 8px rgba(0,0,0,0.8);' +
' -webkit-box-shadow:inset 0px 3px 8px rgba(0,0,0,0.8);' +
' box-shadow:inset 0px 3px 8px rgba(0,0,0,0.8);' +
' border-left:1px solid #42668a' +
'}' +
'.link .options_expando a:first-child,' +
'.comment .options_expando a:first-child,' +
'.message .options_expando a:first-child {' +
' border-left:none' +
'}' +
'.link .options_expando a:last-child,' +
'.comment .options_expando a:last-child,' +
'.message .options_expando a:last-child {' +
' border-right:none' +
'}' +
'.link .options_expando.expanded,' +
'.comment .options_expando.expanded,' +
'.message .options_expando.expanded {' +
' display:block' +
'}' +
'.comment .entry,' +
'.message .entry {' +
' margin-right:50px' +
'}' +
'.comment .child .options_link,' +
'.message .child .options_link {' +
' top:8px' +
'}' +
'.comment .options_expando,' +
'.message .options_expando {' +
' margin:10px -50px 10px 0px' +
'}' +
'.message .options_expando {' +
' margin:25px -55px 10px -5px' +
'}' +
'.options_icons,' +
'.email-icon,' +
'.report-icon,' +
'.save-icon,' +
'.unsave-icon,' +
'.domain-icon,' +
'.edit-icon,' +
'.reply-icon,' +
'.permalink-icon,' +
'.collapse-icon,' +
'.context-icon,' +
'.parent-icon,' +
'.unread-icon,' +
'.hide-icon,' +
'.unhide-icon {' +
' display:block;' +
' width:24px;' +
' height:24px;' +
' margin-left:auto;' +
' margin-right:auto;' +
' margin-bottom:5px' +
'}' +
'.email-icon {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -760px;' +
' background-repeat:no-repeat' +
'}' +
'.report-icon {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -880px;' +
' background-repeat:no-repeat' +
'}' +
'.save-icon {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -910px;' +
' background-repeat:no-repeat' +
'}' +
'.unsave-icon {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -1000px;' +
' background-repeat:no-repeat' +
'}' +
'.domain-icon {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -700px;' +
' background-repeat:no-repeat' +
'}' +
'.edit-icon {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -730px;' +
' background-repeat:no-repeat' +
'}' +
'.reply-icon {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -850px;' +
' background-repeat:no-repeat' +
'}' +
'.permalink-icon {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -820px;' +
' background-repeat:no-repeat' +
'}' +
'.collapse-icon {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -640px;' +
' background-repeat:no-repeat' +
'}' +
'.context-icon {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -670px;' +
' background-repeat:no-repeat' +
'}' +
'.parent-icon {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -670px;' +
' background-repeat:no-repeat' +
'}' +
'.unread-icon {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -970px;' +
' background-repeat:no-repeat' +
'}' +
'.hide-icon {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -790px;' +
' background-repeat:no-repeat' +
'}' +
'.unhide-icon {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -940px;' +
' background-repeat:no-repeat' +
'}' +
'#topbar {' +
' background:url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2NlZTNmOCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2E4YzRlMCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==\');' +
' background:-webkit-gradient(linear,50% 0%,50% 100%,color-stop(0%,#cee3f8),color-stop(100%,#a8c4e0));' +
' background:-moz-linear-gradient(top,#cee3f8,#a8c4e0);' +
' background:-webkit-linear-gradient(top,#cee3f8,#a8c4e0);' +
' background:linear-gradient(to bottom,#cee3f8,#a8c4e0);' +
' background-color:#bbd4ec;' +
' border-bottom:1px solid #7599BD;' +
' border-top:1px solid #DCEAF7;' +
' -moz-box-sizing:border-box;' +
' -webkit-box-sizing:border-box;' +
' box-sizing:border-box;' +
' padding:0px 10px;' +
' height:40px;' +
' position:relative' +
'}' +
'#topbar #header-img {' +
' height:32px;' +
' width:auto' +
'}' +
'#topbar .left {' +
' position:absolute;' +
' left:-10px;' +
' bottom:3px;' +
' overflow:hidden;' +
' max-height:40px;' +
' z-index:1' +
'}' +
'#topbar .right {' +
' position:absolute;' +
' right:10px;' +
' bottom:-3px;' +
' z-index:3' +
'}' +
'#topbar>h1 {' +
' color:#444;' +
' font-size:18px;' +
' font-weight:bold;' +
' text-align:center;' +
' text-overflow:ellipsis;' +
' white-space:nowrap;' +
' overflow:hidden;' +
' margin:0 10px;' +
' padding:0;' +
' padding-top:16px;' +
' text-shadow:rgba(255,255,255,0.5) 0px 1px 0px,rgba(0,0,0,0.1) 0px -1px 0px;' +
' -webkit-box-flex:1;' +
' -moz-box-flex:1;' +
' -ms-box-flex:1;' +
' box-flex:1' +
'}' +
'#topbar>h1 a {' +
' position:relative;' +
' color:inherit;' +
' text-decoration:inherit;' +
' z-index:2' +
'}' +
'body[orient="landscape"]>#topbar>h1 {' +
' margin-left:-125px;' +
' width:250px' +
'}' +
'#topbar>.right>.button {' +
' padding-top:8px;' +
' padding-bottom:3px' +
'}' +
'#topbar>.right>.button:first-child {' +
' margin-right:5px' +
'}' +
'#topbar>.right>#mail {' +
' width:30px;' +
' height:30px;' +
' display:inline-block' +
'}' +
'#topbar>.right>#mail.nohavemail {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -324px;' +
' background-repeat:no-repeat' +
'}' +
'#topbar>.right>#mail.nohavemail:active,' +
'#topbar>.right>#mail.nohavemail:hover {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -288px;' +
' background-repeat:no-repeat' +
'}' +
'#topbar>.right>#mail.havemail {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -36px;' +
' background-repeat:no-repeat' +
'}' +
'#topbar>.right>#mail.havemail:active,' +
'#topbar>.right>#mail.havemail:hover {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -0px;' +
' background-repeat:no-repeat' +
'}' +
'#topbar>.right>#modmail {' +
' width:30px;' +
' height:30px;' +
' display:inline-block' +
'}' +
'#topbar>.right>#modmail.nohavemail {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -180px;' +
' background-repeat:no-repeat' +
'}' +
'#topbar>.right>#modmail.nohavemail:active,' +
'#topbar>.right>#modmail.nohavemail:hover {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -144px;' +
' background-repeat:no-repeat' +
'}' +
'#topbar>.right>#modmail.havemail {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -252px;' +
' background-repeat:no-repeat' +
'}' +
'#topbar>.right>#modmail.havemail:active,' +
'#topbar>.right>#modmail.havemail:hover {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -216px;' +
' background-repeat:no-repeat' +
'}' +
'.topbar-options {' +
' width:30px;' +
' height:30px;' +
' display:inline-block;' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -108px;' +
' background-repeat:no-repeat' +
'}' +
'.topbar-options.active,' +
'.topbar-options:hover,' +
'.topbar-options:active {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -72px;' +
' background-repeat:no-repeat' +
'}' +
'#top_menu {' +
' position:absolute;' +
' right:5px;' +
' top:44px;' +
' background-color:white;' +
' border:1px solid rgba(27,47,94,0.4);' +
' border-top:0px;' +
' -webkit-border-bottom-left-radius:10px;' +
' -moz-border-radius-bottomleft:10px;' +
' -webkit-border-bottom-right-radius:10px;' +
' -moz-border-radius-bottomright:10px;' +
' border-bottom-left-radius:10px;' +
' border-bottom-right-radius:10px;' +
' -moz-box-shadow:0px 0px 8px rgba(0,0,0,0.3);' +
' -webkit-box-shadow:0px 0px 8px rgba(0,0,0,0.3);' +
' box-shadow:0px 0px 8px rgba(0,0,0,0.3);' +
' z-index:5;' +
' display:none' +
'}' +
'#top_menu>.menuitem {' +
' padding:5px' +
'}' +
'#top_menu>.menuitem.bottm-bar {' +
' border-bottom:1px solid rgba(27,47,94,0.4)' +
'}' +
'#top_menu>.menuitem a {' +
' text-decoration:none;' +
' color:#222;' +
' font-weight:bold' +
'}' +
'.status {' +
' color:red;' +
' margin-left:20px' +
'}' +
'.subtoolbar {' +
' -moz-box-sizing:border-box;' +
' -webkit-box-sizing:border-box;' +
' box-sizing:border-box;' +
' height:32px;' +
' background:url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2NjY2NjYyIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==\');' +
' background:-webkit-gradient(linear,50% 0%,50% 100%,color-stop(0%,#ffffff),color-stop(100%,#cccccc));' +
' background:-moz-linear-gradient(top,#ffffff,#cccccc);' +
' background:-webkit-linear-gradient(top,#ffffff,#cccccc);' +
' background:linear-gradient(to bottom,#ffffff,#cccccc);' +
' background-color:#e6e6e6;' +
' border-bottom:1px solid #bbb;' +
' padding:6px;' +
' text-overflow:ellipsis;' +
' overflow:hidden' +
'}' +
'.subtoolbar>ul {' +
' list-style-type:none;' +
' margin:0;' +
' padding:0' +
'}' +
'.subtoolbar>ul>li {' +
' display:inline-block;' +
' text-overflow:ellipsis;' +
' overflow:hidden' +
'}' +
'.subtoolbar>ul>li a {' +
' color:#4c566c;' +
' font-weight:bold;' +
' text-decoration:none;' +
' font-size:12px;' +
' line-height:20px;' +
' margin:0;' +
' padding:3px 10px;' +
' text-overflow:ellipsis;' +
' overflow:hidden' +
'}' +
'.subtoolbar>ul>li.selected a {' +
' background:url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2RkZGRkZCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2FhYWFhYSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==\');' +
' background:-webkit-gradient(linear,50% 0%,50% 100%,color-stop(0%,#dddddd),color-stop(100%,#aaaaaa));' +
' background:-moz-linear-gradient(top,#dddddd,#aaaaaa);' +
' background:-webkit-linear-gradient(top,#dddddd,#aaaaaa);' +
' background:linear-gradient(to bottom,#dddddd,#aaaaaa);' +
' background-color:#c4c4c4;' +
' -moz-border-radius:8px;' +
' -webkit-border-radius:8px;' +
' border-radius:8px;' +
' border:1px solid #aaa;' +
' padding-top:2px;' +
' padding-bottom:1px;' +
' -moz-box-shadow:0px 1px 1px rgba(255,255,255,0.8);' +
' -webkit-box-shadow:0px 1px 1px rgba(255,255,255,0.8);' +
' box-shadow:0px 1px 1px rgba(255,255,255,0.8)' +
'}' +
'.link .arrow,' +
'.comment .arrow,' +
'.message .arrow {' +
' width:28px;' +
' height:28px;' +
' cursor:pointer;' +
' display:block;' +
' margin:1px auto 0px;' +
' outline:none' +
'}' +
'.link .arrow.up,' +
'.comment .arrow.up,' +
'.message .arrow.up {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -606px;' +
' background-repeat:no-repeat' +
'}' +
'.link .arrow.down,' +
'.comment .arrow.down,' +
'.message .arrow.down {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -538px;' +
' background-repeat:no-repeat' +
'}' +
'.link .arrow.upmod,' +
'.comment .arrow.upmod,' +
'.message .arrow.upmod {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -572px;' +
' background-repeat:no-repeat' +
'}' +
'.link .arrow.downmod,' +
'.comment .arrow.downmod,' +
'.message .arrow.downmod {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -504px;' +
' background-repeat:no-repeat' +
'}' +
'.link {' +
' min-height:70px;' +
' border-bottom:1px solid #999 !important;' +
' border-top:1px solid #ddd !important;' +
' padding:5px 5px !important;' +
' padding-bottom:0px;' +
' -moz-box-sizing:border-box;' +
' -webkit-box-sizing:border-box;' +
' box-sizing:border-box;' +
' background:rgba(255,255,255,0.6);' +
' position:relative;' +
' overflow:hidden' +
'}' +
'.link:first-child {' +
' border-top:none' +
'}' +
'.link.odd, .search-result:nth-of-type(2n+1) {' +
' background:rgba(206,227,248,0.5)' +
'}' +
'.link>.rank {' +
' float:left;' +
' margin-top:17px;' +
' font-size:12px;' +
' color:#aaa' +
'}' +
'.link>.midcol {' +
' float:left;' +
' width:25px;' +
' margin:0 10px 1px 0px;' +
' padding-bottom:5px;' +
' position:relative' +
'}' +
'.link>.entry .score,' +
'.link>.entry.likes .score.unvoted,' +
'.link>.entry.dislikes .score.unvoted {' +
' display:none' +
'}' +
'.link>.entry .score.unvoted,' +
'.link>.entry.likes .score.likes,' +
'.link>.entry.dislikes .score.dislikes {' +
' display:inline;' +
' font-weight:bold' +
'}' +
'.link>.entry.likes .score.likes {' +
' color:#E07A7A' +
'}' +
'.link>.entry.dislikes .score.dislikes {' +
' color:#7272D1' +
'}' +
'.link .rank {' +
' display:none' +
'}' +
'.link .modcol {' +
' float:left' +
'}' +
'.comment {' +
' position:relative' +
'}' +
'.comment>.entry>.tagline .score {' +
' display:none' +
'}' +
'.comment>.entry.unvoted>.tagline .score.unvoted,' +
'.comment>.entry.likes>.tagline .score.likes,' +
'.comment>.entry.dislikes>.tagline .score.dislikes {' +
' display:inline' +
'}' +
'.link>.midcol.likes>.score {' +
' color:#E07A7A' +
'}' +
'.link>.midcol.dislikes>.score {' +
' color:#7272D1' +
'}' +
'.link .thumbnail {' +
' float:right;' +
' margin:0 0 5px 5px;' +
' overflow:hidden;' +
' max-height:50px' +
' max-width: 100px;' +
' width: unset !important;' +
'}' +
'.link .thumbnail img {' +
' max-width:50px;' +
' max-height:50px' +
'}' +
'.link .entry {' +
' margin:0px 50px 3px 0px' +
'}' +
'.link a {' +
' text-decoration:none;' +
' color:#517191;' +
' color:#369' +
'}' +
'.link p.title {' +
' margin:0;' +
' padding:0;' +
' text-overflow:ellipsis;' +
' word-wrap:break-word;' +
' font-size:.8em;' +
' font-weight:bold' +
'}' +
'.link p.title>a {' +
' text-overflow:ellipsis;' +
' overflow:hidden;' +
' color:#25A' +
'}' +
'.link.stickied p.title>a {' +
' color:#228822' +
'}' +
'.link .domain {' +
' color:#737373;' +
' font-size:9px;' +
' margin-left:5px' +
'}' +
'.link .domain a,' +
'.link .domain a:hover {' +
' color:inherit' +
'}' +
'.link .tagline {' +
' margin:2px 0 5px;' +
' padding:0;' +
' padding-top:2px;' +
' font-size:10px;' +
' color:#333' +
'}' +
'.link .tagline>span {' +
' margin-right:2px' +
'}' +
'.link .tagline a {' +
' font-weight:bold' +
'}' +
'.link .tagline .stickied-tagline {' +
' color:#228822' +
'}' +
'.link .expando-button {' +
' float:left;' +
' display:block;' +
' height:auto;' +
' line-height:inherit;' +
' margin:3px 10px 2px 0;' +
' width:30px;' +
' height:30px;' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png) !important;' +
' background-position:-0px -468px !important;' +
' background-repeat:no-repeat !important;' +
' background-size: unset !important' +
'}' +
'.link .expando-button.expanded {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -432px !important;' +
' background-repeat:no-repeat;' +
' background-size: unset !important' +
'}' +
'.link>.expando {' +
' clear:both;' +
' margin:5px 0;' +
' margin-bottom:30px;' +
' border:1px solid #999;' +
' background:#ddd;' +
' padding:5px;' +
' -moz-border-radius:8px;' +
' -webkit-border-radius:8px;' +
' border-radius:8px;' +
' font-size:11px' +
'}' +
'.link>.thing_options {' +
' font-size:x-small;' +
' margin:none;' +
' display:block;' +
' float:left;' +
' clear:left;' +
' margin:2px 0px 0px 10px' +
'}' +
'.nsfw-warning,' +
'.quarantine-warning {' +
' -moz-border-radius:3px;' +
' -webkit-border-radius:3px;' +
' border-radius:3px;' +
' color:#ac3939;' +
' text-decoration:none;' +
' font-weight:normal;' +
' font-size:9px;' +
' margin-left:5px;' +
' padding:0 2px;' +
' border:1px solid #d27979!important' +
'}' +
'.spoiler-warning {' +
' -moz-border-radius:3px;' +
' -webkit-border-radius:3px;' +
' border-radius:3px;' +
' color:#222;' +
' text-decoration:none;' +
' font-weight:normal;' +
' font-size:9px;' +
' margin-left:5px;' +
' padding:0 2px;' +
' border:1px solid #222!important' +
'}' +
'.commentcount {' +
' float:right;' +
' margin:5px;' +
' width:45px;' +
' text-align:right' +
'}' +
'.commentcount>.comments {' +
' border:8px solid transparent;' +
' -moz-border-image:url("https://www.redditstatic.com/compact/border-button.png") 8 fill;' +
' -o-border-image:url("https://www.redditstatic.com/compact/border-button.png") 8 fill;' +
' -webkit-border-image:url("https://www.redditstatic.com/compact/border-button.png") 8 fill;' +
' border-image:url("https://www.redditstatic.com/compact/border-button.png") 8 fill;' +
' color:white;' +
' font-family:inherit;' +
' font-size:12px;' +
' font-weight:bold;' +
' text-decoration:none;' +
' text-shadow:0px 1px 1px rgba(255,255,255,0.1),0px -1px 1px rgba(0,0,0,0.4)' +
'}' +
'.commentcount>.comments:active,' +
'.commentcount>.comments:hover,' +
'.commentcount>.comments[selected],' +
'.commentcount>.comments.preloaded {' +
' -moz-border-image:url("https://www.redditstatic.com/compact/border-button-active.png") 8 fill;' +
' -o-border-image:url("https://www.redditstatic.com/compact/border-button-active.png") 8 fill;' +
' -webkit-border-image:url("https://www.redditstatic.com/compact/border-button-active.png") 8 fill;' +
' border-image:url("https://www.redditstatic.com/compact/border-button-active.png") 8 fill' +
'}' +
'.commentarea>h1 {' +
' color:#4c566c;' +
' font-size:17px;' +
' margin:10px 10px 5px;' +
' border-bottom:1px solid rgba(0,0,0,0.2);' +
' -moz-box-shadow:0px 1px 1px rgba(255,255,255,0.4);' +
' -webkit-box-shadow:0px 1px 1px rgba(255,255,255,0.4);' +
' box-shadow:0px 1px 1px rgba(255,255,255,0.4)' +
'}' +
'.commentarea>.menuarea {' +
' display:none' +
'}' +
'.commentarea>.main-form-title {' +
' color:#4c566c;' +
' font-size:17px;' +
' font-weight:bold;' +
' margin:0 10px' +
'}' +
'.commentarea>.usertext {' +
' background:white;' +
' margin:0 10px 5px;' +
' border:1px solid #d9d9d9;' +
' -moz-border-radius:8px;' +
' -webkit-border-radius:8px;' +
' border-radius:8px' +
'}' +
'.commentarea>.usertext textarea {' +
' margin:0;' +
' padding:5px;' +
' width:100%;' +
' height:100px;' +
' border:none;' +
' -moz-box-sizing:border-box;' +
' -webkit-box-sizing:border-box;' +
' box-sizing:border-box;' +
' -moz-border-radius:8px;' +
' -webkit-border-radius:8px;' +
' border-radius:8px;' +
' border-bottom:1px solid #d9d9d9' +
'}' +
'.cancel,' +
'.save {' +
' float:right;' +
' padding:0 5px!important' +
'}' +
'.save {' +
' margin-left:5px' +
'}' +
'.error {' +
' color:red' +
'}' +
'.content>.error {' +
' color:rgba(255,255,255,0.9);' +
' font-size:25px;' +
' margin:10px;' +
' text-align:center;' +
' text-shadow:rgba(0,0,0,0.15) 0px -1px 0px' +
'}' +
'.help-toggle {' +
' float:left;' +
' margin-top:3px' +
'}' +
'.bottom-area {' +
' padding:5px' +
'}' +
'.markhelp-parent {' +
' display:none' +
'}' +
'.markhelp {' +
' width:100%;' +
' border-collapse:collapse' +
'}' +
'.markhelp th {' +
' background:#d9d9d9' +
'}' +
'.markhelp th:first-child {' +
' -webkit-border-top-left-radius:8px;' +
' -moz-border-radius-topleft:8px;' +
' border-top-left-radius:8px' +
'}' +
'.markhelp th:last-child {' +
' -webkit-border-top-right-radius:8px;' +
' -moz-border-radius-topright:8px;' +
' border-top-right-radius:8px' +
'}' +
'.markhelp tr:nth-child(odd) td {' +
' background:rgba(0,0,100,0.1)' +
'}' +
'.markhelp td {' +
' border:1px solid #d9d9d9;' +
' padding:5px' +
'}' +
'.markhelp tr:last-child td:first-child {' +
' -webkit-border-bottom-left-radius:8px;' +
' -moz-border-radius-bottomleft:8px;' +
' border-bottom-left-radius:8px' +
'}' +
'.markhelp tr:last-child td:last-child {' +
' -webkit-border-bottom-right-radius:8px;' +
' -moz-border-radius-bottomright:8px;' +
' border-bottom-right-radius:8px' +
'}' +
'.usertext textarea {' +
' margin:0;' +
' padding:5px;' +
' border:1px solid #d9d9d9;' +
' width:100%;' +
' min-height:100px;' +
' -moz-border-radius:5px;' +
' -webkit-border-radius:5px;' +
' border-radius:5px;' +
' -moz-box-sizing:border-box;' +
' -webkit-box-sizing:border-box;' +
' box-sizing:border-box' +
'}' +
'.child form.usertext.cloneable {' +
' margin:5px' +
'}' +
'.comment {' +
' background:white;' +
' border:1px solid #d9d9d9;' +
' margin:10px;' +
' -moz-border-radius:8px;' +
' -webkit-border-radius:8px;' +
' border-radius:8px' +
'}' +
'.comment>.midcol {' +
' float:left;' +
' margin:7px;' +
' overflow:hidden' +
'}' +
'.comment>.entry>.tagline {' +
' font-size:11px;' +
' padding-bottom:2px' +
'}' +
'.comment>.admin_takedown {' +
' background-color:#F7F7F7;' +
' color:#888888' +
'}' +
'.comment>.admin_takedown a:link {' +
' color:#326699' +
'}' +
'.child .comment {' +
' margin:4px;' +
' margin-top:0px;' +
' -webkit-border-top-right-radius:0px;' +
' -moz-border-radius-topright:0px' +
'}' +
'.comment.collapsed .child,' +
'.comment.collapsed .usertext,' +
'.comment.collapsed .midcol,' +
'.comment.collapsed .button,' +
'.comment.collapsed .options_link,' +
'.comment.collapsed .options_expando {' +
' display:none' +
'}' +
'.comment.collapsed {' +
' font-style:italcs' +
'}' +
'.comment.collapsed .tagline {' +
' margin-left:20px;' +
' font-style:italcs;' +
' color:#AAA' +
'}' +
'.gilded-gid1-icon,' +
'.gilded-gid2-icon,' +
'.gilded-gid3-icon {' +
' position:relative;' +
' display:inline-block;' +
' margin:0 0 -15px 8px;' +
' top:-8px;' +
' color:#99895F;' +
' font-size:.9em;' +
' vertical-align:middle' +
'}' +
'.gilded-gid1-icon:before,' +
'.gilded-gid2-icon:before,' +
'.gilded-gid3-icon:before {' +
' display:inline-block;' +
' content:\'\';' +
' background-repeat:no-repeat;' +
' height:12px;' +
' width:12px;' +
' margin-right:2px;' +
' vertical-align:-3px' +
'}' +
'.gilded-gid1-icon:before {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -1138px;' +
' background-repeat:no-repeat' +
'}' +
'@media only screen and (min-resolution:2dppx),only screen and (-webkit-min-device-pixel-ratio:2) {' +
' .gilded-gid1-icon:before {' +
'  background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
'  background-position:-0px -545px;' +
'  background-repeat:no-repeat;' +
'  background-size:15px 578px' +
' }' +
'}' +
'.gilded-gid2-icon:before {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-0px -1120px;' +
' background-repeat:no-repeat' +
'}' +
'@media only screen and (min-resolution:2dppx),only screen and (-webkit-min-device-pixel-ratio:2) {' +
' .gilded-gid2-icon:before {' +
'  background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
'  background-position:-0px -515px;' +
'  background-repeat:no-repeat;' +
'  background-size:15px 578px' +
' }' +
'}' +
'.gilded-gid3-icon:before {' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-18px -1120px;' +
' background-repeat:no-repeat' +
'}' +
'@media only screen and (min-resolution:2dppx),only screen and (-webkit-min-device-pixel-ratio:2) {' +
' .gilded-gid3-icon:before {' +
'  background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
'  background-position:-0px -530px;' +
'  background-repeat:no-repeat;' +
'  background-size:15px 578px' +
' }' +
'}' +
'.awardings-bar {' +
' margin-left:4px' +
'}' +
'.awardings-bar:empty {' +
' margin:0' +
'}' +
'.awarding-link {' +
' margin-right:4px' +
'}' +
'.awarding-link.hide-award {' +
' display:none' +
'}' +
'.awarding-icon-container {' +
' display:inline-block;' +
' height:12px;' +
' width:12px;' +
' margin-right:2px' +
'}' +
'.awarding-icon {' +
' max-width:12px;' +
' max-height:12px;' +
' vertical-align:-2px' +
'}' +
'.message {' +
' background:white;' +
' position:relative;' +
' border:1px solid #d9d9d9;' +
' margin:10px;' +
' -moz-border-radius:8px;' +
' -webkit-border-radius:8px;' +
' border-radius:8px;' +
' padding:5px' +
'}' +
'.message>.midcol {' +
' float:left;' +
' margin:10px;' +
' overflow:hidden' +
'}' +
'.message.unread {' +
' background-color:#FFFFAA' +
'}' +
'.message .correspondent {' +
' background:url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2NlZTNmOCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzllYmVkYyIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==\');' +
' background:-webkit-gradient(linear,50% 0%,50% 100%,color-stop(0%,#cee3f8),color-stop(100%,#9ebedc));' +
' background:-moz-linear-gradient(top,#cee3f8,#9ebedc);' +
' background:-webkit-linear-gradient(top,#cee3f8,#9ebedc);' +
' background:linear-gradient(to bottom,#cee3f8,#9ebedc);' +
' background-color:#b6d1ea;' +
' margin-right:10px;' +
' padding:2px 5px;' +
' -moz-border-radius:15px;' +
' -webkit-border-radius:15px;' +
' border-radius:15px' +
'}' +
'.message .correspondent a {' +
' text-decoration:none' +
'}' +
'.message .message .subject {' +
' display:none' +
'}' +
'.message>.entry>.tagline {' +
' font-size:11px;' +
' padding-bottom:2px;' +
' margin-bottom:2px' +
'}' +
'.message>.entry .usertext-body,' +
'.message>.entry .md {' +
' font-size:11px;' +
' word-wrap:break-word' +
'}' +
'.message>.metabuttons {' +
' float:right;' +
' margin:10px' +
'}' +
'.message .subject {' +
' font-weight:bold;' +
' font-size:13px;' +
' border-bottom:1px solid #d9d9d9;' +
' padding:5px;' +
' overflow:hidden' +
'}' +
'.message .subject a {' +
' margin-left:5px' +
'}' +
'.message .subject .correspondent a {' +
' margin-left:0' +
'}' +
'.link .subreddit {' +
' background-color:transparent;' +
' margin:0px' +
'}' +
'.subreddit {' +
' background-color:white;' +
' -moz-border-radius:5px;' +
' -webkit-border-radius:5px;' +
' border-radius:5px;' +
' margin:5px' +
'}' +
'.subreddit p.title {' +
' display:block;' +
' margin-left:35px;' +
' margin-right:30px' +
'}' +
'.subreddit a.title {' +
' display:block;' +
' margin:0;' +
' padding:0;' +
' text-overflow:ellipsis;' +
' word-wrap:break-word;' +
' font-size:small;' +
' font-weight:bold;' +
' text-overflow:ellipsis;' +
' overflow:hidden;' +
' color:#25A;' +
' text-decoration:none' +
'}' +
'.subreddit .title a.domain {' +
' font-size:x-small;' +
' color:#AAA;' +
' font-style:italic;' +
' display:block' +
'}' +
'.subreddit .tagline {' +
' font-size:x-small;' +
' color:#666' +
'}' +
'.subreddit .button.active {' +
' background:url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2JmZDBlMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzgwYTJjNCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==\');' +
' background:-webkit-gradient(linear,50% 0%,50% 100%,color-stop(0%,#bfd0e0),color-stop(100%,#80a2c4));' +
' background:-moz-linear-gradient(top,#bfd0e0,#80a2c4);' +
' background:-webkit-linear-gradient(top,#bfd0e0,#80a2c4);' +
' background:linear-gradient(to bottom,#bfd0e0,#80a2c4);' +
' background-color:#a0b9d2' +
'}' +
'.subreddit>.entry .score,' +
'.subreddit>.entry.likes .score.unvoted,' +
'.subreddit>.entry.dislikes .score.unvoted {' +
' display:none' +
'}' +
'.subreddit>.entry .score.unvoted,' +
'.subreddit>.entry.likes .score.likes,' +
'.subreddit>.entry.dislikes .score.dislikes {' +
' display:inline' +
'}' +
'.subreddit .midcol .button.add,' +
'.subreddit .midcol .button.remove {' +
' font-family:courier;' +
' font-size:small' +
'}' +
'.subreddit .midcol {' +
' float:left' +
'}' +
'.subreddit .midcol .button {' +
' display:none;' +
' margin:4px' +
'}' +
'.subreddit .midcol .button.active {' +
' display:block;' +
' width:auto;' +
' height:auto;' +
' padding:0px 9px' +
'}' +
'.subreddit .expando-button {' +
' float:right;' +
' height:100%' +
'}' +
'.subreddit .description {' +
' border-top:1px solid #AAA;' +
' margin-top:2px;' +
' padding-top:2px;' +
' margin-left:0px;' +
' padding-left:10px' +
'}' +
'#compose-message {' +
' background:white;' +
' border:1px solid #d9d9d9;' +
' border-top:0px;' +
' margin:10px;' +
' margin-top:0;' +
' padding:10px;' +
' -webkit-border-bottom-left-radius:8px;' +
' -webkit-border-bottom-right-radius:8px;' +
' -moz-border-radius-bottomleft:8px;' +
' -moz-border-radius-bottomright:8px' +
'}' +
'#compose-message label {' +
' display:block;' +
' font-size:17px;' +
' font-weight:bold' +
'}' +
'#compose-message input[type="text"] {' +
' -moz-box-sizing:border-box;' +
' -webkit-box-sizing:border-box;' +
' box-sizing:border-box;' +
' border:1px solid #757575;' +
' -moz-border-radius:5px;' +
' -webkit-border-radius:5px;' +
' border-radius:5px;' +
' margin-bottom:5px;' +
' padding:5px;' +
' width:100%' +
'}' +
'#compose-message textarea {' +
' border-color:#757575;' +
' height:200px' +
'}' +
'.comment>.entry .usertext-body {' +
' font-size:11px;' +
' word-wrap:break-word' +
'}' +
'.comment>.entry .usertext-edit {' +
' margin-left:42px' +
'}' +
'.comment>.metabuttons {' +
' float:right;' +
' margin:10px' +
'}' +
'.child .comment {' +
' margin-right:-1px' +
'}' +
'.child .comment:last-child {' +
' margin-bottom:2px' +
'}' +
'.comment>.morecomments {' +
' margin:5px;' +
' text-align:right' +
'}' +
'.tagline .submitter {' +
' color:blue' +
'}' +
'.tagline .friend {' +
' color:orange' +
'}' +
'.tagline .moderator {' +
' color:#282' +
'}' +
'.tagline .admin {' +
' color:#F01' +
'}' +
'.tagline .userattrs .cakeday {' +
' display:inline-block;' +
' text-indent:-9999px;' +
' width:11px;' +
' height:8px;' +
' background-image:url(https://www.redditstatic.com/sprite-compact.fDSukJPD218.png);' +
' background-position:-18px -1138px;' +
' background-repeat:no-repeat;' +
' vertical-align:middle' +
'}' +
'@-webkit-keyframes rotateThis {' +
' from {' +
'  -webkit-transform:scale(0.75) rotate(0deg)' +
' }' +
' to {' +
'  -webkit-transform:scale(0.75) rotate(360deg)' +
' }' +
'}' +
'.loading {' +
' width:100%;' +
' background-color:white;' +
' text-align:center' +
'}' +
'.loading img {' +
' -webkit-animation-name:rotateThis;' +
' -webkit-animation-duration:.5s;' +
' -webkit-animation-iteration-count:infinite;' +
' -webkit-animation-timing-function:linear' +
'}' +
'.throbber {' +
' display:none;' +
' margin:0 2px;' +
' background:url("https://www.redditstatic.com/compact/throbber.gif") no-repeat;' +
' width:18px;' +
' height:18px' +
'}' +
'.working .throbber {' +
' display:inline-block' +
'}' +
'#login_login,' +
'#login_reg {' +
' background:white;' +
' border:1px solid #d9d9d9;' +
' margin:10px;' +
' -webkit-border-bottom-left-radius:8px;' +
' -webkit-border-bottom-right-radius:8px;' +
' -moz-border-radius-bottomleft:8px;' +
' -moz-border-radius-bottomright:8px;' +
' max-width:350px;' +
' margin-left:auto;' +
' margin-right:auto' +
'}' +
'#login_login>div,' +
'#login_reg>div {' +
' padding:10px' +
'}' +
'#login_login>div>ul,' +
'#login_reg>div>ul {' +
' list-style-type:none;' +
' padding:0;' +
' margin:0 0 10px' +
'}' +
'#login_login>div>ul li label,' +
'#login_reg>div>ul li label {' +
' display:block;' +
' font-size:17px;' +
' font-weight:bold' +
'}' +
'#login_login input[type="text"],' +
'#login_login input[type="password"],' +
'#login_reg input[type="text"],' +
'#login_reg input[type="password"] {' +
' width:100%;' +
' margin:0 0 5px;' +
' -moz-border-radius:5px;' +
' -webkit-border-radius:5px;' +
' border-radius:5px;' +
' border:1px solid #757575;' +
' font-size:17px;' +
' padding:5px;' +
' -moz-box-sizing:border-box;' +
' -webkit-box-sizing:border-box;' +
' box-sizing:border-box' +
'}' +
'#login_login>div>ul li input[type="checkbox"]+label,' +
'#login_reg>div>ul li input[type="checkbox"]+label {' +
' display:inline' +
'}' +
'.user-form .submit * {' +
' vertical-align:middle' +
'}' +
'.tfa-login-modal {' +
' background:white;' +
' max-width:350px;' +
' margin:10px auto' +
'}' +
'.tfa-login-modal .modal-header-title {' +
' font-size:18px;' +
' font-weight:bold;' +
' padding:5px 10px' +
'}' +
'.tfa-login-modal .modal-header-close {' +
' padding:10px 10px' +
'}' +
'.login_otp_compact {' +
' padding:10px' +
'}' +
'.login_otp_compact div {' +
' padding:5px 0' +
'}' +
'.login_otp_compact label {' +
' display:block;' +
' font-size:17px;' +
' font-weight:bold' +
'}' +
'.login_otp_compact input {' +
' width:100%;' +
' margin:0 0 5px;' +
' -moz-border-radius:5px;' +
' -webkit-border-radius:5px;' +
' border-radius:5px;' +
' border:1px solid #757575;' +
' font-size:17px;' +
' padding:5px;' +
' -moz-box-sizing:border-box;' +
' -webkit-box-sizing:border-box;' +
' box-sizing:border-box' +
'}' +
'.tfa-login-having-trouble {' +
' margin-top:10px;' +
' margin-bottom:10px' +
'}' +
'.tfa-login-having-trouble a {' +
' color:#517191' +
'}' +
'.tfa-login-caption {' +
' font-size:12px' +
'}' +
'.tfa-login-3party-apps-switch-code {' +
' background:none!important;' +
' color:#517191;' +
' border:none;' +
' padding:0!important;' +
' font:inherit;' +
' cursor:pointer' +
'}' +
'.infobar.red img {' +
' float:left' +
'}' +
'.infobar.red {' +
' border:1px solid red;' +
' padding:10px;' +
' margin:5px;' +
' background-color:#FFA177' +
'}' +
'.clear {' +
' clear:both' +
'}' +
'.clearleft {' +
' clear:left' +
'}' +
'.cover {' +
' position:fixed;' +
' left:0px;' +
' top:0px;' +
' width:100%;' +
' height:100%;' +
' background-color:gray;' +
' opacity:.3;' +
' z-index:1000' +
'}' +
'.popup {' +
' position:absolute;' +
' top:75px;' +
' left:0;' +
' -moz-border-radius:30px;' +
' -webkit-border-radius:30px;' +
' border-radius:30px;' +
' background-color:white;' +
' text-align:left;' +
' z-index:1001;' +
' padding:10px;' +
' border-color:#B2B2B2 black black #B2B2B2;' +
' border-style:solid;' +
' border-width:1px;' +
' margin-left:auto;' +
' margin-right:auto;' +
' max-width:350px' +
'}' +
'.popup h1 {' +
' text-align:center;' +
' font-size:large;' +
' font-weight:normal;' +
' color:orangered' +
'}' +
'#newlink {' +
' background:white;' +
' border:1px solid #d9d9d9;' +
' margin:10px;' +
' -webkit-border-bottom-left-radius:8px;' +
' -webkit-border-bottom-right-radius:8px;' +
' -moz-border-radius-bottomleft:8px;' +
' -moz-border-radius-bottomright:8px' +
'}' +
'#newlink .save {' +
' margin:8px' +
'}' +
'#newlink .tabmenu {' +
' display:-webkit-box;' +
' display:-moz-box;' +
' -webkit-box-orient:horizontal;' +
' -moz-box-orient:horizontal;' +
' margin:10px;' +
' padding:0' +
'}' +
'#newlink .tabmenu li {' +
' display:block;' +
' webkit-box-flex:1;' +
' background:url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2Q5ZDlkOSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2IzYjNiMyIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==\');' +
' background:-webkit-gradient(linear,50% 0%,50% 100%,color-stop(0%,#d9d9d9),color-stop(100%,#b3b3b3));' +
' background:-moz-linear-gradient(top,#d9d9d9,#b3b3b3);' +
' background:-webkit-linear-gradient(top,#d9d9d9,#b3b3b3);' +
' background:linear-gradient(to bottom,#d9d9d9,#b3b3b3);' +
' background-color:#c6c6c6;' +
' border:1px solid #999999;' +
' position:relative' +
'}' +
'#newlink .tabmenu li a {' +
' width:100%;' +
' height:100%;' +
' -moz-box-sizing:border-box;' +
' -webkit-box-sizing:border-box;' +
' box-sizing:border-box;' +
' display:block;' +
' padding:5px;' +
' color:#4d4d4d;' +
' text-shadow:rgba(255,255,255,0.4) 0px 1px 1px;' +
' text-decoration:none;' +
' font-weight:bold' +
'}' +
'#newlink .tabmenu li:first-child {' +
' -webkit-border-bottom-left-radius:5px;' +
' -webkit-border-top-left-radius:5px;' +
' -moz-border-radius-bottomleft:5px;' +
' -moz-border-radius-topleft:5px' +
'}' +
'#newlink .tabmenu li:last-child {' +
' -webkit-border-bottom-right-radius:5px;' +
' -webkit-border-top-right-radius:5px;' +
' -moz-border-radius-bottomright:5px;' +
' -moz-border-radius-topright:5px;' +
' border-left-color:#cccccc' +
'}' +
'#newlink li.selected {' +
' background:url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzgwODA4MCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2IzYjNiMyIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==\');' +
' background:-webkit-gradient(linear,50% 0%,50% 100%,color-stop(0%,#808080),color-stop(100%,#b3b3b3));' +
' background:-moz-linear-gradient(top,#808080,#b3b3b3);' +
' background:-webkit-linear-gradient(top,#808080,#b3b3b3);' +
' background:linear-gradient(to bottom,#808080,#b3b3b3);' +
' background-color:#9a9a9a' +
'}' +
'#newlink li.selected a {' +
' text-shadow:rgba(0,0,0,0.4) 0px -1px 1px;' +
' color:#f2f2f2' +
'}' +
'#newlink .spacer {' +
' margin-bottom:5px' +
'}' +
'#newlink .infobar {' +
' margin:5px' +
'}' +
'#newlink textarea,' +
'#newlink input[type="text"],' +
'#newlink input[type="url"] {' +
' border:1px solid #999999' +
'}' +
'#newlink .roundfield {' +
' position:relative;' +
' padding:0px 5px' +
'}' +
'#newlink .roundfield-content textarea {' +
' -moz-box-sizing:border-box;' +
' -webkit-box-sizing:border-box;' +
' box-sizing:border-box;' +
' width:100%;' +
' height:5em;' +
' -moz-border-radius:5px;' +
' -webkit-border-radius:5px;' +
' border-radius:5px' +
'}' +
'#newlink .roundfield-content input[type="text"],' +
'#newlink .roundfield-content input[type="url"] {' +
' -moz-box-sizing:border-box;' +
' -webkit-box-sizing:border-box;' +
' box-sizing:border-box;' +
' width:100%;' +
' height:2em;' +
' -moz-border-radius:5px;' +
' -webkit-border-radius:5px;' +
' border-radius:5px' +
'}' +
'#newlink .title {' +
' font-weight:bold' +
'}' +
'#url-field .button {' +
' float:right;' +
' margin-top:5px' +
'}' +
'#url-field .title-status {' +
' background:#e6e6e6;' +
' border:1px solid gray;' +
' padding:2px 4px;' +
' margin-top:5px;' +
' display:inline-block' +
'}' +
'#suggested-reddits ul {' +
' background:#e6e6e6;' +
' border:1px solid gray;' +
' padding:8px;' +
' -moz-border-radius:8px;' +
' -webkit-border-radius:8px;' +
' border-radius:8px' +
'}' +
'#suggested-reddits ul li {' +
' display:inline' +
'}' +
'#suggested-reddits ul li a {' +
' background:url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2JlY2ZlMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzgxYTNjNSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==\');' +
' background:-webkit-gradient(linear,50% 0%,50% 100%,color-stop(0%,#becfe0),color-stop(100%,#81a3c5));' +
' background:-moz-linear-gradient(top,#becfe0,#81a3c5);' +
' background:-webkit-linear-gradient(top,#becfe0,#81a3c5);' +
' background:linear-gradient(to bottom,#becfe0,#81a3c5);' +
' background-color:#a0b9d3;' +
' -moz-border-radius:10px;' +
' -webkit-border-radius:10px;' +
' border-radius:10px;' +
' display:inline-block;' +
' margin:5px;' +
' padding:3px 7px;' +
' text-decoration:none;' +
' border:1px solid #5080af;' +
' color:#304d69' +
'}' +
'#sr-autocomplete-area {' +
' position:relative;' +
' z-index:50' +
'}' +
'#sr-drop-down {' +
' position:absolute;' +
' background:url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2U2ZTZlNiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2JmYmZiZiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==\');' +
' background:-webkit-gradient(linear,50% 0%,50% 100%,color-stop(0%,#e6e6e6),color-stop(100%,#bfbfbf));' +
' background:-moz-linear-gradient(top,#e6e6e6,#bfbfbf);' +
' background:-webkit-linear-gradient(top,#e6e6e6,#bfbfbf);' +
' background:linear-gradient(to bottom,#e6e6e6,#bfbfbf);' +
' background-color:lightgray;' +
' border:1px solid gray;' +
' -webkit-border-bottom-left-radius:5px;' +
' -webkit-border-bottom-right-radius:5px;' +
' -moz-border-radius-bottomleft:5px;' +
' -moz-border-radius-bottomright:5px;' +
' border-top:0px;' +
' display:none;' +
' left:5px;' +
' margin:0px;' +
' padding:0px;' +
' position:absolute;' +
' font-weight:bold;' +
' color:#333333' +
'}' +
'#sr-drop-down li {' +
' display:block;' +
' padding:2px 5px' +
'}' +
'#sr-drop-down li:hover,' +
'#sr-drop-down li:active {' +
' background:url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2JlY2ZlMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzgxYTNjNSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==\');' +
' background:-webkit-gradient(linear,50% 0%,50% 100%,color-stop(0%,#becfe0),color-stop(100%,#81a3c5));' +
' background:-moz-linear-gradient(top,#becfe0,#81a3c5);' +
' background:-webkit-linear-gradient(top,#becfe0,#81a3c5);' +
' background:linear-gradient(to bottom,#becfe0,#81a3c5);' +
' background-color:#a0b9d3;' +
' color:white;' +
' text-shadow:rgba(255,255,255,0.09766) 0px 1px 1px,rgba(0,0,0,0.39844) 0px -1px 1px;' +
' -webkit-text-stroke:1px solid #517090' +
'}' +
'#sr-drop-down li:last-child {' +
' -webkit-border-bottom-left-radius:5px;' +
' -webkit-border-bottom-right-radius:5px;' +
' -moz-border-radius-bottomleft:5px;' +
' -moz-border-radius-bottomright:5px' +
'}' +
'.md {' +
' overflow:auto;' +
' font-size:small' +
'}' +
'.md p,' +
'.md h1 {' +
' margin:5px 0' +
'}' +
'.md h1 {' +
' font-weight:bold;' +
' font-size:100%' +
'}' +
'.md h2 {' +
' font-weight:bold;' +
' font-size:100%' +
'}' +
'.md>* {' +
' margin-bottom:0px' +
'}' +
'.md strong {' +
' font-weight:bold' +
'}' +
'.md em {' +
' font-style:italic' +
'}' +
'.md strong em {' +
' font-style:italic;' +
' font-weight:bold' +
'}' +
'.md img {' +
' display:none' +
'}' +
'.md ol,' +
'.md ul {' +
' margin:10px 2em' +
'}' +
'.md ul {' +
' list-style:disc outside' +
'}' +
'.md ol {' +
' list-style:decimal outside' +
'}' +
'.md pre {' +
' margin:10px' +
'}' +
'.md blockquote,' +
'.help blockquote {' +
' border-left:2px solid #369;' +
' padding-left:4px;' +
' margin:5px;' +
' margin-right:15px' +
'}' +
'.md td,' +
'.md th {' +
' border:1px solid #EEE;' +
' padding:1px 3px' +
'}' +
'.md th {' +
' font-weight:bold' +
'}' +
'.md table {' +
' margin:5px 10px' +
'}' +
'.md center {' +
' text-align:left' +
'}' +
'.tryme {' +
' width:100%;' +
' max-width:280px;' +
' padding:10px;' +
' background-color:white;' +
' -moz-border-radius:10px;' +
' -webkit-border-radius:10px;' +
' border-radius:10px;' +
' margin:10px auto' +
'}' +
'.tryme p {' +
' margin:10px;' +
' font-size:small' +
'}' +
'.tryme .choices .button {' +
' width:260px;' +
' display:block;' +
' text-align:center;' +
' margin:10px' +
'}' +
'.deepthread {' +
' margin-left:40px' +
'}' +
'.morecomments a,' +
'.deepthread a {' +
' text-decoration:none;' +
' color:white' +
'}' +
'.morechildren {' +
' margin:5px 10px' +
'}' +
'.morechildren a {' +
' display:block;' +
' text-align:center;' +
' max-width:350px;' +
' color:white!important' +
'}' +
'a.author {' +
' margin-right:0.5em' +
'}' +
'.flair,' +
'.linkflair {' +
' margin-top:2px;' +
' margin-right:0.5em;' +
' padding:0px 2px;' +
' display:inline-block;' +
' background:whiteSmoke;' +
' color:#545454;' +
' border:1px solid #dedede;' +
' font-size:9px;' +
' -moz-border-radius:2px;' +
' -webkit-border-radius:2px;' +
' border-radius:2px;' +
' -moz-box-shadow:inset 0px 1px 0px rgba(255,255,255,0.9);' +
' -webkit-box-shadow:inset 0px 1px 0px rgba(255,255,255,0.9);' +
' box-shadow:inset 0px 1px 0px rgba(255,255,255,0.9)' +
'}' +
'.linkflair {' +
' font-weight:normal;' +
' max-width:10em;' +
' overflow:hidden;' +
' text-overflow:ellipsis;' +
' white-space:nowrap' +
'}' +
'.mobile-web-redirect-bar {' +
' background:white;' +
' box-sizing:border-box;' +
' font-family:sans-serif;' +
' font-size:14px;' +
' padding:20px;' +
' width:100%;' +
' z-index:1000' +
'}' +
'.mobile-web-redirect-bar a {' +
' text-decoration:none' +
'}' +
'.mobile-web-redirect-bar .mobile-web-redirect-header {' +
' font-size:18px;' +
' line-height:25px;' +
' margin-bottom:20px' +
'}' +
'.mobile-web-redirect-bar .mobile-web-redirect-optin {' +
' background-color:#4a7fc5;' +
' border-radius:3px;' +
' box-shadow:inset 0 -3px 0 0 #3e6ab7;' +
' color:white;' +
' display:block;' +
' font-family:"Verdana",sans-serif;' +
' font-weight:bold;' +
' line-height:20px;' +
' margin-bottom:20px;' +
' padding:10px 0;' +
' text-align:center;' +
' text-transform:uppercase' +
'}' +
'.mobile-web-redirect-bar .mobile-web-redirect-optout {' +
' color:#7f7f7f' +
'}' +
'.commentspacer {' +
' clear:both' +
'}' +
'.interstitial {' +
' padding:10px' +
'}' +
'.interstitial .interstitial-buttons {' +
' margin-top:20px;' +
' padding:0 20%' +
'}' +
'.interstitial .interstitial-buttons button:last-child {' +
' margin-left:20px' +
'}' +
/* [START] gallery nav buttons bigger */
'.gallery-navigation:not(.gallery-tile) {' +
' background-color: #99f;' +
' margin: 0.25em;' +
' padding: 1em;' +
'}' +
'.gallery-navigation.False, .gallery-nav-back {' +
' color: white;' +
'}';
/* [ END ] gallery nav buttons bigger */

element.innerHTML = style;
