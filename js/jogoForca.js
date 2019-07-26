var palavras = [
'Laranja', 'banana', 'morango', 'Goiaba', 'Melancia', 'abacate',
'abacaxi', 'acerola', 'Amora','Cereja', 'coco', 'kiwi',
'jabuticaba', 'jaca', 'jambo','manga','uva', 'ameixa', 
'cachorro' ,'cavalo', 'cobra', 'gato', 'macaco', 'baleia', 
'vaca', 'Boi', 'Elefante', 'Golfinho', 'urso', 'abelha'
]
var erros = 0

function sortearPalavra(palavras){
     num = Math.floor(Math.random() * palavras.length)
     palavra = palavras[num].toUpperCase()
     return palavra
}

function mostraPalavra(palavra, $mostraPalavra){
    const listaDeLetras = [] 
    palavra.split('').forEach(function(item) {
    listaDeLetras.push(' __ ') 
    })
        $mostraPalavra.textContent = listaDeLetras.join('')
    return listaDeLetras
}

function pegarPalavra(){
    palavra = sortearPalavra(palavras)
    const $infoPalavra = document.querySelector('.info-palavra')
    const $mostraPalavra = document.querySelector('.mostra-palavra')
    $infoPalavra.textContent = `A palavra contém ${palavra.length} letras`
    listaDeLetras = mostraPalavra(palavra, $mostraPalavra)
}

pegarPalavra()

const $mostraPalavra = document.querySelector('.mostra-palavra')
const $infoPalavra = document.querySelector('.info-palavra')
const $buttons = document.querySelectorAll('.button')
const $allButtons = document.querySelector('.container-buttons')
$buttonNovaPalavra = document.querySelector('.button-sort')
const $menssageSuccess = document.querySelector('.success')
const $menssageErro = document.querySelector('.danger')
const $imagem = document.querySelector('.forca')

$buttonNovaPalavra.addEventListener('click', function() {
    $menssageErro.style.display = 'none'
    $menssageSuccess.style.display = 'none'
    $mostraPalavra.style.display = 'block' 
    $allButtons.style.display = 'flex'
    $imagem.src = 'img/forca.png'
    erros = 0
    $buttonNovaPalavra.textContent = 'Nova Palavra' 
    acertou = false
    $infoPalavra.style.display = 'block' 
    $buttons.forEach(function(item){
       item.style.backgroundColor = '#4169E1' 
    })
    pegarPalavra()
})

$buttons.forEach(function(letra){
    letra.addEventListener('click',function(){   
        letraEscolhida = letra.textContent
        verificaLetra = palavra.match(letraEscolhida)

        if(verificaLetra){
           for(var i=0; i < palavra.length; i++) {
              if(palavra[i] == letraEscolhida){
                  listaDeLetras[i] = letraEscolhida
               }            
           }
           
           const $mostraPalavra = document.querySelector('.mostra-palavra')
           $mostraPalavra.textContent = listaDeLetras.join('')                    
           letra.style.backgroundColor = '#44bd84' //'#00FF7F'
           
        }else{
           letra.style.backgroundColor = '#FF6347'
           erros += 1
           $infoPalavra.textContent = `Tentativa ${erros} de 6`
           switch(erros) {
              case 1:
                 $imagem.src = 'img/cabeca.png'
                 break;
              
              case 2:
                 $imagem.src = 'img/corpo.png'
                 break;
              
              case 3:
                 $imagem.src = 'img/braco1.png'
                 break;
              
              case 4:
                 $imagem.src = 'img/braco2.png'
                 break;
              
              case 5:
                 $imagem.src = 'img/perna1.png'
                 break;
              
              case 6:
                 $imagem.src = 'img/perna2.png'
                 break;
           } 
         }
        
        if(listaDeLetras.includes(' __ ') === false){
            $imagem.src = 'img/ganhador.png'
            $allButtons.style.display = 'none'
            $menssageSuccess.style.display = 'block'
            $infoPalavra.style.display = 'none' 
        }
        if(erros == 7){
            $allButtons.style.display = 'none'
            $mostraPalavra.style.display = 'none' 
            $menssageErro.style.display = 'block'  
            $menssageErro.textContent = `Poxa, você foi enforcado! 
                                         A palavra era ${palavra}`
            $infoPalavra.style.display = 'none' 
            $buttonNovaPalavra.textContent = 'Tentar Novamente'
        }
    })
})
