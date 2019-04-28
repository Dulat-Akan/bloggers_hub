import { Injectable } from '@angular/core';
import { createStore } from 'redux'
import { Observable, of, Subject } from 'rxjs';
import { HomeserviceService } from '../homeservice/homeservice.service';
import { DetailserviceService } from '../detailservice/detailservice.service';

@Injectable({
  providedIn: 'root'
})
export class StoreserviceService {

  private socket;
  public deviceid:string;
  public unitid:number;
  public buttonstateObservable = new Subject<boolean>();;


  constructor(private detailservice:DetailserviceService,private homeservice: HomeserviceService) {

      this.socket = this.homeservice.socket;
      this.deviceid = this.homeservice.deviceid;
      this.initStore(); //details button
      this.getcheckDetailsState(); //detail first state listen

   }

    favoriteButton(state = [{state:true,updateDatabase:false}], action) {   //redux store
        switch (action.type) {
          case 'ENABLE':

             state[0].state = true;
             state[0].updateDatabase = action.updateDatabase;

            return state;
          case 'DISABLE':

           state[0].state = false;
           state[0].updateDatabase = action.updateDatabase;

            return state;

          default:
            return state
        }
      }


    favoriteButtonStore = createStore(this.favoriteButton);


    initStore(){

      this.favoriteButtonStore.subscribe(() => {

        var buttonstate = this.favoriteButtonStore.getState();

        var data = {
          page_id: this.detailservice.page_id,
          email: this.homeservice.email
        }

        if((buttonstate[0].state == true) && (buttonstate[0].updateDatabase == false)){ //update content only
            this.buttonstateObservable.next(true);
        }else if((buttonstate[0].state == false) && (buttonstate[0].updateDatabase == false)){ //update content only
            this.buttonstateObservable.next(false);
        }else if((buttonstate[0].state == true) && (buttonstate[0].updateDatabase == true)){ //update content and database
          this.socket.emit('enableFavoriteState', data);
          this.buttonstateObservable.next(true);
          this.homeservice.Toast("added to favorite..");
        }else if((buttonstate[0].state == false) && (buttonstate[0].updateDatabase == true)){ //update content and database
          this.socket.emit('disableFavoriteState', data);
          this.buttonstateObservable.next(false);
          this.homeservice.Toast("removed from favorite..");
        }
        console.log(buttonstate);

      });

    }


    checkDetailsState(page_id){

      var data = {
          device:this.deviceid,
          page_id:page_id,
          email:this.homeservice.email,
      }

      this.socket.emit("checkDetailsState",data);

    }

    getcheckDetailsState(){
      this.socket.on('checkDetailsState', (data) => {
          if(data.state == true){
            //yes
            this.favoriteButtonStore.dispatch({ type: 'ENABLE',updateDatabase:false });
          }else{
            this.favoriteButtonStore.dispatch({ type: 'DISABLE',updateDatabase:false });
          }
      });
    }





}
