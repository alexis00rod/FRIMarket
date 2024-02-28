export const BtnShare = () => {

  const shareURL = () => {
    navigator.clipboard.writeText(`${window.location.href}`)
    .then(() => alert('Enlace copiado en el portapapeles'))
    .catch(() => alert('Error al copiar el enlace al portapapeles'))
  }

  return (
    <button className="btn btn-m btn-yellow" onClick={shareURL}>
      <i className="fa-solid fa-share"></i>
      <span className="text-sm font-medium">Compartir</span>
    </button>
  )
}
