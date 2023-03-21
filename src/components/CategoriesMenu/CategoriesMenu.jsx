import { useEffect, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useShopContext } from "../../context/ShopContext/ShopContext"
import { useCategories } from "../../hooks/useCategories"
import { Loader, Accordion } from "../index.js"

const CategoryLink = ({children,...props}) => {
  return (
    <NavLink
    {...props}
    className={({isActive}) => `w-full py-1 flex items-center gap-2 font-medium text-gray-600 ${isActive && "font-bold"} hover:text-yellow-500`}
    >
      {children}
    </NavLink>
  )
}

export const CategoriesMenu = ({handle}) => {
  const {categories} = useCategories()
  const {filters,setFilters} = useShopContext()
  const navigate = useNavigate()

  const handleType = (category, type) => {
    navigate(`/shop/${category}`)
    setFilters({
      ...filters, 
      type:type
    })
  }

  return (
    <div className="fixed top-24 left-0 bottom-0 z-10 w-full flex bg-gray-900/25" onClick={() => handle(false)}>
      <div className="w-full max-w-md h-full px-2 py-2 flex flex-col bg-white border-l border-gray-500 divide-y divide-gray-300 overflow-y-scroll" onClick={e => e.stopPropagation()}>
        {categories
        ? categories.map(category => (
          <div key={category.id} className="py-2 pb-4 flex flex-col" onClick={() => handle(false)}>
            <CategoryLink
            key={category.id}
            to={`/shop/${category.idCategory}`}
            >
              <i className={`w-8 h-full flex items-center justify-center fa-solid fa-${category.icon}`}></i>
              <span>{category.name}</span>
            </CategoryLink>
            {category.types.map((type,i) => (
              <button
              key={i}
              className="w-full px-2 flex items-center text-sm text-gray-600 hover:text-yellow-500"
              onClick={() => handleType(category.idCategory,type)}
              >
                {type}
              </button>
            ))}
          </div>
        ))
        : <Loader />}
      </div>
    </div>
  )
}
