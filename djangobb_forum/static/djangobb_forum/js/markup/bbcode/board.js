console.log("board.js loaded");

function get_selection() {
    var txt = ''; 
    if (document.getSelection) {
        txt = document.getSelection();
    } else 
    if (document.selection) {
        txt = document.selection.createRange().text;
    }
    return txt
}

function copy_paste(post_id) {
    console.log("copy_paste()");
    
    post_div = $("div#"+post_id);
    nick = post_div.find(".username").text();
    
    txt = get_selection(); // quote selection
    if (txt == '') {
        // quote the complete post content
        // FIXME: We should get the markup here (Ajax view?)
        txt = post_div.find("p.post_body_html").text();
        txt = $.trim(txt);
    }
    txt = '[quote=' + nick + ']' + txt + '[/quote]\n';
    //textarea = $("#id_body");
    textarea = document.forms['post']['body'];
    insertAtCaret(textarea, txt);
}

function insertAtCaret (textObj, textFieldValue) {
    console.log("insertAtCaret(" + textObj + "," + textFieldValue + ")");
	if (document.all) { 
		if (textObj.createTextRange && textObj.caretPos && !window.opera) { 
			var caretPos = textObj.caretPos; 
			caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == ' ' ?textFieldValue + ' ' : textFieldValue; 
		} else { 
			textObj.value += textFieldValue; 
		} 
	} else { 
		if (textObj.selectionStart) { 
			var rangeStart = textObj.selectionStart; 
			var rangeEnd = textObj.selectionEnd; 
			var tempStr1 = textObj.value.substring(0, rangeStart); 
			var tempStr2 = textObj.value.substring(rangeEnd, textObj.value.length); 
			textObj.value = tempStr1 + textFieldValue + tempStr2; 
			textObj.selectionStart = textObj.selectionEnd = rangeStart + textFieldValue.length;
		} else { 
			textObj.value += textFieldValue; 
		} 
	} 
}
