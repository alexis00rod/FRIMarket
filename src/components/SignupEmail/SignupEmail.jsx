export const SignupEmail = ({...props}) => {
  return (
    <div className="px-2 py-2 flex flex-col">
      <label htmlFor='email' className="px-1 text-sm font-medium">Email</label>
      <input 
      type="email" 
      name="email" 
      id="email" 
      className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
      {...props}
      />
    </div>
  )
}
