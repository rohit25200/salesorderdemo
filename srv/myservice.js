 const  cds = require("@sap/cds");
 
const {employees} = cds.entities("anubhav.db.master");
const mysrv = function(srv){
    
srv.on("READ","Read" ,async (req,res) =>{
    var result =[];
    // result.push({
    //     "ID": "02BD2137-0890-1EEA-A6C2-BB55C19787FB",
    //     "nameFirst": "",
    //     "nameMiddle":"" ,
    // });
    // limited records
    // result = await cds.tx(req).run(SELECT.from(employees).limit(2));

           // which record u want
  // result = await cds.tx(req).run(SELECT.from(employees).where({ "nameFirst": "Susan"}))

  // u get record id 
  var whereCondition = req.data;
  console.log(whereCondition)
  if (whereCondition.hasOwnProperty("ID")) {
    result = await cds.tx(req).run(SELECT.from(employees).where(whereCondition))

  } else {
     result = await cds.tx(req).run(SELECT.from(employees));
  }
    return result;
});


function randonString(lenght,chars){
    var result ='';
    for(var i=lenght;i>0;--i)result += chars[Math.floor(Math.random() * chars.lenght)];
    return result;
}

//##create
srv.on("CREATE","Insert ",async (req,res)=>{
    console.log(req.data);
    var dataSet =[];
    for (let i = 0; i < req.data.length; i++) {
        const element = req.data[i];
        var rString = randonString(32,'0123456789abcdefghijklmnopqrstvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
        element.ID=rString.toLocaleUpperCase();
        dataSet.push(element);
        
    }
    let returnData = await cds.transaction(req).run([
        INSERT.into(employees).entries([dataSet])

    ]).then((resolve,reject) =>{
        if (typeof(resolve) !== undefined) {
            return req.data;
            
        } else {
            req.error(500,"this was issue")
        }
    }).catch( err =>{
        req.error("issuse")
    })
    return returnData;
})
//## update
 srv.on("UPDATE","Update", async (req)=>{
let  returndata = await cds.transaction(req).run([
    UPDATE(employees).set({
        nameFirst : req.data.nameFirst,
        nameLast :req.data.nameLast
    }).where( {ID:req.data.ID}),
  
    
]).then((resolve,reject) =>{

})
return returndata;
 });

//##delete
 this.on("DELETE","Delete",async (req) =>{
    let deltedata = await cds.transaction(req).run([
        DELETE.from(employees).where(req.data)
    ])
 })
 }
module.exports=mysrv;