var htmlCont = document.querySelector('[data-js="htmlCont"]');
var cssFinish = document.querySelector('[data-js="cssFinish"]');
var input = document.querySelector('[data-js="formUrl"]');
var button = document.querySelector('[data-js="procurar"]');
var viewDiv = document.querySelector('[data-js="colorView"]')
var viewColor = document.querySelector('[data-js="color"]');
var error = document.querySelector('[data-js="erro"]');
var clip = document.querySelector('[data-js="clip"]');
var xhr = new XMLHttpRequest();
var html;
var className;
var classValue;
var cssColor;
var sassColor;
var url;
var viewHtml;

button.addEventListener('click', ajaxHtml)


function ajaxHtml(){
    var url = input.value;
    if( url !== ''){
        xhr.open('GET', url);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    html = xhr.responseText;
                    readExcel(html);
                }else{
                    console.log('deu erro');
                }
            }
        }
        xhr.send();
    }else{
        error.style.display = 'block';
    }
}

function readExcel(cont){
    error.style.display = 'none';
    var teste = cont;
    htmlCont.innerHTML = teste;
    var tr = document.querySelectorAll('tr');
    //console.log(tr);
    tr.forEach(function(el, i) {
        className = el.children[1].textContent.replace(' ','-');
        classValue = el.children[2].textContent;
        if(classValue.match(/#/g)){
            //CSS
            cssColor = '.skuespec_Cores_opcao_' + className + '{ background-color: ' + classValue + '} <br />';            
            viewHtml = '<li><div class="color-thumb" style="background-color: '+ classValue +' "></div><span>'+ className +'</span></li>';
        }else{
            cssColor = '.skuespec_Cores_opcao_' + className + '{ background-image: url(' + classValue + ')} <br />';
            viewHtml = '<li><div class="color-thumb" style="background-image: url('+ classValue +')"></div><span>'+ className +'</span></li>';
        }
        cssFinish.insertAdjacentHTML('beforeend', cssColor);
        viewColor.insertAdjacentHTML('beforeend', viewHtml);
        cssFinish.style.opacity = '1';
        viewDiv.style.opacity = '1';
    });
}

var clipboard = new Clipboard('[data-js="clip"]', {
    text: function() {
        return 'http://henriquemelanda.com.br/html-excel/cvs.html';
    }
});

clipboard.on('success', function(e) {
    clip.classList.add('active');
});