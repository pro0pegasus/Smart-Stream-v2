const channelCardContainer = document.getElementById("channels-container")

export function channelCard(channels){
    
    channelCardContainer.innerHTML = '';

    const visibleChannelsOnly = channels.filter(channel=>{
        return !channel.isBlacklisted;
    })

    const card = visibleChannelsOnly.map(channel =>{
        return `
            <article data-id=${channel.id} class="flex flex-row items-center gap-2 my-2 p-2 bg-[#050A1E] border rounded-lg border-purple-400 shrink-0 cursor-pointer" >
                <img src=${channel.logo} class="rounded-lg">
                <div>
                    <h3 class="text-gray-400">${channel.name}</h3>
                    <span class="text-gray-600">${channel.channelNumber}</span>
                </div>
                <div class="card-container flex ml-auto gap-2">
                    <button
                    data-action="favourite"
                    class="cursor-pointer star-icon text-xl ${channel.isFavorite ? 'text-yellow-400' : 'text-gray-400'}">

                    ${channel.isFavorite ? '★' : '☆'}

                </button>

                    <button data-action="blacklist" class="cursor-pointer text-red-500 hover:text-red-400">
                        <i class="fa-solid fa-ban"></i>
                    </button>

                    <button data-action="edit" class="cursor-pointer hover:text-yellow-400">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>

                </div>
            </article>
        `
    }).join('')

    channelCardContainer.innerHTML = card;
}   

export function blacklistCard(channels){
    
    channelCardContainer.innerHTML = '';

    const listnoireChannels = channels.filter(channel=>{
        return channel.isBlacklisted;
    })

    const card = listnoireChannels.map(channel =>{
        return `
            <article data-id=${channel.id} class="flex flex-row items-center gap-2 my-2 p-2 bg-[#050A1E] border rounded-lg border-purple-400 shrink-0 cursor-pointer" >
                <img src=${channel.logo} class="rounded-lg">
                <div>
                    <h3 class="text-gray-400">${channel.name}</h3>
                    <span class="text-gray-600">${channel.channelNumber}</span>
                </div>
                <div class="card-container flex ml-auto gap-2">

                    <button data-action="restore" class="cursor-pointer text-green-400 hover:text-green-300">
                        <i class="fa-solid fa-rotate-left"></i>
                    </button>

                    <button data-action="delete" class="cursor-pointer text-red-500 hover:text-red-400">
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>
            </article>
        `
    }).join('')

    channelCardContainer.innerHTML = card;
}  
