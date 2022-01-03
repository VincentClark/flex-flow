import React from 'react';
import { VERSION, View } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

// import components for news view
import NewsNavButton from './components/NewsNavButtonComponent';
import NewsView from './components/NewsViewComponent';
const PLUGIN_NAME = "Flxr6Plugin";
export default class Flxr6Plugin extends FlexPlugin {
    constructor() {
        super(PLUGIN_NAME);
    }
    init(flex, manager) {
        // Add news button component to the SideNav
        flex.SideNav.Content.add(
            <NewsNavButton key="news-sidenav-button" />
        );

        // Add news view to the ViewCollection
        flex.ViewCollection.Content.add(
            <View name="news-view" key="news-view">
                <NewsView key="co-news-view" />
            </View>
        );
        // Template strings: 1-line changes
        manager.strings.TaskInfoPanelContent = `
     <h1>CUSTOMER DETAILS</h1>   
     <h2>Phone Number: Locale</h2>
     <p>{{task.attributes.caller_city}}, {{task.attributes.caller_state}} {{task.attributes.caller_zip}}</p>
     
     <h2>Phone Number: Country</h2>
     <p>{{task.attributes.caller_country}}</p>
 
     <h2>Workflow</h2>
     <p>{{task.workflowName}}</p>
 
     <hr />
     <h1>TASK CONTEXT</h1>
     <h2>Task created on</h2>
     <p>{{task.dateCreated}}</p>
 
     <h2>Task priority</h2>
     <p>{{task.priority}}</p>
 
     <h2>Task type</h2>
     <p>{{task.taskChannelUniqueName}}</p>    
     `;
        manager.strings.NoTasksTitle = "Awaiting incoming requests...";
        manager.strings.TaskLineCallReserved = "Call from {{task.attributes.caller_city}} number"
        // Actions Framework - Auto-accept chat plugin
        manager.workerClient.on("reservationCreated", reservation => {
            if (reservation.task.taskChannelUniqueName === 'chat') {
                console.log("This task is a 'chat'!");
                console.log("Reservation created for Worker: " + reservation.workerSid);
            }
        });
    } // end init


}