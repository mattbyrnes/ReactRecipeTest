import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import pizza from "./images/rec-pizza.jpg";
import hotpocket from "./images/rec-hot-pocket.jpg";
import ramennoodles from "./images/rec-ramen-noodles.jpg";

const Header = props => (
  <header>
    <h1>Dinner for One: Recipe Search</h1>
  </header>
);

// const Menu = props => (
//   <menu>
//     <div onClick={props.handleClick}>
//       <a id={props.id}>{props.name}</a>
//     </div>
//   </menu>
// );

const DirectoryView = props => (
  <div className="search-col">
    <SearchForm
      key="form"
      searchVal={props.searchVal}
      handleChange={props.handleChange}
      selectRecipe={props.selectRecipe}
    />
    {props.selectedRecipes.map(recipe => (
      <RecipeCard
        key="card"
        handleClick={props.handleClick}
        name={recipe.name}
        id={recipe.id}
      />
    ))}
  </div>
);

const DetailView = props => (
  <div className="recipe-col">
    <div
      className="recipe-img"
      style={{ backgroundImage: "url(" + props.image + ")" }}
    >
      <h1 className="recipe-name">{props.name}</h1>
    </div>
    <ul className="recipe-ingredients">
      <h2>Ingredients</h2>
      {props.ingredients.map(ingredient => (
        <li>{ingredient}</li>
      ))}
    </ul>
    <ul className="recipe-instructions">
      <h2>Instructions</h2>
      {props.instructions.map(instruction => (
        <li>{instruction}</li>
      ))}
    </ul>
  </div>
);

const SearchForm = props => (
  <form>
    <input
      placeholder="Recipe..."
      value={props.searchVal}
      onChange={props.handleChange}
    />
    <button onClick={props.selectRecipe}>Search</button>
  </form>
);

const RecipeCard = props => (
  <div onClick={props.handleClick} className="recipe-card">
    <p id={props.id}>{props.name}</p>
  </div>
);

class App extends React.Component {
  state = {
    recipes: [
      {
        id: 1,
        image: pizza,
        name: "Pizza",
        ingredients: ["Cheese", "Flower", "Tomato Sauce", "Not Pineapple"],
        instructions: [
          "Get phone and call local pizzeria.",
          "Make sure it's the good one, preferably not a chain restaurant.",
          "Speak clearly about what size and toppings you want. Don't get too many people involved in this process.",
          "Wait 30 to 45 minutes.",
          "Tip appropriately.",
          "Eat first slice quickly and directly out of box to ensure you burn your mouth.",
          "Eat last slice the following morning."
        ]
      },
      {
        id: 2,
        image: hotpocket,
        name: "Hot Pocket",
        ingredients: [
          "Probably Cheese",
          "Cardboard",
          "Sauce",
          "Don't Know",
          "Don't Want to Know"
        ],
        instructions: [
          "Give up all sense of self respect.",
          "Have second thoughts.",
          "Have antacids.",
          "Place frozen sustenance pellet into its silver microwave space suite.",
          "Microwave until something smells kind of like food.",
          "Question life decisions.",
          "Serve lukewarm on outside but scolding hot on inside.",
          "Don’t make plans to go anywhere."
        ]
      },
      {
        id: 3,
        image: ramennoodles,
        name: "Recipe Three",
        ingredients: ["Item One", "Item Two", "Item Three"],
        instructions: ["Step One", "Step Two", "Step Three"]
      },
      {
        id: 4,
        image: pizza,
        name: "Recipe Four",
        ingredients: ["Item One", "Item Two", "Item Three"],
        instructions: ["Step One", "Step Two", "Step Three"]
      },
      {
        id: 5,
        image: pizza,
        name: "Recipe Five",
        ingredients: ["Item One", "Item Two", "Item Three"],
        instructions: ["Step One", "Step Two", "Step Three"]
      }
    ],
    searchVal: "",
    selectedRecipes: [],
    viewRecipe: 0
  };

  selectRecipe = event => {
    event.preventDefault();
    if (
      this.state.recipes.filter(
        recipe =>
          recipe.name.toLowerCase() === this.state.searchVal.toLowerCase()
      ).length === 0
    ) {
      alert("No recipes found! You have bad taste.");
    }
    this.setState({
      selectedRecipes: this.state.recipes.filter(
        recipe =>
          recipe.name.toLowerCase() === this.state.searchVal.toLowerCase()
      )
    });
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ searchVal: event.target.value });
  };

  handleClick = event => {
    event.preventDefault();
    this.setState({ viewRecipe: event.target.id - 1 });
  };

  render() {
    return (
      <div className="page">
        <Header />
        <DirectoryView
          selectedRecipes={this.state.selectedRecipes}
          searchVal={this.state.searchVal}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          selectRecipe={this.selectRecipe}
        />
        <DetailView
          name={this.state.recipes[this.state.viewRecipe].name}
          image={this.state.recipes[this.state.viewRecipe].image}
          ingredients={this.state.recipes[this.state.viewRecipe].ingredients}
          instructions={this.state.recipes[this.state.viewRecipe].instructions}
          goLeft={this.goLeft}
          goRight={this.goRight}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
