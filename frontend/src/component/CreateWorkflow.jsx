import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { TriggerSheet } from "./TriggerSheet";
import { PriceTrigger } from "../nodes/triggers/Pricetrigger";
import { Timer } from "../nodes/triggers/Timer";
import { ActionSheet } from "./ActionSheet";
import { Lighter } from "../nodes/actions/Lighter";
import { Hyperliquid } from "../nodes/actions/Hyperliquid";
import { Backpack } from "../nodes/actions/Backpack";

const nodeTypes = {
  "price-trigger": PriceTrigger,
  "timer": Timer,
  "lighter": Lighter,
  "hyperliquid": Hyperliquid,
  "backpack": Backpack
};

// Custom edge styling
const defaultEdgeOptions = {
  animated: true,
  style: { 
    stroke: '#6366f1', 
    strokeWidth: 2 
  },
};

export default function CreateWorkflow() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectAction, setSelectAction] = useState(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((snapshot) => applyNodeChanges(changes, snapshot)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((snapshot) => applyEdgeChanges(changes, snapshot)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((snapshot) => addEdge(params, snapshot)),
    []
  );

  const onConnectEnd = useCallback((params, connectionInfo) => {
    if (!connectionInfo?.isValid && connectionInfo?.fromNode) {
      setSelectAction({
        startingNodeId: connectionInfo.fromNode.id,
        position: {
          x: connectionInfo.fromNode.position.x + 280,
          y: connectionInfo.fromNode.position.y,
        },
      });
    }
  }, []);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {!nodes.length && (
        <TriggerSheet
          onSelect={(kind, metadata) => {
            setNodes((prev) => [
              ...prev,
              {
                id: crypto.randomUUID(),
                type: kind,
                data: {
                  type: "trigger",
                  kind,
                  metadata,
                  label: kind,
                },
                position: { x: 250, y: 150 },
              },
            ]);
          }}
        />
      )}

      {selectAction && (
        <ActionSheet
          onSelect={(kind, metadata) => {
            const nodeId = crypto.randomUUID();

            setNodes((prev) => [
              ...prev,
              {
                id: nodeId,
                type: kind,
                data: {
                  type: "action",
                  kind,
                  metadata,
                  label: kind,
                },
                position: selectAction.position,
              },
            ]);

            setEdges((prev) => [
              ...prev,
              {
                id: `${selectAction.startingNodeId}-${nodeId}`,
                source: selectAction.startingNodeId,
                target: nodeId,
                animated: true,
                style: { stroke: '#6366f1', strokeWidth: 2 },
              },
            ]);

            setSelectAction(null);
          }}
        />
      )}

      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        className="workflow-canvas"
      >
        {/* Dotted background pattern */}
        <Background 
          color="#94a3b8" 
          gap={16} 
          size={1}
          variant="dots"
        />
        
        {/* Zoom controls */}
        <Controls 
          className="bg-white shadow-lg rounded-lg border border-gray-200"
        />
        
        {/* Mini map for navigation */}
        <MiniMap 
          nodeColor={(node) => {
            if (node.type === 'timer') return '#3b82f6';
            if (node.type === 'price-trigger') return '#a855f7';
            if (node.type === 'hyperliquid') return '#06b6d4';
            if (node.type === 'lighter') return '#f97316';
            if (node.type === 'backpack') return '#a855f7';
            return '#6b7280';
          }}
          className="bg-white shadow-lg rounded-lg border border-gray-200"
          maskColor="rgb(240, 240, 255, 0.6)"
        />
      </ReactFlow>
    </div>
  );
}