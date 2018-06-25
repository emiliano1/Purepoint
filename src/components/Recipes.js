import React from 'react';


const Recipe = ({recipe}) => {
  return (<tr><td>{recipe.title}</td></tr>);
};

const RecipeList = ({recipes}) => {
  const recipeList = recipes.map((recipe) => {
    return (<Recipe recipe={recipe} />)
  });
  return (<table className="table table-striped table-bordered text-left"><tbody>{recipeList}</tbody></table>);
};

const searchStyle = {
  marginBottom: '20px'
};


class RecipeSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const query = event.target.value;

    this.setState({query: query});

    if (!this.props.callback) return;

    if (query.length >= 3) {
      fetch('http://www.recipepuppy.com/api/?q='+query)
        .then(res => res.json())
        .then(
          (res) => {
            this.props.callback(res.results.slice(0, 20));
          }, (error) => {
            console.log(error);
          }
        )
    } else {
      this.props.callback([]);
    }
  }

  render() {
    return (
      <div style={searchStyle}>
        <input type="search" value={this.state.query} onChange={this.handleChange} placeholder="Search for..." className="form-control" />
      </div>
    )
  }
}


class Recipes extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    this.searchResult = this.searchResult.bind(this);
  }

  searchResult(results) {
    this.setState({data: results});
  }

  render() {
    return (
      <div className="container">
        <RecipeSearch callback={this.searchResult} />
        <RecipeList recipes={this.state.data} />
      </div>
    );
  }
}

export default Recipes;