import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import {BrowserRouter, Routes, Route, Router} from "react-router-dom";
import '@xyflow/react/dist/style.css';
import CreateWorkflow from './component/CreateWorkflow';
 
export default function App() {

  return <div>
    <BrowserRouter>
    <Routes>
      <Route path="/create-workflow" element={<CreateWorkflow />} />
    </Routes>
    </BrowserRouter>
  </div>

}