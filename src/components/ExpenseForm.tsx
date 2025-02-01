import { useEffect, useState } from "react";
import { categories } from "../data/categories"
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import type { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {

   const [expense, setExpense] = useState<DraftExpense>({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date()
   })

   const [error, setError] = useState('')
   const { dispatch, state } = useBudget()

   useEffect(()=>{
      if(state.editingId){
         const editingExpense = state.expense.filter(currentExpense => currentExpense.id === state.editingId)[0]
         setExpense(editingExpense)
      }
   }, [state])

   const handleChangeDate = (date : Value) => {
      setExpense({
         ...expense,
         date
      })
   }

   const handleOnChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value} = e.target
      setExpense({
         ...expense,
         [name]: ['amount'].includes(name) ? +value : value 
      })
   }

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()      
      if(Object.values(expense).includes('')){
         setError('Todos los campos son obligatorios.')
         return
      }
      if(state.editingId) 
         dispatch({type: 'update-expense', payload: { expense: {id: state.editingId, ...expense }}})
      else 
         dispatch({type: 'add-expense', payload: { expense }})

      setExpense({
         amount: 0,
         expenseName: '',
         category: '',
         date: new Date()
      })
   }

   return (
      <form className="space-y-5" onSubmit={handleSubmit}>
         <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
            {state.editingId ? 'Editar Gasto' : 'Nuevo Gasto'}
         </legend>

         { error && (<ErrorMessage>{error}</ErrorMessage>) }

         <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">
               Nombre Gasto
            </label>
            <input className="bg-slate-100 p-2" placeholder="Agrega nombre gasto" type="text" id="expenseName" name="expenseName" value={expense.expenseName} onChange={handleOnChange}/>
         </div>

         <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">
               Cantidad
            </label>
            <input className="bg-slate-100 p-2" placeholder="Agrega cantidad" type="number" id="amount" name="amount" value={expense.amount} onChange={handleOnChange}/>
         </div>

         <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">
               Categoriao
            </label>
            <select 
               id="category" 
               className="bg-slate-100 p-2" 
               name="category"
               value={expense.category}
               onChange={handleOnChange}
            >
               <option value=''>--Seleccionar--</option>
               {categories.map(category=>(
                  <option key={category.id} value={category.id}> {category.name} </option>
               ))}
            </select>
         </div>

         <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">
               Fecha Gasto
            </label>
            <DatePicker                
               className="bg-slate-100 p-2 border-0"
               onChange={handleChangeDate}
               value={expense.date}
            />
         </div>  

         <input 
            type="submit" 
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            value={ state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
         />
      </form>
   )
}
