// ==UserScript==
// @name         Archive cGPT Conv
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://chat.openai.com/chat/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @grant        GM_registerMenuCommand
// ==/UserScript==
(function() {
    'use strict';
    GM_registerMenuCommand("Export Conv", exportConv);




    function getConvMarkdown(){
        const title = document.querySelector('title').textContent;
        const title_save = title.replace(/ /g, '_').replace(/\n/g, '');
        const messages = document.querySelectorAll('.text-base');
        let markdown = '# ' + title + '\n';
        let currentParticipant = 'Me';
        for (let i = 0; i < messages.length; i++) {
            markdown += currentParticipant + ': ' + messages[i].innerText + '\n---\n';
            currentParticipant = currentParticipant === 'Me' ? 'GPT' : 'Me';
        }
        const filename = title_save + '.md';

        return {
            filename: filename,
            content: markdown
        }
    }

    function exportConv(){
        const conv = getConvMarkdown();
        const data = new Blob([conv.content], { type: 'text/plain' });
        const file = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = file;
        a.download = conv.filename;
        a.click();
    }
    
})();


