import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from '../hooks/useCriptomoneda'
import axios from 'axios';
import Error from './Error'

const Boton = styled.input`
margin-top: 20px;
font-weight: bold;
font-size: 20px;
padding: 10px;
background-color: #66a2fe;
border: none;
width: 100%;
border-radius: 10px;
color: #FFF;
transition: background-color .3s ease;

&:hover {
    background-color: #326AC0;
    cursor: pointer;
}
`

const Formulario = ({setmoneda, setcriptomoneda, setcargando}) => {

    const [ listado, setlistado ] = useState([])
    const [error, seterror] = useState(false)



    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de USA'},
        {codigo: 'MXM', nombre: 'Pesos Mexicanos'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'}
        
    ]

    const[ state , Selecciona ] = useMoneda('Elige tu moneda', '', MONEDAS)

    const [criptomoneda, SeleccionaCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listado )

    useEffect(() => {
        const consultarAPI =  async() => {
          const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
          const resultado = await axios.get(url)
          setlistado(resultado.data.Data)
        }
       
       consultarAPI()
    }, [])
     
      const ValidarFormulario = e => {
          e.preventDefault()
         
         if(state ==="" || criptomoneda === "" ){
           seterror(true)
           return;
         } 
         seterror(false)
         setmoneda(state)
         setcriptomoneda(criptomoneda)
         setcargando(true)

      }
    return (  
        <form 
         onSubmit={ValidarFormulario}
        >
            {error ? <Error mensaje = 'Todos los campos son obligatorios' /> : null }
            <Selecciona />
            <SeleccionaCripto />
        <Boton
         type="submit"
         value="Calcular"
        />
        </form>
    );
}
 
export default Formulario;