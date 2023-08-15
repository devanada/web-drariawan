import { useState, useEffect } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"

import Background from "../../assets/illustrations/ariawan_background.jpg"
import DoctorBlue from "../../assets/illustrations/ariawan_blue.svg"
import ListQuestionaire from "../../assets/icons/list_kuisioner.svg"
import FillQuestionaire from "../../assets/icons/fill_kuisioner.svg"
import UnfillQuestionaire from "../../assets/icons/unfill_kuisioner.svg"

const Kuisioner = () => {

    const backgroundStyle = {
        backgroundImage: `url(${Background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
    };

    const navigate: NavigateFunction = useNavigate()
    const [fadeIn, setFadeIn] = useState<boolean>(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFadeIn(true)
        }, 300)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    return (
        <section
            style={backgroundStyle}
            className={`flex justify-center lg:items-center w-screen min-h-screen bg-white ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-opacity duration-500 transform`}>
            <div className="bg-white">
                <div className="grid grid-cols-1 gap-y-3 m-10 lg:mx-20">
                    <h2>Pertanyaan</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    <div className="lg:flex lg:flex-row-reverse">
                        <div className="mt-10 bg-health-blue-thin flex justify-center rounded-lg lg:ml-20 lg:w-full">
                            <img src={DoctorBlue} />
                        </div>
                        <div className="lg:grid lg:grid-cols-1">
                            <div className="flex mt-10 cursor-pointer hover:text-health-blue-thin" onClick={() => navigate(`/kuisioner/${'Pertanyaan_1'}`)}>
                                <img src={ListQuestionaire} width={40} height={40} alt="" />
                                <div className="mx-5">
                                    <h2>Pertanyaan 1</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                </div>
                                <img src={FillQuestionaire} width={40} height={40} alt="" />
                            </div>
                            <div className="flex mt-10 cursor-pointer hover:text-health-blue-thin" onClick={() => navigate(`/kuisioner/${'Pertanyaan_1'}`)}>
                                <img src={ListQuestionaire} width={40} height={40} alt="" />
                                <div className="mx-5">
                                    <h2>Pertanyaan 2</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                </div>
                                <img src={UnfillQuestionaire} width={40} height={40} alt="" />
                            </div>
                            <div className="flex mt-10 cursor-pointer hover:text-health-blue-thin" onClick={() => navigate(`/kuisioner/${'Pertanyaan_1'}`)}>
                                <img src={ListQuestionaire} width={40} height={40} alt="" />
                                <div className="mx-5">
                                    <h2>Pertanyaan 3</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                </div>
                                <img src={UnfillQuestionaire} width={40} height={40} alt="" />
                            </div>
                            <div className="flex mt-10 cursor-pointer hover:text-health-blue-thin" onClick={() => navigate(`/kuisioner/${'Pertanyaan_1'}`)}>
                                <img src={ListQuestionaire} width={40} height={40} alt="" />
                                <div className="mx-5">
                                    <h2>Pertanyaan 4</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                </div>
                                <img src={UnfillQuestionaire} width={40} height={40} alt="" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Kuisioner