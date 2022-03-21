import { LightningElement, api } from 'lwc';

//import methods from the apex class
import getPerson from '@salesforce/apex/FormServices.getPerson';
import savePerson from '@salesforce/apex/FormServices.savePerson';

export default class Form extends LightningElement {

    @api recordId;
    fields = ["Full_name__c", "Phone__c","Email__c"];

    callPerson(){
        getPerson().then(result => {
            console.table(result);
            savePerson({personId: result[0].Id, name: "John Doe"}).then(() => {
                alert("name updated");
            });
        }).catch(error => {
            console.log(error);
        });
    }
}



// ({
//     clickCreate: function(component, event, helper) {
//         let validContact = component.find('contactform').reduce(function (validSoFar, inputCmp) {

//             // Displays error messages for invalid fields
//             inputCmp.showHelpMessageIfInvalid();
//             return validSoFar && inputCmp.get('v.validity').valid;
//             }, true);

//         // If we pass error checking, do some real work
//         if(validContact){
//             // Create the new contact
//             let newContact = component.get("v.newContact");
//             console.log("Create contact: " + JSON.stringify(newContact));
//             window.alert("El usuario fue creado correctamente.");
//             helper.createContact(component, newContact);
//         }

//     },
//         doInit: function(component, event, helper){
//             // Load contacts from Salesforce
//             let action = component.get("c.getContacts");

//             // Add callback behavior for when response is received
//             action.setCallback(this, function(response) { //respuesta por parte de la función de devolución de llamadas
//             let state = response.getState();

//             if (state === "SUCCESS") {
//                 component.set("v.contacts", response.getReturnValue());
//             }
//             else {
//                 console.log("Failed with state: " + state);
//             }
//             return response;
//         });

//             // Send action off to be executed. agrega la llamada del servidor que acabamos de configurar a la cola de solicitudes del marco de componentes Aura.
//             $A.enqueueAction(action);
//     }
// })
