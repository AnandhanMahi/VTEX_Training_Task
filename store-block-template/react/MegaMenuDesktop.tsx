import React, { useState } from 'react'
import { MdOutlineArrowForwardIos } from "react-icons/md";


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


const MegaMenuDesktop: StorefrontFunctionComponent<megamenuProps> = (props) => {
    const [megamenuListHover, setMegamenuListHover] = useState('');
    const [megamenuCategoryHover, setMegamenuCategoryHover] = useState('');

    const onMenuListHover = (title: string) => {
        setMegamenuListHover(title);
    };
    const onMenuCategoryHover = (title: string) => {
        setMegamenuCategoryHover(title);
    };
    const onMenuLeave = () => {
        setMegamenuListHover('');
    };
    return (
        <div className='w-100  flex flex-column' onMouseLeave={() => onMenuLeave()}>
            <div className="pl5 white flex flex-wrap tc w-100 bg-red">
                {props.megamenu?.map((title, index) => {

                    return (
                        <div className={` w-10 ${megamenuListHover === title.megamenuListTitle ? 'bg-white red' : ''} pointer`} key={index} >
                            <p className='w-100 fw6' onMouseEnter={() => onMenuListHover(title.megamenuListTitle)} >
                                {title.megamenuListTitle}
                            </p>
                        </div>
                    );
                })}
            </div>
            <div>
                <div className='flex w-100'>
                    <div className='w-30 fw5 '>
                        {props.megamenu?.map((title, index) => {
                            return (
                                <div className='ml9 ' key={index} >
                                    {megamenuListHover === title.megamenuListTitle && (
                                        <div>
                                            {title.menuCategory?.map((menu, subIndex) => (
                                                <div key={subIndex} className={`pointer W-100 flex flex-column ${subIndex !== title.menuCategory.length - 1 ? 'bb' : ''}`}>
                                                    <div className='flex justify-between' onMouseEnter={() => onMenuCategoryHover(menu.menuCategoryTitle)}>
                                                        <div>
                                                            <p className={`${megamenuCategoryHover === menu.menuCategoryTitle ? 'red' : ''}`}>
                                                                {menu.menuCategoryTitle}
                                                            </p>
                                                        </div>
                                                        <div className='flex flex-column justify-center'>
                                                            <MdOutlineArrowForwardIos />
                                                        </div>
                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                    )
                                    }
                                </div>
                            );
                        })}
                    </div>
                    <div className='w-5 ml5 br'>
                    </div>
                    <div className='w-100 ml8 '>
                        {props.megamenu?.map((title, index) => {
                            return (
                                <div key={index} >
                                    {megamenuListHover === title.megamenuListTitle && (
                                        <div >
                                            {title.menuCategory?.map((menu1, subIndex) => (
                                                <div key={subIndex} >
                                                    {megamenuCategoryHover === menu1.menuCategoryTitle && (
                                                        <div key={subIndex} className='w-100 flex flex-wrap fw6'>
                                                            {menu1.megamenuCategoryItem?.map((menu, subIndex) => (
                                                                <div key={subIndex} className='w-33 mt5 tl'  >
                                                                    <a className=' black-80 no-underline ' key={subIndex} href={menu.href}>
                                                                        {menu.menuCategoryItemTitle}

                                                                    </a>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                            ))}
                                        </div>
                                    )
                                    }
                                </div>
                            );
                        })}

                    </div>


                </div>


            </div>
        </div >

    )
}

MegaMenuDesktop.schema = {
    title: "custom-desktop-megamenu",
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
export default MegaMenuDesktop


