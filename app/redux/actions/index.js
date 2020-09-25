
export default OnUserSession = (userSession)=> {
    return {
        type: 'OnUserSession',
        payload : userSession
    }
}