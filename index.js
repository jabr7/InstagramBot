const axios = require('axios')
const prompts = require('prompts');

(async () => {
    console.log('Starting Terminal scraper…')
    const response = await prompts({
        type: 'text',
        name: 'username',
        message: 'Which User you like to scrape??'
    });
    console.log('Starting to scrape')
    //The input from the terminal can be found with response.username
    //now we take that result and call getFollowers


    getFollowers(response.username)
})();


/*
//Objeto para guardar la cantidad de followers
var fs = require('fs');
var information = {
    quantity: 30
};

var data = JSON.stringify(information);

//Guardo la cantidad en un archivo json
fs.writeFile('./data.json', data, function (err) {
    if (err) {
        console.log('There has been an error saving your configuration data.');
        console.log(err.message);
        return;
    }
    console.log('Configuration saved successfully.')
});

//Lector
try {
    const jsonData = require('./data.json');
    
    JSON.parse(jsonData)
    console.log(jsonData);

    //string = JSON.parse(jsondata);
    
}
catch (err) {
    console.log('There has been an error parsing your JSON.')
    console.log(err);
}


*/







async function getFollowers(username) {
    try {
        const {
            data
        } = await axios.get(`https://www.instagram.com/${username}/channel/?__a=1`)

        user = data.graphql.user
        let followers = user.edge_followed_by.count
        let following = user.edge_follow.count
        let fullname = user.full_name
        let user_name = user.username
        let profile_pic = user.profile_pic_url_hd
        console.log(`${user_name} has ${followers} and follows ${following}. His full name is ${fullname}. His pic is ${profile_pic}`)
    } catch (error) {
        console.log('USER NOT FOUND')
         //throw Error(error);
    }
}


