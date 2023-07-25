using { anubhav.db.master,anubhav.db.transaction } from '../db/datamodel';



service MyService {


    @readonly
    entity Read as projection on master.employees;

    entity Insert as projection on master.employees;

    entity Update as projection on master.employees;
   
  entity Delete as projection on master.employees;
}