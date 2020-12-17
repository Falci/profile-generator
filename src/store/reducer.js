import { Actions } from './actions';
import { v4 as uuid } from 'uuid';

export default (state, { type, payload }) => {
    switch (type) {
        case Actions.SET_TITLE:
            return {
                ...state,
                title: {
                    ...state.title,
                    text: payload,
                },
            };
        case Actions.TOGGLE_TITLE:
            return {
                ...state,
                title: {
                    ...state.title,
                    show: !state.title.show,
                },
            };
        case Actions.ADD_LINK:
            const id = uuid();
            const order =
                Object.values(state.links)
                    .map(({ order }) => order)
                    .reduce((a, b) => Math.max(a, b), 0) + 1;

            return {
                ...state,
                links: {
                    ...state.links,
                    [id]: {
                        text: 'My Link',
                        href: 'https://google.com/',
                        show: true,
                        order,
                    },
                },
            };
        case Actions.REMOVE_LINK:
            const copy = { ...state.links };
            delete copy[payload];

            return {
                ...state,
                links: copy,
            };
        case Actions.TOGGLE_LINK:
            const link = state.links[payload];
            return {
                ...state,
                links: {
                    ...state.links,
                    [payload]: {
                        ...link,
                        show: !link.show,
                    },
                },
            };
        case Actions.UPDATE_lINK: {
            const { id, ...link } = payload;
            return {
                ...state,
                links: {
                    ...state.links,
                    [id]: {
                        ...state.links[id],
                        ...link,
                    },
                },
            };
        }
        default:
            throw new Error();
    }
};
