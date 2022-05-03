import React from 'react';

const Menu = ({ items }) => {
  return (
    <div className="section-center">
      {items.map((menuItem, idx) => {
        const { name, mode, ratity, race,  } = menuItem;
        return (
          <article key={idx} className="menu-item">
            {/* <img src={img} alt={title} className="photo" /> */}
            <div className="item-info">
              <header>
                <h4 style={{color: 'white'}}>{name}</h4>
                {/* <h4>{mode}</h4>
                <h4>{ratity}</h4>
                <h4>{race}</h4> */}
              </header>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Menu;