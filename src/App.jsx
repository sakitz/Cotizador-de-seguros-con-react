import { useState, useEffect } from "react";
import HeadTitulo from "./Components/HeadTitulo";
import Button from "./Components/Button";
import { formaterMoney, TotalPagar } from "./helpers"

function App() {
  const [cantidad, setCantidad] = useState(10000)
  const [meses, setmeses] = useState(6)
  const [total, setTotal] = useState(0)
  const [pago, setPago] = useState(0)




  useEffect(() => {
    const resultadoTotalAPagar = TotalPagar(cantidad, meses)
     setTotal(resultadoTotalAPagar) 

    
  }, [cantidad, meses])
  //cada vez que la cantidad cambie este useEffect cambiara

  useEffect(() => {
      // Calcular el pago mensual 
      const mensualidad = total / meses;

      setPago(mensualidad);
  }, [total])
  


  const MIN = 0
  const MAX = 20000
  const STEP = 100

  function HandleChange(e) {
    //cambiamos el state pero no de manera directa sino utilizando el setCantidad
    setCantidad(+e.target.value)
  }

    //funcion para los botones de decremento e incremento
  function HandleClickDecrement() {
    //variable que guarda el valor de la cantidad - el step cuando apretamos el boton(decremento)
    const valor = cantidad - STEP

    if (valor < MIN) {
      alert('Cantidad no valida')
      return;
    }

    //le damos ese valor ya guardado al state asi lo muestre
     setCantidad(valor)
  }

  function HandleClickIncrement() {
    const valor = cantidad + STEP

    //si el valor es mayor a el maximo arrojara una alerta 
    if (valor > MAX) {
      alert('Cantidad no valida pida menos')
      //y cortamos la ejecucion asi no cambie el state
      return;
    }



    setCantidad(valor)
  }

  function HandleChangeValue(e) {
     setmeses(+e.target.value)
  }

  return (
    <section className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <HeadTitulo />

        <div className="flex justify-between my-6">
        <Button 
          operador="-"
          fc={HandleClickDecrement}
        />
       
        <Button 
          operador="+"
          fc={HandleClickIncrement}
        />
        </div>

      <input
        className="w-full ht-6 mx-auto accent-lime-400 hover:accent-lime-500" 
        type="range" 
        onChange={HandleChange}
        min={MIN}
        max={MAX}
        step={STEP}
        value={cantidad}
      />

      <p className="text-center my-8 text-5xl font-extrabold text-indigo-600">{formaterMoney(cantidad)}</p>

      <h2 className="text-2xl font-extrabold text-gray-500 text-center">
        Elige un <span className="text-indigo-600">Plazo</span> a pagar
      </h2>

      <select
        className="mt-5 w-full p-2 bg-white border-2 border-gray-300 rounded-lg text-center text-xl font-bold"
        value={meses}
        onChange={HandleChangeValue}
      >
          <option value="6">6 Meses</option>
          <option value="12">12 Meses</option>
          <option value="24">24 Meses</option>
          <option value="32">32 Meses</option>
      </select>

      <div className="my-5 space-y-3 bg-gray-50 p-5">
      <h2 className="text-2xl font-extrabold text-gray-500 text-center">
        Resumen <span className="text-indigo-600">De pagos</span>
      </h2>

      <p className="text-xl text-gray-500 text-center font-bold">{meses} Meses</p>
      <p className="text-xl text-gray-500 text-center font-bold">{formaterMoney(total)} Total a pagar</p>
      <p className="text-xl text-gray-500 text-center font-bold">{formaterMoney(pago)} mensualidad</p>
      </div>
    </section>
  )
}

export default App
