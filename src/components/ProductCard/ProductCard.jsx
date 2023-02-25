import { Link } from "react-router-dom"

export const ProductCard = ({content}) => {
  return (
    <article className="productCard">
      {/* Header */}
      <Link to={`/product/${content.productID}`} className='productCard-header'>
        {/* Thumb */}
        <figure className="productCard-thumb">
          <img src={content.thumb} alt={content.name} />
        </figure>
        {/* Name */}
        <h3 className="productCard-name">{content.name}</h3>
      </Link>
      {/* Footer */}
      <div className="productCard-footer">
        {/* Price */}
        <h4 className="productCard-price">${content.price}</h4>
        {/* Reviews */}
        <div className="productCard-reviews">
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </div>
      </div>
      {/* CTA */}
      <div className="productCard-cta">
        {/* Add to cart */}
        <button className="flex justify-center items-center gap-2 grow bg-blue-500 text-white rounded-md">
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="text-sm">Agregar al carrito</span>
        </button>
        {/* Add to wishlist */}
        <button className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-md">
          <i className="fa-solid fa-heart"></i>
        </button>
        {/* See detail */}
        <button className="w-8 h-8 flex items-center justify-center bg-yellow-500 text-white rounded-md">
          <i className="fa-solid fa-eye"></i>
        </button>
      </div>
    </article>
  )
}
