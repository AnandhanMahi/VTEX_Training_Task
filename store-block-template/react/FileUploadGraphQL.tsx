import React, { useEffect, useState } from "react";
import saveGraphQLDoc from "./graphql/saveGraphQLDoc.graphql"
import { useMutation } from "react-apollo";
import fileUfileUploadGraphqlpload from "./../react/graphql/fileUploadGraphql.graphql"
import ReCAPTCHA from "react-google-recaptcha";

interface CustomForm {
    name: string,
    email: string,
    subject: string,
    message: string,
    uploadattachment: any
}

export default function FileUploadGraphQL() {
    const [formData, setFormData] = useState<CustomForm>({
        name: "",
        email: "",
        subject: "",
        message: "",
        uploadattachment: null
    })
    const [save] = useMutation(saveGraphQLDoc);
    const [upload] = useMutation(fileUfileUploadGraphqlpload);
    const [captcha, setCaptcha] = useState('')
    const [checkMessage, setCheckmessage] = useState('')
    const [captchaCheck, setCapthaCheck] = useState('')
    const getCaptcha = async () => {
        const list = await fetch('/v1/captcha')
        const fetchedCaptcha = await list.json()
        setCaptcha(fetchedCaptcha.siteCaptcha)
        console.log("captcha", fetchedCaptcha.siteCaptcha)
    }

    useEffect(() => {
        console.log("heloooo")
        getCaptcha()
    }, [])

    const onFormInputChange = (e: any) => {

        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        })
        )
    }

    const handleRecaptchaChange = (captchaString: string | null) => {
        if (captchaString) {
            setCapthaCheck(captchaString);
        }
        console.log("newcaptcha", captchaString)
        console.log("simply", captchaCheck)
    };
    const handleFileUpload = async (e: any) => {

        const { files } = e.target;
        console.log(files);
        const { data } = await upload({
            variables: { file: files[0] },
        });
        console.log("data", data);
        console.log("dataurl", data.uploadFile.fileUrl);

        setFormData({
            ...formData,
            uploadattachment: data.uploadFile.fileUrl,
        });
    };


    const onSaveBtnClick = async () => {
        console.log(formData)
        if (formData.email !== '' && formData.message !== '' && formData.name !== '' && formData.subject !== '' && formData.uploadattachment && captchaCheck) {
            console.log("true")
            await save({
                variables: {
                    dataEntity: "AV",
                    document: { document: formData },
                    schema: "contactSchema",
                },
            }).then(() => {
                setCheckmessage("Saved successfully")

                setTimeout(() => {
                    setCheckmessage("")
                }, 1000);

                console.log('done')

            }).catch((err) => {
                setCheckmessage("Error in saving")

                setTimeout(() => {
                    setCheckmessage("")
                }, 1000);
                console.log('failed', err)
            });
        }
        else {
            setCheckmessage('Fill all fields')

            setTimeout(() => {
                setCheckmessage('')
            }, 1000);
        }
    }
    return (
        <div className="flex w-100 justify-center">

            <div className="flex flex-column ba bw1  ma5 pa5 ph10 ">
                <div className="flex justify-between ma3 ">
                    <label className="fw6" htmlFor="name">Name</label>
                    <input className="h2 w10  tc" type="text" placeholder="Enter your name" name="name" id="name" onChange={(e) => onFormInputChange(e)} />
                </div>

                <div className="flex justify-between ma3 ">
                    <label className="fw6" htmlFor="email">Email</label>
                    <input className="h2 w8 tc" type="text" placeholder="Enter your email" name="email" id="email" onChange={(e) => onFormInputChange(e)} />
                </div>

                <div className="flex justify-between ma3 ">
                    <label className="fw6" htmlFor="subject">Subject</label>
                    <input className="h2 w8 tc" type="text" placeholder="Enter the subject" name="subject" id="subject" onChange={(e) => onFormInputChange(e)} />
                </div>

                <div className="flex justify-between ma3 tc ">
                    <label className="fw6 " htmlFor="message">Message</label>
                    <input className="h2 w8 tc" type="text" placeholder="Enter your message" name="message" id="message" onChange={(e) => onFormInputChange(e)} />
                </div>

                <div className="flex  ma3 ">
                    <label className="fw6  " htmlFor="fileInput">Upload File</label>
                </div>
                <div>
                    <input className="h2 tc" type="file" name="files" id="fileInput" onChange={(e) => { handleFileUpload(e) }} />

                </div>
                {captcha && (
                    <ReCAPTCHA
                        sitekey={captcha}
                        onChange={(e) => {
                            handleRecaptchaChange(e);
                        }}

                    />
                )}



                <div className="w-100 flex ma3 justify-center">

                    <button className="white pa3 fw6 br3 bg-blue" onClick={() => { onSaveBtnClick() }} >Save</button>

                </div>
                <div className="flex justify-center red fw6 b">
                    <p>{checkMessage}</p>
                </div>
            </div>

        </div>

    )

}