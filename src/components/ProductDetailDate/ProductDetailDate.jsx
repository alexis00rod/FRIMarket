import { formatDate } from "../../services/formatDate"

export const ProductDetailDate = ({date}) => <span className="text-sm text-gray-500">{formatDate(date.toDate())}</span>
