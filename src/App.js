import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import imagen from './cryptomonedas.png'
import Formulario from './components/Formulario'
import axios from 'axios';
import MostrarResultado from './components/MostrarResultado'
import Spiner from './components/Spiner'


const Contenedor = styled.div`
max-width: 900px;
margin: 0 auto;
@media (min-width:992px){
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
}
`

const Imagen = styled.img`
max-width: 100%;
margin-top: 5rem;
`

const Heading = styled.h1`
font-family: 'Bebas Neue', cursive;
color: #FFF;
text-align: left;
font-weight: 700;
font-size: 50px;
margin-bottom: 50px;
margin-top: 80px;

&::after {
  content: '';
  width: 100px;
  height: 6px;
  background-color: #66A2FE;
  display: block;
}
`;

function App() {
   
  const [ moneda, setmoneda ] = useState('')
  const [ criptomoneda, setcriptomoneda ] = useState('')
  const [resultado, setresultado] = useState({})
  const [cargando, setcargando] = useState(false)

   useEffect(() => {
    if (!cargando || moneda === '' || criptomoneda === '') {
      return;
    }
    const cotizarCripto = async () => {
     const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
     const resultado = await axios.get(url)

       setcargando(true)
      
       setTimeout(() => {
          setcargando(false)
        setresultado(resultado.data.DISPLAY[criptomoneda][moneda])
       }, 3000);
        }
         

        cotizarCripto()
   }, [cargando])

   const  componente = (cargando) ? <Spiner /> : <MostrarResultado 
   resultado = {resultado} />

  return (
   <Contenedor>
     <div>
       <Imagen 
        src={imagen}
        alt="imagen cripto"
       />
     </div>

     <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>

        
        <Formulario 
        setmoneda={setmoneda}
        setcriptomoneda={setcriptomoneda}
        setcargando={setcargando}
        />
        
        {componente}
       
     </div>
   </Contenedor>
  );
}

export default App;
