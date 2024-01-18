import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";

interface footerProps {
    menuLayout: menuLayout[]
    menu4: menu[]
    signupText: string
    placeholderText: string,
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
const FooterDesktop: StorefrontFunctionComponent<footerProps> = (props) => {
    return (
        <div>
            <div className="bg-light-gray pa9">
                <div className="flex flex-wrap w-100">
                    {props.menuLayout?.map((menuLayoutItem, index) => {
                        return (
                            <div className='w-33' key={index}>
                                <p className='b'>{menuLayoutItem.menuTitle}</p>
                                {menuLayoutItem.menuItems?.map((menu, subIndex) => {
                                    return (
                                        <div key={subIndex} className='mv4'>
                                            <a className=' black-80 no-underline' key={subIndex} href={menu.href}>
                                                {menu.label}
                                                <br></br>
                                            </a></div>
                                    );
                                })}
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-between w-100 h-100">

                    <div className="w-40">
                        <h1 className="fw1">{props.signupText}</h1>
                        <div className=' w-80 h3 f4 br-pill pl6 bg-white flex'>
                            <input style={{
                                "border": "none",
                                "outline": "none"
                            }} className="w-90 " type="text" placeholder={props.placeholderText} />
                            <div className="w-10 mt6 f3">
                                <IoIosArrowRoundForward />
                            </div>
                        </div>
                    </div>


                    <div className='w-33   flex flex-column justify-end'>
                        <div className='w-100  flex justify-end'>
                            <h3 >{props.connectText}</h3>

                        </div>
                        <div className='w-100  flex justify-end'>
                            {props.socialImage?.map((simage: image, index: number) => {
                                return (
                                    <div key={index} className='w-10 ml5'>
                                        <a className=' black-80 no-underline' href={simage.href} key={index}>
                                            <img className="w-100" src={`${simage.carouselImage}`} alt="links" />
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex justify-between w-100 mt5">
                            {props.menu4?.map((menu: any, index: number) => {
                                return (
                                    <a className='black-80 no-underline' href={menu.href} key={index}>{menu.label}</a>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div >


    )
}

FooterDesktop.schema = {
    title: "custom-desktop-footer",
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

export default FooterDesktop



