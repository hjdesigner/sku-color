var input = document.querySelector('[data-js="formUrl"]'),
    button = document.querySelector('[data-js="procurar"]'),
    viewDiv = document.querySelector('[data-js="colorView"]'),
    viewColor = document.querySelector('[data-js="color"]'),
    error = document.querySelector('[data-js="erro"]'),
    clip = document.querySelector('[data-js="clip"]'),
    main = document.querySelector('[data-js="main"]'),
    templateHTMLCSS = document.querySelector('[data-js="htmlCSS"]'),
    viewCSS = document.querySelector('[data-js="cssFinish"]'),
    xhr = new XMLHttpRequest(),
    urlValidator = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g),
    parser = new DOMParser(),
    html,
    className,
    classValue,
    cssColor,
    url,
    viewHtml,
    table;

button.addEventListener('click', ajaxHtml)


function ajaxHtml(){
  url = input.value;
  if( url !== '' && url.match(urlValidator)){
    xhr.open('GET', url);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          html = xhr.responseText;
          readExcel(html);
        }else{
          error.classList.add('active');
          error.innerHTML = 'Não encontramos nenhuma tabela nessa url';
        }
      }
    }
    xhr.send();
  }else{
    error.classList.add('active');
    error.innerHTML = 'Por favor coloque uma url válida';
  }
}

function readExcel(cont){
  error.classList.remove('active');
  clip.classList.remove('active');
  table = parser.parseFromString(cont, "text/html").querySelectorAll('tr');
  table.forEach(function(el, i) {
    if( i != 0 ){
      className = el.children[1].textContent.replace(' ','-');
      classValue = el.children[2].textContent;
      if(classValue.match(/#/g)){
        cssColor = '.skuespec_Cores_opcao_' + className + '{ background-color: ' + classValue + '} <br />';            
        viewHtml = '<li><div class="color-thumb" style="background-color: '+ classValue +' "></div><span>'+ className +'</span></li>';
      }else{
        cssColor = '.skuespec_Cores_opcao_' + className + '{ background-image: url(' + classValue + ')} <br />';
        viewHtml = '<li><div class="color-thumb" style="background-image: url('+ classValue +')"></div><span>'+ className +'</span></li>';        
      }
      templateHTMLCSS.insertAdjacentHTML('beforeend', cssColor);
      viewColor.insertAdjacentHTML('beforeend', viewHtml);
    }    
  });
  viewCSS.insertAdjacentHTML('beforeend', templateHTMLCSS.textContent);
}

var clipboard = new Clipboard('[data-js="clip"]', {
  text: function() {
    return 'http://henriquemelanda.com.br/html-excel/cvs.html';
  }
});

clipboard.on('success', function(e) {
    clip.classList.add('active');
});