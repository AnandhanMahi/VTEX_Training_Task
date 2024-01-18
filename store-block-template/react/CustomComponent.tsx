import React, { useState } from "react";
import { useQuery } from "react-apollo";
import getCustomComponentData from './graphql/getCustomComponentData.graphql';

export default function CustomComponent() {
    const [limit, setLimit] = useState(10)

    const { data } = useQuery(getCustomComponentData, {
        variables: {
            acronym: "AK",
            fields: ["firstname", "secondname", "subject", "age"],
            pageSize: `${limit}`,
            where: '',
            schema: "AnandAkku"
        },
    }
    );


    const showMore = () => {
        setLimit(limit + 10)
        try {
            console.log('done');
        } catch (err) {
            console.log('failed', err);
        }
    }
    const showLess = () => {

        if (limit > 10) {
            setLimit(limit - 10)
        }
    }


    return (
        <div className="w-100 ma5 bg-gray fw6 white ">
            <div className="flex justify-center" >


                <table className=" bt bl w-100 ">
                    <thead className="fw6">
                        <tr>
                            <th className="bb br tc">ID</th>
                            <th className="bb br tc">First Name</th>
                            <th className="bb br tc">Second Name</th>
                            <th className="bb br tc">Subject</th>
                            <th className="bb br tc">Age</th>
                        </tr>
                    </thead>
                    <tbody >
                        {data?.documents?.map((itemss: any, index: any) => {

                            return (
                                <tr key={index}>
                                    <td key={index} className="bb br" >{index + 1}</td>
                                    {itemss.fields?.map((item1: any, index1: number) => (
                                        item1.key != 'id' && (
                                            <td key={index1} className="bb br" >{item1.value}</td>
                                        )
                                    ))}
                                </tr>

                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt5 ">
                <button className="white fw6 bg-blue pa3 br3 pointer mb5" onClick={showMore}>See More</button>
                <button className="ml7 white fw6 bg-blue pa3 br3 pointer mb5" onClick={showLess}>See Less</button>
            </div>
        </div>

    );
}



