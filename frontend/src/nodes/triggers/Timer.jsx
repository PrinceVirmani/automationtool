import { Handle, Position } from "@xyflow/react";
import { Clock } from "lucide-react";

export function Timer({ data, isConnectable }) {
  const seconds = data?.metadata?.time ?? 0;

  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 shadow-lg border-2 border-blue-300 min-w-[220px]">
      <div className="flex items-center gap-2 text-white mb-2">
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
          <Clock size={18} />
        </div>
        <div className="font-bold text-lg">Timer</div>
      </div>
      <div className="text-blue-50 text-sm font-medium">
        Every <span className="font-bold text-white">{seconds}s</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!bg-white !border-2 !border-blue-500 !w-4 !h-4"
      />
    </div>
  );
}