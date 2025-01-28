import { categories } from "../data/categories"

export default function ExpenseForm() {
   return (
      <form className="space-y-5" onSubmit={(e)=>e.preventDefault()}>
         <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
            Nuevo Gasto
         </legend>
         <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">
               Nombre Gasto
            </label>
            <input className="bg-slate-100 p-2" placeholder="Agrega nombre gasto" type="text" id="expenseName" name="expenseName"/>
         </div>

         <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">
               Cantidad
            </label>
            <input className="bg-slate-100 p-2" placeholder="Agrega cantidad" type="number" id="amount" name="amount"/>
         </div>

         <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">
               Categoriao
            </label>
            <select 
               id="category" 
               className="bg-slate-100 p-2" 
               name="category"
            >
               <option value=''>--Seleccionar--</option>
               {categories.map(category=>(
                  <option key={category.id} value={category.id}> {category.name} </option>
               ))}
            </select>
         </div>
         <input 
            type="submit" 
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            value={'Registrar Gasto'}
         />
      </form>
   )
}
