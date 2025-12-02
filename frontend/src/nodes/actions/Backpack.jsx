import { Handle, Position } from "@xyflow/react";
import { ArrowRightLeft } from "lucide-react";

export function Backpack({ data }) {
  const type = data?.metadata?.type ?? "N/A";
  const qty = data?.metadata?.qty ?? "0";
  const asset = data?.metadata?.asset ?? "N/A";

  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-5 shadow-lg border-2 border-purple-300 min-w-[220px]">
      <div className="flex items-center gap-2 text-white mb-3">
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
          <ArrowRightLeft size={18} />
        </div>
        <div className="font-bold text-lg">Backpack</div>
      </div>
      <div className="space-y-1.5">
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
          type === "buy" ? "bg-green-400 text-green-900" : "bg-red-400 text-red-900"
        }`}>
          {type?.toUpperCase()}
        </div>
        <div className="text-white text-sm font-semibold">
          {qty} {asset}
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-white !border-2 !border-gray-400 !w-4 !h-4" />
      <Handle type="target" position={Position.Left} className="!bg-white !border-2 !border-gray-400 !w-4 !h-4" />
    </div>
  );
}