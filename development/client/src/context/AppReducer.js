export default (state, action) => {
    switch(action.type){
        case 'REMOVE_EVENT':
            return {
                ...state,
                events: state.events.filter(event => {
                    return event.id !== action.payload;
                })
            }
        case 'ADD_EVENT':
            return {
                ...state,
                events: [action.payload, ...state.events]
            }
        case 'EDIT_EVENT':
            const updateEvent = action.payload;
            const updateEvents = state.events.map(event =>{
                if(event.id === updateEvent.id){
                    return updateEvent;
                }
                return event;
            })

            return{
                events: updateEvents
            }

        default:
            return state;
    }
}