import React from 'react';
import { SubHeading, MenuItem } from '../../components';
import { data } from '../../constants';
import './MainMenu.css';

const MainMenu = () => (
  <div className="app__mainMenu flex__center section__padding">
    <div className="app__mainMenu-title">
      <SubHeading title="Our Delicious Offerings" />
      <h1 className="headtext__cormorant">Menu</h1>
    </div>

    <div className="app__mainMenu-menu">
      <div className="app__mainMenu-section">
        <p className="app__mainMenu-heading">🍷Wine & Beer</p>
        <div className="app__mainMenu-items">
          {data.wines.map((wine, index) => (
            <MenuItem key={wine.title + index} title={wine.title} price={wine.price} tags={wine.tags} />
          ))}
        </div>
      </div>

      <div className="app__mainMenu-section">
        <p className="app__mainMenu-heading">🍸Cocktails</p>
        <div className="app__mainMenu-items">
          {data.cocktails.map((cocktail, index) => (
            <MenuItem key={cocktail.title + index} title={cocktail.title} price={cocktail.price} tags={cocktail.tags} />
          ))}
        </div>
      </div>

      <div className="app__mainMenu-section">
        <p className="app__mainMenu-heading">☕Hotcoffee</p>
        <div className="app__mainMenu-items">
          {data.Hotcoffee.map((Hotcoffee, index) => (
            <MenuItem key={Hotcoffee.title + index} title={Hotcoffee.title} price={Hotcoffee.price} tags={Hotcoffee.tags} />
          ))}
        </div>
      </div>
       
      <div className="app__mainMenu-section">
        <p className="app__mainMenu-heading">🧋Coldcoffee</p>
        <div className="app__mainMenu-items">
          {data.Coldcoffee.map((Coldcoffee, index) => (
            <MenuItem key={Coldcoffee.title + index} title={Coldcoffee.title} price={Coldcoffee.price} tags={Coldcoffee.tags} />
          ))}
        </div>
      </div>

      

      <div className="app__mainMenu-section">
        <p className="app__mainMenu-heading">🍕Pizza</p>
        <div className="app__mainMenu-items">
          {data.pizzas.map((pizzas, index) => (
            <MenuItem key={pizzas.title + index} title={pizzas.title} price={pizzas.price} tags={pizzas.tags} />
          ))}
        </div>
      </div>

      <div className="app__mainMenu-section">
        <p className="app__mainMenu-heading">🍔Burgers</p>
        <div className="app__mainMenu-items">
          {data.burgers.map((burgers, index) => (
            <MenuItem key={burgers.title + index} title={burgers.title} price={burgers.price} tags={burgers.tags} />
          ))}
        </div>
      </div>

      <div className="app__mainMenu-section">
        <p className="app__mainMenu-heading">🥪Sandwiches</p>
        <div className="app__mainMenu-items">
          {data.sandwiches.map((sandwiches, index) => (
            <MenuItem key={sandwiches.title + index} title={sandwiches.title} price={sandwiches.price} tags={sandwiches.tags} />
          ))}
        </div>
      </div>    

      
      <div className="app__mainMenu-section">
        <p className="app__mainMenu-heading">🍟frenchFries</p>
        <div className="app__mainMenu-items">
          {data.frenchFries.map((frenchFries, index) => (
            <MenuItem key={frenchFries.title + index} title={frenchFries.title} price={frenchFries.price} tags={frenchFries.tags} />
          ))}
        </div>
      </div>    

      <div className="app__mainMenu-section">
        <p className="app__mainMenu-heading">🥢Chinese</p>
        <div className="app__mainMenu-items">
          {data.Chinese.map((Chinese, index) => (
            <MenuItem key={Chinese.title + index} title={Chinese.title} price={Chinese.price} tags={Chinese.tags} />
          ))}
        </div>
      </div>
      {/* Add more sections here as needed */}
    

    <div className="app__mainMenu-section">
        <p className="app__mainMenu-heading">🍰Cakes</p>
        <div className="app__mainMenu-items">
          {data.Cakes.map((Cakes, index) => (
            <MenuItem key={Cakes.title + index} title={Cakes.title} price={Cakes.price} tags={Cakes.tags} />
          ))}
        </div>
      </div>


      <div className="app__mainMenu-section">
        <p className="app__mainMenu-heading">🍦IceCreams</p>
        <div className="app__mainMenu-items">
          {data.IceCreams.map((IceCreams, index) => (
            <MenuItem key={IceCreams.title + index} title={IceCreams.title} price={IceCreams.price} tags={IceCreams.tags} />
          ))}
        </div>
      </div>
      </div>
  </div>
  
);

export default MainMenu;
