import AbstractGame from '../game/AbstractMatchViewer';

/**
 * Wraps the game constructor for use on TheAIGames.com
 * @param Game
 * @param options
 * @deprecated Will be removed in next release
 */
function legacyWrapper(Game, options) {

    var namespace;

    if (!isInPrototypeChain(AbstractGame, Game.prototype)) {
        throw new Error('The game you\'re trying to wrap is not an instance of AbstractGame');
    }

    if (!window || !window.setNamespace) {
        return;
    }

    namespace = window.setNamespace('app.competitions.' + Game.options.name);

    namespace.initialize = function () {

        if (namespace.game instanceof Game) {

            namespace.release();
        }

        namespace.game = new Game(options);
    };

    namespace.release = function () {

        var game = namespace.game;

        if (game instanceof Game) {
            game.destroy();
            namespace.game = undefined;
        }
    };
}

function isInPrototypeChain(Class, prototype) {

    var nextPrototype;

    if (Class.prototype !== prototype) {

        nextPrototype = Object.getPrototypeOf(prototype);

        return nextPrototype ? isInPrototypeChain(Class, nextPrototype) : false;
    }

    return true;
}

export default legacyWrapper;
