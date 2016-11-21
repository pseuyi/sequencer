import initialState from './initialState';

const ADD_MY_OBJECT = 'ADD_MY_OBJECT';

const addObject = (myObjects) => ({
    type: ADD_MY_OBJECT, 
    myObjects
})


const addObjectReducer = (state = initialState.myObjects, action) => {
    switch(action.type){
        case ADD_MY_OBJECT: return action.myObjects; 
        default: return state;
    }
}

export default addObjectReducer;

// export default function artists (state = initialArtists, action) {
//   switch (action.type) {
//     case RECEIVE_ARTISTS: return action.artists;
//     default: return state;
//   }
// }