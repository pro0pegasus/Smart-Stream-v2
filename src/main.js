import './style.css'
import { getChannels } from './services/api.js';
import { eventContainer, categoryEvent, channelSelectionEvent, searchEvent, favouriteEvent, favouriteToggleEvent, blacklistEvent, blacklistViewEvent, restoreChannelEvent, deleteChannelEvent, addChannelPost } from './events/channelEvents.js';
import { channelCategories } from './ui/sidebar.js';
import {showLoader, hiddeLoading} from './ui/loading.js'
import { errorComponent } from './ui/error.js';

async function app(){
  try{
    showLoader()

    const channels = await getChannels();
    eventContainer();

    if(channels){
      channelCategories(channels);
      categoryEvent(channels)
      channelSelectionEvent(channels);
      searchEvent(channels);
      favouriteEvent(channels);
      favouriteToggleEvent(channels);
      blacklistEvent(channels);
      blacklistViewEvent(channels);
      restoreChannelEvent(channels);
      deleteChannelEvent(channels);
      addChannelPost(channels)
    }  

  } catch(error){

    console.error(error);
    errorComponent(error)

  } finally{  

    hiddeLoading()

  }
  
}


document.addEventListener('DOMContentLoaded', app);