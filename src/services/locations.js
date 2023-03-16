// Funcion para obtener ubicaciones
export const getLocations = async  () => {
  const request = await fetch('https://apis.datos.gob.ar/georef/api/provincias')
  const json = await request.json()
  const {provincias} = json
  return provincias
}

export const getLocation = async (id) => {
  const request = await fetch(`https://apis.datos.gob.ar/georef/api/provincias?id=${id}`)
  const json = await request.json()
  const {provincias} = json
  return provincias[0]
}