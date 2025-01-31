import { fotmatCurrency } from "../helpers"

type AmountDisplauProps = {
   label?: string,
   amount: number
}

export default function AmountDisplay({ label, amount } : AmountDisplauProps) {
   return (
      <p className="text-2xl text-blue-600 font-bold">
         {label && `${label}: `}
         <span className="font-black text-black">{fotmatCurrency(amount)}</span>
      </p>
   )
}
