import React, { useState } from 'react'
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIosNew } from 'react-icons/md'
import mobileDrawer from './MegaMenuMobileDesign.css'
interface megamenuProps {
    megamenu: megamenuList[]
}
type megamenuList = {
    megamenuListTitle: string
    menuCategory: megamenuListCategory[]
}
type megamenuListCategory = {
    menuCategoryTitle: string
    megamenuCategoryItem: megamenuCategoryItem[]
}
type megamenuCategoryItem = {
    menuCategoryItemTitle: string
    href: string
}

const MegaMenuMobile: StorefrontFunctionComponent<megamenuProps> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectMenu, setSelectMenu] = useState('')
    const [selectCategory, setSelectCategory] = useState('')


    const handleToggleDrawer = () => {
        setIsOpen(!isOpen)
        setSelectMenu('')
        setSelectCategory('')

    };
    const OnMenuSelect = (title: string) => {
        setSelectMenu(title)
    }
    const OnMenuBack = () => {
        if (selectCategory) {
            setSelectCategory('')
        }
        else {
            setSelectMenu('')

        }
    }
    const OnCategorySelect = (title: string) => {
        setSelectCategory(title)


    }


    return (
        <div className='w-100 bg-red fw6'>
            <button onClick={handleToggleDrawer}>open</button>
            <div className={`${isOpen ? mobileDrawer.drawer : ''}`}>
                {isOpen && (
                    <div>
                        <div className='flex w-100 justify-end'>
                            <p className='pointer pr4' onClick={handleToggleDrawer}>
                                close
                            </p>
                        </div>

                        <div className='flex flex-column w-100 '>
                            {props.megamenu?.map((title, index) => (
                                <div key={index}>
                                    {selectMenu === '' && (

                                        <div className='w-100  flex justify-between bb pointer ' onClick={() => OnMenuSelect(title.megamenuListTitle)}>
                                            <div>
                                                <p className='pl4' >{title.megamenuListTitle}</p>
                                            </div>
                                            <div className='flex flex-column justify-center pr3' >
                                                <MdOutlineArrowForwardIos />
                                            </div>
                                        </div>
                                    )}
                                    {selectMenu === title.megamenuListTitle && (
                                        <div>
                                            <div className='flex w-100' onClick={OnMenuBack} >
                                                <div className='flex flex-column justify-center'>
                                                    <MdOutlineArrowBackIosNew />
                                                </div>
                                                <p className='pointer pl3 mv5' >Go back</p>
                                            </div>
                                            <p style={{ textUnderlineOffset: '8px' }} className=' red ml5 underline mv3' >{title.megamenuListTitle}</p>
                                            <div>
                                                {title.menuCategory?.map((menu, subIndex) => (
                                                    <div key={subIndex}>
                                                        {selectCategory === '' && (
                                                            <div key={subIndex} className='bb'>
                                                                <div className='flex w-100 justify-between pointer mv0' onClick={() => OnCategorySelect(menu.menuCategoryTitle)} >
                                                                    <p className='pl6' >
                                                                        {menu.menuCategoryTitle}
                                                                    </p>
                                                                    <div className='flex flex-column justify-center pr3'>
                                                                        <MdOutlineArrowForwardIos />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        )}
                                                        {selectCategory === menu.menuCategoryTitle && (
                                                            <div className='w-100 '>
                                                                <p className='red underline  pv2 pl6 mv5' style={{ textUnderlineOffset: '8px' }}>{menu.menuCategoryTitle}</p>
                                                                {menu.megamenuCategoryItem?.map((item, itemIndex) => {
                                                                    return (
                                                                        <div key={itemIndex} className={`pv4 pl8 ${menu.megamenuCategoryItem.length - 1 !== itemIndex ? 'bb' : ''}`}>
                                                                            <a className=' black-80 no-underline ' key={subIndex} href={item.href}>
                                                                                {item.menuCategoryItemTitle}
                                                                            </a>
                                                                        </div>

                                                                    )

                                                                })}

                                                            </div>
                                                        )}
                                                    </div>

                                                ))}
                                            </div>

                                        </div>
                                    )}





                                </div>
                            ))}

                        </div>
                    </div>
                )}




            </div>
        </div >
    );

}

MegaMenuMobile.schema = {
    title: "custom-mobile-megamenu",
    type: "object",
    properties: {
        megamenu: {
            title: "Megamenu Layout",
            type: "array",
            items: {
                type: "object",
                properties: {
                    megamenuListTitle: {
                        type: "string",
                        title: "Enter megamenu list",
                    },
                    menuCategory: {
                        type: "array",
                        title: "megamenu category list",
                        items: {
                            type: "object",
                            properties: {
                                menuCategoryTitle: {
                                    type: "string",
                                    title: "Enter megamenu category name",
                                },
                                megamenuCategoryItem: {
                                    type: "array",
                                    title: "List of category items",
                                    items: {
                                        type: "object",
                                        properties: {
                                            menuCategoryItemTitle: {
                                                type: "string",
                                                title: "Enter item title",
                                            },
                                            href: {
                                                type: "string",
                                                title: "Enter URL",
                                            },
                                        },
                                    },
                                },
                            }
                        },
                    },
                }
            }
        }

    }

}
export default MegaMenuMobile


