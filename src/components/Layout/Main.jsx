export const Main = ({flex, size, children}) => {
console.log(size)

  return (
      <main className='main'>
        <section className={`${size ? size : 'main-size-full'} main-wrapper ${flex ? flex : 'flex-col'}`}>
          {children}
        </section>
      </main>
  )
}
