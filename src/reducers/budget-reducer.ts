import { DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from 'uuid'

export type BudgetActions = 
   { type: 'add-budget', payload: {budget: number} } |
   { type: 'show-modal' } |
   { type: 'close-modal' } |
   { type: 'add-expense', payload : { expense: DraftExpense } } |
   { type: 'remove-expense', payload : { id: Expense['id'] } } |
   { type: 'get-expense-by-id', payload : { id: Expense['id'] } } 


export type BudgetState = {
   budget: number
   modal: boolean
   expense: Expense[]
   editingId: Expense['id']
}

export const initialState : BudgetState = {
   budget: 0,
   modal: false,
   expense: [],
   editingId: ''
}

const createExpence = (draftExpence : DraftExpense) : Expense => {
   return {
      ...draftExpence,
      id: uuidv4()
   }
}

export const budgetReducer = (
      state: BudgetState = initialState,
      action: BudgetActions
   ) => {

   if(action.type === 'add-budget'){
      return{
         ...state,
         budget: action.payload.budget
      }
   }

   if(action.type === 'show-modal'){
      return{
         ...state,
         modal: true
      }
   }

   if(action.type === 'close-modal'){
      return{
         ...state,
         modal: false
      }
   }

   if(action.type === 'add-expense'){
      const expense = createExpence(action.payload.expense)
      return{
         ...state,
         expense: [...state.expense, expense],
         modal: false
      }
   }

   if(action.type === 'remove-expense'){
      return{
         ...state,
         expense: state.expense.filter(expense => expense.id !== action.payload.id)
      }
   }

   if(action.type === 'get-expense-by-id'){
      return{
         ...state,
         editingId:  action.payload.id,
         modal: true
      }
   }

   return state
}
