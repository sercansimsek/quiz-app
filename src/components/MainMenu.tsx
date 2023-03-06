import React from 'react';
import '../App.css';

type Props = {
    toggle: () => void,
}

export const MainMenu: React.FC<Props> = ({ toggle }) => {
    return (
        <div className="menu">
            <h1 className="menu-title">Quizzical</h1>

            <p className="menu-text">Let the quiz begin!</p>

            <button 
                onClick={toggle}
                className="start-button"
            >
                Start quiz
            </button>
        </div>
        
    )
}