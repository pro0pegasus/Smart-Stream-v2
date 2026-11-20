import { errorMessage } from "../ui/error.js"
import { errorComponent } from "../ui/error.js";
import { setStorage } from "../storage/storage.js";


export async function getChannels(){

    const res = await fetch('https://6af341f9d2377d6c3704c784.mockapi.io/channels/')

    if(!res.ok){
        errorMessage(res);
    }

    const ChannelsData = await res.json()
    return ChannelsData;

}


//Post method
export async function postChannel(channel){

    const res = await fetch('https://6af341f9d2377d6c3704c784.mockapi.io/channels/',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(channel)
    });

    if(!res.ok){
        errorMessage(res);
    }

    const ChannelsData = await res.json();
    console.log(ChannelsData)
    return ChannelsData;
}


// PUT method
export async function updateChannel(userId, channel) {


    const res = await fetch(`https://6af341f9d2377d6c3704c784.mockapi.io/channels/${userId}`,{
        method: 'PUT',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(channel)
    });

    if(!res.ok){
        errorMessage(res);
    }

    const result = await res.json();
    return result;

}

// Delete method

export async function deleteChannel(userId){

    const res = await fetch(`https://6af341f9d2377d6c3704c784.mockapi.io/channels/${userId}`,{
        method: 'DELETE'
    });

    if(!res.ok){
        errorMessage(res);
    }
    console.log(`user ${userId} has been deleted!`);
    return true;

}


// The difference between POST, PUT, and PATCH is how they hndle data on the server:
// POST: Create a new item. - (Full data for the new item) - collection endpoint (/users). // usage createUser({ name: 'Alice', email: 'alice@example.com' });
// PUT: Replace an existin item completly - (Full data for the entire updated item) - specific item endpoint(/users/123) - // Usage updateUser(123, { name: 'Alice Smith', email: 'alice.smith@example.com' });
// PATCH: Update specific fields of an item - (Only the fields that need to change) - specific item endpoint(/users/123)
// DELETE // Usage deleteUser(123);