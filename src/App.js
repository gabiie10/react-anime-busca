import './App.css';
import React, { useEffect, useState } from 'react';
import SearchInput from './SearchInput';

function App() {
  const[info,setInfo]=useState({});//serve pra pegar os elementos do api e atualiza-los
  const [text,setText]=useState('');//so pega e autalizar o que vai ser escrito na barra de pequisa
  useEffect(() => {
    if(!text){
      setInfo({});
      fetch(`https://kitsu.io/api/edge/anime?filter[categories]=adventure
      &page[limit]=12`)
          .then((response)=>response.json())
          .then((response)=>{
            console.log(response);
            setInfo(response);//atualiza o info,agora info recebera o valor da response       
          });
    }
    else if(text){
      setInfo({});
      fetch(`https://kitsu.io/api/edge/anime?filter[text]=${text}
      &page[limit]=20`)
          .then((response)=>response.json())
          .then((response)=>{
            console.log(response);
            setInfo(response);//atualiza o info,agora info recebera o valor da response       
          });
    }
  },[text]);
  return (
    <div className="App">
      <h1>Animê</h1>
      <SearchInput 
        value={text} 
        onChange={(search)=>setText(search)}
      />
      {text && !info.data &&(//info.data agora sera a mesma coisa de response.data  
        <span>Carregando...</span>
      )}
        {info.data && (
          <ul className="animes-list">
            {info.data.map((anime)=>(// O map serve pra listar todos os elementos da api pegando o array onde os daados estao(no caso info.data).Sempre q eu faço um map eu tenho que pro uma key
              <li key={anime.id} className="card"> 
                  <img src={anime.attributes.posterImage.small} alt={anime.attributes.canonicalTitle}/>
                  
                  {anime.attributes.canonicalTitle}
              </li>
          ))}
          </ul>
        )}
    </div>
  );
};

export default App;
