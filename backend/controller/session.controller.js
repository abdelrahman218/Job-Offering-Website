const openSessions=[];

function removeSession(sessionid){
    openSessions.splice(0,openSessions.length,...openSessions.filter((ele)=>ele.SessionID!==sessionid));
}
module.exports={
openSessions,
removeSession
}