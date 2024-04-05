import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";

import { useAuthStore } from "@/utils/states";

const TEXT_TO_TYPE = "Selamat datang di Klinik Sehat  ";
const TYPING_SPEED = 100;

const Main = () => {
  const token = useAuthStore((state) => state.token);

  const [typingText, setTypingText] = useState("");
  const [finishSplash, setFinishSplash] = useState(
    sessionStorage.getItem("showSplash") ?? false
  );

  useEffect(() => {
    if (finishSplash) {
      return;
    }

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setTypingText(TEXT_TO_TYPE.substring(0, currentIndex));
      currentIndex++;
      if (currentIndex >= TEXT_TO_TYPE.length) {
        sessionStorage.setItem("showSplash", "true");
        setFinishSplash(true);
      }
    }, TYPING_SPEED);

    return () => clearInterval(typingInterval);
  }, []);

  if (finishSplash) {
    return (
      <Layout>
        <div className="flex flex-col items-end  h-full w-full bg-center bg-cover bg-landing-full lg:bg-landing-half">
          <div className="flex flex-col h-full w-full p-8 justify-center lg:w-1/2 space-y-3">
            <img
              src="/images/logo-blue.svg"
              alt="Logo"
              className="w-40 h-w-40 object-contain rounded-full drop-shadow-text lg:drop-shadow-none"
            />
            <p className="font-bold tracking-wider text-3xl drop-shadow-text lg:drop-shadow-none">
              “Eterna Medica” House of Health, Your Health is Our Concern
            </p>
            <p className="tracking-wider text-justify break-all md:break-normal drop-shadow-text lg:drop-shadow-none">
              Selamat datang di laman kesehatan kami, kesehatan anda menjadi
              perhatian dan usaha kami untuk mengupayakan kesehatan anda. Kami
              menyediakan pelayanan dan konseling kesehatan yang anda butuhkan
              sekiranya kami dapat membantu untuk mewujudkannya. Terima kasih
              atas kunjungan anda di laman kami, kesehatan anda perhatian kami.
            </p>
            <div className="flex space-x-5">
              <Button data-testid="to-questionnaire" asChild>
                <Link to="/questionnaire">Isi Kuisioner</Link>
              </Button>
              <Button data-testid="to-scheduling" asChild>
                <Link to={token ? "/scheduling" : "/login"}>
                  Booking Jadwal
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <div className="w-screen h-screen bg-white flex flex-col gap-y-8 justify-center items-center">
        <div className="text-health-blue-dark text-3xl">
          <p>{typingText}</p>
        </div>
      </div>
    );
  }
};

export default Main;
