document.getElementById("write").addEventListener("click", write);

function write() {
    var myContent = tinyMCE.activeEditor.getContent();
    if(myContent) console.log(myContent);
}