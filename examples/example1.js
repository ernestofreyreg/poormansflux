'use strict';

var
  Button,
  App,
  myActions;

Button = React.createClass({
  propTypes: {
    pressed: React.PropTypes.number.isRequired
  },

  render: function() {
    return (<button className="btn btn-default" onClick={this.increase}>{this.props.pressed} {this.props.children}</button>);
  },

  increase: function(evt) {
    if (this.props.doA) {
      this.context.flux.actions.increaseNumberA();
    }

    if (this.props.doB) {
      this.context.flux.actions.increaseNumberB();
    }

    evt.preventDefault();
  },

  contextTypes: {
    flux: React.PropTypes.object.isRequired
  }
});

myActions = function(dispatch, flux) {
  return {
    increaseNumberA: function() {
      dispatch({valueA: flux.store.valueA + 1});
    },
    increaseNumberB: function() {
      dispatch({valueB: flux.store.valueB + 1});
    }
  };
};

App = React.createClass({
  mixins: [poorMansFluxMixin({valueA: 0, valueB: 0}, myActions)],

  render: function() {
    return (
      <div>
        <Button pressed={this.state.valueA} doA>Button A</Button>
        <Button pressed={this.state.valueB} doB>Button B</Button>
      </div>
    );
  }
});

React.render( <App/>, document.getElementById('container'));
