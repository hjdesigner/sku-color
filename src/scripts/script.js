var html;
var htmlCont = document.querySelector('[data-js="htmlCont"]');
var cssFinish = document.querySelector('[data-js="cssFinish"]');
var input = document.querySelector('[data-js="formUrl"]');
var button = document.querySelector('[data-js="procurar"]');
var viewDiv = document.querySelector('[data-js="colorView"]')
var viewColor = document.querySelector('[data-js="color"]');
var xhr = new XMLHttpRequest();
var className;
var classValue;
var cssColor;
var url;
var viewHtml;

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
        viewHtml = '<li><div class="color-thumb" style="background-color: #'+ classValue +' "></div><span>'+ className +'</span></li>';
        cssFinish.insertAdjacentHTML('beforeend', cssColor);
        viewColor.insertAdjacentHTML('beforeend', viewHtml);
        cssFinish.style.opacity = '1';
        viewDiv.style.opacity = '1';
    });
}