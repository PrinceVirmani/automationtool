import { Handle, Position } from "@xyflow/react";
import { TrendingUp } from "lucide-react";

export function PriceTrigger({ data, isConnectable }) {
  const asset = data?.metadata?.asset ?? "No asset";
  const price = data?.metadata?.price ?? "N/A";

  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-5 shadow-lg border-2 border-purple-300 min-w-[220px]">
      <div className="flex items-center gap-2 text-white mb-2">
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
          <TrendingUp size={18} />
        </div>
        <div className="font-bold text-lg">Price Trigger</div>
      </div>
      <div className="space-y-1">
        <div className="text-purple-50 text-sm">
          Asset: <span className="font-bold text-white">{asset}</span>
        </div>
        <div className="text-purple-50 text-sm">
          Price: <span className="font-bold text-white">${price}</span>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!bg-white !border-2 !border-purple-500 !w-4 !h-4"
      />
    </div>
  );
}