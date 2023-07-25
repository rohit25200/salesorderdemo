using { anubhav.db.master,anubhav.db.transaction } from '../db/datamodel';

service CatalogService@(path:'/Catalogservice') {
entity BPSet as projection on master.businesspartner;
 entity AddressSet as projection on master.address;
 entity EmployeeSet as projection on  master.employees; 
 entity ProductSet as projection on master.product;  
 
    entity POs@(
        title:'poHeader'
    )as projection on transaction.purchaseorder{
        *,
        round(GROSS_AMOUNT,2)as GROSS_AMOUNT:Decimal(15,2),
        case LIFECYCLE_STATUS 
        when 'N' then 'New'
        when 'D' then 'Delivered'
        when 'B' then 'Blocked'
        end as LIFECYCLE_STATUS: String(20),
        case LIFECYCLE_STATUS
         when 'N' then 2
        when 'D' then 3
        when 'B' then 1
        end as Criticality :Integer,
         Items: redirected to POItems
    } actions{
    function largestOrder() returns array of POs;
    action boost();

    }

entity  POItems@(
    title:'poItems'
)as projection on transaction.poitems{
    *,
    PARENT_KEY:redirected to POs,
    PRODUCT_GUID :redirected to ProductSet
}
}