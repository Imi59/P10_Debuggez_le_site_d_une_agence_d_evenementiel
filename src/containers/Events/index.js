import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9; // Nombre d'événements à afficher par page

const EventList = () => {
  // Utilisation du hook useData pour obtenir les données et les erreurs
  const { data, error } = useData();
  // État pour gérer le type sélectionné
  const [type, setType] = useState();
  // État pour gérer la page actuelle de la pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrage des événements en fonction du type sélectionné et de la pagination
  const filteredEvents = (
    (!type ? data?.events : data?.events.filter(event => event.type === type)) || []
  ).filter((event, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  });

  // Fonction pour changer le type sélectionné et revenir à la première page
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  // Calcul du nombre total de pages en fonction du nombre d'événements filtrés par page
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;

  // Création d'un ensemble de types d'événements uniques à partir des données
  const typeList = new Set(data?.events.map((event) => event.type));

  return (
    <>
      {/* Affichage d'un message d'erreur en cas d'erreur */}
      {error && <div>An error occured</div>}
      {/* Affichage de "loading" pendant le chargement des données */}
      {data === null ? (
        "loading"
      ) : (
        <>
          {/* Affichage du titre des catégories */}
          <h3 className="SelectTitle">Catégories</h3>
          {/* Sélecteur de catégories */}
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          {/* Conteneur pour les événements filtrés */}
          <div id="events" className="ListContainer">
            {/* Affichage de chaque événement filtré avec le composant EventCard */}
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {/* Utilisation du composant Modal pour envelopper chaque EventCard */}
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          {/* Pagination */}
          <div className="Pagination">
            {/* Génération de liens pour chaque page */}
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};



export default EventList;
