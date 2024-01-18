import React, { useEffect, useState } from "react";

export default function ServiceTesting() {
    const [data, setData] = useState([
        {
            firstname: '',
            secondname: '',
            subject: ''
        }

    ])
    const getData = async () => {
        const list = await fetch('/v1/student')
        const xx = await list.json()
        setData(xx)

    }

    useEffect(() => {
        getData()

    }, [])
    return (
        <div className="w-100">
            <p className="fw6 tc">Service Api GET and POST</p>
            <div className="flex justify-center w-100">
                <table className=" bt bl br   w-80">
                    <thead className="fw6">
                        <tr>
                            <th className="bb br tc">First Name</th>
                            <th className="bb br tc">Second Name</th>
                            <th className="bb tc">Subject</th>
                        </tr>
                    </thead>
                    <tbody >
                        {data.map((value, index) => (
                            <tr className="fw4" key={index}>
                                <td className="bb br" >{value.firstname}</td>
                                <td className="bb br">{value.secondname}</td>
                                <td className="bb">{value.subject}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}