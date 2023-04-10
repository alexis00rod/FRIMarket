export const getProvinces = async () => {
  const request = await fetch(`https://apis.datos.gob.ar/georef/api/provincias`)
  const json = await request.json()
  const {provincias} = json
  return provincias
}

export const getCities = async (province) => {
  const request = await fetch(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${province}&max=999`)
  const json = await request.json()
  const {departamentos} = json
  return departamentos
}