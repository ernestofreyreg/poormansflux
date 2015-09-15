### Poor Man's Flux

Poor Man's Flux, a really simple React/functional based flux alternative

The real power of Flux comes from mantaining the unidirectional flow of data from Dispatcher to Actions to Stores to Components. 

With `poormansflux` we keep it simple, just add the **poorMansFluxMixin** to the top component of your hierarchy. 

The **poorMansFluxMixin** accepts two parameters: Initial Store value and a actions construct (described below)

```
var
	App,
	poorMansFluxMixin,
	React;
	
React = require('react');
poorMansFluxMixin = require('poormansflux);

App = React.createClass({
	mixins: [poorMansFluxMixin({key: 'value'}, myActions)],
	
	...
});
```

Actions are defined by a function construct that receives two arguments: a store dispatcher and the flux construct (flux is an object that contains two properties: store and actions)

```
myActions = function(dispatch, flux) {
  return {
    increaseNumber: function() {
      dispatch({value: flux.store.value + 1});
    },
    decreaseNumber: function() {
      dispatch({value: flux.store.value - 1});
    }
  };
};
```

In your top component (the one with the mixin) all children components have access to a `flux` object on `this.context` (They have to define it to gain access)

```
var
	Button,
	React;

React = require('react');

Button = React.createClass({
	render: function() {
		<button onClick={this.increase}>{this.context.store.value}</button>
	},
	
	increase: function(evt) {
		this.context.flux.actions.increaseNumber();
	},
	
	contextTypes: {
		flux: React.PropTypes.object
	}
});
```

As you can see, Action get called, stores get changed, components get redrawn on a circular fashion.

This library was created for academic purpouses, maybe a occasional use on small interfaces where using other Flux libraries would be an overkill.
