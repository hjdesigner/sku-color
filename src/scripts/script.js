var button = document.querySelector('[data-js="procurar"]'),
    viewColor = document.querySelector('[data-js="color"]'),
    error = document.querySelector('[data-js="erro"]'),
    templateHTMLCSS = document.querySelector('[data-js="htmlCSS"]'),
    viewCSS = document.querySelector('[data-js="cssFinish"]'),
    loader = document.querySelector('[data-js="loader"]'),
    file = document.querySelector('[data-js="uploadInput"]'),
    parser = new DOMParser(),
    fileReader = new FileReader(),
    className,
    classValue,
    cssColor,
    viewHtml,
    table,
    textFromFileLoaded;

button.addEventListener('click', inputFile)

function inputFile(){
  dadosFile = file.files[0];  
  fileReader.onload = function(fileLoadedEvent) {
    loader.classList.add('active');
    textFromFileLoaded = fileLoadedEvent.target.result;
    //PEGANDO TODAS AS TR DA TABELA    
    table = parser.parseFromString(textFromFileLoaded, "text/html").querySelectorAll('tr');
    readExcel(table);
  };
  fileReader.readAsText(dadosFile, "UTF-8");
}

function readExcel(cont){
  error.classList.remove('active');
  //LIMPANDO O HTML ANTES DE GERAR UM NOVO
  viewColor.innerHTML = '';
  templateHTMLCSS.textContent = '';
  if(viewCSS.children[1]){
    viewCSS.children[1].remove();
  }  
  cont.forEach(function(el, i) {
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
  loader.classList.remove('active');
  //MONSTRANDO O CSS GERADO
  viewCSS.insertAdjacentHTML('beforeend', '<div class="markdown-body">' + templateHTMLCSS.textContent + '</div>');  
}