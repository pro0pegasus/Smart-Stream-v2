import { updateChannel, deleteChannel, postChannel } from "../services/api.js";
import { channelCard, blacklistCard } from "../ui/channelCard.js";
import { channelDescription, channelPreview } from "../ui/preview.js";
import { channelCategories } from "../ui/sidebar.js";
import { isFavouriteFilter, isBlacklistedFilter, formPost } from "../utils/helpers.js";

export function eventContainer(){
const toggleBtn = document.getElementById('toggleBtn');
const appContainer = document.getElementById('app-container');

    toggleBtn.addEventListener('click', ()=>{
        appContainer.classList.toggle('grid-cols-[70px_1fr]');
    })
}

const categoryCardContainer = document.getElementById("categories-channels")
const channelsContainer = document.getElementById("channels-container");
const backBtn = document.getElementById('back-btn');
const searchInput = document.getElementById('filter')

const favoriteCard = document.getElementById('favourite-channels');
const blacklistButton = document.getElementById('blacklist-channels');


export function categoryEvent(channels){
    categoryCardContainer.addEventListener('click', (e)=>{
        
        const categoryCard = e.target.closest("[data-id]");

        if(!categoryCard){
            return;
        }

        const selectedCategory = categoryCard.dataset.id;
        
        const filtredChannels = channels.filter(channel =>{
            return channel.category === selectedCategory
        });

        channelCard(filtredChannels);
        
        categoryCardContainer.classList.add('hidden');
        channelsContainer.classList.remove('hidden')
        backBtn.classList.remove('hidden');
        
    })

    backBtn.addEventListener('click', ()=>{
        categoryCardContainer.classList.remove('hidden');
        channelsContainer.classList.add('hidden')
        backBtn.classList.add('hidden');
        })
}

export function channelSelectionEvent(channels){
    channelsContainer.addEventListener('click', (e)=>{
        
        const actionBtn = e.target.closest('[data-action]');

        if(actionBtn)
            return;

        const selectCard = e.target.closest("[data-id]");

        if(!selectCard)
            return;
        
        const selectedChannels = channels.find(channel =>{
            return channel.id === selectCard.dataset.id
        });

        if(selectedChannels){
            channelDescription(selectedChannels);
            channelPreview(selectedChannels)
        }
        
    })
    
}

export function searchEvent(channels){
    searchInput.addEventListener('input', (e)=>{

        const searchedTerm = e.target.value.toLowerCase().trim();

        if(!searchedTerm){
            channelCategories(channels)

            categoryCardContainer.classList.remove('hidden');
            channelsContainer.classList.add('hidden');

            channelsContainer.innerHTML = '';

            backBtn.classList.add('hidden');
            return;
        }

        const filtredCategories = channels.filter(channel =>{
            return !channel.isBlacklisted && 
                channel.category.toLowerCase().includes(searchedTerm)
        })

        const filtredChannels = channels.filter(channel =>{
            
        return !channel.isBlacklisted && 
            (channel.name.toLowerCase().includes(searchedTerm) || 
            String(channel.channelNumber).includes(searchedTerm))

        })

        channelCategories(filtredCategories);
        channelCard(filtredChannels);

        categoryCardContainer.classList.toggle('hidden', filtredCategories.length === 0)
        channelsContainer.classList.toggle('hidden', filtredChannels.length === 0)

        if(filtredCategories.length === 0 && filtredChannels.length === 0){
            categoryCardContainer.innerHTML = `
                <p>No result found</p>
            `
            categoryCardContainer.classList.remove('hidden')
        }
        backBtn.classList.add('hidden');
    })

}

export function favouriteEvent(channels){
    favoriteCard.addEventListener('click', ()=>{

        const favouriteChannels = isFavouriteFilter(channels)


        channelCard(favouriteChannels);
        
        categoryCardContainer.classList.add('hidden');
        channelsContainer.classList.remove('hidden')
        backBtn.classList.remove('hidden');
        

    })

    backBtn.addEventListener('click', ()=>{
        categoryCardContainer.classList.remove('hidden');
        channelsContainer.classList.add('hidden')
        backBtn.classList.add('hidden');
        })
}

export function favouriteToggleEvent(channels){
    channelsContainer.addEventListener('click', async (e)=>{
        const favoriteBtn = e.target.closest('[data-action="favourite"]')

        if(!favoriteBtn)
            return;

        e.stopPropagation();

        const selectCard = favoriteBtn.closest('[data-id]');

        const selectedChannel = channels.find(channel =>{
            return channel.id === selectCard.dataset.id;
        })

        const newStatus = !selectedChannel.isFavorite;

      
        const updatedChannel = await updateChannel(selectedChannel.id, {
            isFavorite: newStatus
        });

        selectedChannel.isFavorite = updatedChannel.isFavorite;

        favoriteBtn.textContent = updatedChannel.isFavorite ? '★' : '☆';

        favoriteBtn.classList.toggle('text-yellow-400', updateChannel.isFavorite);
        favoriteBtn.classList.toggle('text-gray-400', !updateChannel.isFavorite)
     
    })
}

export function blacklistEvent(channels){
    channelsContainer.addEventListener('click', async (e)=>{
        const blacklistBtn = e.target.closest('[data-action="blacklist"]')

        if(!blacklistBtn)
            return;

        e.stopPropagation();

        const selectCard = blacklistBtn.closest('[data-id]');

        const selectedChannel = channels.find(channel =>{
            return channel.id === selectCard.dataset.id;
        })

        if(!selectedChannel)
            return;
        // const newStatus = !selectedChannel.isFavorite;

        
        const updatedChannel = await updateChannel(selectedChannel.id, {
            isBlacklisted: true
        });

        selectedChannel.isBlacklisted = updatedChannel.isBlacklisted;

        selectCard.remove();

        
    })
}


export function blacklistViewEvent(channels){
    blacklistButton.addEventListener('click', ()=>{
        const blacklistedChannels = isBlacklistedFilter(channels);

        blacklistCard(blacklistedChannels);

        categoryCardContainer.classList.add('hidden');
        channelsContainer.classList.remove('hidden');
        backBtn.classList.remove('hidden');
    })
}

export function restoreChannelEvent(channels){
    channelsContainer.addEventListener('click', async (e)=>{
        const restoreBtn = e.target.closest('[data-action="restore"]');

        if(!restoreBtn)
            return;

        e.stopPropagation();

        const selectCard = restoreBtn.closest('[data-id]');

        const selectedChannel = channels.find(channel =>{
            return channel.id === selectCard.dataset.id;
        });

        if(!selectedChannel)
            return;

        
        const updatedChannel = await updateChannel(selectedChannel.id, {
            isBlacklisted: false
        });

        selectedChannel.isBlacklisted = updatedChannel.isBlacklisted
        selectCard.remove();

        
    })
}

export function deleteChannelEvent(channels){
    channelsContainer.addEventListener('click', async (e)=>{
        const deleteBtn = e.target.closest('[data-action="delete"]');

        if(!deleteBtn)
            return;

        e.stopPropagation();

        const selectCard = deleteBtn.closest('[data-id]');

        const selectedChannel = channels.find(channel =>{
            return channel.id === selectCard.dataset.id;
        });

        if(!selectedChannel)
            return;

        const confrimDelete = confirm(`Voulez-vous supprimer definitivement ${selectedChannel.name} ?`)

        if(!confrimDelete)
            return;

        
        await deleteChannel(selectedChannel.id);

        const channelIndex = channels.findIndex(channel =>{
            return channel.id === selectedChannel.id;
        })

        channels.splice(channelIndex, 1);

        selectCard.remove();
    
        alert('Impossible de supprimer cette chaîne.');

        
    })
}

const addChannel = document.getElementById('add-channel');

let id = 0;

export function addChannelPost(channels){

    const dialog = formPost();
    
    addChannel.addEventListener('click', ()=>{

        document.body.appendChild(dialog);
        dialog.showModal()
    })

    dialog.addEventListener('submit', async (e)=>{

        const formData = new FormData(e.target);
        const channel = Object.fromEntries(formData.entries());

        channels.forEach(element => {
            if(Number(element.id) > id){
                id = Number(element.id)
            };
        });

        if(!channel.name.trim() || channel.channelNumber.trim())
            return;

        channel["id"] = ++id;
        
        const createdChannel =  await postChannel(channel)
        channels.push(createdChannel);

        dialog.close()
        dialog.remove();
    })

}