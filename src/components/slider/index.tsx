import { useEffect, useState } from "react";
import first from "../../assets/1.webp";
import second from "../../assets/2.webp";
import third from "../../assets/3.webp";
import s from "./style.module.css";

const SliderComponent = () => {
  const listSlider = [
    { id: 0, link: first },
    { id: 1, link: second },
    { id: 2, link: third },
  ];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % listSlider.length);
    }, 4000);

    return () => clearTimeout(timer);
  }, [activeSlide, listSlider.length]);
  return (
    <section>
      <h2 className={s.title}>Превью</h2>
      <div className={s.slider}>
        <svg
          onClick={() =>
            setActiveSlide((prevSlide) =>
              prevSlide === 0 ? listSlider.length - 1 : prevSlide - 1
            )
          }
          style={{ marginRight: "-45px", zIndex: 1, cursor: "pointer" }}
          xmlns="http://www.w3.org/2000/svg"
          height="38"
          viewBox="0 -960 960 960"
          width="38"
          fill="#6C3EB8"
        >
          <path d="M480-160 160-480l320-320 42 42-248 248h526v60H274l248 248-42 42Z" />
        </svg>
        {listSlider.map((obj) => (
          <img
            className={obj.id === activeSlide ? s.img : s.none}
            key={obj.id}
            src={obj.link}
            alt={`слайд ${obj.id}`}
          />
        ))}
        <svg
          onClick={() =>
            setActiveSlide((prevSlide) => (prevSlide + 1) % listSlider.length)
          }
          style={{
            marginLeft: "-45px",
            zIndex: 1,
            transform: "rotate(180deg)",
            cursor: "pointer",
          }}
          xmlns="http://www.w3.org/2000/svg"
          height="38"
          viewBox="0 -960 960 960"
          width="38"
          fill="#6C3EB8"
        >
          <path d="M480-160 160-480l320-320 42 42-248 248h526v60H274l248 248-42 42Z" />
        </svg>
      </div>
    </section>
  );
};

export default SliderComponent;
