import request from "@/api/request.js";

export const getHomeMenue = () => {
    return request.get('/menue/home')
}

export const getSubjectMenue = () => {
    return request.get('/menue/subject')
}

export const getAnalysisMenue = () => {
    return request.get('/menue/analysis')
}

export const getMonitorMenue = () => {
    return request.get('/menue/monitor')
}

export const getSegmentMenue = () => {
    return request.get('/menue/segment')
}
