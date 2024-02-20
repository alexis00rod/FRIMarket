import { useState } from "react"

export const DetailImages = ({images}) => {
  const [imageSelected, setImageSelected] = useState(images[0])

  return (
    <div className="w-full p-2 flex flex-col lg:flex-row-reverse bg-white border border-slate-300 rounded-md">
      <div className="p-2 grow flex items-center justify-center">
        <img
          src={imageSelected.url}
          alt={imageSelected.name}
          className="h-[500px] rounded-md"
        />
      </div>
      <div className="w-full lg:w-max p-2 flex lg:flex-col justify-center lg:justify-start flex-none gap-2">
        {images.map((img, i) => (
          <img
          key={i}
          src={img.url}
          alt={img.name}
          className={`
          w-20 h-20 object-cover rounded-md cursor-pointer
          ${imageSelected.url === img.url ? 'border-4 border-blue-500' : 'border-2 border-slate-300'}
          `}
          onMouseOver={() => setImageSelected(img)}
          />
        ))}
      </div>
    </div>
  )
}
