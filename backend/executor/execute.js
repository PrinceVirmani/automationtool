import { execute as executeLighter } from "./executors/lighter";

export async function execute(nodes, edges){
    const trigger = nodes.find(x => x.data.kind === "TRIGGER");
    await executeRecursive(trigger?.id, nodes, edges)
}

export async function executeRecursive(sourceId, nodes, edges){
    const nodesToExecute = edges.filter(({source, target} )=> source === sourceId).map(({target})=> target);

   await Promise.all(nodesToExecute.map(async (nodeClientId) => {
    const node = nodes.find(({id})=> id === nodeClientId);
    if(!node){
        return;
    }
    switch(node.type){
        case "lighter":
           await executeLighter(node.data.metadata.assest, node.data.metadata.quantity,node.data.metadata.type, node.credentials.api_key )

    }
   } ))
    await Promise.all(nodesToExecute.map(id => executeRecursive(id, nodes, edges)))
}