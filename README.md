# The AI Games base JavaScript library

This NPM module contains the essentials nessecary to build a game viewer. Build with Babel and Browserify.

## Installation

Run `npm install git+ssh://git@bitbucket.org:nikovanmeurs/aigames.git --save`

## Usage

A game viewer can be created using the `AIGames.createGame` function and passing in a prototype. Your prototype should always implement the `handleData` function, which receives the a data object on load. If your game requires initialization or configuration on construction, you can also implement the `construct` function. Furthermore, all game viewers must implement a `destroy` function in which all timers are stopped, event listeners are unbound and anything else which can impede garbage collection is cleaned up.

An example implementation may look as follows:

```
#!javascript

AwesomeGame = AIGames.createGame({

    construct: function (options) {
        // do something with the options
    },

    destroy: function () {
        // remove all event listeners
    },
    
    // This function should always be implemented
    handleData: function (data) {

        this.prepGameData(data);
    }
});

### Event handling

The game player dispatches events when a user interacts with the controls. These events listened to as follows:

```
#!javascript

var PlaybackEvent = AIGames.event.PlaybackEvent;

PlayBackEvent.on(PlaybackEvent.PLAY, handlePlay);
PlayBackEvent.on(PlaybackEvent.PAUSE, handlePause);

```

The following events are defined:

#### PlaybackEvent.PLAY

Dispatched when the game is resumed by the user.

#### PlaybackEvent.PAUSE

Dispatched when the game is paused by the user.

#### PlaybackEvent.FORWARD

Dispatched when the user steps to the next action.

#### PlaybackEvent.FAST_FORWARD

Dispatched when the user steps to the next round.

#### PlaybackEvent.BACK

Dispatched when the user steps to the previous action.

#### PlaybackEvent.REWIND

Dispatched when the user steps to the previous round.

#### PlaybackEvent.GOTO

Dispatched when the user selects a move in the MoveBox.

#### PlaybackEvent.CHANGE_SPEED

Dispatched when the user changes the playback speed.

#### ViewEvent.CHANGE

Dispatched when the user toggles the view

### Utility functions

Aside from the functionality described above, this NPM module ships with the following utility functions:

#### AIGames.createClass

Creates a class by passing in a prototype. Additionally, by passing in a constructor before passing the prototype, classical inheritance can be achieved.

#### AIGames.createEvent

Creates an event class. See the Nflux library for details on how to use this function.

#### AIGames.util.stringFromTemplate

Initializes a string from a template string and a variables object as follows:

```
#!javascript

function hello (name) {
    var template = "Hello {name}!";

    return stringFromTemplate(template, { name: name });
}
```

### Initialisation

Below is the minimum configuration required to construct a game viewer:

```
#!javascript

(function (window, undefined) {

    const
        AIGames      = require('aigames'),
        AwesomeGame  = require('./game/AwesomeGame');

    var game

    game = new AwesomeGame({
        name: 'awesome-game',
        player: {
            // Determines whether they player's chrome should be displayed
            chrome: true,
            // Determines whether view selection should be possible
            viewstack: false,
            // A number between 0 and 1
            aspectRatio: 16 / 10
        }
    });
}(window));
```