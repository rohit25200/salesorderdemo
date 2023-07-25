
module.exports = cds.service.impl(
    async function(){
        const {
            EmployeeSet,POs
        }=this.entities;

        
        this.before('UPDATE',EmployeeSet, (req,res)=>{
            if(parseFloat (req.data.salaryAmount)>=10000){
                req.error("salary barabr dal");
            }
        });


    this.on('boost',async req =>{
      try {
        const ID = req.params[0];
        const tx = cds.tx(req);
        await tx.update(POs).with({
            GROSS_AMOUNT : round({'+=' :20000},2),NOTE :"Boosted!!"
        }).where(ID);
        return {};
        
      } catch (error) {
        
      }
    })

   
       this.on('largestOrder',async req =>{
        try {
            const ID = req.params[0];
            console.log(ID)
            const tx =cds.tx(req);
            const reply =await tx.read(POs).orderBy({
                GROSS_AMOUNT:'desc'
            }).limit(1);
            return reply;
           
        } catch (error) {
           return "Error" +error.toString(); 
        }
       } );
    }
);