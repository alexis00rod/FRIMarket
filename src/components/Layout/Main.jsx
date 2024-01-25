export const Main = ({flex, size, children}) => {
  return (
      <main className='main'>
        <section className={`${size ? `main-${size}` : 'main-full'} main-wrapper ${flex ? flex : 'flex-col'}`}>
          {children}
        </section>
      </main>
  )
}
