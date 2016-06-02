import JsonApi          from './lib/core/http/JsonApi';
import PlaybackEvent    from './lib/event/PlaybackEvent';
import ViewEvent        from './lib/event/ViewEvent';
import createEvent      from './lib/util/createEvent';
import createGame       from './lib/util/createGame';
import legacyWrapper    from './lib/util/legacyWrapper';

const core = {
    http: {
        JsonApi: JsonApi,
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
