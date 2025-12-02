import { ExceutionModel, WorkflowModel } from "../db"
import { execute } from "./execute";
import mongoose from "mongoose";



async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    while(1){
        const worflows = await WorkflowModel.find({})
        worflows.map(async workflow => {
            const trigger = workflow.nodes.find(x => x.data?.kind == "TRIGGER");

            if(!trigger){
                return;
            }
            switch (trigger?.type){
                case "timer": 
                    const timeInS = trigger.data?.metadata?.time;
                    const execution = await ExceutionModel.findOne({
                        workflowId: workflow.id,
                    }).sort(
                        {
                            startTime: "desc",
                        }
                    )
                    if(!execution || new Date (execution.startTime).getTime() < Date.now()- (timeInS*1000)){
                        const execution = await  ExceutionModel.create({
                            workflowId: workflow.id,
                            status: "PENDING",
                            startTime: new Date(),

                        })
                        await execute(workflow.nodes, workflow.edges);
                        execution.status = "SUCCESS"
                        execution.endTime = new Date(),
                        await execution.save()
                    }
            }
        })
        // 2 seconds wait
        await new Promise(x => setTimeout(x, 2000));
    }   
}
main()