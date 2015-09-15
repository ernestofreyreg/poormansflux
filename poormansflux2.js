var
  TodoItems,
  TodoInput,
  TodoList,
  todoActions,
  poorMansFluxMixin;

poorMansFluxMixin = function(store, actions) {
  return {
    getInitialState: function() {
      return store;
    },
    childContextTypes: {
      flux: React.PropTypes.object
    },

    getChildContext: function() {
      var
        flux;

      flux = { store: this.state };
      flux.actions = actions(this.dispatch, flux);

      return {
        flux: flux
      };
    },

    dispatch: function(data) {
      this.setState(data);
    }
  };
};

todoActions = function(dispatch, flux) {
  return {
    addTodo: function(item) {
      dispatch({todos: flux.store.todos.concat([item])});
    }
  };
};

TodoList = React.createClass({
  mixins: [poorMansFluxMixin({todos: []}, todoActions)],

  render: function() {
    return (
      <div>
        <h3>TODO List</h3>
        <TodoItems items={this.state.todos}/>
        <TodoInput addTodo={this.addTodo}/>
      </div>
    );
  }
});

TodoItems = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired
  },

  render: function() {
    var
      createItem;

    createItem = function(item, index) {
      return (
        <li key={index}>{item}</li>
      );
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});

TodoInput = React.createClass({
  getInitialState: function() {
    return {item: ''};
  },

  onChange: function(e) {
    this.setState({
      item: e.target.value
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.context.flux.actions.addTodo(this.state.item);
    this.setState({item: ''}, function() {
      React.findDOMNode(this.refs.item).focus();
    });
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input ref="item" type="text" onChange={this.onChange} value={this.state.item}/>
        <input type="submit" value="Add"/>
      </form>
    );
  },

  contextTypes: {
    flux: React.PropTypes.object.isRequired
  }
});

React.render(<TodoList />, document.getElementById('container'));