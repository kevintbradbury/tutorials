import createDataContext from './createDataContext'

const authReducer = (state, action) => {
    switch (action) {

        default:
            return state;
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
)