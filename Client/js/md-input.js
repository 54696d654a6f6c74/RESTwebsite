const md = require("markdown").markdown;
// handwritten vanilla js md wysiwyg editor because dependencies are not cool
function insertModifier(action) {
    var addTextArea = document.getElementById("md-input");
    var selectionText = addTextArea.value.substring(addTextArea.selectionStart, addTextArea.selectionEnd);
    var beginningToSelectionText = addTextArea.value.substring(0, addTextArea.selectionStart);
    var selectionTextToEnd = addTextArea.value.substring(addTextArea.selectionEnd);
    switch (action) {
        case 'bold':
            addTextArea.value = beginningToSelectionText + "**" + selectionText + "**" + selectionTextToEnd;
            break;
        case 'italic':
            addTextArea.value = beginningToSelectionText + "*" + selectionText + "*" + selectionTextToEnd;
            break;
        case 'heading':
            addTextArea.value = addTextArea.value.substring(0, addTextArea.value.lastIndexOf("\n", addTextArea.selectionStart - 1))
            + "\n# " + 
                addTextArea.value.substring(addTextArea.value.lastIndexOf("\n", addTextArea.selectionStart - 1) + 1);
            break;
        case 'codeBlock':
            // override selectionText with line start and end
            beginningToSelectionText = addTextArea.value.substring(0, 
                addTextArea.value.lastIndexOf("\n", addTextArea.selectionStart) + 1);
            selectionText = addTextArea.value.substring(addTextArea.value.lastIndexOf("\n", 
                addTextArea.selectionStart) + 1, addTextArea.selectionEnd);
            addTextArea.value = beginningToSelectionText + "```\n" + selectionText + "\n```" + selectionTextToEnd;
            break;
        case 'bulletList':
            addTextArea.value = addTextArea.value.substring(0, addTextArea.value.lastIndexOf("\n", addTextArea.selectionStart - 1))
            + "\n* " + 
                addTextArea.value.substring(addTextArea.value.lastIndexOf("\n", addTextArea.selectionStart - 1) + 1);
        break;
        case 'numberList':
            addTextArea.value = addTextArea.value.substring(0, addTextArea.value.lastIndexOf("\n", addTextArea.selectionStart - 1))
                + "\n?. " + 
                addTextArea.value.substring(addTextArea.value.lastIndexOf("\n", addTextArea.selectionStart - 1) + 1);
            addTextArea.focus();
            addTextArea.selectionEnd = addTextArea.value.lastIndexOf("\n", addTextArea.selectionStart - 1) + 1;
            break;
        case 'quote':
            addTextArea.value = addTextArea.value.substring(0, addTextArea.value.lastIndexOf("\n", addTextArea.selectionStart - 1))
            + "\n> " + 
                addTextArea.value.substring(addTextArea.value.lastIndexOf("\n", addTextArea.selectionStart - 1) + 1);
                break;
        case 'hyperlink':
            addTextArea.value = beginningToSelectionText + "[" + selectionText + "](link)" + selectionTextToEnd;
            break;
        case 'line':
            addTextArea.value = beginningToSelectionText + "\n---\n" + selectionText + selectionTextToEnd;
            break;
        default:
            break;
    }
}
function mdPreview(){
    if (document.getElementById("md-input").style.cssText == "display: none;") {
        document.getElementById("md-input").style.cssText = "display: block;";
        document.getElementById("md-preview").style.cssText = "display: none;";
    }
    else {
        document.getElementById("md-input").style.cssText = "display: none;";
        document.getElementById("md-preview").style.cssText = "display: block;";
    }
    if (document.getElementById("md-preview").contentWindow.document.body != null) {
        document.getElementById("md-preview").contentWindow.document.body.innerHTML = " ";
    }
    var mdTextInput = document.getElementById("md-input").value;
    document.getElementById("md-preview").contentWindow.document.write("<link rel=\"stylesheet\" href=\"../css/style.css\" />");
    document.getElementById("md-preview").contentWindow.document.write(md.toHTML(mdTextInput));
}