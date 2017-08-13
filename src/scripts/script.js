var input = document.querySelector('[data-js="formUrl"]'),
    button = document.querySelector('[data-js="procurar"]'),
    viewColor = document.querySelector('[data-js="color"]'),
    error = document.querySelector('[data-js="erro"]'),
    clip = document.querySelector('[data-js="clip"]'),
    templateHTMLCSS = document.querySelector('[data-js="htmlCSS"]'),
    viewCSS = document.querySelector('[data-js="cssFinish"]'),
    loader = document.querySelector('[data-js="loader"]'),
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
      if(xhr.readyState === 3){
        loader.classList.add('is-active');
      }
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          loader.classList.remove('is-active');
          html = xhr.responseText;
          readExcel(html);
        }else if(xhr.status === 404){
          loader.classList.remove('is-active');
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
  //LIMPANDO O HTML ANTES DE GERAR UM NOVO
  viewColor.innerHTML = '';
  templateHTMLCSS.textContent = '';
  if(viewCSS.children[1]){
    viewCSS.children[1].remove();
  }
  //PEGANDO TODAS AS TR DA TABELA
  table = parser.parseFromString(cont, "text/html").querySelectorAll('tr');
  table.forEach(function(el, i) {
    //IGNORANDO A PRIMEIRA TR
    if( i != 0 ){
      className = el.children[1].textContent.replace(' ','-');
      classValue = el.children[2].textContent;
      if(classValue.match(/#/g)){
        //AQUI MONTA O BACKGROUND-COLOR
        cssColor = '.skuespec_Cores_opcao_' + className + '{ background-color: ' + classValue + '} <br />';            
        viewHtml = '<li><div class="color-thumb" style="background-color: '+ classValue +' "></div><span>'+ className +'</span></li>';
      }else{
        //AQUI MONTA O BACKGROUND-IMAGE
        cssColor = '.skuespec_Cores_opcao_' + className + '{ background-image: url(' + classValue + ')} <br />';
        viewHtml = '<li><div class="color-thumb" style="background-image: url('+ classValue +')"></div><span>'+ className +'</span></li>';        
      }
      templateHTMLCSS.insertAdjacentHTML('beforeend', cssColor);
      //AQUI ESTAMOS MONTANDO A PARTE DE CORES PARA O USUARIO VISUALIZAR
      //O QUE ESTA SENDO GERADO
      viewColor.insertAdjacentHTML('beforeend', viewHtml);
    }    
  });
  //MONSTRANDO O CSS GERADO
  viewCSS.insertAdjacentHTML('beforeend', '<div class="markdown-body">' + templateHTMLCSS.textContent + '</div>');  
}

var clipboard = new Clipboard('[data-js="clip"]', {
  text: function() {
    return 'http://henriquemelanda.com.br/html-excel/cvs.html';
  }
});

clipboard.on('success', function(e) {
    clip.classList.add('active');
});