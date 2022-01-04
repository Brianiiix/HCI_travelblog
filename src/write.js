document.getElementById("write").addEventListener("click", write);

function write() {
    alert(tinyMCE.activeEditor.getContent());
    var myContent = tinymce.activeEditor.getContent({ format: 'text' });
    if(mycontent) console.log(myContent);
}