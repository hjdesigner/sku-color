var html;
var htmlCont = document.querySelector('.html');
var cssFinish = document.querySelector('.cssFinish');
var input = document.querySelector('#formUrl');
var button = document.querySelector('#procurar');
var xhr = new XMLHttpRequest();
var className;
var classValue;
var cssColor;
var url;

button.addEventListener('click', ajaxHtml)


function ajaxHtml(){
    var url = input.value;
    xhr.open('GET', url);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                html = xhr.responseText;
                readExcel(html);
            }else{
                console.log('deu merda');
            }
        }
    }
    xhr.send();
}

function readExcel(cont){
    var teste = cont;
    htmlCont.innerHTML = teste;
    var tr = document.querySelectorAll('tr');
    //console.log(tr);
    tr.forEach(function(el, i) {
        className = el.children[1].textContent;
        classValue = el.children[2].textContent;
        cssColor = '.' + className + '{ background-color: #' + classValue + '} <br />';
        cssFinish.insertAdjacentHTML('beforeend', cssColor);
    });
}