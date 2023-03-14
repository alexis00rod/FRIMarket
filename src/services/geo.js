// Funcion para obtener provincias
export const getProvinces = async  () => {
  const request = await fetch('https://apis.datos.gob.ar/georef/api/provincias')
  const json = await request.json()
  const {provincias} = json
  return provincias
}