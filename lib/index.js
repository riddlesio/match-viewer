import aiGamesDataProvider from './core/dataProvider/aiGamesDataProvider';
import fixtureDataProvider from './core/dataProvider/fixtureDataProvider';
import riddlesDataProvider from './core/dataProvider/riddlesDataProvider';

import PlaybackEvent    from './event/PlaybackEvent';
import ViewEvent        from './event/ViewEvent';
import createEvent      from './util/createEvent';
import createGame       from './util/createGame';
import legacyWrapper    from './util/legacyWrapper';

const core = {
    dataProvider: {
        aiGamesDataProvider,
        fixtureDataProvider,
        riddlesDataProvider,
    },
};

const event = {
    PlaybackEvent: PlaybackEvent,
    ViewEvent: ViewEvent,
};

const util = {
    legacyWrapper: legacyWrapper,
};

export {
    core,
    event,
    util,
    createEvent,
    createGame,
};
