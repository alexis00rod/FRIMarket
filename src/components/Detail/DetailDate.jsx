import { formatDate } from '../../services/formatDate'

export const DetailDate = ({date}) => <span className="text-sm text-gray-500">{formatDate(date.toDate())}</span>
