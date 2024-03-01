export const Notification = ({position, message}) => {
  return (
    <p className={`${position ? position : 'top-full left-2'} absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500`}>
      <i className="fa-solid fa-circle-exclamation"></i>
      <span className="pl-2 font-medium">
        {message}
      </span>
    </p>
  )
}

