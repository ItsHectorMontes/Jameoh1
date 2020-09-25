export default (state = {sessiontype : 0, userdata : {
    username: 'invitado', email : 'Bienvenido'}}, action) => {
        switch(action.type){
            case 'OnUserSession':
                return action.payload
            default :
            return state
        }
    }