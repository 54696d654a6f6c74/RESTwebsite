const md = require("marked");
// handwritten vanilla js md wysiwyg editor because dependencies are not cool
function insertModifier(action) {
    var addTextArea = document.getElementsByName("main-md")[0];
    var selectionText = addTextArea.value.substring(addTextArea.selectionStart, addTextArea.selectionEnd);
    var beginningToSelectionText = addTextArea.value.substring(0, addTextArea.selectionStart);
    var selectionTextToEnd = addTextArea.value.substring(addTextArea.selectionEnd);

    switch (action) {
        case 'bold':
            addTextArea.value = InsertTextAtSelectionStart("**", addTextArea, true, true);
            /*addTextArea.value = beginningToSelectionText + TextInsert("**", true, true, selectionText) + selectionTextToEnd;*/
            /*addTextArea.value = beginningToSelectionText + "**" + selectionText + "**" + selectionTextToEnd;*/
        break;

        case 'italic':
            addTextArea.value = InsertTextAtSelectionStart("*", addTextArea, true, true);
        break;

        case 'heading':
            addTextArea.value = InsertTextAtNewLine("\n# ", addTextArea, true, true);
        break;

        case 'codeBlock':
            addTextArea.value = InsertTextAtSelectionStart("\n```\n", addTextArea, true, true);
            /*addTextArea.value = beginningToSelectionText + TextInsert("\n```\n", true, true, selectionText) + selectionTextToEnd;*/
        break;

        case 'bulletList':
            addTextArea.value = InsertTextAtNewLine("\n* ", addTextArea, true, true);
        break;

        case 'numberList':
            var cursor = addTextArea.value.lastIndexOf("\n", addTextArea.selectionStart - 1) + 2;
            addTextArea.value = InsertTextAtNewLine("\n?. ", addTextArea);
            addTextArea.selectionEnd = cursor;
            addTextArea.focus();
        break;

        case 'quote':
            addTextArea.value = InsertTextAtNewLine("\n> ", addTextArea, true, true);
        break;

        case 'hyperlink':
            addTextArea.value = beginningToSelectionText + "[" + selectionText + "](link)" + selectionTextToEnd;
        break;

        case 'line':
            addTextArea.value = beginningToSelectionText + "\n---\n" + selectionText + selectionTextToEnd;
        break;
    }
}
function mdPreview(){
    if (document.getElementsByName("main-md")[0].style.cssText == "display: none;") {
        document.getElementsByName("main-md")[0].style.cssText = "display: block;";
        document.getElementById("md-preview").style.cssText = "display: none;";
    }
    else {
        document.getElementsByName("main-md")[0].style.cssText = "display: none;";
        document.getElementById("md-preview").style.cssText = "display: block;";
    }
    if (document.getElementById("md-preview").contentWindow.document.body != null) {
        document.getElementById("md-preview").contentWindow.document.body.innerHTML = " ";
    }
    var mdTextInput = document.getElementsByName("main-md")[0].value;
    document.getElementById("md-preview").contentWindow.document.write("<link rel=\"stylesheet\" href=\"../css/style.css\" />");
    document.getElementById("md-preview").contentWindow.document.write(md(mdTextInput));
}

function TextInsert(symbol, opening, closing, content)
{

    let output = "";
    if (opening) output+= symbol;
    output += content;
    if (closing) output += symbol;
    return output;
}

function GetTextBeforeNewLine(textArea){
    // console.log(textArea.value.substring(0, textArea.value.lastIndexOf("\n", textArea.selectionStart)));
    return textArea.value.substring(0, textArea.value.lastIndexOf("\n", textArea.selectionStart));
}

function GetTextAfterNewLine(textArea){
    // console.log(textArea.value.substring(textArea.value.lastIndexOf("\n", textArea.selectionStart) + 1));
    return textArea.value.substring(textArea.value.lastIndexOf("\n", textArea.selectionStart) + 1);
}
function InsertTextAtSelectionStart(symbol, textArea, opening, closing){
    var beginningToSelectionText = textArea.value.substring(0, textArea.selectionStart);
    var selectionTextToEnd = textArea.value.substring(textArea.selectionEnd);
    var selectionText = textArea.value.substring(textArea.selectionStart, textArea.selectionEnd);
    return beginningToSelectionText + TextInsert(symbol, opening, closing, selectionText) + selectionTextToEnd;
}
function InsertTextAtNewLine(symbol, textArea){
    return GetTextBeforeNewLine(textArea) + symbol + GetTextAfterNewLine(textArea);    
}