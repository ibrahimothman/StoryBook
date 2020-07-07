const moment = require('moment')
module.exports = {
    formatDate: (date) => {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    },

    stripeTags: (str) => {
        return str.replace( /(<([^>]+)>)/ig, '');
    }, 
    truncate: (str, len) => {
        let newStr = str.substr(0, len)
        newStr = newStr.substr(0, newStr.lastIndexOf(' '))
        return newStr.length > 0 ? newStr : str.substr(0, len) 
    },
    editable: (storyUser, loggedUser) => {
        return storyUser._id === loggedUser._id
    }
}