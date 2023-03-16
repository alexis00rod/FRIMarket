export const formatDate = (date) => {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

    let year = date.getUTCFullYear()
    let month = ("0"+(date.getUTCMonth()+1)).slice(-2)
    let day = ("0" + date.getUTCDate()).slice(-2)

    return `${months[parseInt(month) -1]} ${day}, ${year}`
  }