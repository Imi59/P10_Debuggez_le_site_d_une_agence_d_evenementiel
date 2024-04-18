import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Icon from "../../components/Icon";
import "./style.scss";

const Modal = ({ opened, Content, children }) => {
  const [isOpened, setIsOpened] = useState(opened);
  // Utilisation de useEffect pour surveiller le changement de la prop "opened"
  useEffect(() => {
    // Mise à jour de la valeur de "isOpened" lorsque la prop "opened" change
    setIsOpened(opened);
  }, [opened]); // Déclenche useEffect lorsque la valeur de "opened" change
  return (
    <>
      {children({ isOpened, setIsOpened })}
      {isOpened && (
        <div className="modal">
          <div className="content">
            {Content}
            <button
              type="button"
              data-testid="close-modal"
              onClick={() => setIsOpened(false)}
            >
              <Icon name="close" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Modal.defaultProps = {
  opened: false,
}

Modal.propTypes = {
  opened: PropTypes.bool,
  Content: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
}

export default Modal;
