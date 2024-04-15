import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData(); // data du provider context //
  const [index, setIndex] = useState(0); // Commence par l'index 0

  const byDateDesc = data?.focus.sort((evtA, evtB) => // trier les datas du + récent au plus ancien, dernière img du slide index 2 = 0 //
  new Date(evtA.date) > new Date(evtB.date) ? -1 : 1)

  useEffect(() => {
    // setIndex déplacé dans useEffect pour configuration avec ClearTimeout //
    const timerId = setTimeout(() => {
      setIndex(() =>
      index < 2 ? index + 1 : 0
    );
    }, 5000);
    return () => clearTimeout(timerId); // Nettoyer le timer lors du démontage du composant
  }, [index]); //*

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((_, radioIdx) => (
            <input
              key={`bullet-${radioIdx.toString()}`}
              type="radio"
              name="radio-button"
              checked={
                index === radioIdx
              } /* Vérifier si l'élément actuel est sélectionné */
              onChange={() => {
                setIndex(radioIdx); // au clic sur un bullet changer d'image //
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
