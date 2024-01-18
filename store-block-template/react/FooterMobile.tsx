import React, { useState } from 'react'
import { LuMinus } from "react-icons/lu";
import { IoIosArrowRoundForward } from "react-icons/io";

import { FiPlus } from "react-icons/fi";


interface footerProps {
    menuLayout: menuLayout[]
    menu4: menu[]
    signupText: string
    placeholderText: string
    connectText: string,
    socialImage: image[]

}
type menu = {
    label: string,
    href: string
}

type menuLayout = {
    menuTitle: string
    menuItems: menu[]
}
type image = {
    carouselImage: string,
    href: string
}

const FooterMobile: StorefrontFunctionComponent<footerProps> = (props) => {
    const [open, setOpen] = useState('Shop')
    const onMenuClicked = (menu: string) => {
        setOpen(menu)
    }
    return (
        <div>
            <div className="bg-light-gray pa5">
                <div className="flex flex-column flex-wrap w-100">
                    <div>
                        {props.menuLayout?.map((menuLayoutItem, index) => {
                            return (
                                <div className='w-100' key={index}>
                                    <div className='b w-100 flex justify-between' onClick={() => onMenuClicked(menuLayoutItem.menuTitle)}>
                                        <div><p>{menuLayoutItem.menuTitle}</p></div>
                                        <div className='mt5'>{open === menuLayoutItem.menuTitle ? <LuMinus /> : <FiPlus />}</div>
                                    </div>
                                    {open === menuLayoutItem.menuTitle && (
                                        <div>
                                            {menuLayoutItem.menuItems?.map((menu, subIndex) => (
                                                <div key={subIndex} className="mv4">
                                                    <a className="black-80 no-underline" href={menu.href}>
                                                        {menu.label}
                                                        <br />
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <div className="w-100 " >
                        <p className='w-100'>{props.signupText}</p>
                        <div className="w-80 h2 br-pill pl3 bg-white flex" >
                            <input style={{
                                "border": "none",
                                "outline": "none"
                            }} className="w-90 " type="text" placeholder={props.placeholderText} />
                            <div className="w-10 mt3">
                                <IoIosArrowRoundForward />
                            </div>
                        </div>
                    </div>
                    <div className='w-100'>
                        <p>{props.connectText}</p>
                    </div>
                    <div className='w-100 flex'>
                        {props.socialImage?.map((simage: image, index: number) => {
                            return (
                                <div key={index} className='w-10 mr3'>
                                    <a className=' black-80 no-underline' href={simage.href} key={index}>
                                        <img className="w-100" src={`${simage.carouselImage}`} alt="links" />
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                    <div className='w-100 flex'>
                        {props.menu4?.map((menu: any, index: number) => {
                            return (
                                <a className='f7 mt5 mr5 black-80 no-underline' href={menu.href} key={index}>
                                    {menu.label}
                                </a>

                            )
                        })}

                    </div>
                </div>

            </div>
        </div >


    )
}

FooterMobile.schema = {
    title: "custom-mobile-footer",
    type: "object",
    properties: {
        menuLayout: {
            title: "Menu Layout",
            type: "array",
            items: {
                type: "object",
                properties: {
                    menuTitle: {
                        type: "string",
                        title: "Enter menu Title",
                    },
                    menuItems: {
                        type: "array",
                        title: "List of sub menu",
                        items: {
                            type: "object",
                            properties: {
                                label: {
                                    type: "string",
                                    title: "Enter Label",
                                },
                                href: {
                                    type: "string",
                                    title: "Enter URL",
                                },
                            },
                        },
                    },
                },
            },
        },
        placeholderText: {
            type: "string",
            title: "Enter placeholder"
        },
        signupText: {
            type: "string",
            title: "Enter Signup text"
        },
        connectText: {
            type: "string",
            title: "Enter Text"
        },
        menu4: {
            title: "Bottom row menu",
            type: "array",
            items: {
                properties: {
                    label: {
                        type: "string",
                        title: "Enter label for menu4"
                    },
                    href: {
                        type: "string",
                        title: "Enter href value"
                    }
                }
            }
        },
        socialImage: {
            title: "Image links",
            type: "array",
            items: {
                type: "object",
                properties: {
                    carouselImage: {
                        title: "Social Icons Image",
                        type: "string",
                        widget: {
                            "ui:widget": "image-uploader",
                        },
                    },
                    href: {
                        title: "Enter URL",
                        type: "string"
                    }
                }
            }
        }

    }
}

export default FooterMobile



