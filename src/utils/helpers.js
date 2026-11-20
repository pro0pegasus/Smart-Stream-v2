
export function isFavouriteFilter(channels){

    const filtredFavourite = channels.filter(channel =>{
        return channel.isFavorite
    })
    return filtredFavourite;
}

export function isBlacklistedFilter(channels){

    const filtredChannels = channels.filter(channel =>{
        return channel.isBlacklisted
    })
    return filtredChannels;
}

export function formPost(){
    const dialog = document.createElement('dialog');
    const form = document.createElement('form');


    // dialog.innerHTML = "";
    dialog.className = 'm-auto rounded-lg p-6 border border-purple-400 bg-[#080F25] w-[400px] text-white shadow-xl backdrop:bg-black/50 backdrop:backdrop-blur-xs';
    form.className = 'flex flex-col gap-4 min-w-[300px]';

    form.innerHTML = `
        <div class="flex flex-col gap-2">
            <label for="channelName" class="text-gray-400">Channel name: </label>
            <input
                type="text"
                id="channelName"
                name="name"
                placeholder="FR - LCI FHD"
                class="border-purple-400 text-black bg-white rounded-lg px-2 py-0.5 placeholder:text-gray-400 transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/50"
            />

            <label for="channelNumber" class="text-gray-400">Channel number: </label>
            <input
                type="number"
                id="channelNumber"
                name="channelNumber"
                placeholder = "1101"
                class="border-purple-400 text-black bg-white rounded-lg px-2 py-0.5 placeholder:text-gray-400 transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            <label for="channelCategory" class="text-gray-400">Category: </label>
            <input 
                type="text"
                id="channelCategory"
                name="category"
                placeholder = "MUSIQUE"
                class="border-purple-400 text-black bg-white rounded-lg px-2 py-0.5 placeholder:text-gray-400 transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/50"
            />

            <label for="channelLogo" class="text-gray-400">Logo: </label>
            <input 
                type="text"
                id="channelLogo"
                name="logo"
                placeholder = "https://via.placeholder.com/60x60...."
                class="border-purple-400 text-black bg-white rounded-lg px-2 py-0.5 placeholder:text-gray-400 transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/50"
            />

            <div class="flex flex-row gap-6 mt-2 justify-end">
                <button class="bg-green-500 hover:bg-green-200 rounded-lg p-2 cursor-pointer" type="submit">Ajouter</button>
                <button class="bg-red-500 hover:bg-red-300 rounded-lg p-2 cursor-pointer" id="cancelBtn" type="submit">Annuler</button>
            </div>
        </div>
    `
    dialog.appendChild(form);
    return dialog;
}
