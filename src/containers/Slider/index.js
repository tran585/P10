import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(2); // Commencer par l'index 2
  const [testIndex, setTestIndex] = useState(null);
  const [firstIteration, setIteration] = useState(true)

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
// console.log(byDateDesc)
// console.log(firstIteration)
  useEffect(() => {
      const timeoutId = setTimeout(() => {
        setIteration(false);
      }, 5000);
      return () => clearTimeout(timeoutId);
  },[]);

  useEffect(() => { // setIndex déplacé dans useEffect pour configuration avec ClearTimeout //
    const timerId = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : byDateDesc.length - 1
      );
    }, 5000);
    return () => clearTimeout(timerId); // Nettoyer le timer lors du démontage du composant
  }, [index]);
  console.log(testIndex)

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
          <div
            key={event.title}
            style={{ animation: firstIteration === true && "none"}}
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
          {byDateDesc?.map((event, radioIdx) => (
            <input
            key={`bullet-${radioIdx.toString()}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx} /* Vérifier si l'élément actuel est sélectionné */
              onChange={() => {setIndex(radioIdx); setTestIndex(index) ;setIteration(false); console.log(radioIdx)}} /* remet à jour l'index avec setIndex + setIteration pour l'état de */
              />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
