import aiGamesDataProvider from './dataProvider/aiGamesDataProvider';
import fixtureDataProvider from './dataProvider/fixtureDataProvider';
import riddlesDataProvider from './dataProvider/riddlesDataProvider';
import PlaybackEvent       from './event/PlaybackEvent';
import ViewEvent           from './event/ViewEvent';
import createEvent         from './util/createEvent';
import createGame          from './util/createGame';
import legacyWrapper       from './util/legacyWrapper';

const dataProvider = {
    aiGamesDataProvider,
    fixtureDataProvider,
    riddlesDataProvider,
};

const event = {
    PlaybackEvent: PlaybackEvent,
    ViewEvent: ViewEvent,
};

const util = {
    legacyWrapper: legacyWrapper,
};

export {
    dataProvider,
    event,
    util,
    createEvent,
    createGame,
};
