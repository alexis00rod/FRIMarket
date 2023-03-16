export const ProductDetailDate = ({date}) => {

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

  const formatDate = (date) => {
    let year = date.getUTCFullYear()
    let month = ("0"+(date.getUTCMonth()+1)).slice(-2)
    let day = ("0" + date.getUTCDate()).slice(-2)

    return `${day} de ${months[parseInt(month) -1]} del ${year}`
  }

  return <span className="text-sm text-gray-500">{formatDate(date.toDate())}</span>
}
