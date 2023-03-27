export const InputBio = ({...props}) => {
  return (
    <div className="px-2 py-2 w-full flex flex-col">
      <label htmlFor="bio" className="px-1 text-sm font-medium">Biografia</label>
      <textarea 
      name="bio" 
      id="bio" 
      className="w-full h-24 px-2 py-2 border border-gray-300 rounded-md outline-none resize-none" 
      {...props}
      >
      </textarea>
    </div>
  )
}
